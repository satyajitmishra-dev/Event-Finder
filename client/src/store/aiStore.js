import { create } from 'zustand';
import api from '../api/axios';

const useAiStore = create((set) => ({
    messages: [{ role: 'system', content: 'Hello! I am your EventFinder AI assistant. How can I help you today?' }],
    recommendations: [],
    isLoading: false,

    sendMessage: async (message) => {
        set((state) => ({
            messages: [...state.messages, { role: 'user', content: message }],
            isLoading: true
        }));

        try {
            const res = await api.post('/ai/chat', { message });
            set((state) => ({
                messages: [...state.messages, { role: 'assistant', content: res.data.reply }],
                isLoading: false
            }));
        } catch (err) {
            set((state) => ({
                messages: [...state.messages, { role: 'assistant', content: 'Sorry, I encountered an error.' }],
                isLoading: false
            }));
        }
    },

    fetchRecommendations: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get('/ai/recommendations');
            set({ recommendations: res.data, isLoading: false });
        } catch (err) {
            console.error(err);
            set({ isLoading: false });
        }
    },

    clearChat: () => set({ messages: [{ role: 'system', content: 'Hello! I am your EventFinder AI assistant. How can I help you today?' }] }),
}));

export default useAiStore;
