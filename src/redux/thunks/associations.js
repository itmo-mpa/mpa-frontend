import * as actionCreaters from '../reducers/associations';
import * as service from '../../Services/associationService';

export const get = () => {
    return async dispatch => {
        const associations = await service.getAssociations();

        dispatch(actionCreaters.put(associations));
    };
};

export const create = data => {
    return async dispatch => {
        await service.createAssociation(data);

        dispatch(actionCreaters.add(data));
    };
};

export const clear = () => dispatch => dispatch(actionCreaters.clear());
