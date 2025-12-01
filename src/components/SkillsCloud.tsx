"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skills = [
    { name: "JavaScript", category: "Language", size: "lg" },
    { name: "Java", category: "Language", size: "md" },
    { name: "Python", category: "Language", size: "lg" },
    { name: "Go", category: "Language", size: "lg" },
    { name: "Scala", category: "Language", size: "md" },
    { name: "React", category: "Frontend", size: "lg" },
    { name: "Next.js", category: "Frontend", size: "lg" },
    { name: "Node.js", category: "Backend", size: "lg" },
    { name: "Spring Boot", category: "Backend", size: "md" },
    { name: "AWS", category: "Cloud", size: "lg" },
    { name: "Kubernetes", category: "Cloud", size: "lg" },
    { name: "Kafka", category: "Backend", size: "md" },
    { name: "Terraform", category: "Cloud", size: "md" },
];

export default function SkillsCloud() {
    return (
        <section className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 inline-block">
                        Anti-Gravity Skills
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center">
                    {skills.map((skill, index) => (
                        <FloatingSkill key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}

function FloatingSkill({ skill, index }: { skill: any; index: number }) {
    // Deterministic random based on index
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    // Random initial position within a range (deterministic)
    const randomX = seededRandom(index + 1) * 80 - 40; // -40% to 40%
    const randomY = seededRandom(index + 2) * 60 - 30; // -30% to 30%

    // Random float duration and delay (deterministic)
    const duration = 4 + seededRandom(index + 3) * 4;
    const delay = seededRandom(index + 4) * 2;

    return (
        <motion.div
            className={`absolute cursor-pointer group`}
            style={{
                left: `${50 + (index % 4 === 0 ? randomX : index % 4 === 1 ? -randomX : index % 4 === 2 ? randomX / 2 : -randomX / 2)}%`,
                top: `${50 + (index % 3 === 0 ? randomY : index % 3 === 1 ? -randomY : randomY / 2)}%`,
                zIndex: Math.floor(seededRandom(index + 5) * 10),
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <motion.div
                animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    rotate: [-2, 2, -2],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }}
                whileHover={{ scale: 1.1, zIndex: 50 }}
                className={`
          relative px-6 py-3 rounded-full backdrop-blur-md border transition-colors duration-300
          ${index % 2 === 0
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "bg-violet-500/10 border-violet-500/30 text-violet-200 hover:bg-violet-500/20 hover:border-violet-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    }
        `}
            >
                <span className={`font-mono font-bold ${skill.size === 'lg' ? 'text-lg' : 'text-base'}`}>
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
}
