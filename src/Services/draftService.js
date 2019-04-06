import { get, post, put } from './fetchService';

export function getDraft (id) {
    return get(`/patients/${id}/status/draft`);
}

export function commitDraft (id, data) {
    return post(`/patients/${id}/status/draft`, data);
}

export function createDraft (id, data) {
    return put(`/patients/${id}/status/draft`, data);
}
