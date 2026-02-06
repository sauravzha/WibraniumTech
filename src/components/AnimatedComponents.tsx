import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function AnimatedCounter({
    end,
    duration = 2,
    suffix = "",
    prefix = "",
    className = ""
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number;
                    let animationFrame: number;

                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = (timestamp - startTime) / (duration * 1000);

                        if (progress < 1) {
                            setCount(Math.floor(end * progress));
                            animationFrame = requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };

                    animationFrame = requestAnimationFrame(animate);

                    return () => cancelAnimationFrame(animationFrame);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <div ref={ref} className={className}>
            {prefix}{count}{suffix}
        </div>
    );
}

interface ScrollProgressProps {
    color?: string;
}

export function ScrollProgress({ color = "hsl(207, 90%, 54%)" }: ScrollProgressProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const scaleX = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
            style={{
                scaleX,
                backgroundColor: color
            }}
        />
    );
}

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
    const x = useSpring(0, { stiffness: 150, damping: 20 });
    const y = useSpring(0, { stiffness: 150, damping: 20 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 20); // Tilt amount
        y.set(yPct * 20);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: y,
                rotateY: x,
            }}
            className={`relative transition-all duration-200 ease-out preserve-3d ${className}`}
        >
            <div className="h-full translate-z-50">
                {children}
            </div>
        </motion.div>
    );
}

export function MedicalSphere() {
    const x = useSpring(0, { stiffness: 100, damping: 20 });
    const y = useSpring(0, { stiffness: 100, damping: 20 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 30); // Higher tilt for the sphere
        y.set(yPct * 30);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div
            className="relative w-[500px] h-[500px] flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-80 h-80 transform-style-3d cursor-pointer"
                style={{
                    rotateX: y,
                    rotateY: x,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Animation Container (Float) - Separate to keep tilt responsive */}
                <div className="w-full h-full transform-style-3d animate-[float-smooth_8s_ease-in-out_infinite]">

                    {/* Core Core - Glowing Center */}
                    <div className="absolute inset-20 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
                    <div className="absolute inset-28 bg-white/40 blur-2xl rounded-full animate-pulse"></div>

                    {/* Main Structure Rings */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/30 opacity-80 animate-[logo-spin_20s_linear_infinite] shadow-[0_0_30px_rgba(6,182,212,0.2)]"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20 animate-[logo-spin_30s_linear_infinite]"></div>
                    <div className="absolute inset-4 rounded-full border border-blue-600/40 opacity-70 animate-[logo-spin-reverse_15s_linear_infinite]"></div>
                    <div className="absolute inset-8 rounded-full border-t-2 border-b-2 border-transparent border-t-cyan-400/40 border-b-blue-500/40 animate-[logo-spin_10s_linear_infinite]"></div>

                    {/* Orbital Rings (Rotated) */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-[logo-spin_12s_linear_infinite] rotate-x-45"></div>
                    <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[logo-spin_14s_linear_infinite] rotate-y-45"></div>

                    {/* Glowing Nodes on Surface */}
                    <SphereNode x={0} y={-40} z={40} size={4} color="bg-white" />
                    <SphereNode x={40} y={10} z={0} delay={0.5} size={3} />
                    <SphereNode x={-25} y={25} z={25} delay={1} />
                    <SphereNode x={0} y={0} z={50} delay={1.5} size={5} color="bg-cyan-300" />
                    <SphereNode x={-35} y={-15} z={-15} delay={2} />
                    <SphereNode x={20} y={-30} z={-20} delay={2.5} />

                    {/* Floating Particles */}
                    <OrbitingParticle radius={160} speed={4} size={3} color="bg-cyan-400" />
                    <OrbitingParticle radius={190} speed={7} size={2} color="bg-blue-400" delay={1} />
                    <OrbitingParticle radius={210} speed={10} size={4} color="bg-white" delay={2} />

                    {/* Data Streams (Simulated) */}
                    <div className="absolute inset-0 rounded-full animate-[logo-spin_4s_linear_infinite] border-r-2 border-transparent border-r-cyan-500/30 blur-sm pointer-events-none"></div>
                </div>
            </motion.div>

            {/* Ambient Glow Underneath */}
            <div className="absolute -bottom-20 w-64 h-20 bg-cyan-500/20 blur-3xl rounded-[100%] animate-pulse"></div>
        </div>
    );
}

function SphereNode({ x, y, z, delay = 0, size = 3, color = "bg-cyan-400" }: { x: number; y: number; z: number; delay?: number, size?: number, color?: string }) {
    return (
        <div
            className={`absolute rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] ${color}`}
            style={{
                width: size,
                height: size,
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                animation: `pulse-glow 2s ease-in-out infinite ${delay}s`
            }}
        />
    );
}

function OrbitingParticle({ radius, speed, size, color, delay = 0 }: { radius: number; speed: number; size: number; color: string; delay?: number }) {
    return (
        <div
            className="absolute top-1/2 left-1/2 transform-style-3d"
            style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                marginTop: -radius,
                animation: `logo-spin ${speed}s linear infinite ${delay}s`
            }}
        >
            <div
                className={`absolute top-0 left-1/2 -ml-[${size / 2}px] rounded-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.8)]`}
                style={{ width: size, height: size }}
            ></div>
        </div>
    );
}
