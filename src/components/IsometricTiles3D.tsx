import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Globe, Smartphone, Users, Database, Cloud, LayoutGrid, Server, ShieldCheck } from "lucide-react";

// Unified "Tech Glass" aesthetic with distinct icon colors
const tiles = [
    // Center
    {
        icon: LayoutGrid, label: "Digital Forge",
        x: 0, y: 0, z: 40, size: "lg",
        color: "cyan", delay: 0,
        classes: {
            hoverBorder: "group-hover:border-cyan-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
            gradient: "from-cyan-500/20",
            iconBg: "group-hover:bg-cyan-500/20",
            iconText: "text-cyan-400"
        }
    },
    // Inner Ring
    {
        icon: Globe, label: "Web Apps",
        x: -100, y: -60, z: 20, size: "md",
        color: "blue", delay: 0.1,
        classes: {
            hoverBorder: "group-hover:border-blue-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
            gradient: "from-blue-500/20",
            iconBg: "group-hover:bg-blue-500/20",
            iconText: "text-blue-400"
        }
    },
    {
        icon: Smartphone, label: "Mobile Sol.",
        x: 100, y: -60, z: 20, size: "md",
        color: "purple", delay: 0.2,
        classes: {
            hoverBorder: "group-hover:border-purple-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
            gradient: "from-purple-500/20",
            iconBg: "group-hover:bg-purple-500/20",
            iconText: "text-purple-400"
        }
    },
    {
        icon: Database, label: "Big Data",
        x: -100, y: 60, z: 20, size: "md",
        color: "emerald", delay: 0.3,
        classes: {
            hoverBorder: "group-hover:border-emerald-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
            gradient: "from-emerald-500/20",
            iconBg: "group-hover:bg-emerald-500/20",
            iconText: "text-emerald-400"
        }
    },
    {
        icon: Cloud, label: "Cloud Infra",
        x: 100, y: 60, z: 20, size: "md",
        color: "indigo", delay: 0.4,
        classes: {
            hoverBorder: "group-hover:border-indigo-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
            gradient: "from-indigo-500/20",
            iconBg: "group-hover:bg-indigo-500/20",
            iconText: "text-indigo-400"
        }
    },
    // Outer "Satellite" elements (Smaller)
    {
        icon: Users, label: "CRM", x: 0, y: -130, z: 10, size: "sm", color: "pink", delay: 0.5,
        classes: {
            hoverBorder: "group-hover:border-pink-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
            gradient: "from-pink-500/20",
            iconBg: "group-hover:bg-pink-500/20",
            iconText: "text-pink-400"
        }
    },
    {
        icon: ShieldCheck, label: "Security", x: 0, y: 130, z: 10, size: "sm", color: "orange", delay: 0.6,
        classes: {
            hoverBorder: "group-hover:border-orange-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
            gradient: "from-orange-500/20",
            iconBg: "group-hover:bg-orange-500/20",
            iconText: "text-orange-400"
        }
    },
    {
        icon: Server, label: "Backend", x: -180, y: 0, z: 10, size: "sm", color: "teal", delay: 0.7,
        classes: {
            hoverBorder: "group-hover:border-teal-400/50",
            hoverShadow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]",
            gradient: "from-teal-500/20",
            iconBg: "group-hover:bg-teal-500/20",
            iconText: "text-teal-400"
        }
    },
];

export function IsometricTiles3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [45, 25]), { stiffness: 100, damping: 20 });
    const rotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, 50]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] flex items-center justify-center overflow-visible z-0 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-3xl" />

            <motion.div
                style={{ rotateX, rotateZ }}
                className="relative transform-style-3d w-[400px] h-[400px]"
            >
                {/* Digital Grid Floor */}
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] transform-style-3d opacity-30" />

                {/* Connection Lines (SVG Overlay on the plane) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" style={{ transform: 'translateZ(0px)' }}>
                    <line x1="50%" y1="50%" x2="25%" y2="35%" stroke="#06b6d4" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="75%" y2="35%" stroke="#06b6d4" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="25%" y2="65%" stroke="#06b6d4" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="75%" y2="65%" stroke="#06b6d4" strokeWidth="1" />
                </svg>

                {/* Render Tiles */}
                {tiles.map((tile, i) => (
                    <motion.div
                        key={tile.label}
                        className="absolute left-1/2 top-1/2 transform-style-3d"
                        initial={{ opacity: 0, z: 200 }}
                        animate={{ opacity: 1, x: tile.x, y: tile.y, z: tile.z }}
                        transition={{ delay: tile.delay * 0.5, duration: 1, type: "spring" }}
                        style={{
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    >
                        <GlassTile tile={tile} />
                    </motion.div>
                ))}

                {/* Central Pulse Ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-cyan-500/20 rounded-full animate-pulse transform-style-3d" style={{ transform: 'translateZ(1px)' }} />
            </motion.div>
        </div>
    );
}

function GlassTile({ tile }: { tile: any }) {
    // Size variants
    const sizeClasses = {
        lg: "w-32 h-32",
        md: "w-24 h-24",
        sm: "w-16 h-16"
    };

    const IconTag = tile.icon;

    return (
        <motion.div
            animate={{
                z: [0, 15, 0], // Bobbing up and down in Z-space
                rotateX: [0, -5, 0], // Subtle tilt
            }}
            transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tile.delay
            }}
            className={`relative group cursor-pointer transform-style-3d transition-all duration-300 hover:z-50`}
        >
            {/* 3D layered card construction */}
            <div className={`${sizeClasses[tile.size as keyof typeof sizeClasses]} relative transform-style-3d`}>

                {/* Shadow on 'floor' */}
                <div className="absolute inset-0 bg-black/40 blur-xl rounded-full transform translate-z-[-20px] scale-90 group-hover:scale-75 transition-transform duration-500" />

                {/* Main Glass Body */}
                <div className={`absolute inset-0 backdrop-blur-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 shadow-[0_0_15px_rgba(0,0,0,0.2)]
           group-hover:border-${tile.color}-400/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500
        `}>
                    {/* Inner Glow Mesh */}
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr from-${tile.color}-500/20 to-transparent rounded-2xl`} />
                </div>

                {/* Floating Content Layer (Pops out more) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transform translate-z-[20px] transform-style-3d">
                    {/* Icon Container */}
                    <div className={`
              relative flex items-center justify-center rounded-xl 
              ${tile.size === 'lg' ? 'w-14 h-14' : tile.size === 'md' ? 'w-10 h-10' : 'w-7 h-7'}
              bg-gray-950/50 border border-white/5 shadow-inner
              group-hover:scale-110 group-hover:bg-${tile.color}-500/20 transition-all duration-300
            `}>
                        <IconTag className={`
                 ${tile.size === 'lg' ? 'w-8 h-8' : tile.size === 'md' ? 'w-6 h-6' : 'w-4 h-4'}
                 text-${tile.color}-400 group-hover:text-white transition-colors duration-300
               `} />
                    </div>

                    {/* Label (Only for lg/md) */}
                    {tile.size !== 'sm' && (
                        <div className="mt-3 px-2 py-0.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm transform translate-z-[10px]">
                            <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase whitespace-nowrap group-hover:text-white">
                                {tile.label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Edge Highlight (Top Right) */}
                <div className="absolute top-0 right-0 w-full h-full rounded-2xl border-t border-r border-white/20 pointer-events-none" />
            </div>
        </motion.div>
    );
}
