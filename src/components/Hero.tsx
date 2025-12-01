"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import StarBackground from "./StarBackground";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">

            <div className="relative z-10 container mx-auto px-6 lg:pl-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col items-start justify-center"
                    >
                        <span className="text-xl md:text-2xl font-mono text-cyan-400 mb-4">
                            Hello
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-100 text-glow mb-6">
                            I'm Dhananjay Kaushik
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
                            <span className="font-bold text-cyan-400">Designer, Developer and Educator.</span>
                            <br />
                            Staff Engineer building scalable web apps & distributed systems.
                            <br />
                            Tech Junkie always looking for something to learn.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-8"
                    >
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] overflow-hidden cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2 font-mono font-bold">
                                Contact Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button
                            onClick={() => window.open('/DhananjayKaushik_Resume_Staff_Engineer.pdf', '_blank')}
                            className="px-8 py-3 text-slate-400 hover:text-slate-200 transition-colors font-mono flex items-center gap-2 cursor-pointer"
                        >
                            <Download className="w-4 h-4" /> Download Resume
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Star Background */}
            <StarBackground />
        </section>
    );
}
