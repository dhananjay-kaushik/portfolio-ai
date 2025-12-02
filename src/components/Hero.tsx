"use client";

import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import StarBackground from "./StarBackground";
import { useMusic } from "@/context/MusicContext";

export default function Hero() {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const yImage = useTransform(scrollY, [0, 500], [0, 100]);
    const { isPlaying } = useMusic();

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">

            <div className="relative z-10 container mx-auto px-6 lg:pl-20 flex flex-col lg:flex-row items-center">
                <motion.div
                    style={{ y: yText }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 lg:w-1/2 z-30"
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
                        <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-100 text-glow mb-6 break-words max-w-full">
                            I'm Dhananjay Kaushik
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
                            <span className="font-bold text-cyan-400">Designer, Developer and Educator.</span>
                            <br />
                            A curiosity-driven developer who builds, designs, and shares knowledge — shaping high-quality systems through problem-solving and technical leadership.
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

                {/* Coding Person Visual - Now in flow */}
                <div className="absolute -bottom-[230px] -right-[60px] w-[280px] h-[400px] max-[580px]:h-[340px] opacity-90 lg:opacity-100 lg:static lg:w-1/2 lg:h-auto lg:flex items-center justify-center z-0 lg:z-10 pointer-events-none lg:pointer-events-auto">
                    <motion.div
                        style={{ y: yImage }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="relative lg:left-12 xl:left-24 w-full h-full lg:w-auto lg:h-auto"
                    >
                        <div className="relative w-full h-full lg:w-[700px] lg:h-[700px] xl:w-[1000px] xl:h-[1000px]">
                            {/* Music Notes Animation - Near Headphones - Only show when music is playing */}
                            {isPlaying && (
                                <div className="absolute top-[25%] left-[20%] z-30 flex gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: [0, -40, 0],
                                                opacity: [0, 1, 0],
                                                scale: [0.8, 1.2, 0.8],
                                                x: [0, i % 2 === 0 ? 20 : -20, 0]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                delay: i * 0.6,
                                                ease: "easeInOut",
                                            }}
                                            className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lg:w-10 lg:h-10"
                                            >
                                                <path d="M9 18V5l12-2v13" />
                                                <circle cx="6" cy="18" r="3" />
                                                <circle cx="18" cy="16" r="3" />
                                            </svg>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <img
                                src="/coding-person.png"
                                alt="Coding Person"
                                className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(34,211,238,0.15)]"
                            />
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Star Background */}
            <StarBackground />
        </section>
    );
}
