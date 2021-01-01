import jwtDecode from 'jwt-decode';

const setToken = (token) => {
  localStorage.setItem('ACCESS_TOKEN', token);
};

const getToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

const removeToken = () => {
  localStorage.clear();
};

const getRole = () => {
  if (getToken()) {
    return 'USER';
  }
  return 'GUEST';
};

const getPosition = () => {
  if (getToken()) {
    const payload = jwtDecode(getToken());
    return payload.position;
  }
  return '';
};

export default {
  setToken,
  getToken,
  removeToken,
  getRole,
  getPosition,
};
