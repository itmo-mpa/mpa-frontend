import { get, post } from './fetchService';

export function getAssociations (patientId) {
    return get(`/associations?patientId=${patientId}`);
}

export function createAssociation (data) {
    return post(`/associations/1`, data);
}
