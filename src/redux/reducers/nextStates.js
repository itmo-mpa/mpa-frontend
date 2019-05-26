export const NEXT_STATES_PUT = 'nextStates/put';
export const NEXT_STATES_CLEAR = 'nextStates/clear';

export const put = states => ({
    type: NEXT_STATES_PUT,
    payload: states
});

export const clear = () => ({
    type: NEXT_STATES_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case NEXT_STATES_PUT:
        return action.payload;
    case NEXT_STATES_CLEAR:
        return [];
    default:
        return state;
    }
};
