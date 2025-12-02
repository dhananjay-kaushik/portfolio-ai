"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import React from "react";

interface Project {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    color: "cyan" | "violet";
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full rounded-xl bg-slate-900/50 border border-slate-800 p-6 md:p-8 group"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${project.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-violet-500/10 text-violet-400'}`}>
                        <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex gap-4">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ArrowUpRight className="w-5 h-5 text-slate-500 hover:text-slate-200 cursor-pointer transition-colors" />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-cyan-200 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                        <span
                            key={`${t}-${i}`}
                            className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap"
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
