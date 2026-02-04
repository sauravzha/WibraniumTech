import { motion } from "framer-motion";
import { Check, ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card3DTilt } from "./3DElements";

interface ServiceFeature {
    icon?: LucideIcon;
    text: string;
}

interface ServiceProps {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    features: string[];
    benefits: string[];
    link?: string;
    index: number;
}

export function ServiceSection3D({
    id,
    title,
    description,
    icon: Icon,
    features,
    benefits,
    link = "/contact",
    index,
}: ServiceProps) {
    const isEven = index % 2 === 0;

    return (
        <section
            id={id}
            className={`relative py-32 overflow-hidden ${isEven ? "bg-secondary/30" : "bg-background"
                }`}
        >
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Abstract Gradient Blob */}
                <div
                    className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 ${isEven
                            ? "-left-48 top-1/4 bg-primary/30"
                            : "-right-48 bottom-1/4 bg-accent/30"
                        }`}
                />
            </div>

            <div className="container-custom relative z-10">
                <div
                    className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:grid-flow-dense" : ""
                        }`}
                >
                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={!isEven ? "lg:col-start-2" : ""}
                    >
                        {/* Header with Icon */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <Icon className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                                {title}
                            </h2>
                        </div>

                        <p className="text-xl text-gray-300 leading-relaxed mb-10">
                            {description}
                        </p>

                        {/* Checklist with Staggered Animation */}
                        <div className="space-y-4 mb-10">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                                        <Check className="w-3.5 h-3.5 text-primary group-hover:text-black transition-colors duration-300" />
                                    </div>
                                    <span className="text-lg text-gray-400 group-hover:text-white transition-colors duration-300">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="btn-primary h-14 px-8 text-lg group relative overflow-hidden"
                        >
                            <Link to={link}>
                                <span className="relative z-10 flex items-center">
                                    Get Started Now
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* 3D Panel Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? 10 : -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`relative ${!isEven ? "lg:col-start-1" : ""}`}
                        style={{ perspective: "1000px" }}
                    >
                        {/* 3D Abstract Shapes */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-40 animate-pulse-slow" />

                        {/* Floating Abstract Element 1 (Cube/Sphere approximation) */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl z-20 pointer-events-none"
                        />
                        <motion.div
                            animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                            transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full z-0 pointer-events-none"
                        />

                        <Card3DTilt className="h-full">
                            <div className="relative bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 overflow-hidden shadow-2xl">
                                {/* Glass Shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

                                <h3 className="text-2xl font-bold mb-6 text-white relative z-10 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                                    Key Benefits
                                </h3>

                                <div className="grid gap-4 relative z-10">
                                    {benefits.map((benefit, i) => (
                                        <motion.div
                                            key={benefit}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group cursor-default"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                                    <Check className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                                </div>
                                                <p className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                                    {benefit}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Decorative Tech Lines */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
                            </div>
                        </Card3DTilt>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
