export const DISEASES_PUT = 'diseases/put';
export const DISEASES_CLEAR = 'diseases/clear';

export const put = diseases => ({
    type: DISEASES_PUT,
    payload: diseases
});

export const clear = () => ({
    type: DISEASES_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case DISEASES_PUT:
        return action.payload;
    case DISEASES_CLEAR:
        return [];
    default:
        return state;
    }
};
