"use client";

import { motion } from "framer-motion";
import { Terminal, Send, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { contactConfig } from "@/config/contact";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "@/config/emailjs";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setStatusMessage("");

        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                {
                    from_name: formState.name,
                    from_email: formState.email,
                    message: formState.message,
                },
                emailjsConfig.publicKey
            );

            if (result.status === 200) {
                setStatus("success");
                setStatusMessage("Message transmitted successfully! I'll get back to you soon.");
                // Reset form
                setFormState({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setStatusMessage(
                "Transmission failed. Please try again or contact me directly at " + contactConfig.email
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 lg:pl-20 relative z-10">
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
                                contact@dhananjay.kaushik
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm md:text-base">
                            <div className="mb-6 text-slate-400">
                                <span className="text-green-400">➜</span> <span className="text-cyan-400">~</span> initialize_contact_protocol.sh
                                <br />
                                <span className="text-slate-500">Executing handshake sequence...</span>
                                <br />
                                <span className="text-slate-600">{">"} Contact me directly at </span>
                                <a
                                    href={`mailto:${contactConfig.email}`}
                                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition-colors"
                                >
                                    {contactConfig.email}
                                </a>
                                <span className="text-slate-600"> or fill the form below</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="group">
                                    <label className="block text-slate-500 mb-1 text-xs">NAME</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">❯</span>
                                        <input
                                            suppressHydrationWarning
                                            type="text"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-slate-200 w-full placeholder-slate-700"
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
                                            suppressHydrationWarning
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-slate-200 w-full placeholder-slate-700"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-slate-500 mb-1 text-xs">MESSAGE</label>
                                    <div className="flex gap-2">
                                        <span className="text-green-400">❯</span>
                                        <textarea
                                            suppressHydrationWarning
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-slate-200 w-full h-32 resize-none placeholder-slate-700"
                                            placeholder="Type your message..."
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    suppressHydrationWarning
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-4 px-6 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"
                                            />
                                            Transmitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            Transmit Message
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {status !== "idle" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mt-4 p-3 rounded border flex items-center gap-2 ${status === "success"
                                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                                            : "bg-red-500/10 border-red-500/30 text-red-400"
                                            }`}
                                    >
                                        {status === "success" ? (
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        ) : (
                                            <XCircle className="w-4 h-4 flex-shrink-0" />
                                        )}
                                        <span className="text-sm">{statusMessage}</span>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </div>

                    <footer className="mt-12 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm font-mono">
                            <span className="text-slate-600">Crafted with</span>
                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-red-500"
                            >
                                ❤️
                            </motion.span>
                            <span className="text-slate-600">by</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 font-bold">
                                Dhananjay Kaushik
                            </span>
                        </div>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
}
