import apiClient from '../../core/network/apiClient';

export async function loginRequest(payload) {
  const { data } = await apiClient.post('/api/v1/auth/login', payload);
  return data;
}

export async function registerRequest(payload) {
  const { data } = await apiClient.post('/api/v1/auth/register', payload);
  return data;
}
