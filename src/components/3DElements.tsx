import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function FloatingShapes3D() {
    const shapes = [
        { id: 1, size: 120, top: "15%", left: "5%", delay: 0, duration: 20 },
        { id: 2, size: 80, top: "60%", left: "85%", delay: 2, duration: 25 },
        { id: 3, size: 100, top: "75%", left: "10%", delay: 4, duration: 22 },
        { id: 4, size: 60, top: "35%", right: "8%", delay: 1, duration: 18 },
        { id: 5, size: 90, top: "50%", left: "50%", delay: 3, duration: 24 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        width: shape.size,
                        height: shape.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        rotateZ: [0, 180],
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {/* Cube */}
                    <div className="shape-3d-container">
                        <div className="shape-3d-cube">
                            <div className="cube-face cube-front"></div>
                            <div className="cube-face cube-back"></div>
                            <div className="cube-face cube-right"></div>
                            <div className="cube-face cube-left"></div>
                            <div className="cube-face cube-top"></div>
                            <div className="cube-face cube-bottom"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export function GeometricGrid3D() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="geometric-grid-3d">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="grid-line-3d"
                        style={{
                            top: `${i * 5}%`,
                        }}
                        animate={{
                            scaleX: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

interface Parallax3DProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax3D({ children, speed = 0.5, className = "" }: Parallax3DProps) {
    const [offsetY, setOffsetY] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "200px 0px" });

    useEffect(() => {
        if (!isInView) return;

        const handleScroll = () => {
            setOffsetY(window.scrollY * speed);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial set
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, isInView]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                transform: `translateY(${offsetY}px) translateZ(0)`,
            }}
        >
            {children}
        </motion.div>
    );
}

export function Card3DTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            className={`card-3d-tilt ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    );
}

// --- NEW COMPONENTS ---

export function TechParticles3D() {
    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-primary/40 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function GlowingOrbs3D() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

export function CircuitLines3D() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full opacity-30">
                <defs>
                    <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                {/* Random Circuit Lines */}
                <motion.path
                    d="M0 100 H 200 V 300 H 500 V 200 H 800"
                    stroke="url(#circuit-gradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <motion.path
                    d="M100 0 V 150 H 400 V 500"
                    stroke="url(#circuit-gradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <motion.path
                    d="M800 600 H 500 V 400 H 200"
                    stroke="url(#circuit-gradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}
