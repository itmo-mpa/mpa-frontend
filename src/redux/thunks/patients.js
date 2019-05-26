import * as actionCreaters from '../reducers/patients';
import * as service from '../../Services/patientService';

export const get = () => {
    return async dispatch => {
        const patients = await service.getPatients();

        dispatch(actionCreaters.put(patients));
    };
};

export const clear = () => dispatch => dispatch(actionCreaters.clear());
