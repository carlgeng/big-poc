import api from './api';
import { setStoredToken, removeStoredToken } from './storage';

export const login = async (email, password, rememberMe) => {
  const response = await api.post('/login', { email, password });
  if (rememberMe) {
    setStoredToken(response.data.token, true);
  } else {
    setStoredToken(response.data.token, false);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  setStoredToken(response.data.token, true);
  return response.data;
};

export const logout = async () => {
  removeStoredToken();
};

export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/profile', data);
  return response.data;
};