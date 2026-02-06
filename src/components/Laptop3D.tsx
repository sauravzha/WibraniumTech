import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export function Laptop3D() {
    // Default position - screen visible, tilted towards right side
    const defaultRotation = { x: -10, y: 30 };
    const [rotation, setRotation] = useState(defaultRotation);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position (reduced sensitivity)
        const rotateY = defaultRotation.y + ((x - centerX) / centerX) * 15; // Max 15deg from default
        const rotateX = defaultRotation.x + ((centerY - y) / centerY) * 8; // Max 8deg from default

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        // Return to default position (same as initial)
        setRotation(defaultRotation);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="laptop-container"
        >
            <motion.div
                className="laptop-body"
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
            >
                {/* 
                    GEOMETRY EXPLANATION:
                    Lid is upright (0deg).
                    Base is rotated X to sit flat in front (90+ deg relative to lid).
                */}

                {/* Hinge Container - Centered */}
                <div className="laptop-hinge">

                    {/* === LID (UPPER HALF) === */}
                    <div className="laptop-lid">
                        {/* Screen Bezel */}
                        <div className="laptop-screen-bezel">
                            {/* Screen Content - Website Preview */}
                            <div className="laptop-screen-content">
                                {/* Simulated Website Content */}
                                <div className="w-[90%] h-[90%] relative">
                                    {/* Header Bar */}
                                    <div className="laptop-header-bar">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <div className="ml-3 text-[8px] text-slate-400 font-mono">wibraniumtech.com</div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-5 text-slate-200">
                                        <div className="text-2xl font-bold mb-2 bg-gradient-to-br from-blue-500 to-blue-400 bg-clip-text text-transparent">
                                            WibraniumTech
                                        </div>
                                        <div className="text-[10px] text-slate-400 mb-4">
                                            Transform Your Business with Technology
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Web Development", "Custom Software", "Mobile Apps", "Automation"].map((service, i) => (
                                                <div key={i} className="laptop-service-tag">
                                                    {service}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Screen Glare */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Back of Lid */}
                        <div className="laptop-lid-back" />
                    </div>

                    {/* === BASE (LOWER HALF) === */}
                    <div className="laptop-base">
                        {/* Keyboard Deck Surface */}
                        <div className="laptop-keyboard-deck">
                            {/* Keyboard Area - Near Hinge */}
                            <div className="laptop-keys-container">
                                {/* Keys */}
                                {[...Array(70)].map((_, i) => (
                                    <div key={i} className="laptop-key" />
                                ))}
                            </div>

                            {/* Trackpad - Near User */}
                            <div className="laptop-trackpad" />
                        </div>

                        {/* Base Thickness (Front Edge) */}
                        <div className="laptop-base-edge" />
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
