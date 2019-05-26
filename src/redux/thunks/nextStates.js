import * as actionCreaters from '../reducers/nextStates';
import * as service from '../../Services/draftService';

export const get = (patientId) => {
    return async (dispatch) => {
        const states = await service.getNextStates(patientId);
        console.log('GET NEXT', states);
        dispatch(actionCreaters.put(states));

        return states;
    };
};

export const clear = () => {
    return (dispatch) => dispatch(actionCreaters.clear());
};
