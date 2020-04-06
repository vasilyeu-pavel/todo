import config from '../../config';

import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND, SET, LOADING } from '../../constants';
import { withCompleted, withIndex } from '../../mixins';
import { getTaskForRemoving } from '../../utils/tasks';

export const setLoading = ({ dispatch }) => dispatch({ type: LOADING });

export const syncTasks = ({ dispatch, firebase }) => {
    const { tasks: localTasks } = JSON.parse(localStorage.getItem(config.storageKey));

    firebase.getAll()
        .then(tasksFromDB => {
            if (tasksFromDB.length > localTasks.length) {
                return getTaskForRemoving(localTasks, tasksFromDB)
            }
            return [];
        })
        .then((tasksToRemoving) =>
            Promise.all(tasksToRemoving.map(task => firebase.delete(task.uid, null)))
        )
        .then(() => Promise.all(localTasks.map(task => firebase.update(task.uid, task))))
        .then(() => firebase.getAll())
        .then((tasks) =>
            dispatch({
                type: SET,
                payload: tasks,
            })
        );

};

export const getAllTask = ({ dispatch, getState, firebase }) => {
    return firebase.getAll().then((tasks) => {
        return dispatch({
            type: SET,
            payload: tasks,
        })
    })
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
            .then((createdId) => (
                dispatch({
                    type: ADD,
                    payload: {
                        ...task,
                        uid: createdId
                    },
                })))
            .catch(e => console.log(e));
    }

    return dispatch({
        type: ADD,
        payload: {
            ...task,
            uid: Date.now(),
        },
    });
};

export const updateTask = ({ dispatch, getState, firebase }, task) => {
    const { tasks, isConnected } = getState();
    const foundTask = tasks.find(({ uid }) => task.uid === uid);

    if (isConnected) {
        firebase.update(task.uid, {...foundTask, description: task.description});
    }

    return dispatch({
        type: UPDATE,
        payload: task,
    });
};

export const completeAll = ({ getState ,dispatch, firebase }) => {
    const { tasks, isConnected } = getState();

    if (isConnected) {
        Promise.all(tasks.map((task) =>
            firebase.update(task.uid, {...task, isCompleted: true})
        ));
    }

    return dispatch({
        type: COMPLETE_ALL,
    });
};

export const handleComplete = ({ getState, dispatch, firebase }, uid) => {
    const { tasks, isConnected } = getState();
    const foundTask = tasks.find(task => task.uid === uid);

    if (isConnected) {
        firebase.update(uid, {...foundTask, isCompleted: !foundTask.isCompleted});
    }

    return dispatch({
        type: HANDLE_COMPLETE,
        payload: { uid }
    })
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
    }

    // если соединение оборвалось, удалить локально
    return dispatch({
        type: REMOVE,
        payload: {uid}
    });
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
