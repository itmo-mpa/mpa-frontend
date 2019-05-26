export const HISTORY_PUT = 'history/put';
export const HISTORY_CLEAR = 'history/clear';

export const put = history => ({
    type: HISTORY_PUT,
    payload: history
});

export const clear = () => ({
    type: HISTORY_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case HISTORY_PUT:
        return action.payload;
    case HISTORY_CLEAR:
        return [];
    default:
        return state;
    }
};
