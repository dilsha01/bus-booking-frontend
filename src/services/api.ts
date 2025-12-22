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

export type Bus = {
  id: number;
  name: string;
  numberPlate: string;
  totalSeats: number;
};

export type DashboardStats = {
  totalBuses: number;
  totalTrips: number;
  totalBookings: number;
  revenue: number;
  bookingsByStatus: Array<{ status: string; count: number }>;
  recentBookings: Booking[];
};

export const tripService = {
  getAll: () => api.get<Trip[]>('/trips'),
  getById: (id: number) => api.get<Trip>(`/trips/${id}`),
  create: (data: Omit<Trip, 'id'>) => api.post<Trip>('/trips', data),
  update: (id: number, data: Partial<Trip>) => api.put<Trip>(`/trips/${id}`, data),
  delete: (id: number) => api.delete(`/trips/${id}`),
  search: (origin: string, destination: string, date: string) =>
    api.get<Trip[]>('/trips', { params: { origin, destination, date } }),
};

export const bookingService = {
  getAll: () => api.get<Booking[]>('/bookings'),
  getById: (id: number) => api.get<Booking>(`/bookings/${id}`),
  create: (data: { userId: number; tripId: number; seats: number }) =>
    api.post<Booking>('/bookings', data),
  update: (id: number, data: Partial<Booking>) => api.put<Booking>(`/bookings/${id}`, data),
  delete: (id: number) => api.delete(`/bookings/${id}`),
};

export const busService = {
  getAll: () => api.get<Bus[]>('/buses'),
  getById: (id: number) => api.get<Bus>(`/buses/${id}`),
  create: (data: Omit<Bus, 'id'>) => api.post<Bus>('/buses', data),
  update: (id: number, data: Partial<Bus>) => api.put<Bus>(`/buses/${id}`, data),
  delete: (id: number) => api.delete(`/buses/${id}`),
};

export const adminService = {
  getStats: () => api.get<DashboardStats>('/admin/stats'),
};
