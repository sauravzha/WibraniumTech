import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time - adjust duration as needed
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds loading screen

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-wibranium-slate via-wibranium-slate/95 to-primary/20"
                >
                    <div className="text-center">
                        {/* Logo with Advanced Spinning Rings */}
                        <div className="mb-6 relative inline-block">
                            {/* Outer orbital ring - slow, gradient */}
                            <div className="absolute inset-[-8px] rounded-full border-[6px] border-transparent logo-spin-slow"
                                style={{
                                    borderImage: 'linear-gradient(135deg, hsl(207, 90%, 54%), hsl(207, 70%, 60%), transparent, transparent) 1',
                                    filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
                                }}></div>

                            {/* Middle ring - medium speed, solid */}
                            <div className="absolute inset-[-2px] rounded-full border-[5px] border-transparent border-t-primary border-r-primary/70 logo-spin-continuous"
                                style={{ filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.7))' }}></div>

                            {/* Inner ring - fast, bright accent */}
                            <div className="absolute inset-[2px] rounded-full border-[3px] border-transparent border-t-primary/90 border-b-primary/40 logo-spin-fast"
                                style={{ filter: 'blur(1px)' }}></div>

                            {/* Rotating glow orbs */}
                            <div className="absolute inset-0 logo-spin-continuous">
                                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full blur-sm -translate-x-1/2"></div>
                            </div>
                            <div className="absolute inset-0 logo-spin-reverse">
                                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full blur-sm -translate-x-1/2"></div>
                            </div>

                            {/* Pulsing outer glow */}
                            <div className="absolute inset-[-12px] rounded-full opacity-40 blur-xl bg-gradient-to-r from-primary/40 via-blue-400/30 to-transparent animate-pulse"></div>

                            {/* Static logo in center */}
                            <div className="relative w-32 h-32 z-10">
                                <img
                                    src={logo}
                                    alt="WibraniumTech Loading"
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* Company Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Wibranium<span className="text-primary">Tech</span>
                        </motion.h1>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-300 text-sm"
                        >
                            Loading...
                        </motion.p>

                        {/* Loading Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="h-1 bg-primary rounded-full mt-6 max-w-xs mx-auto"
                        />
                    </div>

                    {/* Background Animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [360, 180, 0],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
