"use client";

import { motion } from "framer-motion";
import { Terminal, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        console.log("Form submitted:", formState);
        alert("Message transmitted to the void (console.log)!");
    };

    return (
        <section className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
                        {/* Terminal Header */}
                        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                                <Terminal className="w-3 h-3" />
                                contact@dhananjay.dev
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm md:text-base">
                            <div className="mb-6 text-slate-400">
                                <span className="text-green-400">➜</span> <span className="text-cyan-400">~</span> initialize_contact_protocol.sh
                                <br />
                                <span className="text-slate-500">Executing handshake sequence...</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="group">
                                    <label className="block text-slate-500 mb-1 text-xs">NAME</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">❯</span>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 text-slate-200 w-full placeholder-slate-700"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-slate-500 mb-1 text-xs">EMAIL</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">❯</span>
                                        <input
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 text-slate-200 w-full placeholder-slate-700"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-slate-500 mb-1 text-xs">MESSAGE</label>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">❯</span>
                                        <textarea
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 text-slate-200 w-full h-32 resize-none placeholder-slate-700"
                                            placeholder="Type your message..."
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 px-6 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center"
                                >
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Transmit Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <footer className="mt-12 text-center text-slate-600 text-sm font-mono">
                        <p>Crafted with Next.js by Dhananjay Kaushik.</p>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
}
