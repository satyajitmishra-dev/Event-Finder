import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { User, Mail, MapPin, BookOpen, Briefcase, Calendar, Edit2, Save, X, Github, Linkedin, Twitter, Instagram, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateProfile, checkAuth } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: '',
        interests: '',
        avatar: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        github: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                bio: user.bio || '',
                interests: user.interests ? user.interests.join(', ') : '',
                avatar: user.avatar || '',
                instagram: user.socialLinks?.instagram || '',
                linkedin: user.socialLinks?.linkedin || '',
                twitter: user.socialLinks?.twitter || '',
                github: user.socialLinks?.github || ''
            });
            setPreviewUrl(user.avatar || '');
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('bio', formData.bio);
            data.append('interests', JSON.stringify(formData.interests.split(',').map(i => i.trim()).filter(i => i)));
            data.append('socialLinks', JSON.stringify({
                instagram: formData.instagram,
                linkedin: formData.linkedin,
                twitter: formData.twitter,
                github: formData.github
            }));

            if (selectedFile) {
                data.append('avatar', selectedFile);
            } else {
                data.append('avatar', formData.avatar); // Keep existing URL if no new file
            }

            await updateProfile(data);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (!user) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute -bottom-16 left-8">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-700 overflow-hidden flex items-center justify-center relative group shadow-2xl"
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-gray-400" />
                            )}
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                    <label className="cursor-pointer flex flex-col items-center text-xs text-white hover:text-purple-300">
                                        <Edit2 size={20} className="mb-1" />
                                        Upload
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                    <button
                                        onClick={() => {
                                            const randomSeed = Math.random().toString(36).substring(7);
                                            const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
                                            setPreviewUrl(randomAvatar);
                                            setFormData({ ...formData, avatar: randomAvatar });
                                            setSelectedFile(null); // Clear file if generating random
                                        }}
                                        className="flex flex-col items-center text-xs text-white hover:text-purple-300"
                                    >
                                        <Sparkles size={20} className="mb-1" />
                                        Generate
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg transition"
                            >
                                <Edit2 size={18} /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                                >
                                    <Save size={18} /> Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                                >
                                    <X size={18} /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-gray-400 flex items-center gap-2 mt-1">
                            <Mail size={16} /> {user.email}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2 mt-1">
                            <MapPin size={16} /> {user.location}
                        </p>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none h-32"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Interests (comma separated)</label>
                                <input
                                    type="text"
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Coding, Music, Travel..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Avatar URL</label>
                                <input
                                    type="text"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                                    <input
                                        type="text"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Twitter URL</label>
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
                                    <input
                                        type="text"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-8">
                            {user.bio && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                        <BookOpen size={20} className="text-purple-400" /> About
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                        <Briefcase size={20} className="text-purple-400" /> Academic Info
                                    </h3>
                                    <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                                        <p><span className="text-gray-400">College:</span> {user.college}</p>
                                        <p><span className="text-gray-400">Stream:</span> {user.stream}</p>
                                        <p><span className="text-gray-400">Year:</span> {user.yearOfStudying}</p>
                                    </div>
                                </div>

                                {user.interests && user.interests.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                            <Calendar size={20} className="text-purple-400" /> Interests
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {user.interests.map((interest, index) => (
                                                <span key={index} className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Connect</h3>
                                    <div className="flex gap-4">
                                        {user.socialLinks.instagram && (
                                            <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition">
                                                <Instagram size={24} />
                                            </a>
                                        )}
                                        {user.socialLinks.linkedin && (
                                            <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition">
                                                <Linkedin size={24} />
                                            </a>
                                        )}
                                        {user.socialLinks.twitter && (
                                            <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                                                <Twitter size={24} />
                                            </a>
                                        )}
                                        {user.socialLinks.github && (
                                            <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                                <Github size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
