import Navigation from "@/components/Navigation";
import { MusicProvider } from "@/context/MusicContext";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
    return (
        <MusicProvider>
            <Navigation />
            {children}
        </MusicProvider>
    );
}
