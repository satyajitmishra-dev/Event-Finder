import React, { useEffect, useState } from 'react';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';
import EventSkeleton from '../components/ui/EventSkeleton';
import { Search, Plus, Globe, MapPin, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { events, globalEvents, fetchEvents, fetchGlobalEvents, isLoading } = useEventStore();
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('local'); // 'local' or 'global'

    useEffect(() => {
        if (activeTab === 'local') {
            fetchEvents();
        } else {
            fetchGlobalEvents();
        }
    }, [activeTab]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (activeTab === 'local') {
            fetchEvents({ search });
        } else {
            fetchGlobalEvents({ keyword: search });
        }
    };

    const displayedEvents = activeTab === 'local' ? events : globalEvents;

    return (
        <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                        >
                            Discover <span className="text-purple-400">Extraordinary</span> Events
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-lg max-w-2xl"
                        >
                            Explore the best local and global events happening around you. Join the community and create memories.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/create-event" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            Create Event
                        </Link>
                    </motion.div>
                </div>

                {/* Controls Section */}
                <div className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 mb-12 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Tabs */}
                        <div className="flex bg-gray-800/50 p-1 rounded-xl w-full md:w-auto">
                            <button
                                onClick={() => setActiveTab('local')}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'local'
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <MapPin size={18} /> Local
                            </button>
                            <button
                                onClick={() => setActiveTab('global')}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'global'
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Globe size={18} /> Global
                            </button>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder={activeTab === 'local' ? "Search local events..." : "Search global events..."}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-gray-800/50 border border-white/5 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-gray-500"
                            />
                        </form>
                    </div>
                </div>

                {/* Events Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <EventSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {displayedEvents.map((event, index) => (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {displayedEvents.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                                    <Sparkles size={40} className="text-gray-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">No events found</h3>
                                <p className="text-gray-500 max-w-md">
                                    We couldn't find any events matching your criteria. Try adjusting your search or check back later.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
