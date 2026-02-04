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
            className="smartphone-3d-container"
            style={{
                perspective: "1500px",
                width: "100%",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                className="smartphone-3d"
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{
                    width: "280px",
                    height: "560px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Phone Frame */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(145deg, #1a1a2e, #16213e)",
                        borderRadius: "40px",
                        boxShadow: "0 50px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                        border: "3px solid #2d2d44",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Top Notch / Camera */}
                    <div
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "32px",
                            background: "#0a0a12",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                        }}
                    >
                        {/* Camera */}
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#1e293b", border: "2px solid #334155" }} />
                        {/* Speaker */}
                        <div style={{ width: "50px", height: "4px", borderRadius: "2px", background: "#1e293b" }} />
                    </div>

                    {/* Screen */}
                    <div
                        style={{
                            position: "absolute",
                            top: "16px",
                            left: "12px",
                            right: "12px",
                            bottom: "16px",
                            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
                            borderRadius: "32px",
                            overflow: "hidden",
                            border: "1px solid #334155",
                        }}
                    >
                        {/* Status Bar */}
                        <div style={{ padding: "50px 16px 8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "12px", color: "#94a3b8" }}>9:41</span>
                            <div style={{ display: "flex", gap: "4px" }}>
                                <div style={{ width: "16px", height: "10px", border: "1px solid #94a3b8", borderRadius: "2px", position: "relative" }}>
                                    <div style={{ position: "absolute", inset: "2px", background: "#22c55e", borderRadius: "1px" }} />
                                </div>
                            </div>
                        </div>

                        {/* Website Content Preview */}
                        <div style={{ padding: "20px 16px" }}>
                            {/* Logo Area */}
                            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #00d4ff, #00ff88)", borderRadius: "8px" }} />
                                <span style={{ fontSize: "14px", fontWeight: "bold", color: "#ffffff" }}>WibraniumTech</span>
                            </div>

                            {/* Hero Text */}
                            <div style={{ marginBottom: "24px" }}>
                                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px", lineHeight: 1.3 }}>
                                    Transform Your <span style={{ color: "#00d4ff" }}>Business</span>
                                </h3>
                                <p style={{ fontSize: "11px", color: "#94a3b8", lineHeight: 1.5 }}>
                                    Custom software solutions for growing businesses
                                </p>
                            </div>

                            {/* Service Cards */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {["Web Development", "Mobile Apps", "CRM Solutions"].map((service, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: "12px",
                                            background: "rgba(0, 212, 255, 0.1)",
                                            borderRadius: "10px",
                                            border: "1px solid rgba(0, 212, 255, 0.2)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00d4ff" }} />
                                        <span style={{ fontSize: "12px", color: "#e2e8f0" }}>{service}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "12px 20px",
                                    background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                }}
                            >
                                <span style={{ fontSize: "12px", fontWeight: "600", color: "#0f172a" }}>Get Started</span>
                            </div>
                        </div>
                    </div>

                    {/* Home Indicator */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "5px",
                            background: "#4b5563",
                            borderRadius: "3px",
                        }}
                    />
                </div>

                {/* Phone Side (3D depth) */}
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "-8px",
                        width: "8px",
                        height: "calc(100% - 20px)",
                        background: "linear-gradient(to right, #1a1a2e, #0f0f1a)",
                        borderRadius: "0 8px 8px 0",
                        transformOrigin: "left",
                        transform: "rotateY(90deg)",
                    }}
                >
                    {/* Volume buttons */}
                    <div style={{ position: "absolute", top: "80px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "40px", background: "#2d2d44", borderRadius: "2px" }} />
                    <div style={{ position: "absolute", top: "140px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "40px", background: "#2d2d44", borderRadius: "2px" }} />
                </div>

                {/* Glow Effect */}
                <div
                    style={{
                        position: "absolute",
                        inset: "-20px",
                        background: "radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15), transparent 70%)",
                        borderRadius: "60px",
                        pointerEvents: "none",
                        zIndex: -1,
                    }}
                />
            </motion.div>
        </div>
    );
}
