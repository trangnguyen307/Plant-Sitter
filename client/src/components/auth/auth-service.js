import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});
export default service;

function signup(username, email, password, avatar) {
  return service.post('/auth/signup', {username, email, password, avatar}).then(response => response.data)
}
export {signup}

function loggedin() {
  return service.get('/auth/loggedin').then(response => response.data)
}
export {loggedin}

function login(username, password) {
  return service.post('/auth/login', {username, password}).then(response => response.data)
}
export {login}

function logout() {
  return service.post('/auth/logout', {}).then(response => response.data)
}
export {logout}