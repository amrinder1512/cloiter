import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white border-2 border-transparent">
            <div className="relative flex items-center justify-center">
                {/* SVG Circular Animation - Made smaller */}
                <svg width="100" height="100" viewBox="0 0 100 100" className="w-20 h-20 md:w-24 md:h-24">
                    {/* Background Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#f3f4f6"
                        strokeWidth="4"
                        fill="transparent"
                    />

                    {/* Animated Progress Circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#E20613" // Brand Red
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="transparent"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{
                            pathLength: [0, 0.75, 1, 0],
                            rotate: [0, 360],
                            strokeDashoffset: [0, -25]
                        }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.5, 0.8, 1]
                        }}
                        style={{ originX: "50%", originY: "50%" }} // Rotate around center
                    />
                </svg>

                {/* Central Text - Made smaller */}
                <motion.div
                    className="absolute text-[#434242] font-bold text-[10px] md:text-xs tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Cloiter
                </motion.div>
            </div>
        </div>
    );
};

export default Loader;
