export const PATIENTS_PUT = 'patients/put';
export const PATIENTS_CLEAR = 'patients/clear';

export const put = patients => ({
    type: PATIENTS_PUT,
    payload: patients
});

export const clear = () => ({
    type: PATIENTS_CLEAR
});

export default (state = [], action) => {
    switch (action.type) {
    case PATIENTS_PUT:
        return action.payload;
    case PATIENTS_CLEAR:
        return [];
    default:
        return state;
    }
};
