import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post('/auth/register', userData);
            set({ isLoading: false });
            return res.data;
        } catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || 'Registration failed' });
            throw err;
        }
    },

    verifyRegisterOtp: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await api.post('/auth/verify-register-otp', data);
            set({ isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || 'Verification failed' });
            throw err;
        }
    },

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post('/auth/login', credentials);
            set({ isLoading: false });
            return res.data;
        } catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || 'Login failed' });
            throw err;
        }
    },

    verifyLoginOtp: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post('/auth/verify-login-otp', data);
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || 'OTP Verification failed' });
            throw err;
        }
    },

    logout: async () => {
        await api.post('/auth/logout');
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
