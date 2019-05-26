export const PATIENT_PUT = 'patient/put';
export const PATIENT_CLEAR = 'patient/clear';

export const put = patient => ({
    type: PATIENT_PUT,
    payload: patient
});

export const clear = () => ({
    type: PATIENT_CLEAR
});

export default (state = {}, action) => {
    switch (action.type) {
    case PATIENT_PUT:
        return action.payload;
    case PATIENT_CLEAR:
        return {};
    default:
        return state;
    }
};
