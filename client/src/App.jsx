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

const Home = () => {
  const { user } = useAuthStore();

  const features = [
    { icon: Calendar, title: 'Discover Events', description: 'Find amazing events happening around you' },
    { icon: MessageSquare, title: 'AI Assistant', description: 'Get personalized event recommendations' },
    { icon: Users, title: 'Connect', description: 'Meet like-minded people at events' },
    { icon: MapPin, title: 'Local & Global', description: 'Events from your city to worldwide' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-purple-400" size={18} />
            <span className="text-purple-300 text-sm font-medium">Discover Your Next Adventure</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Events That{' '}
            <span className="text-gradient">Inspire You</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Connect with amazing events, meet new people, and create unforgettable memories with EventFinder's AI-powered platform.
          </p>

          {user ? (
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/dashboard'}>
                <Calendar size={20} className="mr-2" />
                Browse Events
              </Button>
              <Button variant="secondary" size="lg" onClick={() => window.location.href = '/chat'}>
                <MessageSquare size={20} className="mr-2" />
                AI Assistant
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/register'}>
                Get Started Free
              </Button>
              <Button variant="secondary" size="lg" onClick={() => window.location.href = '/login'}>
                Sign In
              </Button>
            </div>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all group"
            >
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="text-purple-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

function App() {
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
