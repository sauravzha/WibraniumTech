import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export function Laptop3D() {
    const [rotation, setRotation] = useState({ x: -15, y: 25 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateY = ((x - centerX) / centerX) * 30; // Max 30deg rotation
        const rotateX = ((centerY - y) / centerY) * 15; // Max 15deg rotation

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        // Return to default position
        setRotation({ x: -15, y: 25 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="laptop-3d-container"
            style={{
                perspective: "2000px",
                width: "100%",
                height: "600px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                className="laptop-3d"
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
                    width: "700px",
                    height: "450px",
                    position: "relative",
                }}
            >
                {/* Laptop Screen */}
                <div
                    className="laptop-screen"
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "85%",
                        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                        borderRadius: "12px 12px 0 0",
                        border: "12px solid #0f172a",
                        borderBottom: "4px solid #0f172a",
                        transformStyle: "preserve-3d",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                        overflow: "hidden",
                    }}
                >
                    {/* Screen Content - Website Preview */}
                    <div
                        className="screen-content"
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Simulated Website Content */}
                        <div style={{ width: "90%", height: "90%", position: "relative" }}>
                            {/* Header Bar */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    background: "rgba(59, 130, 246, 0.1)",
                                    borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 16px",
                                    gap: "8px",
                                }}
                            >
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}></div>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }}></div>
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></div>
                                <div
                                    style={{
                                        marginLeft: "16px",
                                        fontSize: "10px",
                                        color: "#94a3b8",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    wibraniumtech.com
                                </div>
                            </div>

                            {/* Content Area */}
                            <div style={{ padding: "24px", color: "#e2e8f0" }}>
                                <div
                                    style={{
                                        fontSize: "32px",
                                        fontWeight: "bold",
                                        marginBottom: "12px",
                                        background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    WibraniumTech
                                </div>
                                <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px" }}>
                                    Transform Your Business with Technology
                                </div>

                                {/* Service Cards Preview */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    {["Web Development", "Custom Software", "Mobile Apps", "Automation"].map((service, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: "rgba(59, 130, 246, 0.1)",
                                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                                borderRadius: "8px",
                                                padding: "12px",
                                                fontSize: "11px",
                                                color: "#cbd5e1",
                                            }}
                                        >
                                            {service}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Particles Effect */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    pointerEvents: "none",
                                    opacity: 0.3,
                                }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="float-smooth"
                                        style={{
                                            position: "absolute",
                                            width: "4px",
                                            height: "4px",
                                            background: "#3b82f6",
                                            borderRadius: "50%",
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.5}s`,
                                            boxShadow: "0 0 10px #3b82f6",
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Screen Glare Effect */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                pointerEvents: "none",
                            }}
                        ></div>
                    </div>
                </div>

                {/* Laptop Base/Keyboard */}
                <div
                    className="laptop-base"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "110%",
                        height: "18%",
                        left: "-5%",
                        background: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
                        borderRadius: "0 0 20px 20px",
                        transform: "rotateX(90deg)",
                        transformOrigin: "top",
                        transformStyle: "preserve-3d",
                        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {/* Keyboard Detail */}
                    <div
                        style={{
                            width: "80%",
                            height: "60%",
                            margin: "15% auto 0",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "4px",
                            display: "grid",
                            gridTemplateColumns: "repeat(12, 1fr)",
                            gap: "2px",
                            padding: "4px",
                        }}
                    >
                        {[...Array(48)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "#0f172a",
                                    borderRadius: "2px",
                                    opacity: 0.6,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Shadow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-100px",
                        left: "50%",
                        transform: "translateX(-50%) rotateX(90deg)",
                        width: "120%",
                        height: "120%",
                        background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                        filter: "blur(30px)",
                        pointerEvents: "none",
                    }}
                ></div>
            </motion.div>
        </div>
    );
}
