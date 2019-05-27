import * as actionCreaters from '../reducers/medicines';
import * as service from '../../Services/draftService';

export const get = (diseaseId) => {
    return async (dispatch) => {
        const medicines = await service.getMedicines(diseaseId);

        console.log('GOT MEDICINES', medicines);

        dispatch(actionCreaters.put(medicines));

        return medicines;
    };
};

export const clear = () => {
    return dispatch => dispatch(actionCreaters.clear());
};
