import { combineReducers } from 'redux';
import associations from './associations';
import draft from './draft';
import patient from './patient';
import patients from './patients';
import nextStates from './nextStates';
import disease from './disease';
import diseases from './diseases';
import history from './history';
import medicines from './medicines';

export default combineReducers({
    associations,
    draft,
    patient,
    patients,
    nextStates,
    disease,
    diseases,
    history,
    medicines
});
