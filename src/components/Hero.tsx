"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import GravityField from "./GravityField";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            <GravityField />

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-100 text-glow">
                            Architecting
                            <br />
                            <span className="text-cyan-400">Resilient Systems</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Hi, I’m <span className="text-slate-200 font-medium">Dhananjay Kaushik</span>.
                        Staff Engineer building scalable web apps & distributed systems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <button className="group relative px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2 font-mono font-bold">
                                View Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className="px-8 py-3 text-slate-400 hover:text-slate-200 transition-colors font-mono flex items-center gap-2">
                            <Download className="w-4 h-4" /> Download Resume
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </section>
    );
}
