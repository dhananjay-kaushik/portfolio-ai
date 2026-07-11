"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogs } from "@/content/blogs/meta";

export default function LatestWriting() {
    if (blogs.length === 0) return null;

    const posts = [...blogs]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 3);

    return (
        <section className="py-24 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6 lg:pl-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100 inline-block">
                        Writing
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Link
                                href={`/blogs/${post.slug}`}
                                className="group block h-full rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden hover:border-cyan-400/40 transition-colors"
                            >
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 line-clamp-2">{post.subtitle}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
                    >
                        All writing
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
