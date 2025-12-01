"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
    { name: "React", x: 20, y: 20, r: 50, color: "cyan" },
    { name: "AWS", x: 70, y: 30, r: 60, color: "violet" },
    { name: "Go", x: 30, y: 70, r: 45, color: "cyan" },
    { name: "Node", x: 80, y: 60, r: 55, color: "violet" },
    { name: "System Design", x: 50, y: 50, r: 70, color: "cyan" },
    { name: "Kubernetes", x: 10, y: 50, r: 50, color: "violet" },
];

export default function GravityField() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {skills.map((skill, i) => (
                <FloatingMatter
                    key={skill.name}
                    skill={skill}
                    mousePosition={mousePosition}
                    containerRef={containerRef}
                    index={i}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />
        </div>
    );
}

function FloatingMatter({
    skill,
    mousePosition,
    containerRef,
    index,
}: {
    skill: { name: string; x: number; y: number; r: number; color: string };
    mousePosition: { x: number; y: number };
    containerRef: React.RefObject<HTMLDivElement | null>;
    index: number;
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 50 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        // Initial random position
        if (containerRef.current) {
            // We'll just use the percentage based positions for initial render to avoid hydration mismatch
            // Real physics would happen in a more complex setup
        }
    }, [containerRef]);

    // Magnetic effect logic could go here, but for now simple floating
    // We'll use CSS animation for floating and Framer Motion for mouse interaction if needed

    // Calculate distance from mouse to apply "gravity" or "repulsion"
    // This is a simplified version. For true physics we'd use a loop.

    return (
        <motion.div
            className={`absolute flex items-center justify-center rounded-full border backdrop-blur-sm
        ${skill.color === "cyan"
                    ? "border-cyan-400/30 bg-cyan-400/5 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    : "border-violet-500/30 bg-violet-500/5 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                }
      `}
            style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                width: skill.r * 2,
                height: skill.r * 2,
                x: springX,
                y: springY,
            }}
            animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
            }}
            transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
            }}
        >
            <span className="text-xs font-mono font-bold tracking-tighter">
                {skill.name}
            </span>
        </motion.div>
    );
}
