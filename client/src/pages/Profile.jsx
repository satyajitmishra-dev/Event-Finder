import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { User, Mail, MapPin, BookOpen, Briefcase, Calendar, Edit2, Save, X, Github, Linkedin, Twitter, Instagram, Sparkles, Camera, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';

const Profile = () => {
    const { user, updateProfile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

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
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        const { instagram, linkedin, twitter, github } = formData;

        if (instagram && !instagram.includes('instagram.com')) newErrors.instagram = 'Invalid Instagram URL';
        if (linkedin && !linkedin.includes('linkedin.com')) newErrors.linkedin = 'Invalid LinkedIn URL';
        if (twitter && !twitter.includes('twitter.com') && !twitter.includes('x.com')) newErrors.twitter = 'Invalid Twitter/X URL';
        if (github && !github.includes('github.com')) newErrors.github = 'Invalid GitHub URL';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

        if (!validate()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);

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
            data.append('avatar', formData.avatar);
        }

        try {
            await toast.promise(
                updateProfile(data),
                {
                    pending: 'Updating your profile...',
                    success: {
                        render({ data }) {
                            return data.message || 'Profile updated successfully ✨';
                        }
                    },
                    error: 'Failed to update profile 😔'
                }
            );
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <Loader2 className="animate-spin text-purple-500" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl"
                >
                    {/* Cover Image Area */}
                    <div className="h-60 bg-gradient-to-r from-purple-900/50 via-gray-900 to-blue-900/50 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        {/* Edit Toggle Button */}
                        <div className="absolute top-6 right-6 z-20">
                            {!isEditing ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full transition-all border border-white/10 text-sm font-medium"
                                >
                                    <Edit2 size={16} /> Edit Profile
                                </motion.button>
                            ) : (
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-5 py-2.5 rounded-full transition-all shadow-lg shadow-purple-500/25 text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                        Save Changes
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsEditing(false)}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-full transition-all border border-gray-700 text-sm font-medium"
                                    >
                                        <X size={16} /> Cancel
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-8 pb-10">
                        <div className="flex flex-col md:flex-row gap-8 -mt-20 relative">
                            {/* Avatar Section */}
                            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                                <motion.div
                                    className="relative group"
                                    whileHover={isEditing ? { scale: 1.02 } : {}}
                                >
                                    <div className="w-40 h-40 rounded-full border-4 border-gray-900 bg-gray-800 overflow-hidden shadow-2xl relative z-10">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                                                <User size={64} />
                                            </div>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 z-20 rounded-full bg-black/60 flex flex-col items-center justify-center gap-2 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <label className="cursor-pointer flex flex-col items-center text-xs text-white hover:text-purple-300 transition-colors">
                                                <Camera size={24} className="mb-1" />
                                                <span>Upload</span>
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                            </label>

                                            <div className="w-8 h-px bg-white/20 my-1"></div>

                                            <button
                                                onClick={() => {
                                                    const randomSeed = Math.random().toString(36).substring(7);
                                                    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
                                                    setPreviewUrl(randomAvatar);
                                                    setFormData({ ...formData, avatar: randomAvatar });
                                                    setSelectedFile(null);
                                                }}
                                                className="flex flex-col items-center text-xs text-white hover:text-purple-300 transition-colors"
                                            >
                                                <Sparkles size={20} className="mb-1" />
                                                <span>Generate</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* User Name & Basic Info (Mobile: Centered, Desktop: Left aligned below avatar if needed, but here we put it next to avatar) */}
                            </div>

                            {/* Header Info */}
                            <div className="flex-1 pt-20 md:pt-24 text-center md:text-left space-y-2">
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{user.name}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Mail size={16} className="text-purple-400" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} className="text-pink-400" />
                                        {user.location || 'Location not set'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column: Bio & Socials */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Bio Section */}
                                <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <BookOpen size={20} className="text-purple-400" /> About Me
                                    </h3>

                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-gray-200 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all h-32 resize-none"
                                            placeholder="Tell the world about yourself..."
                                        />
                                    ) : (
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {user.bio || "No bio added yet. Click edit to tell us about yourself!"}
                                        </p>
                                    )}
                                </section>

                                {/* Academic Info */}
                                <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Briefcase size={20} className="text-pink-400" /> Academic Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">College</p>
                                            <p className="font-medium text-gray-200">{user.college}</p>
                                        </div>
                                        <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stream</p>
                                            <p className="font-medium text-gray-200">{user.stream}</p>
                                        </div>
                                        <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Year</p>
                                            <p className="font-medium text-gray-200">{user.yearOfStudying}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Interests & Socials */}
                            <div className="space-y-8">
                                {/* Interests */}
                                <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Calendar size={20} className="text-blue-400" /> Interests
                                    </h3>

                                    {isEditing ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="interests"
                                                value={formData.interests}
                                                onChange={handleChange}
                                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-3 text-gray-200 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                                placeholder="Coding, Music, Travel..."
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Separate with commas</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {user.interests && user.interests.length > 0 ? (
                                                user.interests.map((interest, index) => (
                                                    <span key={index} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                        {interest}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">No interests added.</p>
                                            )}
                                        </div>
                                    )}
                                </section>

                                {/* Social Links */}
                                <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>

                                    {isEditing ? (
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Instagram size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="instagram"
                                                    value={formData.instagram}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-900/50 border ${errors.instagram ? 'border-red-500' : 'border-gray-700'} rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all`}
                                                    placeholder="Instagram URL"
                                                />
                                                {errors.instagram && <p className="text-red-500 text-xs mt-1 ml-1">{errors.instagram}</p>}
                                            </div>
                                            <div className="relative">
                                                <Linkedin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-900/50 border ${errors.linkedin ? 'border-red-500' : 'border-gray-700'} rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all`}
                                                    placeholder="LinkedIn URL"
                                                />
                                                {errors.linkedin && <p className="text-red-500 text-xs mt-1 ml-1">{errors.linkedin}</p>}
                                            </div>
                                            <div className="relative">
                                                <Twitter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="twitter"
                                                    value={formData.twitter}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-900/50 border ${errors.twitter ? 'border-red-500' : 'border-gray-700'} rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all`}
                                                    placeholder="Twitter URL"
                                                />
                                                {errors.twitter && <p className="text-red-500 text-xs mt-1 ml-1">{errors.twitter}</p>}
                                            </div>
                                            <div className="relative">
                                                <Github size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="github"
                                                    value={formData.github}
                                                    onChange={handleChange}
                                                    className={`w-full bg-gray-900/50 border ${errors.github ? 'border-red-500' : 'border-gray-700'} rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all`}
                                                    placeholder="GitHub URL"
                                                />
                                                {errors.github && <p className="text-red-500 text-xs mt-1 ml-1">{errors.github}</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            {user.socialLinks?.instagram && (
                                                <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900/50 rounded-lg text-pink-500 hover:text-white hover:bg-pink-600 transition-all">
                                                    <Instagram size={20} />
                                                </a>
                                            )}
                                            {user.socialLinks?.linkedin && (
                                                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900/50 rounded-lg text-blue-500 hover:text-white hover:bg-blue-600 transition-all">
                                                    <Linkedin size={20} />
                                                </a>
                                            )}
                                            {user.socialLinks?.twitter && (
                                                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900/50 rounded-lg text-sky-400 hover:text-white hover:bg-sky-500 transition-all">
                                                    <Twitter size={20} />
                                                </a>
                                            )}
                                            {user.socialLinks?.github && (
                                                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {(!user.socialLinks || !Object.values(user.socialLinks).some(Boolean)) && (
                                                <p className="text-gray-500 text-sm italic">No social links added.</p>
                                            )}
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
