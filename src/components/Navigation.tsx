"use client";

import { Home, User, Briefcase, Code, Mail, Map, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";

const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "timeline", icon: Map, label: "Journey" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const { isPlaying, toggleMusic } = useMusic();

    useEffect(() => {
        // Intersection Observer for active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is visible
                rootMargin: "-10% 0px -10% 0px" // Adjust detection area
            }
        );

        // Observe all sections
        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);



    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="fixed top-6 right-6 md:right-12 z-50 flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 rounded-full bg-slate-950/50 backdrop-blur-md border border-slate-800/50">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`relative p-2 transition-colors rounded-full hover:bg-slate-800/50 group ${activeSection === item.id ? "text-cyan-400 bg-slate-800/50" : "text-slate-400 hover:text-cyan-400"
                            }`}
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono text-cyan-400 bg-slate-900/90 border border-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                    </button>
                ))}

                {/* Divider */}
                <div className="w-px h-6 bg-slate-800 mx-1"></div>

                {/* Music Toggle */}
                <button
                    onClick={toggleMusic}
                    className={`relative p-2 rounded-full transition-colors group ${isPlaying ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"}`}
                    title={isPlaying ? "Turn Off Music" : "Turn On Music"}
                >
                    {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono text-cyan-400 bg-slate-900/90 border border-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {isPlaying ? "Mute" : "Play"}
                    </span>
                </button>
            </div>
        </div>
    );
}
