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
