import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin, AlertCircle, Facebook } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';


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
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative bg-gray-900 border-t border-gray-800 pt-16 pb-8 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Contact Info & Socials */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <img src="/Logo.svg" alt="EventFinder" className="h-10 w-auto" />
                            <span className="text-2xl font-bold text-gradient">EventFinder</span>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Connect with us to share your thoughts, report issues, or just say hello. We're always listening and eager to improve your experience.
                        </p>

                        <div className="flex gap-4 mb-8">
                            <a href="https://github.com/satyajitmishra-dev/Event-Finder" target='_blank' className="p-3 bg-gray-800/50 rounded-lg hover:bg-purple-500/20 hover:text-purple-400 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://facebook.com/satyajitmishra.dev" target='_blank' className="p-3 bg-gray-800/50 rounded-lg hover:bg-blue-400/20 hover:text-blue-400 transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="https://linkedin.com/in/satyajitmishra1" target='_blank' className="p-3 bg-gray-800/50 rounded-lg hover:bg-blue-600/20 hover:text-blue-600 transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} className="text-purple-400" />
                                <span><a href="mailto:help.verify.eventfinder@gmail.com">
                                    help.verify.eventfinder@gmail.com
                                </a>
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <MessageSquare size={18} className="text-pink-400" />
                                <span>Live Chat Available 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Send size={20} className="text-purple-400" />
                            Send message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Report Issue">Report an Issue</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Partnership">Partnership</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} EventFinder. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="https://github.com/satyajitmishra-dev/Event-Finder/blob/main/Readme.md" target="_blank" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="https://github.com/satyajitmishra-dev/Event-Finder/blob/main/Readme.md" target='_blank' className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="https://github.com/satyajitmishra-dev/Event-Finder/blob/main/Readme.md" target='_blank' className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
