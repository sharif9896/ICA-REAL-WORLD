import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/attendance' });

export const fetchDaily = (date) => API.get(`/daily?date=${date}`).then(r => r.data);
export const fetchMonthly = (month, year) => API.get(`/monthly?month=${month}&year=${year}`).then(r => r.data);
export const fetchYearly = (year) => API.get(`/yearly?year=${year}`).then(r => r.data);
export const fetchRange = (start, end) => API.get(`/range?start=${start}&end=${end}`).then(r => r.data);
export const exportExcel = (start, end) => API.get(`/export?start=${start}&end=${end}`, { responseType: 'blob' });
export const fetchStudentDetail = (reg) => API.get(`/student/${reg}`).then(r => r.data);
