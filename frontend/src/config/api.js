export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://backend-app-web-dev-knowledge.vercel.app';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getStoredUser = () => {
  return {
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
    userId: localStorage.getItem('userId'),
  };
};

export const setStoredUser = ({ token, userName, user }) => {
  if (token) localStorage.setItem('token', token);
  if (userName) localStorage.setItem('userName', userName);
  if (user) localStorage.setItem('userId', user);
  window.dispatchEvent(new Event('auth-change'));
};

export const clearStoredUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  window.dispatchEvent(new Event('auth-change'));
};
