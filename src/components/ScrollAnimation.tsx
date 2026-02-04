import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "scale";
    className?: string;
}

export function ScrollAnimation({
    children,
    delay = 0,
    direction = "up",
    className = ""
}: ScrollAnimationProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        scale: { scale: 0.8, y: 0, x: 0 }
    };

    const initial = direction === "scale"
        ? { opacity: 0, scale: 0.8 }
        : { opacity: 0, ...directions[direction] };

    const whileInView = direction === "scale"
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, x: 0, y: 0 };

    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = ""
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};
