import { create } from 'zustand';
import api from '../api/axios';
import { toast } from 'react-toastify';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: true,
    error: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await api.post('/auth/refresh');
            set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

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

            // If direct login (verified user), set user state
            if (res.data.accessToken && res.data.user) {
                set({ user: res.data.user, isAuthenticated: true, isLoading: false });
            } else {
                set({ isLoading: false });
            }

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

    updateProfile: async (userData) => {
        try {
            const res = await api.put('/users/profile', userData);
            set({ user: res.data.user });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        await api.post('/auth/logout');
        set({ user: null, isAuthenticated: false });
        toast.success('Logged out successfully!');
    },
}));

export default useAuthStore;
