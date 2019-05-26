export const DRAFT_PUT = 'draft/put';
export const DRAFT_CLEAR = 'draft/clear';

export const put = draft => ({
    type: DRAFT_PUT,
    payload: draft
});

export const clear = () => ({
    type: DRAFT_CLEAR
});

export default (state = {}, action) => {
    switch (action.type) {
    case DRAFT_PUT:
        return action.payload;
    case DRAFT_CLEAR:
        return {};
    default:
        return state;
    }
};
