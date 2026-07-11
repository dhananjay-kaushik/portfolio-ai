import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogs } from "@/content/blogs/meta";

export const metadata: Metadata = {
    title: "Writing | Dhananjay Kaushik",
    description: "Essays on engineering, AI, and building software.",
};

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-28 md:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">Writing</h1>
                <p className="text-slate-400 mb-16">Essays on engineering, AI, and building software.</p>

                <div className="flex flex-col gap-6">
                    {blogs.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blogs/${post.slug}`}
                            className="group glass-panel rounded-xl overflow-hidden hover:border-cyan-400/40 transition-colors"
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
                                <h2 className="text-xl md:text-2xl font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-slate-400 mb-3">{post.subtitle}</p>
                                <time className="text-xs font-mono text-slate-500">
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
