import { get, post, put } from './fetchService';

export function getDraft (id) {
    return get(`/patients/${id}/status/draft`);
}

export function createDraft (id, data) {
    return put(`/patients/${id}/status/draft`, data);
}

export function commitDraft (id) {
    return post(`/patients/${id}/status/draft`);
}
// TODO: Переместить
export function getDiseaseData (id) {
    return get(`/patients/${id}/status/attributes`);
}

export const getDiseases = () => {
    return get('/diseases');
};

export const getMedicines = (diseaseId) => {
    return get(`/diseases/${diseaseId}/medicine`);
};

export function getHistory (id) {
    return get(`/patients/${id}/status`);
}

export function getNextStates (id) {
    return get(`/patients/${id}/status/draft/states`);
}
