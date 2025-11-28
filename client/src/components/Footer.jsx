import React, { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Facebook, Send, Loader2, ChevronDown, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, useReducedMotion } from 'framer-motion';
import api from '../api/axios';
import SystemStatus from './ui/SystemStatus';

const Footer = () => {
    const prefersReducedMotion = useReducedMotion();
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
        <footer className="relative bg-black pt-0 pb-10 overflow-hidden">

            {/* Smooth Transition From Above Section */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-10" />

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            {/* Main Container */}
            <div className="relative z-20 max-w-6xl mx-auto mt-20 p-4 sm:p-6 lg:p-8">
                <div className="bg-gray-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5">

                    {/* === GRID LAYOUT (NEW) === */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* LEFT SIDE – BRAND + SOCIAL + INFO */}
                        <div className="relative p-10 sm:p-14 lg:p-20 flex flex-col justify-between overflow-hidden lg:border-r lg:border-white/5">

                            {/* Decorative Shape */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <div className="absolute -right-24 -top-24 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />

                            <div className="relative z-10 space-y-10">

                                {/* Brand */}
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-purple-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                        <img src="/Logo.svg" alt="EventFinder" className="h-12 w-auto relative z-10 drop-shadow-lg" />
                                    </div>
                                    <span className="text-3xl font-bold text-white tracking-tight">EventFinder</span>
                                </div>

                                {/* Heading + Subtext */}
                                <div className="space-y-6">
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                                        Let's create <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">extraordinary</span> <br />
                                        together.
                                    </h2>
                                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                                        Have a question or want to partner with us? Drop us a message and we'll get back to you shortly.
                                    </p>
                                </div>

                                {/* Email + Support */}
                                <div className="space-y-6 pt-6">
                                    <div className="flex items-center gap-5 group">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-purple-500/30 transition-colors duration-300">
                                            <Mail className="text-purple-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Email us at</p>
                                            <p className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">help.verify.eventfinder@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-pink-500/30 transition-colors duration-300">
                                            <MessageCircle className="text-pink-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Support</p>
                                            <p className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">24/7 - Anytime, Anywhere</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="relative z-10 pt-16 mt-auto">
                                <div className="flex gap-4 mb-8">
                                    {[
                                        { icon: Github, href: "https://github.com/satyajitmishra-dev/Event-Finder", label: "GitHub" },
                                        { icon: Facebook, href: "https://facebook.com/satyajitmishra.dev", label: "Facebook" },
                                        { icon: Linkedin, href: "https://linkedin.com/in/satyajitmishra1", label: "LinkedIn" },
                                        { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target='_blank'
                                            rel="noreferrer"
                                            whileHover={{ y: -4, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-3 bg-white/5 rounded-2xl border border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg shadow-black/20"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} />
                                        </motion.a>
                                    ))}
                                </div>

                                <p className="text-gray-500 text-sm font-medium border-t border-white/5 pt-6">
                                    © {new Date().getFullYear()} EventFinder. All rights reserved.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE – CONTACT FORM */}
                        <div className="bg-white/[0.03] backdrop-blur-xl p-10 sm:p-14 lg:p-20 border-t border-white/10 lg:border-t-0 relative flex flex-col justify-center">

                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-50 pointer-events-none" />

                            <div className="relative z-10 mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                                <p className="text-gray-400 text-sm">We'd love to hear from you. Fill out the form below.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">

                                {/* Name */}
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-gray-400 ml-1 uppercase tracking-wider">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-gray-400 ml-1 uppercase tracking-wider">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="name@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-gray-400 ml-1 uppercase tracking-wider">
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 appearance-none cursor-pointer hover:border-white/20"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Support">Support</option>
                                            <option value="Feedback">Feedback</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-3 group">
                                    <label className="text-sm font-semibold text-gray-400 ml-1 uppercase tracking-wider">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Tell us how we can help..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none hover:border-white/20"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-lg tracking-wide group"
                                >
                                    {loading ? (
                                        <Loader2 size={22} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                            <div className="relative z-10 mt-8">
                                <SystemStatus />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
