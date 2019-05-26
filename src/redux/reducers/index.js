import {combineReducers} from 'redux';
import associations from './associations';
import draft from './draft';
import patient from './patient';
import patients from './patients';
import nextStates from './nextStates';
import disease from './disease';
import history from './history';

export default combineReducers({
    associations,
    draft,
    patient,
    patients,
    nextStates,
    disease,
    history
})