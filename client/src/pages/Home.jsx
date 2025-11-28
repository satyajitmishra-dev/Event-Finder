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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 hover:bg-white/10 transition-colors cursor-default"
                    >
                        <Sparkles className="text-purple-400" size={18} />
                        <span className="text-purple-200 text-sm font-medium tracking-wide">Discover Your Next Adventure</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
                        Find Events That{' '}
                        <div className="inline-block relative">
                            <RotatingText
                                words={["Inspire You", "Connect You", "Thrill You", "Move You"]}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x pb-2"
                            />
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur-sm" />
                        </div>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Connect with amazing events, meet new people, and create unforgettable memories with EventFinder's AI-powered platform.
                    </p>

                    {user ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            <Button variant="primary" size="lg" onClick={() => window.location.href = '/dashboard'} className="shadow-lg shadow-purple-500/25">
                                <Calendar size={20} className="mr-2" />
                                Browse Events
                            </Button>
                            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/chat'} className="bg-white/5 border-white/10 hover:bg-white/10">
                                <MessageSquare size={20} className="mr-2" />
                                AI Assistant
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            <Button variant="primary" size="lg" onClick={() => window.location.href = '/register'} className="shadow-lg shadow-purple-500/25">
                                Get Started Free
                            </Button>
                            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/login'} className="bg-white/5 border-white/10 hover:bg-white/10">
                                Sign In
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32"
                >
                    {features.map((feature, index) => (
                        <SpotlightCard key={feature.title} feature={feature} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* CTA Section - Bridge to Footer */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black/80 pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Extraordinary?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Join thousands of event enthusiasts who are discovering their next passion with EventFinder.
                        </p>
                        {!user && (
                            <button
                                onClick={() => window.location.href = '/register'}
                                className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl shadow-white/10"
                            >
                                Join the Community
                            </button>
                        )}
                        {user && (
                            <button
                                onClick={() => window.location.href = '/chat'}
                                className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl shadow-white/10"
                            >
                                Chat With AI
                            </button>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
