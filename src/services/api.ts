import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type Trip = {
  id: number;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  busId: number;
  Bus?: {
    id: number;
    name: string;
    numberPlate: string;
    totalSeats: number;
  };
};

export type Booking = {
  id: number;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  userId: number;
  tripId: number;
  Trip?: Trip;
};

export const tripService = {
  getAll: () => api.get<Trip[]>('/trips'),
  search: (origin: string, destination: string, date: string) =>
    api.get<Trip[]>('/trips', { params: { origin, destination, date } }),
};

export const bookingService = {
  create: (data: { userId: number; tripId: number; seats: number }) =>
    api.post<Booking>('/bookings', data),
  getAll: () => api.get<Booking[]>('/bookings'),
};
