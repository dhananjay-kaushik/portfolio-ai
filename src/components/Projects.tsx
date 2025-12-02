"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "Customer Insights Platform",
        description: "Real-time analytics engine processing millions of events daily. Reduced query latency by 70% and saved $500K/yr in infrastructure costs through optimized data partitioning.",
        tech: ["SpringBoot", "FastAPI", "PostgreSQL", "Angular", "GCP", "Docker", "Jenkins"],
        link: "http://247ci-butterfly-prd.cloud.247-inc.net/interactions?clientid=bjs&accountid=bjs",
        color: "cyan" as const,
    },
    {
        title: "Indreka",
        description: "Unified Cloud Collaboration Platform featuring a complex marketplace orchestration engine. Built scalable microservices architecture handling high-concurrency transactions.",
        tech: ["React.js", "SpringBoot", "AWS", "Docker", "K8S", "PostgreSQL"],
        link: "https://zarthi.com/",
        color: "violet" as const,
    },
    {
        title: "Atlas (Centilytics)",
        description: "Multi-cloud management & compliance automation platform. Implemented automated remediation workflows and real-time cost anomaly detection.",
        tech: ["Angular", "SpringBoot", "AWS", "Docker", "K8S", "BigQuery", "DynamoDB"],
        link: "https://atlas.centilytics.com/",
        color: "cyan" as const,
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 lg:pl-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 inline-block">
                        Projects
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-1000">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="h-[400px]"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
