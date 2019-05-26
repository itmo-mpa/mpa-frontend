import * as actionCreaters from '../reducers/history';
import * as service from '../../Services/draftService';

export const get = (patientId) => {
    return async (dispatch) => {
        const history = await service.getHistory(patientId);

        dispatch(actionCreaters.put(history));
    };
};

export const clear = () => {
    return dispatch => dispatch(actionCreaters.clear()); 
};