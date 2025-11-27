import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Info } from 'lucide-react';

const OtpVerify = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { verifyRegisterOtp, verifyLoginOtp } = useAuthStore();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (state.type === 'register') {
                await verifyRegisterOtp({ userId: state.userId, otp });
                toast.success('Verification Successful! Please Login.');
                navigate('/login');
            } else {
                await verifyLoginOtp({ userId: state.userId, otp });
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
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-2xl w-full max-w-sm text-center"
            >
                <h2 className="text-3xl font-bold mb-2 text-gradient">Verify OTP</h2>
                <p className="mb-6 text-gray-400">Enter the code sent to <span className="text-white font-semibold">{state?.email}</span></p>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-6 flex items-start gap-3 text-left">
                    <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/80">
                        Don't see the email? <span className="text-yellow-200 font-medium">Check your spam folder</span> 📩
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-700 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        maxLength="6"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 p-3 rounded-lg font-bold transition disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default OtpVerify;
