export interface BlogMeta {
    slug: string;
    title: string;
    subtitle: string;
    date: string; // YYYY-MM-DD
    coverImage: string;
}

export const blogs: BlogMeta[] = [
    {
        slug: "cant-read-my-own-code",
        title: "The Day I Couldn't Read My Own Code",
        subtitle: "I wrote it. Or I approved it. At some point those stopped being the same thing.",
        date: "2026-07-12",
        coverImage: "/blogs/cant-read-my-own-code/cover-craft-delegation.png",
    },
    {
        slug: "eager-junior-developer",
        title: "The Junior Developer Who Read Every Book and Learned Nothing",
        subtitle: "It has read more code than you ever will. It has never once been on call.",
        date: "2026-07-11",
        coverImage: "/blogs/eager-junior-developer/cover-eager-junior.png",
    },
];

export function getBlogBySlug(slug: string): BlogMeta | undefined {
    return blogs.find((b) => b.slug === slug);
}
