import { motion } from "framer-motion";
import { useState } from "react";

export function GrowthGraph3D() {
    const [rotateX, setRotateX] = useState(45); // Initial isometric angle
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle tilt calculation
        const rotateXValue = 45 + ((y - centerY) / centerY) * -5; // Base 45deg +/- 5deg
        const rotateYValue = ((x - centerX) / centerX) * 5; // +/- 5deg

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(45);
        setRotateY(0);
    };

    // Mock data for the graph bars
    const bars = [
        { id: 1, height: 120, color: "from-cyan-500 to-blue-600", delay: 0 },
        { id: 2, height: 160, color: "from-blue-500 to-indigo-600", delay: 0.2 },
        { id: 3, height: 140, color: "from-indigo-500 to-violet-600", delay: 0.4 },
        { id: 4, height: 200, color: "from-violet-500 to-purple-600", delay: 0.6 },
        { id: 5, height: 180, color: "from-purple-500 to-fuchsia-600", delay: 0.8 },
        { id: 6, height: 240, color: "from-fuchsia-500 to-pink-600", delay: 1.0 },
        { id: 7, height: 280, color: "from-pink-500 to-rose-600", delay: 1.2 },
    ];

    return (
        <div
            className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Container for Isometric Transform */}
            <motion.div
                className="relative transform-style-3d will-change-transform"
                animate={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    rotateZ: -45, // Isometric rotation
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Graph Base Grid */}
                <div className="absolute -inset-10 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transform -translate-z-10 shadow-2xl"
                    style={{ transform: "translateZ(-20px)" }} />

                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-7 gap-4 p-8 opacity-30 pointer-events-none">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="border-r border-white/20 h-full" />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="border-b border-white/20 w-full absolute left-0" style={{ bottom: `${i * 25}%` }} />
                    ))}
                </div>

                {/* Bars Container */}
                <div className="flex items-end gap-6 relative z-10 px-8 pb-8 h-80">
                    {bars.map((bar) => (
                        <div key={bar.id} className="relative group w-8 sm:w-10">
                            {/* The 3D Bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: bar.height }}
                                transition={{
                                    duration: 1.5,
                                    delay: bar.delay,
                                    ease: "easeOut"
                                }}
                                className={`relative w-full bg-gradient-to-t ${bar.color} opacity-90 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Top Face */}
                                <div className={`absolute -top-4 left-0 w-full h-4 bg-white/30 origin-bottom transform rotate-x-90 transition-opacity duration-300 group-hover:brightness-150`} />

                                {/* Right Face */}
                                <div className={`absolute top-0 -right-4 w-4 h-full bg-black/30 origin-left transform rotate-y-90`} />

                                {/* Front Face Highlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Floating Reflection/Glow below */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: 1.5 + bar.delay }}
                                className={`absolute -bottom-8 left-0 right-0 h-4 bg-gradient-to-t ${bar.color} blur-lg transform scale-x-150`}
                            />

                            {/* Number Tick */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: -40 }}
                                transition={{ delay: 1.2 + bar.delay, duration: 0.5 }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/10"
                                style={{ transform: "translateZ(40px) rotateZ(45deg) rotateX(-45deg)" }} // Counter-rotate to face camera roughly
                            >
                                {bar.height * 10}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Floating Particles moving upward */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            bottom: "0%",
                        }}
                        animate={{
                            y: [0, -400],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
