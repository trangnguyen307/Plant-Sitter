import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
});
export default service;

function signup(username, email, password, avatar) {
  return service.post('/signup', {username, email, password, avatar}).then(response => response.data)
}
export {signup}

function loggedin() {
  return service.get('/loggedin').then(response => response.data)
}
export {loggedin}

function login(username, password) {
  return service.post('/login', {username, password}).then(response => response.data)
}
export {login}

function logout() {
  return service.post('/logout', {}).then(response => response.data)
}
export {logout}