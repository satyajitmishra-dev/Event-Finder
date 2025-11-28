import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Calendar, MessageSquare, LogOut, Menu, X, Github, Star, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/dashboard', label: 'Events', icon: <Calendar size={18} /> },
        { path: '/chat', label: 'AI Assistant', icon: <MessageSquare size={18} /> },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group mr-8">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                            EventFinder
                        </span>
                    </Link>

                    {/* Right Side Actions & Nav */}
                    <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                        {/* Desktop Nav - Right Aligned (Left of Profile) */}
                        <div className="hidden md:flex items-center gap-1 mr-4">
                            {user && navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-4 py-2 rounded-full group"
                                >
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${isActive(link.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                        }`}>
                                        {link.icon}
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                    <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                        {user.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full object-cover border border-purple-500/50"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-inner">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                        <span className="hidden lg:block">{user.name.split(' ')[0]}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* GitHub Link - Always Visible & Far Right */}
                        <div className="hidden md:block w-px h-6 bg-white/10 mx-2" />
                        <a
                            href="https://github.com/satyajitmishra-dev/Event-Finder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
                        >
                            <Github size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                            <div className="flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span>Star</span>
                            </div>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                        className="md:hidden bg-black/60 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {user ? (
                                <>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive(link.path)
                                                ? 'bg-white/10 text-white'
                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    ))}
                                    <div className="h-px bg-white/10 my-2" />
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <User size={18} /> Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="grid gap-3 p-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}

                            {/* Mobile GitHub Link */}
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <a
                                    href="https://github.com/satyajitmishra-dev/Event-Finder"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Github size={20} />
                                    <span>Star on GitHub</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
