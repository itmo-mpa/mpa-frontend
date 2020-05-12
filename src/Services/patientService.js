import { get, post } from './fetchService';

export function getPatients () {
    return get('/patients');
}

export function getPatientById (id) {
    return get(`/patients/${id}`);
}

export function getAdrsByMedicine (id) {
    return get(`/adrs/adrs_by_medicine/${id}`);
}

export function createPatient (data) {
    return post('/patients', data);
}
