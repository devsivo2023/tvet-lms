import axios from 'axios';
import { setCookie, deleteCookie } from 'cookies-next';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  institutionCode: string;
}

export const login = async (credentials: LoginCredentials) => {
  const { data } = await axios.post('/api/auth/login', credentials);
  setCookie('auth_token', data.token);
  return data;
};

export const register = async (userData: RegisterData) => {
  const { data } = await axios.post('/api/auth/register', userData);
  setCookie('auth_token', data.token);
  return data;
};

export const logout = () => {
  deleteCookie('auth_token');
  window.location.href = '/auth/login';
};
