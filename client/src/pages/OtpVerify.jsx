import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Info, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const OtpVerify = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { verifyRegisterOtp, verifyLoginOtp, resendOtp } = useAuthStore();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    React.useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        try {
            await resendOtp({ userId: state.userId, type: state.type });
            toast.success('OTP Resent Successfully!');
            setTimer(30);
            setCanResend(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            if (state.type === 'register') {
                await verifyRegisterOtp({ userId: state.userId, otp: otpValue });
                toast.success('Verification Successful! Please Login.');
                navigate('/login');
            } else {
                await verifyLoginOtp({ userId: state.userId, otp: otpValue });
                toast.success('Login successful!');
                navigate('/');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            const errorMessage = error.response?.data?.message || 'Invalid OTP';
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
                        Verify OTP
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        Enter the code sent to <span className="text-purple-400 font-medium">{state?.email}</span>
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
                >
                    <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/90">
                        Don't see the email? <span className="text-yellow-300 font-medium">Check your spam folder</span> 📩 or promotions tab.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                    >
                        <label className="text-sm font-medium text-gray-300 ml-1">Verification Code</label>
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <motion.input
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
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

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
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
                                    Verify <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-center"
                >
                    <p className="text-gray-400 text-sm mb-2">Didn't receive code?</p>
                    <button
                        onClick={handleResend}
                        disabled={!canResend}
                        className={`text-sm font-medium transition-colors ${canResend
                                ? 'text-purple-400 hover:text-pink-400 hover:underline cursor-pointer'
                                : 'text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OtpVerify;
