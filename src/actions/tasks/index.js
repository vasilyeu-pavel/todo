import config from '../../config';

import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND, SET, LOADING, SET_SYNC } from '../../constants';
import { withCompleted, withIndex } from '../../mixins';
import { getTaskForRemoving } from '../../utils/tasks';

export const setLoading = ({ dispatch }) => dispatch({ type: LOADING });

// синхронизация тасков при востановлении конекшена
// состояния localstorage синхронизируем с состоянием в базе
export const syncTasks = ({ dispatch, firebase, getState }) => {
    const { user } = getState();
    const { tasks: localTasks } = JSON.parse(localStorage.getItem(config.storageKey));

    firebase.getAllSync(user)
        .then(tasksFromDB => {
            // console.log(tasksFromDB, localTasks);
            if (tasksFromDB.length > localTasks.length) {
                return getTaskForRemoving(localTasks, tasksFromDB)
            }
            return [];
        })
        .then((tasksToRemoving) =>
            Promise.all(tasksToRemoving.map(task => firebase.delete(task.uid, null)))
        )
        .then(() => Promise.all(localTasks.map(task => firebase.update(task.uid, task))))
        // .then(() => firebase.getAllSync())
        .then(() =>
            dispatch({
                type: SET_SYNC,
                payload: localTasks,
            })
        );
};

// получить все таски с базы
export const getAllTask = async ({ dispatch, getState, firebase }) => {
    const update = (tasks) => dispatch({
        type: SET_SYNC,
        payload: tasks,
    });

    const tasks = await firebase.getAllSync(update);

    return dispatch({
        type: SET_SYNC,
        payload: tasks,
    });
};

// подписыпаемся на изменение в базе
export const subscribeToDb = ({ dispatch, getState, firebase }) => {
    const update = (tasks) => {
        return dispatch({
            type: SET,
            payload: tasks,
        });
    };

    firebase.subscribeToDb(update);
};

export const addTask = ({ dispatch, getState, firebase }, values) => {
    let { tasks, isConnected } = getState();
    const index = tasks.length;
    // index for dnd
    const task = withIndex(withCompleted(values), index);

    if (isConnected) {
        // нужно ждать ответа, база генерит uid
        return firebase
            .push(task)
            .catch(e => console.log(e));
    } else {
        return dispatch({
            type: ADD,
            payload: {
                ...task,
                uid: Date.now(),
            },
        });
    }
};

export const updateTask = ({ dispatch, getState, firebase }, task) => {
    const { tasks, isConnected } = getState();
    const foundTask = tasks.find(({ uid }) => task.uid === uid);

    if (isConnected) {
        firebase.update(task.uid, {...foundTask, description: task.description});
    } else {
        return dispatch({
            type: UPDATE,
            payload: task,
        });
    }
};

export const completeAll = ({ getState ,dispatch, firebase }) => {
    const { tasks, isConnected } = getState();

    if (isConnected) {
        Promise.all(tasks.map((task) =>
            firebase.update(task.uid, {...task, isCompleted: true})
        ));
    } else {
        return dispatch({
            type: COMPLETE_ALL,
        })
    }
};

export const handleComplete = ({ getState, dispatch, firebase }, uid) => {
    const { tasks, isConnected } = getState();
    const foundTask = tasks.find(task => task.uid === uid);

    if (isConnected) {
        firebase.update(uid, {...foundTask, isCompleted: !foundTask.isCompleted});
    } else {
        return dispatch({
            type: HANDLE_COMPLETE,
            payload: {uid}
        })
    }
};

export const removeTask = ({ getState, dispatch, firebase }, uid) => {
    const { tasks, isConnected } = getState();
    const filteredTasks = tasks.filter(task => task.uid !== uid);

    if (isConnected) {
        return firebase.delete(uid, null)
            .then(() => Promise.all(filteredTasks
                // обновляем индексы
                .map((task, index) => ({ ...task, index }))
                // обновить в базе индексы (для сортировки днд)
                .map((task) => firebase.update(task.uid, task))))
            // удалить локально задачу
            .then(() => dispatch({
                type: REMOVE,
                payload: {uid}
            }));
    } else {
        // если соединение оборвалось, удалить локально
        return dispatch({
            type: REMOVE,
            payload: {uid}
        });
    }
};

export const sortByDnD = ({ dispatch, getState, firebase }, { uid: dragItemId }, { uid: dropItemId }) => {
    const { tasks, isConnected } = getState();
    const copiedTasks = [...tasks].sort((a, b) => a.index - b.index);

    const drag = tasks.find(({ uid }) => uid === dragItemId);
    const drop = tasks.find(({ uid }) => uid === dropItemId);

    if (drag.index === drop.index) return;

    // убираем задачу из массива
    copiedTasks.splice(drag.index, 1);
    // вставляем в нужно место
    copiedTasks.splice(drop.index, 0, drag);

    if (isConnected) {
        // обязательно нужно мап обновить индексы (во вью используется сортировка по индексу)
        return Promise.all(copiedTasks
        // обновляем индексы
            .map((task, index) => ({...task, index}))
            // сохраняем в базе изменненные индексы
            .map(task => firebase.update(task.uid, task)))
        // после ответа от базы, изменяем локально
            .then(() => dispatch({
                type: SORT_DND,
                payload: {
                    tasks: copiedTasks,
                }
            }));
    }

    dispatch({
        type: SORT_DND,
        payload: {
            tasks: copiedTasks,
        }
    });
};
