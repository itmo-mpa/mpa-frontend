import * as actionCreaters from '../reducers/disease';
import * as service from '../../Services/draftService';

export const get = (patientId) => {
    return async (dispatch) => {
        const disease = await service.getDiseaseData(patientId);

        console.log('GOT DISEASE', disease);

        dispatch(actionCreaters.put(disease));

        return disease;
    };
};

export const clear = () => {
    return dispatch => dispatch(actionCreaters.clear());
};
