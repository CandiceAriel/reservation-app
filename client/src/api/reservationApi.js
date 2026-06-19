import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const createReservation = (data) => {
  return api.post('/api/reservations', data);
};

export const getReservations = () => {
  return api.get('/api/reservations');
};

export const deleteReservation = (id) => {
  return api.delete(`/api/reservations/${id}`);
};