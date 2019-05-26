import * as service from '../../Services/draftService';
import * as actionCreators from '../reducers/draft';

export const get = (id) => {
    return async (dispatch) => {
        const draft = await service.getDraft(id);

        dispatch(actionCreators.put(draft));

        return draft;
    }
}

export const create = (id, draft) => {
    return async (dispatch) => {
        console.log('CREATE DRAFT DATA', draft);

        const result = await service.createDraft(id, draft);

        console.log('CREATE DRAFT', await result.json());
        dispatch(actionCreators.put(draft));
    }
}

export const commit = (id, draft) => {
    return async dispatch => {
        await service.commitDraft(id, draft);

        dispatch(actionCreators.put(draft));
    }
}

export const clear = () => {
    return dispatch => {
        dispatch(actionCreators.clear());
    }
}

