import apiClient from '../../core/network/apiClient';

export const getProfile = () => apiClient.get('/api/v1/profile').then(r => r.data);
export const updateProfile = (payload) => apiClient.put('/api/v1/profile', payload).then(r => r.data);

export const listAllergies = () => apiClient.get('/api/v1/medical/allergies').then(r => r.data);
export const createAllergy = (payload) => apiClient.post('/api/v1/medical/allergies', payload).then(r => r.data);
export const updateAllergy = (id, payload) => apiClient.put(`/api/v1/medical/allergies/${id}`, payload).then(r => r.data);
export const deleteAllergy = (id) => apiClient.delete(`/api/v1/medical/allergies/${id}`);

export const listMedications = () => apiClient.get('/api/v1/medical/medications').then(r => r.data);
export const createMedication = (payload) => apiClient.post('/api/v1/medical/medications', payload).then(r => r.data);
export const updateMedication = (id, payload) => apiClient.put(`/api/v1/medical/medications/${id}`, payload).then(r => r.data);
export const deleteMedication = (id) => apiClient.delete(`/api/v1/medical/medications/${id}`);

export const listContacts = () => apiClient.get('/api/v1/contacts').then(r => r.data);
export const createContact = (payload) => apiClient.post('/api/v1/contacts', payload).then(r => r.data);
export const updateContact = (id, payload) => apiClient.put(`/api/v1/contacts/${id}`, payload).then(r => r.data);
export const deleteContact = (id) => apiClient.delete(`/api/v1/contacts/${id}`);
