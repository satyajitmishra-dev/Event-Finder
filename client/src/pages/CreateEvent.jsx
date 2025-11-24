import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEventStore from '../store/eventStore';

const CreateEvent = () => {
    const navigate = useNavigate();
    const createEvent = useEventStore((state) => state.createEvent);
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', time: '', location: '', category: '', mode: 'offline', registrationLink: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(formData);
            navigate('/dashboard');
        } catch (error) {
            alert('Failed to create event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
            <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-purple-400">Host an Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" placeholder="Event Title" onChange={handleChange} className="w-full p-3 rounded bg-gray-700" required />
                    <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3 rounded bg-gray-700 h-32" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" name="date" onChange={handleChange} className="p-3 rounded bg-gray-700" required />
                        <input type="time" name="time" onChange={handleChange} className="p-3 rounded bg-gray-700" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <select name="mode" onChange={handleChange} className="p-3 rounded bg-gray-700">
                            <option value="offline">Offline</option>
                            <option value="online">Online</option>
                        </select>
                        <input name="category" placeholder="Category (Tech, Music...)" onChange={handleChange} className="p-3 rounded bg-gray-700" />
                    </div>
                    <input name="location" placeholder="Location / Link" onChange={handleChange} className="w-full p-3 rounded bg-gray-700" required />
                    <input name="registrationLink" placeholder="Registration Link (Optional)" onChange={handleChange} className="w-full p-3 rounded bg-gray-700" />

                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-bold mt-4">Publish Event</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
