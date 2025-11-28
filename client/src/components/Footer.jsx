import React, { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Facebook, Send, Loader2, Instagram, MessageCircle, HelpCircle, Calendar, Plus, DollarSign, FileText, Bell, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import api from '../api/axios';
import SystemStatus from './ui/SystemStatus';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/email/contact', formData);
            toast.success('Message sent successfully! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative bg-gradient-to-b from-gray-950 via-black to-black overflow-hidden">

            {/* Smooth Transition Gradient */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-10" />

            {/* Subtle Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/40 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/*              SECTION 1 — CONTACT CTA                        */}
            {/* ═══════════════════════════════════════════════════════════ */}

            <div className="relative z-20 pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Enhanced Glowing Background Effect */}
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-pink-600/30 rounded-full blur-[120px] animate-pulse" />
                        </div>

                        {/* Premium Glassmorphism Contact Card */}
                        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 p-10 md:p-14 shadow-2xl overflow-hidden"
                            style={{
                                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), 0 0 120px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}>

                            {/* Animated gradient border effect */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Subtle inner glow */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

                            {/* Decorative corner accents */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />

                            {/* Header */}
                            <div className="relative text-center mb-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6"
                                >
                                    <Sparkles className="text-purple-400" size={18} />
                                    <span className="text-purple-200 text-sm font-medium tracking-wide">Get in Touch</span>
                                </motion.div>

                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                    Stay Connected With{' '}
                                    <span className="relative inline-block">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 animate-gradient-x">
                                            EventFinder
                                        </span>
                                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50 blur-sm" />
                                    </span>
                                </h2>
                                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                    Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                </p>
                            </div>

                            {/* Contact Form */}
                            <form onSubmit={handleSubmit} className="relative space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 hover:border-white/30"
                                        />
                                        <label className="absolute left-5 -top-2.5 px-2 text-xs font-semibold text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-400">
                                            Your Name
                                        </label>
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 hover:border-white/30"
                                        />
                                        <label className="absolute left-5 -top-2.5 px-2 text-xs font-semibold text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-400">
                                            Email Address
                                        </label>
                                    </div>
                                </div>

                                {/* Subject Dropdown */}
                                <div className="relative group">
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-white/30"
                                    >
                                        <option value="General Inquiry" className="bg-gray-900 text-white">General Inquiry</option>
                                        <option value="Support" className="bg-gray-900 text-white">Support</option>
                                        <option value="Feedback" className="bg-gray-900 text-white">Feedback</option>
                                        <option value="Partnership" className="bg-gray-900 text-white">Partnership</option>
                                        <option value="Other" className="bg-gray-900 text-white">Other</option>
                                    </select>
                                    <label className="absolute left-5 -top-2.5 px-2 text-xs font-semibold text-gray-300">
                                        Subject
                                    </label>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Message Textarea */}
                                <div className="relative group">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder=" "
                                        className="peer w-full bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-transparent focus:outline-none focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 resize-none hover:border-white/30"
                                    ></textarea>
                                    <label className="absolute left-5 -top-2.5 px-2 text-xs font-semibold text-gray-300 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-400">
                                        Your Message
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02, boxShadow: "0 25px 60px -10px rgba(168, 85, 247, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-purple-500/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-lg tracking-wide overflow-hidden group"
                                >
                                    {/* Animated shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                    {loading ? (
                                        <Loader2 size={22} className="animate-spin relative" />
                                    ) : (
                                        <>
                                            <span className="relative">Send Message</span>
                                            <Send size={20} className="relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/*         SECTION 2 — FOUR-COLUMN INFO FOOTER                */}
            {/* ═══════════════════════════════════════════════════════════ */}

            <div className="relative z-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Column 1: BRAND */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-purple-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                    <img src="/Logo.svg" alt="EventFinder" className="h-10 w-auto relative z-10" />
                                </div>
                                <span className="text-xl font-bold text-white">EventFinder</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Discover events that inspire you. Connect with amazing experiences worldwide.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-3">
                                {[
                                    { icon: Github, href: "https://github.com/satyajitmishra-dev/Event-Finder", label: "GitHub" },
                                    { icon: Facebook, href: "https://facebook.com/satyajitmishra.dev", label: "Facebook" },
                                    { icon: Linkedin, href: "https://linkedin.com/in/satyajitmishra1", label: "LinkedIn" },
                                    { icon: Instagram, href: "https://instagram.com", label: "Instagram" }
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target='_blank'
                                        rel="noreferrer"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Column 2: EXPLORE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Explore</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <Calendar size={16} className="text-purple-400 group-hover:text-purple-300" />
                                        Browse Events
                                    </a>
                                </li>
                                <li>
                                    <a href="/create-event" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <Plus size={16} className="text-purple-400 group-hover:text-purple-300" />
                                        Create Event
                                    </a>
                                </li>
                                <li>
                                    <a href="/error" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <DollarSign size={16} className="text-purple-400 group-hover:text-purple-300" />
                                        Pricing
                                    </a>
                                </li>

                            </ul>
                        </motion.div>

                        {/* Column 3: SUPPORT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Support</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <HelpCircle size={16} className="text-pink-400 group-hover:text-pink-300" />
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="/error" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <FileText size={16} className="text-pink-400 group-hover:text-pink-300" />
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <MessageCircle size={16} className="text-pink-400 group-hover:text-pink-300" />
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Column 4: COMMUNITY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Community</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="https://github.com/satyajitmishra-dev" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <Bell size={16} className="text-cyan-400 group-hover:text-cyan-300" />
                                        Newsletter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <MessageCircle size={16} className="text-cyan-400 group-hover:text-cyan-300" />
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                                        <Instagram size={16} className="text-cyan-400 group-hover:text-cyan-300" />
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/*            SECTION 3 — MICRO BOTTOM BAR                    */}
            {/* ═══════════════════════════════════════════════════════════ */}

            <div className="relative z-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
                    >
                        {/* Copyright */}
                        <div className="text-gray-500 opacity-70">
                            © {new Date().getFullYear()} EventFinder. All rights reserved.
                        </div>

                        {/* System Status */}
                        <div className="opacity-70">
                            <SystemStatus />
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6 text-gray-500 opacity-70">
                            <a href="/error" className="hover:text-white hover:opacity-100 transition-all">Privacy</a>
                            <a href="/error" className="hover:text-white hover:opacity-100 transition-all">Terms</a>
                            <a href="/error" className="hover:text-white hover:opacity-100 transition-all">Cookies</a>
                        </div>
                    </motion.div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
