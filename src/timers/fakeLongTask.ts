export const fakeLongTask = (onSuccess: VoidFunction) => {
    setTimeout(onSuccess, 30 * 1000);
};