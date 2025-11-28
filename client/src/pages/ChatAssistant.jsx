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
        <div className="h-[calc(100vh-4rem)] bg-gray-950 text-white flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute top-[40%] left-[40%] w-96 h-96 bg-pink-600/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full z-10 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pb-32">
                <div className="text-center py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-full mb-6 border border-white/10 backdrop-blur-xl shadow-xl"
                    >
                        <Sparkles className="text-purple-300" size={40} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3"
                    >
                        EventFinder AI
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 max-w-md mx-auto"
                    >
                        Your personal event concierge. Ask me about events, recommendations, or just chat!
                    </motion.p>
                </div>

                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-2.5 rounded-full shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-800 border border-gray-700'}`}>
                                    {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-purple-400" />}
                                </div>
                                <div className={`p-5 rounded-3xl shadow-md backdrop-blur-sm ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-purple-600/90 to-pink-600/90 text-white rounded-br-none border border-white/10'
                                    : 'bg-gray-800/60 text-gray-200 border border-gray-700/50 rounded-bl-none'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                        <div className="flex items-center gap-2 bg-gray-800/60 px-5 py-4 rounded-3xl rounded-bl-none border border-gray-700/50 ml-14 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="absolute bottom-6 left-0 right-0 px-4 z-20">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <form onSubmit={handleSend} className="flex gap-3 items-center bg-gray-900/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5">
                        <VoiceInput onResult={handleVoiceResult} />
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full bg-transparent text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ChatAssistant;
