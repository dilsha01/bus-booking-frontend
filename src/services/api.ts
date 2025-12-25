import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // If response has success/data wrapper from backend, unwrap it
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      // Return the inner data if it exists, otherwise return the whole response data
      return {
        ...response,
        data: response.data.data !== undefined ? response.data.data : response.data,
      };
    }
    // Otherwise return as-is
    return response;
  },
  (error: AxiosError<{ success?: boolean; message?: string; error?: string }>) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      console.error('API Error:', message);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - clear auth and redirect to login
        localStorage.removeItem('authToken');
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', 'No response from server');
    } else {
      // Error setting up request
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Types
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
  createdAt?: string;
  updatedAt?: string;
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

// API Services
export const tripService = {
  getAll: (params?: { origin?: string; destination?: string; date?: string }) => 
    api.get<Trip[]>('/trips', { params }),
  getById: (id: number) => api.get<Trip>(`/trips/${id}`),
  create: (data: Omit<Trip, 'id'>) => api.post<Trip>('/trips', data),
  update: (id: number, data: Partial<Trip>) => api.put<Trip>(`/trips/${id}`, data),
  delete: (id: number) => api.delete(`/trips/${id}`),
};

export const bookingService = {
  getAll: (params?: { status?: string; userId?: number; tripId?: number }) => 
    api.get<Booking[]>('/bookings', { params }),
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

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

export type AuthResponse = {
  token: string;
  user: User;
};

export const authService = {
  login: (email: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, role?: 'customer' | 'admin') =>
    api.post<AuthResponse>('/auth/register', { name, email, password, role }),
  getMe: () => api.get<User>('/auth/me'),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// Helper function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
