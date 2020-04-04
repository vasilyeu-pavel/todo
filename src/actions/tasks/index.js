import { ADD, COMPLETE_ALL, HANDLE_COMPLETE, REMOVE, UPDATE, SORT_DND, SET, LOADING } from '../../constants';
import { withAllFields, withIndex } from '../../mixins';

export const setLoading = ({ dispatch }) => dispatch({ type: LOADING });

export const getAllTask = ({ dispatch, getState, firebase }) => {
    return firebase.getAll().then((tasks) => {
        return dispatch({
            type: SET,
            payload: tasks,
        })
    })
};

export const addTask = ({ dispatch, getState, firebase }, values) => {
    let { tasks } = getState();
    const index = tasks.length;

    // index for dnd
    const task = withIndex(withAllFields(values), index);
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
};

export const updateTask = ({ dispatch, getState, firebase }, task) => {
    const { tasks } = getState();
    const foundTask = tasks.find(({ uid }) => task.uid === uid);

    // не нужно ждать ответа с базы, потому что uid не меняется
    firebase.update(task.uid, { ...foundTask, description: task.description });

    dispatch({
        type: UPDATE,
        payload: task,
    });
};

export const completeAll = ({ getState ,dispatch, firebase }) => {
    const { tasks } = getState();
    // не нужно ждать ответа с базы, потому что uid не меняется
    Promise.all(tasks.map((task) =>
        firebase.update(task.uid, { ...task, isCompleted: true })
    ));

    return dispatch({
        type: COMPLETE_ALL,
    });
};

export const handleComplete = ({ getState, dispatch, firebase }, uid) => {
    const { tasks } = getState();
    const foundTask = tasks.find(task => task.uid === uid);

    // не нужно ждать ответа с базы, потому что uid не меняется
    firebase.update(uid, { ...foundTask, isCompleted: !foundTask.isCompleted });

    return dispatch({
        type: HANDLE_COMPLETE,
        payload: { uid }
    })
};

export const removeTask = ({ getState, dispatch, firebase }, uid) => {
    const { tasks } = getState();

    const filteredTasks = tasks.filter(task => task.uid !== uid);

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
};

export const sortByDnD = ({ dispatch, getState, firebase }, { uid: dragItemId }, { uid: dropItemId }) => {
    const { tasks } = getState();
    const copiedTasks = [...tasks].sort((a, b) => a.index - b.index);

    const drag = tasks.find(({ uid }) => uid === dragItemId);
    const drop = tasks.find(({ uid }) => uid === dropItemId);

    if (drag.index === drop.index) return;

    // убираем задачу из массива
    copiedTasks.splice(drag.index, 1);
    // вставляем в нужно место
    copiedTasks.splice(drop.index, 0, drag);

    // обязательно нужно мап обновить индексы (во вью используется сортировка по индексу)
    Promise.all(copiedTasks
        // обновляем индексы
        .map((task, index) => ({ ...task, index }))
        // сохраняем в базе изменненные индексы
        .map(task => firebase.update(task.uid, task)))
        // после ответа от базы, изменяем локально
        .then(() => dispatch({
            type: SORT_DND,
            payload: {
                tasks: copiedTasks,
            }
        }));
};
