import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate(`/events/${event._id}`)}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/50 cursor-pointer group"
        >
            {event.imageUrl && (
                <div className="h-48 overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
            )}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded-full uppercase font-bold border border-purple-500/20">{event.category || 'Event'}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold border ${event.mode === 'online' ? 'bg-green-900/50 text-green-200 border-green-500/20' : 'bg-blue-900/50 text-blue-200 border-blue-500/20'}`}>
                        {event.mode}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-purple-400 transition-colors">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple-400" />
                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-purple-400" />
                        <span>{event.time || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-purple-400" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                <div className="flex items-center text-purple-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight size={16} className="ml-1" />
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
