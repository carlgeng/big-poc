export const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const setStoredToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const removeStoredToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};