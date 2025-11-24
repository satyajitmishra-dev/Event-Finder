import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ label, icon: Icon, error, className = '', ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors pointer-events-none">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    className={`w-full bg-gray-900/50 border ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-purple-500'} rounded-lg py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all`}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
