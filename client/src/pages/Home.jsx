import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Sparkles, Users, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import SpotlightCard from '../components/ui/SpotlightCard';
import Footer from '../components/Footer';
import useAuthStore from '../store/authStore';

import RotatingText from '../components/ui/RotatingText';

const Home = () => {
    const { user } = useAuthStore();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        // We want the coordinates relative to the viewport/page
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const features = [
        { icon: Calendar, title: 'Discover Events', description: 'Find amazing events happening around you' },
        { icon: MessageSquare, title: 'AI Assistant', description: 'Get personalized event recommendations' },
        { icon: Users, title: 'Connect', description: 'Meet like-minded people at events' },
        { icon: MapPin, title: 'Local & Global', description: 'Events from your city to worldwide' },
    ];

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-gray-950"
            onMouseMove={handleMouseMove}
        >
            {/* Global Spotlight Effect */}
            <div
                className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
                }}
            />

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
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
                        <RotatingText
                            words={["Inspire You", "Connect You", "Thrill You", "Move You"]}
                            className="text-gradient"
                        />
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
                        <SpotlightCard key={feature.title} feature={feature} index={index} />
                    ))}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
