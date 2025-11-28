import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await login(formData);

            // Check if OTP is required (unverified user)
            if (res.status === 'OTP_SENT') {
                toast.success("OTP sent! 📧 Check your inbox (and spam folder) to verify your account.", {
                    autoClose: 6000,
                });
                navigate('/verify-otp', { state: { userId: res.userId, email: formData.email, type: 'login' } });
            }
            // Direct login for verified users
            else if (res.accessToken && res.user) {
                toast.success('Login successful!');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMessage);
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
                transition={{ duration: 0.5, ease: "circOut" }}
                className="glass-card p-8 rounded-3xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl backdrop-blur-xl bg-gray-900/40"
            >
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        Sign in to continue your journey
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-5"
                    >
                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-2"
                    >
                        <Input
                            icon={Lock}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-end mb-6"
                    >
                        <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-pink-400 hover:underline transition-colors">
                            Forgot Password?
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                        >
                            {!isLoading && (
                                <>
                                    Login <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 text-center text-gray-400"
                >
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-400 hover:text-pink-400 font-semibold hover:underline transition-colors">
                        Register
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Login;
