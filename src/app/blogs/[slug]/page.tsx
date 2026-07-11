import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { blogs, getBlogBySlug } from "@/content/blogs/meta";

export function generateStaticParams() {
    return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogBySlug(slug);
    if (!post) return {};

    const url = `https://www.dhananjay-ai.xyz/blogs/${post.slug}`;
    return {
        title: `${post.title} | Dhananjay Kaushik`,
        description: post.subtitle,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.subtitle,
            url,
            images: [post.coverImage],
            type: "article",
        },
    };
}

function getContentHtml(slug: string): string | null {
    const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.html`);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf-8");
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogBySlug(slug);
    const html = post ? getContentHtml(slug) : null;

    if (!post || !html) notFound();

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-28 md:py-32">
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    All writing
                </Link>

                <h1 className="text-3xl md:text-5xl font-bold font-display mb-4 leading-tight">
                    {post.title}
                </h1>
                <p className="text-lg text-slate-400 italic mb-4">{post.subtitle}</p>
                <time className="text-xs font-mono text-slate-500 block mb-10">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                <div className="mt-16 pt-8 border-t border-slate-800 text-slate-300">
                    ☕ Found this helpful?{" "}
                    <a
                        href="https://buymeachai.in/dhananjaykaushik96"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                        Buy me a chai
                    </a>{" "}
                    to help me keep writing and sharing free engineering insights.
                </div>
            </article>
        </main>
    );
}
