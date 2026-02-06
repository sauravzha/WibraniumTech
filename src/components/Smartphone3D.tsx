import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export function Smartphone3D() {
    // Default position - tilted towards left to face text
    const defaultRotation = { x: -5, y: -25 };
    const [rotation, setRotation] = useState(defaultRotation);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = defaultRotation.y + ((x - centerX) / centerX) * 12;
        const rotateX = defaultRotation.x + ((centerY - y) / centerY) * 6;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation(defaultRotation);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="smartphone-container"
        >
            <motion.div
                className="smartphone-body"
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Phone Frame */}
                <div className="smartphone-frame">
                    {/* Top Notch / Camera */}
                    <div className="smartphone-notch">
                        {/* Camera */}
                        <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-700" />
                        {/* Speaker */}
                        <div className="w-12 h-1 rounded-sm bg-slate-800" />
                    </div>

                    {/* Screen */}
                    <div className="smartphone-screen">
                        {/* Status Bar */}
                        <div className="pt-12 px-4 pb-2 flex justify-between items-center">
                            <span className="text-xs text-slate-400">9:41</span>
                            <div className="flex gap-1">
                                <div className="w-4 h-2.5 border border-slate-400 rounded-sm relative">
                                    <div className="absolute inset-0.5 bg-green-500 rounded-[1px]" />
                                </div>
                            </div>
                        </div>

                        {/* Website Content Preview */}
                        <div className="p-4 pt-5">
                            {/* Logo Area */}
                            <div className="mb-5 flex items-center gap-2">
                                <div className="smartphone-app-icon" />
                                <span className="text-sm font-bold text-white">WibraniumTech</span>
                            </div>

                            {/* Hero Text */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                    Transform Your <span className="text-cyan-400">Business</span>
                                </h3>
                                <p className="text-[11px] text-slate-400 leading-relaxed">
                                    Custom software solutions for growing businesses
                                </p>
                            </div>

                            {/* Service Cards */}
                            <div className="flex flex-col gap-2.5">
                                {["Web Development", "Mobile Apps", "CRM Solutions"].map((service, i) => (
                                    <div key={i} className="smartphone-service-card">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                        <span className="text-xs text-slate-200">{service}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="smartphone-cta">
                                <span className="text-xs font-semibold text-slate-900">Get Started</span>
                            </div>
                        </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
                </div>

                {/* Phone Side (3D depth) */}
                <div className="smartphone-side">
                    {/* Volume buttons */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-10 bg-[#2d2d44] rounded-sm" />
                    <div className="absolute top-36 left-1/2 -translate-x-1/2 w-1 h-10 bg-[#2d2d44] rounded-sm" />
                </div>

                {/* Glow Effect */}
                <div className="smartphone-glow" />
            </motion.div>
        </div>
    );
}
