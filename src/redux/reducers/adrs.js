export const ADRS_PUT = 'adrs/put';
export const ADRS_CLEAR = 'adrs/clear';

export const put = (adrs, id) => ({
    type: ADRS_PUT,
    payload: adrs,
    id
});

export const clear = () => ({
    type: ADRS_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case ADRS_PUT:
        const newState = { ...state };
        if (typeof (action.payload) == 'undefined') {
            return state;
        }
        newState[action.id] = [...action.payload];
        return newState;
    case ADRS_CLEAR:
        return [];
    default:
        return state;
    }
};
