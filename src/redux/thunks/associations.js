import * as actionCreaters from '../reducers/associations';
import * as service from '../../Services/associationService';

export const get = (patientId) => {
    return async dispatch => {
        const associations = await service.getAssociations(patientId);

        dispatch(actionCreaters.put(associations));
    };
};

export const create = data => {
    return async dispatch => {
        await service.createAssociation(data);

        data.type = data.associationType;
        delete data.associationType;

        dispatch(actionCreaters.add(data));
    };
};

export const clear = () => dispatch => dispatch(actionCreaters.clear());
