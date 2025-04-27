import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Tumhara backend URL
});

// Automatically add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
export const createTask = (taskData) => {
    return axiosInstance.post('/tasks', taskData); // POST request to create a task
  };
  
export default axiosInstance;
