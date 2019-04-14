import { get, post, put } from './fetchService';

export function getDraft (id) {
    return get(`/patients/${id}/status/draft`);
}

export function createStatus (id, data) {
    return post(`/patients/${id}/status/draft`, data);
}

export function commitDraft (id, data) {
    return put(`/patients/${id}/status/draft`, data);
}
