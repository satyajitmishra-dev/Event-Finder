import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = ({ words, className }) => {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000); // 3 seconds duration

        return () => clearInterval(interval);
    }, [words.length, isHovered]);

    return (
        <span
            className="inline-flex relative px-2 cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                    transition={{
                        y: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.5 },
                        filter: { duration: 0.5 }
                    }}
                    className={`${className} inline-block`}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
