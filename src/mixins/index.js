export const withId = obj => ({
    ...obj,
    id: Date.now(),
});

export const withCompleted = obj => ({
    ...obj,
    isCompleted: false,
});

export const withAllFields = (obj) => withId(withCompleted(obj));
