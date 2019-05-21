import { get, post } from './fetchService';

export function getAssociations () {
    return get(`/doctors/1/associations`);
}

export function createAssociation (data) {
    return post(`/doctors/1/associations`, data);
}