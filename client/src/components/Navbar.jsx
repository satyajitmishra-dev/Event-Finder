import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Calendar, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/dashboard', label: 'Events', icon: <Calendar size={18} /> },
        { path: '/chat', label: 'AI Assistant', icon: <MessageSquare size={18} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient hover:opacity-80 transition-opacity">
                        EventFinder
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive(link.path)
                                                ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                            }`}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-6 w-px bg-gray-700 mx-2" />
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-400">Hi, {user.name.split(' ')[0]}</span>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/register" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {user ? (
                                <>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-lg ${isActive(link.path)
                                                    ? 'text-purple-400 bg-purple-500/10'
                                                    : 'text-gray-300 hover:bg-gray-800/50'
                                                }`}
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 text-left"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="grid gap-2 p-2">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center py-2 text-gray-300 hover:bg-gray-800/50 rounded-lg">Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">Get Started</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
