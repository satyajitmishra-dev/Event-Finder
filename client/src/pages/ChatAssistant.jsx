import React, { useState, useEffect, useRef } from 'react';
import useAiStore from '../store/aiStore';
import VoiceInput from '../components/VoiceInput';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = () => {
    const { messages, sendMessage, isLoading } = useAiStore();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const msg = input;
        setInput('');
        await sendMessage(msg);
    };

    const handleVoiceResult = (text) => {
        setInput(text);
    };

    return (
        <div className="h-[calc(100vh-4rem)] bg-gray-900 text-white flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full z-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-900/30 rounded-full mb-4">
                        <Sparkles className="text-purple-400" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">EventFinder AI</h2>
                    <p className="text-gray-400">Ask me about events, recommendations, or just chat!</p>
                </div>

                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-700'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl shadow-md ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-700 ml-11">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 z-20">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3 items-center">
                    <VoiceInput onResult={handleVoiceResult} />
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full bg-gray-800 text-white pl-4 pr-12 py-3.5 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-2 p-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatAssistant;
