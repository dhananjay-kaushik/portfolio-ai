"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "Staff Engineer",
        company: "247.ai",
        period: "06/2025 – Present",
        description: "Own technical strategy and architecture for product modernization and scalable system design.",
        metrics: [
            "Mentor engineers across teams in distributed systems",
            "Define and enforce engineering standards",
            "CI/CD pipelines and observability best practices",
            "Champion developer excellence via code reviews"
        ],
        color: "cyan",
    },
    {
        id: 2,
        role: "Software Development Engineer (SDE 3)",
        company: "247.ai",
        period: "01/2024 – 06/2025",
        description: "Architected Customer Insights platform reducing latency by 70% and saving $500K+ annually.",
        metrics: [
            "Built real-time data pipelines and dashboards",
            "Improved backend performance by 40%",
            "Integrated CI/CD and canary releases",
            "Led 50+ architecture/code reviews"
        ],
        color: "cyan",
    },
    {
        id: 3,
        role: "Assistant Manager",
        company: "Centilytics",
        period: "10/2021 – 01/2024",
        description: "Spearheaded modular architecture adoption across 50+ engineers, improving efficiency by ~25%.",
        metrics: [
            "Designed core systems (ETL, API Gateway)",
            "Platform SLA to 99.9%",
            "Delivered IndreKa MVP",
            "Established CI gates and review culture"
        ],
        color: "violet",
    },
    {
        id: 4,
        role: "Senior Software Engineer",
        company: "Centilytics",
        period: "10/2020 – 10/2021",
        description: "Rebuilt Angular frontend, improving render speed by 2x and reducing Time to Interactive (TTI) by 60%.",
        metrics: [
            "Implemented RSocket-based real-time dashboard",
            "Developed secure internal access control",
            "Automated QA tools",
            "Led cross-functional collaborations"
        ],
        color: "violet",
    },
    {
        id: 5,
        role: "Software Engineer",
        company: "Centilytics",
        period: "07/2018 – 10/2020",
        description: "Built 20+ Angular modules and backend services for cloud inventory and compliance.",
        metrics: [
            "Automated AWS/Azure pipelines",
            "Reduced latency by 45%",
            "Integrated 10+ external APIs",
            "Mentored new hires"
        ],
        color: "violet",
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
        <section id="timeline" ref={containerRef} className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100 inline-block">
                        Journey
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:-translate-x-1/2" />

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Timeline Dot */}
            <div className="absolute left-2 md:left-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 z-10 -translate-x-1/2 mt-1.5 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
            </div>

            {/* Content */}
            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass-panel p-4 md:p-6 rounded-xl hover:border-cyan-400/30 transition-colors group">
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

                    <div className="flex flex-col gap-1">
                        {experience.metrics.map((metric: string, i: number) => (
                            <div
                                key={i}
                                className="text-xs text-slate-400 flex items-center gap-2"
                            >
                                <ChevronRight className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                                <span>{metric}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
