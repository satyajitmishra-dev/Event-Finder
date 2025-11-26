import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const TypewriterEffect = ({ words, className }) => {
    const [index, setIndex] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) =>
        words[index].slice(0, latest)
    );

    useEffect(() => {
        const controls = animate(count, words[index].length, {
            type: "tween",
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.5,
            onComplete: () => {
                setTimeout(() => {
                    const deleteControls = animate(count, 0, {
                        type: "tween",
                        duration: 1,
                        ease: "easeInOut",
                        onComplete: () => {
                            setIndex((prev) => (prev + 1) % words.length);
                        },
                    });
                    return () => deleteControls.stop();
                }, 1500); // Wait before deleting
            },
        });
        return () => controls.stop();
    }, [index, words, count]);

    return (
        <span className={className}>
            <motion.span>{displayText}</motion.span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="inline-block w-[2px] h-[1em] bg-purple-500 ml-1 align-middle"
            />
        </span>
    );
};

export default TypewriterEffect;
