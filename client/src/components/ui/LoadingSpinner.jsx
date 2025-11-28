import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
    const [text, setText] = useState('');
    const fullText = "INITIALIZING SYSTEM...";

    useEffect(() => {
        if (fullScreen) {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setText(fullText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
            }, 150);
            return () => clearInterval(interval);
        }
    }, [fullScreen]);

    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    const containerSize = sizes[size] || sizes.md;

    const spinner = (
        <div className={`relative ${containerSize} flex items-center justify-center`}>
            {/* Outer Hexagon Ring */}
            <motion.div
                className="absolute inset-0 border-2 border-purple-500/30"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle Rotating Ring */}
            <motion.div
                className="absolute inset-1 border-2 border-cyan-500/50"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Pulsing Core */}
            <motion.div
                className="w-1/2 h-1/2 bg-purple-600/20 backdrop-blur-sm"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Center Dot */}
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50 font-mono">
                <div className="relative">
                    {spinner}
                    {/* Scanning Line Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
                        animate={{ top: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="mt-8 flex flex-col items-center gap-2">
                    <motion.div
                        className="text-cyan-400 text-sm tracking-[0.2em] font-bold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        {text}<span className="animate-pulse">_</span>
                    </motion.div>

                    <div className="flex gap-1 mt-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-purple-500 rounded-full"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
