import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    // Generate a consistent gradient based on the event ID or category
    const getGradient = (category) => {
        const gradients = {
            'Technology': 'from-blue-600 to-purple-600',
            'Workshop': 'from-orange-500 to-red-500',
            'Cultural': 'from-pink-500 to-rose-500',
            'Business': 'from-emerald-500 to-teal-500',
            'Education': 'from-indigo-500 to-cyan-500',
            'default': 'from-gray-700 to-gray-900'
        };
        return gradients[category] || gradients['default'];
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => navigate(`/events/${event._id}`)}
            className="group relative bg-gray-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/20 cursor-pointer transition-all duration-300"
        >
            {/* Image or Gradient Fallback */}
            <div className="h-48 overflow-hidden relative">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getGradient(event.category)} flex items-center justify-center`}>
                        <Calendar size={48} className="text-white/20" />
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium border border-white/10 flex items-center gap-1">
                        {event.category || 'Event'}
                    </span>
                </div>
                <div className="absolute top-4 right-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border backdrop-blur-md ${event.mode === 'online'
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                        {event.mode}
                    </span>
                </div>
            </div>

            <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                    {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {event.description}
                </p>

                <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Calendar size={16} />
                        </div>
                        <span className="font-medium">
                            {new Date(event.date).toLocaleDateString(undefined, {
                                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                            })}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Clock size={16} />
                        </div>
                        <span className="font-medium">{event.time || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                            <MapPin size={16} />
                        </div>
                        <span className="font-medium truncate">{event.location}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between group/btn">
                    <span className="text-sm text-gray-500 font-medium">View Details</span>
                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-purple-500 group-hover/btn:text-white transition-all duration-300">
                        <ArrowRight size={16} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
