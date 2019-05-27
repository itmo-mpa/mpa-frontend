import * as actionCreaters from '../reducers/diseases';
import * as service from '../../Services/draftService';

export const get = () => {
    return async (dispatch) => {
        const diseases = await service.getDiseases();

        console.log('GOT DISEASES', diseases);

        dispatch(actionCreaters.put(diseases));

        return diseases;
    };
};

export const clear = () => {
    return dispatch => dispatch(actionCreaters.clear());
};
