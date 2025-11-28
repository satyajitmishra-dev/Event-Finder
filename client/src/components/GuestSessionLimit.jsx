import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

const GuestSessionLimit = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const timerRef = useRef(null);
    const [showModal, setShowModal] = React.useState(false);

    // List of routes where the timer should NOT run
    const authRoutes = ['/login', '/register', '/verify-otp'];
    const isAuthRoute = authRoutes.includes(location.pathname);

    useEffect(() => {
        // Clear existing timer on mount or dependency change
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // If authenticated, on an auth page, or modal is already shown, do nothing
        if (isAuthenticated || isAuthRoute || showModal) {
            return;
        }

        // Start 30-second timer for unauthenticated users on non-auth pages
        timerRef.current = setTimeout(() => {
            setShowModal(true);
        }, 30000); // 30 seconds

        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isAuthenticated, location.pathname, navigate, isAuthRoute, showModal]);

    const handleLogin = () => {
        setShowModal(false);
        navigate('/login');
    };

    const handleContinueGuest = () => {
        setShowModal(false);
        toast.info("Enjoy your guest session! 🚀", { autoClose: 3000 });
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all animate-fadeIn">
                <h3 className="text-xl font-bold text-white mb-2">Want to explore more? 🌟</h3>
                <p className="text-gray-400 mb-6">
                    You've been browsing as a guest. Log in now to unlock full features, save events, and more!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                        onClick={handleContinueGuest}
                        className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        Continue as Guest
                    </button>
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105"
                    >
                        Log In Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestSessionLimit;
