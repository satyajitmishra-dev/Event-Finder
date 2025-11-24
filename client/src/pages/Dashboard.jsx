import React, { useEffect, useState } from 'react';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';
import { Search, Plus, Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Discover Events</h1>
                    <Link to="/create-event" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center gap-2 transition">
                        <Plus size={20} /> Create Event
                    </Link>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('local')}
                        className={`flex items-center gap-2 px-6 py-3 rounded font-bold transition ${activeTab === 'local' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                        <MapPin size={20} /> Local Events
                    </button>
                    <button
                        onClick={() => setActiveTab('global')}
                        className={`flex items-center gap-2 px-6 py-3 rounded font-bold transition ${activeTab === 'global' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                        <Globe size={20} /> Global Events
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-8 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={activeTab === 'local' ? "Search local events..." : "Search global events (Ticketmaster)..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button type="submit" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded font-bold">Search</button>
                </form>

                {isLoading ? (
                    <p className="text-center text-gray-400">Loading events...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedEvents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                        {displayedEvents.length === 0 && <p className="text-gray-400 col-span-full text-center">No events found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
