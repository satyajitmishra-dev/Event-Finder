import { create } from 'zustand';
import api from '../api/axios';

const useEventStore = create((set) => ({
    events: [],
    myEvents: [],
    globalEvents: [],
    currentEvent: null,
    isLoading: false,
    error: null,

    fetchEvents: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams(filters).toString();
            const res = await api.get(`/events?${params}`);
            set({ events: res.data, isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.message });
        }
    },

    fetchGlobalEvents: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
            const params = new URLSearchParams(filters).toString();
            const res = await api.get(`/events/global?${params}`);
            set({ globalEvents: res.data, isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.message });
        }
    },

    fetchMyEvents: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.get('/events/my');
            set({ myEvents: res.data, isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.message });
        }
    },

    fetchEventById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.get(`/events/${id}`);
            set({ currentEvent: res.data, isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: err.message });
        }
    },

    createEvent: async (eventData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await api.post('/events', eventData);
            set((state) => ({
                events: [...state.events, res.data],
                myEvents: [...state.myEvents, res.data],
                isLoading: false
            }));
            return res.data;
        } catch (err) {
            set({ isLoading: false, error: err.response?.data?.message || 'Failed to create event' });
            throw err;
        }
    },

    deleteEvent: async (id) => {
        try {
            await api.delete(`/events/${id}`);
            set((state) => ({
                events: state.events.filter((e) => e._id !== id),
                myEvents: state.myEvents.filter((e) => e._id !== id),
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
}));

export default useEventStore;
