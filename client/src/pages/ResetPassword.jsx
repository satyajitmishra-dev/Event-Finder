import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userId = location.state?.userId;
    const email = location.state?.email;

    useEffect(() => {
        if (!userId) {
            toast.error('Invalid access. Please try again.');
            navigate('/forgot-password');
        }
    }, [userId, navigate]);

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const validate = () => {
        if (newPassword.length < 8) return "Password must be at least 8 characters long";
        if (!/[A-Z]/.test(newPassword)) return "Password must include at least one uppercase letter";
        if (!/[a-z]/.test(newPassword)) return "Password must include at least one lowercase letter";
        if (!/\d/.test(newPassword)) return "Password must include at least one number";
        if (!/[@$!%*?&]/.test(newPassword)) return "Password must include at least one special character (@$!%*?&)";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        const passwordError = validate();
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post('/auth/reset-password', {
                userId,
                otp: otpValue,
                newPassword
            });
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
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
                        Reset Password
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        Enter the OTP sent to <span className="text-purple-400 font-medium">{email}</span>
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* OTP Input */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label className="text-sm font-medium text-gray-300 ml-1">Verification Code</label>
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <motion.input
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 bg-gray-900/50 border border-gray-700 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* New Password */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                    >
                        <label className="text-sm font-medium text-gray-300 ml-1">New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none z-10" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 rounded-lg py-3 pl-12 pr-12 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="Min 8 characters"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none z-10" size={20} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 rounded-lg py-3 pl-12 pr-12 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                placeholder="Re-enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
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
                            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                        >
                            {!isLoading && (
                                <>
                                    Reset Password <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
