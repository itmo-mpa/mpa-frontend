export const DRAFT_PUT = 'draft/put';
export const DRAFT_CLEAR = 'draft/clear';
export const DRAFT_UPDATE_STATE = 'draft/update-state';

export const put = draft => ({
    type: DRAFT_PUT,
    payload: draft
});

export const clear = () => ({
    type: DRAFT_CLEAR
});

export const updateState = (state) => ({
    type: DRAFT_UPDATE_STATE,
    payload: state
});

export default (state = {}, action) => {
    switch (action.type) {
    case DRAFT_PUT:
        return action.payload;
    case DRAFT_CLEAR:
        return {};
    case DRAFT_UPDATE_STATE:

        return {
            ...state,
            state: action.payload
        };
    default:
        return state;
    }
};
