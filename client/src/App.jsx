import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Sparkles, Users, MapPin } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import OtpVerify from './pages/OtpVerify';
import useAuthStore from './store/authStore';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import ChatAssistant from './pages/ChatAssistant';
import Navbar from './components/Navbar';
import Button from './components/ui/Button';
import Profile from './pages/Profile';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useEffect } from 'react';

import Footer from './components/Footer';

import Home from './pages/Home';

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = React.useState(false);

  useEffect(() => {
    const performAuthCheck = async () => {
      try {
        await checkAuth();
      } finally {
        setAuthChecked(true);
      }
    };
    performAuthCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!authChecked || isCheckingAuth) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.3)',
        }}
      />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/chat" element={<ChatAssistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
