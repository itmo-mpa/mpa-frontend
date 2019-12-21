export const GRAPH_PUT = 'graph/put';
export const GRAPH_CLEAR = 'graph/clear';

export const put = graph => ({
    type: GRAPH_PUT,
    payload: graph
});

export const clear = () => ({
    type: GRAPH_CLEAR
});

const defaultState = {
    states: [],
    transitions: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
    case GRAPH_PUT:
        return action.payload;
    case GRAPH_CLEAR:
        return defaultState;
    default:
        return state;
    }
};
