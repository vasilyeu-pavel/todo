export const withCompleted = obj => ({
    ...obj,
    isCompleted: false,
});

export const withIndex = (obj, index) => ({ ...obj, index });
