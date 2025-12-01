"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Layers } from "lucide-react";
import React, { useRef } from "react";

interface Project {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    color: "cyan" | "violet";
}

export default function ProjectCard({ project }: { project: Project }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full rounded-xl bg-slate-900/50 border border-slate-800 p-8 group"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 flex flex-col h-full"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${project.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-violet-500/10 text-violet-400'}`}>
                        <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex gap-4">
                        <Github className="w-5 h-5 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" />
                        <ArrowUpRight className="w-5 h-5 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-cyan-200 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Gradient Overlay */}
            <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
          ${project.color === 'cyan'
                        ? 'bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-violet-500/10 via-transparent to-transparent'
                    }
        `}
            />
        </motion.div>
    );
}
