export const getTaskForRemoving = (localTasks, dbTasks) =>
    dbTasks
        .map((dbTask) => {
            const foundTask = localTasks.find(localTask => localTask.uid === dbTask.uid);
            if (!foundTask)
                return dbTask;
        })
        .filter(Boolean);
