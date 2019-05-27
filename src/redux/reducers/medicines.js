export const MEDICINES_PUT = 'medicines/put';
export const MEDICINES_CLEAR = 'medicines/clear';

export const put = medicines => ({
    type: MEDICINES_PUT,
    payload: medicines
});

export const clear = () => ({
    type: MEDICINES_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case MEDICINES_PUT:
        return action.payload;
    case MEDICINES_CLEAR:
        return [];
    default:
        return state;
    }
};
