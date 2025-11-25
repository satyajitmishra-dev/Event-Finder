import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEventStore from '../store/eventStore';
import useAuthStore from '../store/authStore';
import { Calendar, MapPin, Clock, Trash2, ExternalLink } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentEvent, fetchEventById, deleteEvent, joinEvent, leaveEvent, isLoading } = useEventStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchEventById(id);
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            navigate('/dashboard');
        }
    };

    if (isLoading || !currentEvent) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="bg-purple-600 text-xs px-2 py-1 rounded uppercase font-bold mb-2 inline-block">{currentEvent.category}</span>
                            <h1 className="text-4xl font-bold">{currentEvent.title}</h1>
                            <p className="text-gray-400 mt-2">Hosted by {currentEvent.createdBy?.name} ({currentEvent.createdBy?.college})</p>
                        </div>
                        {user?._id === currentEvent.createdBy?._id && (
                            <button onClick={handleDelete} className="text-red-400 hover:text-red-300 p-2 bg-red-900/30 rounded">
                                <Trash2 size={24} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="text-purple-400" />
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-semibold">{new Date(currentEvent.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Clock className="text-purple-400" />
                            <div>
                                <p className="text-sm text-gray-500">Time</p>
                                <p className="font-semibold">{currentEvent.time || 'TBA'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <MapPin className="text-purple-400" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-semibold">{currentEvent.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-8">
                        <h3 className="text-xl font-bold mb-2">About Event</h3>
                        <p className="text-gray-300 whitespace-pre-wrap">{currentEvent.description}</p>
                    </div>

                    {currentEvent.registrationLink ? (
                        <a
                            href={currentEvent.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-bold transition"
                        >
                            Register Now <ExternalLink size={20} />
                        </a>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => {
                                    if (currentEvent.attendees.includes(user?._id)) {
                                        leaveEvent(currentEvent._id);
                                    } else {
                                        joinEvent(currentEvent._id);
                                    }
                                }}
                                className={`px-6 py-3 rounded font-bold transition ${currentEvent.attendees.includes(user?._id)
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {currentEvent.attendees.includes(user?._id) ? 'Leave Event' : 'Join Event'}
                            </button>
                            <span className="text-gray-400">
                                {currentEvent.attendees.length} {currentEvent.attendees.length === 1 ? 'Attendee' : 'Attendees'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
