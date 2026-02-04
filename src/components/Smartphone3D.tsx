import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export function Smartphone3D() {
    const [rotation, setRotation] = useState({ x: 0, y: -20 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateY = ((x - centerX) / centerX) * 25; // Max 25deg rotation
        const rotateX = ((centerY - y) / centerY) * 15; // Max 15deg rotation

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        // Return to default position
        setRotation({ x: 0, y: -20 });
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
                height: "600px",
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
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
                style={{
                    transformStyle: "preserve-3d",
                    width: "320px",
                    height: "650px",
                    position: "relative",
                }}
            >
                {/* Phone Body */}
                <div
                    className="phone-body"
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        borderRadius: "40px",
                        border: "8px solid #0a0f1a",
                        transformStyle: "preserve-3d",
                        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(59, 130, 246, 0.3)",
                        overflow: "hidden",
                    }}
                >
                    {/* Notch */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "24px",
                            background: "#0a0f1a",
                            borderRadius: "0 0 20px 20px",
                            zIndex: 10,
                        }}
                    >
                        {/* Camera */}
                        <div
                            style={{
                                position: "absolute",
                                left: "20px",
                                top: "8px",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "#1e293b",
                                border: "1px solid #334155",
                            }}
                        ></div>
                        {/* Speaker */}
                        <div
                            style={{
                                position: "absolute",
                                right: "20px",
                                top: "10px",
                                width: "30px",
                                height: "4px",
                                borderRadius: "2px",
                                background: "#1e293b",
                            }}
                        ></div>
                    </div>

                    {/* Screen Content */}
                    <div
                        className="screen-content"
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "32px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Status Bar */}
                        <div
                            style={{
                                padding: "8px 16px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "10px",
                                color: "#94a3b8",
                            }}
                        >
                            <div>9:41</div>
                            <div style={{ display: "flex", gap: "4px" }}>
                                <div>📶</div>
                                <div>📡</div>
                                <div>🔋</div>
                            </div>
                        </div>

                        {/* App Content */}
                        <div style={{ flex: 1, padding: "20px 16px", overflow: "hidden" }}>
                            {/* Header */}
                            <div
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "8px",
                                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                WibraniumTech
                            </div>
                            <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "16px" }}>
                                Mobile Solutions
                            </div>

                            {/* Service Cards */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {["📱 Mobile Apps", "💻 Web Apps", "⚙️ Automation", "🎨 UI/UX Design"].map(
                                    (service, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: "rgba(59, 130, 246, 0.1)",
                                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                                borderRadius: "12px",
                                                padding: "12px",
                                                fontSize: "12px",
                                                color: "#cbd5e1",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            {service}
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Bottom Button */}
                            <div
                                style={{
                                    marginTop: "20px",
                                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                    color: "white",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                                }}
                            >
                                Get Started →
                            </div>
                        </div>

                        {/* Floating Particles */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                pointerEvents: "none",
                                opacity: 0.2,
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="float-smooth"
                                    style={{
                                        position: "absolute",
                                        width: "3px",
                                        height: "3px",
                                        background: "#3b82f6",
                                        borderRadius: "50%",
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.7}s`,
                                        boxShadow: "0 0 8px #3b82f6",
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Screen Glare */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                                pointerEvents: "none",
                            }}
                        ></div>
                    </div>

                    {/* Home Indicator */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "4px",
                            background: "rgba(148, 163, 184, 0.3)",
                            borderRadius: "2px",
                        }}
                    ></div>
                </div>

                {/* Side Buttons */}
                <div
                    style={{
                        position: "absolute",
                        right: "-8px",
                        top: "100px",
                        width: "4px",
                        height: "60px",
                        background: "#0a0f1a",
                        borderRadius: "2px",
                        transform: "translateZ(4px)",
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        right: "-8px",
                        top: "180px",
                        width: "4px",
                        height: "40px",
                        background: "#0a0f1a",
                        borderRadius: "2px",
                        transform: "translateZ(4px)",
                    }}
                ></div>

                {/* Shadow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-80px",
                        left: "50%",
                        transform: "translateX(-50%) rotateX(90deg)",
                        width: "100%",
                        height: "100%",
                        background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                        filter: "blur(20px)",
                        pointerEvents: "none",
                    }}
                ></div>
            </motion.div>
        </div>
    );
}
