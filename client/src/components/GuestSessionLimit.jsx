import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

const GuestSessionLimit = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const timerRef = useRef(null);

    // List of routes where the timer should NOT run
    const authRoutes = ['/login', '/register', '/verify-otp'];
    const isAuthRoute = authRoutes.includes(location.pathname);

    useEffect(() => {
        // Clear existing timer on mount or dependency change
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // If authenticated or on an auth page, do nothing (timer is already cleared)
        if (isAuthenticated || isAuthRoute) {
            return;
        }

        // Start 30-second timer for unauthenticated users on non-auth pages
        timerRef.current = setTimeout(() => {
            toast.info("Please login to continue exploring. 🕒", {
                autoClose: 5000,
                toastId: 'guest-limit-toast' // Prevent duplicates
            });
            navigate('/login');
        }, 30000); // 30 seconds

        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isAuthenticated, location.pathname, navigate, isAuthRoute]);

    return null; // This component doesn't render anything
};

export default GuestSessionLimit;
