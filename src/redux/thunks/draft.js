import * as service from '../../Services/draftService';
import * as actionCreators from '../reducers/draft';

export const get = (id) => {
    return async (dispatch) => {
        const draft = await service.getDraft(id);
        console.log('GET DRAFT DATA', draft);
        dispatch(actionCreators.put(draft));

        return draft;
    };
};

export const create = (id, draft) => {
    return async (dispatch) => {
        const result = await service.createDraft(id, draft);

        console.log('CREATE DRAFT', result);
        dispatch(actionCreators.put(draft));
    };
};

export const commit = (id, draft) => {
    return async dispatch => {
        await service.commitDraft(id, draft);
    };
};

export const clear = () => {
    return dispatch => {
        dispatch(actionCreators.clear());
    };
};

export const updateState = (state) => {
    return dispatch => {
        dispatch(actionCreators.updateState(state));
    };
};
