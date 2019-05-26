export const ASSOCIATIONS_PUT = 'associations/put';
export const ASSOCIATIONS_CLEAR = 'associations/clear';
export const ASSOCIATIONS_ADD = 'associations/add';

export const put = associations => ({
    type: ASSOCIATIONS_PUT,
    payload: associations
});

export const clear = () => ({
    type: ASSOCIATIONS_CLEAR
});

export const add = association => ({
    type: ASSOCIATIONS_ADD,
    payload: association
});

export default (state = [], action) => {
    switch (action.type) {
    case ASSOCIATIONS_PUT:
        return action.payload;
    case ASSOCIATIONS_CLEAR:
        return [];
    case ASSOCIATIONS_ADD:
        return [
            ...state,
            action.payload
        ];
    default:
        return state;
    }
};
