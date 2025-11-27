import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useEventStore from '../store/eventStore';
import useAuthStore from '../store/authStore';
import { Calendar, MapPin, Clock, Trash2, ExternalLink, ArrowLeft, Users, Building, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentEvent, fetchEventById, deleteEvent, joinEvent, leaveEvent, isLoading } = useEventStore();
    const { user } = useAuthStore();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        fetchEventById(id);
    }, [id]);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            navigate('/dashboard');
        }
    };

    if (isLoading || !currentEvent) return <LoadingSpinner fullScreen />;

    const isCreator = user?._id === currentEvent.createdBy?._id;
    const isAttending = currentEvent.attendees.includes(user?._id);

    return (
        <div
            className="min-h-screen bg-gray-950 text-white relative overflow-hidden"
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
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Back Button */}
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-xl overflow-hidden relative"
                        >
                            {/* Image or Fallback */}
                            <div className="h-64 w-full rounded-2xl overflow-hidden mb-8 relative">
                                {currentEvent.imageUrl ? (
                                    <img
                                        src={currentEvent.imageUrl}
                                        alt={currentEvent.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                        <Calendar size={64} className="text-gray-700" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-purple-500/20 backdrop-blur-md text-purple-200 px-3 py-1 rounded-full text-sm font-semibold border border-purple-500/30">
                                        {currentEvent.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-md ${currentEvent.mode === 'online'
                                            ? 'bg-green-500/20 text-green-200 border-green-500/30'
                                            : 'bg-blue-500/20 text-blue-200 border-blue-500/30'
                                        }`}>
                                        {currentEvent.mode}
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
                                {currentEvent.title}
                            </h1>

                            <div className="flex items-center gap-6 text-gray-400 mb-6">
                                <div className="flex items-center gap-2">
                                    <Building size={18} className="text-purple-400" />
                                    <span>Hosted by <span className="text-white font-medium">{currentEvent.createdBy?.name}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={18} className="text-blue-400" />
                                    <span>{currentEvent.attendees.length} Attendees</span>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {currentEvent.description}
                            </div>

                            {currentEvent.tags && currentEvent.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <div className="flex flex-wrap gap-2">
                                        {currentEvent.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-800/50 text-gray-400 px-3 py-1 rounded-full text-sm border border-white/5 flex items-center gap-1">
                                                <Tag size={12} /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Event Info Card */}
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl space-y-6 sticky top-8">
                            <h3 className="text-xl font-bold mb-4">Event Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date</p>
                                        <p className="text-white font-medium">
                                            {new Date(currentEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Time</p>
                                        <p className="text-white font-medium">{currentEvent.time || 'TBA'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-pink-500/30 transition-colors group">
                                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400 group-hover:text-pink-300 transition-colors">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-white font-medium">{currentEvent.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                {currentEvent.registrationLink ? (
                                    <a
                                        href={currentEvent.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1"
                                    >
                                        Register Now <ExternalLink size={20} />
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => isAttending ? leaveEvent(currentEvent._id) : joinEvent(currentEvent._id)}
                                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${isAttending
                                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                                                : 'bg-white text-black hover:bg-gray-200'
                                            }`}
                                    >
                                        {isAttending ? 'Leave Event' : 'Join Event'}
                                    </button>
                                )}
                            </div>

                            {/* Admin Actions */}
                            {isCreator && (
                                <div className="pt-4 border-t border-white/5">
                                    <button
                                        onClick={handleDelete}
                                        className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                    >
                                        <Trash2 size={16} /> Delete Event
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
