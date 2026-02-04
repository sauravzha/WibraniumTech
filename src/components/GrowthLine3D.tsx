import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";

// Node positions for the growth line (x, y coordinates as percentages)
const lineNodes = [
    { x: 0, y: 85 },
    { x: 18, y: 72 },
    { x: 35, y: 55 },
    { x: 52, y: 42 },
    { x: 68, y: 28 },
    { x: 82, y: 15 },
    { x: 100, y: 3 },
];

export function GrowthLine3D() {
    const defaultRotation = { x: 0, y: 0 };
    const [rotation, setRotation] = useState(defaultRotation);
    const [isDrawn, setIsDrawn] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsDrawn(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = ((centerY - y) / centerY) * 8;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation(defaultRotation);
    };

    const generatePath = () => {
        if (lineNodes.length < 2) return "";
        let path = `M ${lineNodes[0].x * 3.5} ${lineNodes[0].y * 3}`;
        for (let i = 1; i < lineNodes.length; i++) {
            const prev = lineNodes[i - 1];
            const curr = lineNodes[i];
            const cpX = (prev.x + curr.x) / 2 * 3.5;
            const cpY1 = prev.y * 3;
            const cpY2 = curr.y * 3;
            path += ` Q ${cpX} ${cpY1}, ${curr.x * 3.5} ${curr.y * 3}`;
        }
        return path;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="growth-line-container"
            style={{
                perspective: "1000px",
                width: "100%",
                height: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            <motion.div
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    height: "320px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Ambient background glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: "-30px",
                        background: "radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
                        filter: "blur(30px)",
                        borderRadius: "50%",
                    }}
                />

                {/* Main SVG container */}
                <svg
                    viewBox="0 0 350 280"
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "visible",
                    }}
                >
                    <defs>
                        {/* Vibrant gradient for line */}
                        <linearGradient id="lineGradientVibrant" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="40%" stopColor="#00d4ff" />
                            <stop offset="70%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                        {/* Strong glow gradient */}
                        <linearGradient id="lineGlowVibrant" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.6)" />
                            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
                        </linearGradient>
                        {/* Node gradient */}
                        <radialGradient id="nodeGradient1" cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#00d4ff" />
                        </radialGradient>
                        <radialGradient id="nodeGradient2" cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="30%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </radialGradient>
                        {/* Enhanced glow filters */}
                        <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="nodeStrongGlow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background light rays */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.line
                            key={`ray-${i}`}
                            x1={80 + i * 60}
                            y1="300"
                            x2={100 + i * 50}
                            y2="-20"
                            stroke={`rgba(0, 212, 255, ${0.06 + i * 0.02})`}
                            strokeWidth="40"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.05, 0.12, 0.05],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3
                            }}
                        />
                    ))}

                    {/* Outer glow line */}
                    <motion.path
                        d={generatePath()}
                        fill="none"
                        stroke="url(#lineGlowVibrant)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        filter="url(#strongGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: isDrawn ? 1 : 0,
                            opacity: isDrawn ? 0.8 : 0
                        }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                    />

                    {/* Main gradient line */}
                    <motion.path
                        d={generatePath()}
                        fill="none"
                        stroke="url(#lineGradientVibrant)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        filter="url(#strongGlow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isDrawn ? 1 : 0 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                    />

                    {/* Animated energy particles along the line */}
                    {[0, 1, 2].map((i) => (
                        <motion.circle
                            key={`particle-${i}`}
                            r="3"
                            fill="#00ffff"
                            filter="url(#strongGlow)"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: isDrawn ? [0, 1, 1, 0] : 0,
                                cx: lineNodes.map(n => n.x * 3.5),
                                cy: lineNodes.map(n => n.y * 3),
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 2 + i * 1,
                            }}
                        />
                    ))}

                    {/* Nodes with enhanced glow */}
                    {lineNodes.map((node, i) => (
                        <motion.g key={i}>
                            {/* Outer pulse ring */}
                            <motion.circle
                                cx={node.x * 3.5}
                                cy={node.y * 3}
                                r="20"
                                fill="none"
                                stroke={i % 2 === 0 ? "rgba(0, 255, 255, 0.4)" : "rgba(168, 85, 247, 0.4)"}
                                strokeWidth="2"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isDrawn ? [1, 1.5, 1] : 0,
                                    opacity: isDrawn ? [0.6, 0, 0.6] : 0
                                }}
                                transition={{
                                    delay: 0.3 + i * 0.2,
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                            {/* Node glow */}
                            <motion.circle
                                cx={node.x * 3.5}
                                cy={node.y * 3}
                                r="16"
                                fill={i % 2 === 0 ? "rgba(0, 255, 255, 0.4)" : "rgba(168, 85, 247, 0.4)"}
                                filter="url(#nodeStrongGlow)"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isDrawn ? [1, 1.15, 1] : 0,
                                    opacity: isDrawn ? [0.7, 1, 0.7] : 0
                                }}
                                transition={{
                                    delay: 0.3 + i * 0.2,
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            {/* Node core */}
                            <motion.circle
                                cx={node.x * 3.5}
                                cy={node.y * 3}
                                r="8"
                                fill={i % 2 === 0 ? "url(#nodeGradient1)" : "url(#nodeGradient2)"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isDrawn ? 1 : 0,
                                    opacity: isDrawn ? 1 : 0
                                }}
                                transition={{
                                    delay: 0.3 + i * 0.2,
                                    duration: 0.5,
                                    type: "spring"
                                }}
                            />
                            {/* Inner highlight */}
                            <motion.circle
                                cx={node.x * 3.5 - 2}
                                cy={node.y * 3 - 2}
                                r="3"
                                fill="rgba(255, 255, 255, 0.9)"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isDrawn ? 1 : 0,
                                    opacity: isDrawn ? 1 : 0
                                }}
                                transition={{
                                    delay: 0.4 + i * 0.2,
                                    duration: 0.3
                                }}
                            />
                        </motion.g>
                    ))}
                </svg>

                {/* Floating animation overlay */}
                <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                    }}
                />
            </motion.div>
        </div>
    );
}

// Simplified version for mobile/tablet
export function GrowthLineSimple() {
    const [isDrawn, setIsDrawn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsDrawn(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center h-48 w-full">
            <svg viewBox="0 0 200 100" className="w-full max-w-[280px] h-auto overflow-visible">
                <defs>
                    <linearGradient id="simpleGradientVibrant" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00ffff" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <filter id="simpleGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Glow line */}
                <motion.path
                    d="M 10 80 Q 50 60, 80 45 Q 120 25, 160 15 Q 180 10, 190 5"
                    fill="none"
                    stroke="url(#simpleGradientVibrant)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.4"
                    filter="url(#simpleGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isDrawn ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Main line */}
                <motion.path
                    d="M 10 80 Q 50 60, 80 45 Q 120 25, 160 15 Q 180 10, 190 5"
                    fill="none"
                    stroke="url(#simpleGradientVibrant)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#simpleGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isDrawn ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Nodes */}
                {[[10, 80], [80, 45], [160, 15], [190, 5]].map(([x, y], i) => (
                    <motion.g key={i}>
                        <motion.circle
                            cx={x}
                            cy={y}
                            r="10"
                            fill={i % 2 === 0 ? "rgba(0, 255, 255, 0.3)" : "rgba(168, 85, 247, 0.3)"}
                            filter="url(#simpleGlow)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isDrawn ? [1, 1.2, 1] : 0,
                                opacity: isDrawn ? [0.5, 0.8, 0.5] : 0
                            }}
                            transition={{ delay: 0.3 + i * 0.2, duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            cx={x}
                            cy={y}
                            r="6"
                            fill={i % 2 === 0 ? "#00ffff" : "#a855f7"}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: isDrawn ? 1 : 0, opacity: isDrawn ? 1 : 0 }}
                            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                        />
                    </motion.g>
                ))}
            </svg>
        </div>
    );
}
