// import axios from 'axios';

// const API_BASE_URL = 'http://10.170.2.99:8000/careers/api';

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export const loginUser = (username, password) => 
//   api.post('/token/', { username, password });

// export const refreshToken = (refresh) => 
//   api.post('/token/refresh/', { refresh });

// export const fetchDashboard = (token) =>
//   api.get('/dashboard/', { headers: { Authorization: `Bearer ${token}` } });

// export const registerUser = (data) =>
//   api.post('/auth/register/', data);


import axios from 'axios';

const API_BASE_URL = 'http://10.170.2.99:8000/careers/api'; // ← IMPORTANT

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const loginUser = (username, password) =>
  api.post('/token/', { username, password });

export const fetchDashboard = token =>
  api.get('/dashboard/', { headers: { Authorization: `Bearer ${token}` } });

export const registerUser = data =>
  api.post('/auth/register/', data);
