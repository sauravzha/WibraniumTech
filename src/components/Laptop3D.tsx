import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export function Laptop3D() {
    // Default position - screen visible, tilted towards right side
    const defaultRotation = { x: -10, y: 30 };
    const [rotation, setRotation] = useState(defaultRotation);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position (reduced sensitivity)
        const rotateY = defaultRotation.y + ((x - centerX) / centerX) * 15; // Max 15deg from default
        const rotateX = defaultRotation.x + ((centerY - y) / centerY) * 8; // Max 8deg from default

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        // Return to default position (same as initial)
        setRotation(defaultRotation);
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
                    width: "500px", // Reduced container width to fit tighter
                    height: "400px",
                    position: "relative",
                    transform: "rotateX(60deg) rotateY(0deg) rotateZ(0deg)", // Base tilt to see keyboard
                }}
            >
                {/* 
                    GEOMETRY EXPLANATION:
                    Lid is upright (0deg).
                    Base is rotated X to sit flat in front (90+ deg relative to lid).
                */}

                {/* Hinge Container - Centered */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "460px", // Laptop Width
                    height: "0px",  // The Hinge Line (virtual)
                    transformStyle: "preserve-3d",
                }}>

                    {/* === LID (UPPER HALF) === */}
                    <div className="laptop-lid"
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "300px", // Screen Height
                            background: "#0f172a",
                            borderRadius: "16px 16px 0 0",
                            border: "2px solid #1e293b",
                            transformOrigin: "bottom",
                            transform: "rotateX(0deg)", // Upright
                            transformStyle: "preserve-3d",
                            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Screen Bezel */}
                        <div style={{
                            position: "absolute",
                            inset: "10px",
                            background: "#000",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid #334155",
                            transformStyle: "preserve-3d",
                        }}>
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
                                            height: "30px",
                                            background: "rgba(59, 130, 246, 0.1)",
                                            borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "0 12px",
                                            gap: "6px",
                                        }}
                                    >
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }}></div>
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#eab308" }}></div>
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }}></div>
                                        <div style={{ marginLeft: "12px", fontSize: "8px", color: "#94a3b8", fontFamily: "monospace" }}>wibraniumtech.com</div>
                                    </div>

                                    {/* Content Area */}
                                    <div style={{ padding: "20px", color: "#e2e8f0" }}>
                                        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", background: "linear-gradient(135deg, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                            WibraniumTech
                                        </div>
                                        <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "16px" }}>
                                            Transform Your Business with Technology
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                            {["Web Development", "Custom Software", "Mobile Apps", "Automation"].map((service, i) => (
                                                <div key={i} style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)", borderRadius: "6px", padding: "8px", fontSize: "9px", color: "#cbd5e1" }}>
                                                    {service}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Screen Glare */}
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 40%)", pointerEvents: "none" }} />
                                </div>
                            </div>
                        </div>

                        {/* Back of Lid */}
                        <div style={{
                            position: "absolute", inset: 0, background: "#1e293b",
                            transform: "translateZ(-2px)", borderRadius: "16px 16px 0 0",
                        }} />
                    </div>

                    {/* === BASE (LOWER HALF) === */}
                    <div className="laptop-base"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "340px", // Base Depth
                            background: "#0f172a", // Dark chassis
                            borderRadius: "0 0 16px 16px",
                            transformOrigin: "top",
                            transform: "rotateX(100deg)", // Sits down/flat relative to screen
                            transformStyle: "preserve-3d",
                            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Keyboard Deck Surface */}
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to bottom, #1e293b, #0f172a)",
                            borderRadius: "0 0 16px 16px",
                            border: "1px solid #334155",
                            borderTop: "none",
                            backfaceVisibility: "hidden",
                        }}>
                            {/* Keyboard Area - Near Hinge */}
                            <div style={{
                                position: "absolute", top: "50px", left: "50%", transform: "translateX(-50%)",
                                width: "84%", height: "140px",
                                background: "#0f172a", borderRadius: "6px",
                                padding: "4px",
                                border: "1px solid #334155",
                                display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: "2px"
                            }}>
                                {/* Keys */}
                                {[...Array(70)].map((_, i) => (
                                    <div key={i} style={{
                                        background: "#334155",
                                        borderRadius: "2px",
                                        boxShadow: "0 1px 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                                    }} />
                                ))}
                            </div>

                            {/* Trackpad - Near User */}
                            <div style={{
                                position: "absolute", top: "210px", left: "50%", transform: "translateX(-50%)",
                                width: "140px", height: "90px",
                                background: "#1e293b", borderRadius: "8px",
                                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.05)",
                                border: "1px solid #334155"
                            }} />
                        </div>

                        {/* Base Thickness (Front Edge) */}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, width: "100%", height: "16px",
                            background: "#020617",
                            transformOrigin: "bottom", transform: "rotateX(-90deg)",
                            borderRadius: "0 0 16px 16px"
                        }} />
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
