import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY * speed);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <motion.div
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
