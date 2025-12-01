"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "Staff Engineer",
        company: "247.ai",
        period: "Jan 2024 - Present",
        description: "Leading product modernization and scalable system design for high-traffic distributed applications.",
        metrics: ["Product Modernization", "Scalable System Design"],
        color: "cyan",
    },
    {
        id: 2,
        role: "Senior Software Engineer",
        company: "Centilytics",
        period: "Previous",
        description: "Architected core infrastructure components and optimized cloud cost management algorithms.",
        metrics: ["Reduced latency by 70%", "Saved $500K+ annually"],
        color: "violet",
    },
    {
        id: 3,
        role: "Assistant Manager",
        company: "Centilytics",
        period: "Previous",
        description: "Managed backend development teams and improved system reliability.",
        metrics: ["Improved backend performance by 40%", "Team Leadership"],
        color: "cyan",
    },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 inline-block">
                        The Trajectory
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <TimelineItem key={exp.id} experience={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ experience, index }: { experience: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 z-10 md:-translate-x-1/2 mt-1.5 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
            </div>

            {/* Content */}
            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass-panel p-6 rounded-xl hover:border-cyan-400/30 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-mono ${experience.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}>
                            {experience.period}
                        </span>
                        <Briefcase className="w-4 h-4 text-slate-500" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-cyan-200 transition-colors">
                        {experience.role}
                    </h3>

                    <div className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        {experience.company}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {experience.metrics.map((metric: string, i: number) => (
                            <span
                                key={i}
                                className="text-xs font-mono px-2 py-1 rounded bg-slate-800/50 text-slate-300 border border-slate-700/50 flex items-center gap-1"
                            >
                                <ChevronRight className="w-3 h-3 text-cyan-500" />
                                {metric}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
