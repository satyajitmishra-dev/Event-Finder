import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightCard = ({ feature, index }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 px-6 py-8 shadow-2xl group focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
            <div
                className={`pointer-events-none absolute -inset-px transition duration-300 group-hover:opacity-100 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.4), transparent 40%)`,
                }}
            />
            <div className="relative z-10">
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
        </motion.div>
    );
};

export default SpotlightCard;
