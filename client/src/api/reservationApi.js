import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const createReservation = (data) => {
  return api.post('/api/reservations', data);
};