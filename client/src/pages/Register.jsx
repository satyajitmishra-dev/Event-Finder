import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { User, Mail, Lock, MapPin, BookOpen, School, Calendar, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', college: '', stream: '', yearOfStudying: '', location: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.college ||
            !formData.stream || !formData.yearOfStudying || !formData.location) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const res = await register(formData);
            toast.success('Registration successful! Check your email for OTP');
            navigate('/verify-otp', { state: { userId: res.userId, email: formData.email, type: 'register' } });
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden my-8">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 rounded-2xl w-full max-w-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2 text-gradient">Join EventFinder</h2>
                    <p className="text-gray-400">Create your account to discover amazing events</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <Input
                            icon={User}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        icon={Mail}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        name="password"
                        placeholder="Password (min 6 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="md:col-span-2">
                        <Input
                            icon={School}
                            type="text"
                            name="college"
                            placeholder="College / University"
                            value={formData.college}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        icon={BookOpen}
                        type="text"
                        name="stream"
                        placeholder="Stream (e.g. CS)"
                        value={formData.stream}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        icon={Calendar}
                        type="number"
                        name="yearOfStudying"
                        placeholder="Year (e.g. 2025)"
                        value={formData.yearOfStudying}
                        onChange={handleChange}
                        required
                    />

                    <div className="md:col-span-2">
                        <Input
                            icon={MapPin}
                            type="text"
                            name="location"
                            placeholder="City / Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="md:col-span-2 mt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            {!isLoading && (
                                <>
                                    Register <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
