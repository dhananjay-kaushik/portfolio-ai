"use client";

import { motion } from "framer-motion";

const skillsData = {
    "Core Competencies": [
        "System Design",
        "Distributed Systems",
        "Cloud Architecture",
        "Full-Stack Development",
        "Performance Optimization",
        "Technical Leadership",
        "Technical Mentoring",
        "DevOps",
    ],

    "Programming Languages": [
        "Java",
        "JavaScript",
        "TypeScript",
        "Python"
    ],

    "Backend": [
        "Node.js",
        "Spring Boot",
        "Express.js",
        "FastAPI"
    ],

    "Frontend": [
        "React",
        "Next.js",
        "Angular"
    ],

    "Cloud & DevOps": [
        "AWS",
        "GCP",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Jenkins",
        "Kafka (Event Streaming)"
    ],

    "Databases": [
        "PostgreSQL",
        "MongoDB",
        "DynamoDB",
        "BigQuery",
        "Data Modeling",
        "Query Optimization"
    ],
};


export default function Skills() {
    return (
        <section id="skills" className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 lg:pl-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100 inline-block">
                        Skills
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="max-w-7xl mx-auto space-y-12">
                    {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
                        <SkillCategory
                            key={category}
                            category={category}
                            skills={skills}
                            index={categoryIndex}
                        />
                    ))}
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}

function SkillCategory({ category, skills, index }: { category: string; skills: string[]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
        >
            {/* Category Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-slate-200 inline-block">
                    {category}
                </h3>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => (
                    <SkillPill key={skill} skill={skill} index={skillIndex} />
                ))}
            </div>
        </motion.div>
    );
}

function SkillPill({ skill, index }: { skill: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            whileHover={{ scale: 1.01 }}
            className="group relative cursor-pointer"
        >
            {/* Pill Content */}
            <div className="relative px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm transition-all duration-300 group-hover:border-slate-600/70 group-hover:bg-slate-900/90 group-hover:shadow-sm group-hover:shadow-slate-700/30">
                <span className="font-mono text-xs text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-violet-400 transition-all duration-300">
                    {skill}
                </span>
            </div>
        </motion.div>
    );
}
