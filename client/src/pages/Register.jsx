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
        name: '',
        email: '',
        password: '',
        college: '',
        stream: '',
        yearOfStudying: '',
        location: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Clear that field error while typing
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    // Validation function
    const validate = () => {
        const newErrors = {};

        // Required field validation
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
            }
        });

        // Password validation
        const password = formData.password;

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must include at least one uppercase letter";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Password must include at least one lowercase letter";
        } else if (!/\d/.test(password)) {
            newErrors.password = "Password must include at least one number";
        } else if (!/[@$!%*?&]/.test(password)) {
            newErrors.password = "Password must include at least one special character (@$!%*?&)";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the highlighted errors");
            setIsLoading(false);
            return;
        }

        try {
            const res = await register(formData);
            toast.success("Registration successful! 🚀 We've sent an OTP to your email. Please check your inbox (and spam folder just in case!).", {
                autoClose: 8000, // Give them enough time to read it
            });

            navigate('/verify-otp', {
                state: {
                    userId: res.userId,
                    email: formData.email,
                    type: 'register'
                }
            });

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

            {/* Background Blobs */}
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

                    {/* Name */}
                    <div className="md:col-span-2">
                        <Input
                            icon={User}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <Input
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <Input
                            icon={Lock}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* College */}
                    <div className="md:col-span-2">
                        <Input
                            icon={School}
                            type="text"
                            name="college"
                            placeholder="College / University"
                            value={formData.college}
                            onChange={handleChange}
                        />
                        {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
                    </div>

                    {/* Stream */}
                    {/* Stream */}
                    <div className="relative group">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none z-10" size={20} />

                        <select
                            name="stream"
                            value={formData.stream}
                            onChange={handleChange}
                            className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 rounded-lg py-3 pl-10 pr-10 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select Stream</option>
                            <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                            <option value="Information Technology (IT)">Information Technology (IT)</option>
                            <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                            <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                            <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                            <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
                            <option value="Artificial Intelligence & DS (AI & DS)">Artificial Intelligence & DS (AI & DS)</option>
                            <option value="Biotechnology (BT)">Biotechnology (BT)</option>
                            <option value="Chemical Engineering (ChE)">Chemical Engineering (ChE)</option>
                            <option value="Aerospace Engineering (AE)">Aerospace Engineering (AE)</option>
                            <option value="Agricultural Engineering">Agricultural Engineering</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Biomedical Engineering">Biomedical Engineering</option>
                            <option value="Ceramic Engineering">Ceramic Engineering</option>
                            <option value="Environmental Engineering">Environmental Engineering</option>
                            <option value="Industrial Engineering">Industrial Engineering</option>
                            <option value="Instrumentation Engineering">Instrumentation Engineering</option>
                            <option value="Marine Engineering">Marine Engineering</option>
                            <option value="Metallurgical Engineering">Metallurgical Engineering</option>
                            <option value="Mining Engineering">Mining Engineering</option>
                            <option value="Petroleum Engineering">Petroleum Engineering</option>
                            <option value="Production Engineering">Production Engineering</option>
                            <option value="Textile Engineering">Textile Engineering</option>
                            <option value="Other">Other</option>
                        </select>

                        {errors.stream && <p className="text-red-500 text-sm mt-1">{errors.stream}</p>}

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Year of Studying */}
                    <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none z-10" size={20} />

                        <select
                            name="yearOfStudying"
                            value={formData.yearOfStudying}
                            onChange={handleChange}
                            className="w-full bg-gray-900/50 border border-gray-700 focus:border-purple-500 rounded-lg py-3 pl-10 pr-10 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>

                        {errors.yearOfStudying && (
                            <p className="text-red-500 text-sm mt-1">{errors.yearOfStudying}</p>
                        )}

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="md:col-span-2">
                        <Input
                            icon={MapPin}
                            type="text"
                            name="location"
                            placeholder="City / Location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>

                    {/* Button */}
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
