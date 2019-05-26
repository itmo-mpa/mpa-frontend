export const DISEASE_PUT = 'disease/put';
export const DISEASE_CLEAR = 'disease/clear';

export const put = disease => ({
    type: DISEASE_PUT,
    payload: disease
});

export const clear = () => ({
    type: DISEASE_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case DISEASE_PUT:
        return action.payload;
    case DISEASE_CLEAR:
        return [];
    default:
        return state;
    }
};
