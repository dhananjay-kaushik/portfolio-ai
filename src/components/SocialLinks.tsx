"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { contactConfig } from "@/config/contact";

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        url: contactConfig.social.github,
        color: "hover:text-slate-200",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: contactConfig.social.linkedin,
        color: "hover:text-blue-400",
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: contactConfig.social.instagram,
        color: "hover:text-pink-400",
    },
    {
        name: "Email",
        icon: Mail,
        url: `mailto:${contactConfig.email}`,
        color: "hover:text-violet-400",
    },
];

export default function SocialLinks() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="fixed z-50 transition-all duration-300 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto w-full bottom-0 left-0 bg-slate-950/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-t border-slate-800 lg:border-none py-4 lg:py-0"
        >
            <div className="flex lg:flex-col flex-row items-center justify-center lg:justify-start gap-6">
                {/* Decorative line - Top */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-transparent to-slate-600 mx-auto"
                />

                {socialLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target={link.name === "Email" ? undefined : "_blank"}
                        rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.15 }}
                        className={`text-slate-400 transition-colors duration-300 ${link.color}`}
                        aria-label={link.name}
                    >
                        <link.icon className="w-5 h-5" />
                    </motion.a>
                ))}

                {/* Decorative line - Bottom */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-slate-600 to-transparent mx-auto"
                />
            </div>
        </motion.div>
    );
}
