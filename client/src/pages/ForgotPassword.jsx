import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post('/auth/forgot-password', { email });
            toast.success("OTP sent! 📧 Check your inbox (and spam folder) to reset your password.", {
                autoClose: 6000,
            });
            navigate('/reset-password', { state: { userId: res.data.userId, email } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-pink-600/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card p-8 rounded-3xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl backdrop-blur-xl bg-gray-900/40"
            >
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    >
                        Forgot Password?
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        We'll send you an OTP to reset your password
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                        >
                            {!isLoading && (
                                <>
                                    Send OTP <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-pink-400 transition-colors">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
