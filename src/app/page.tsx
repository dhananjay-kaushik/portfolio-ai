import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialLinks from "@/components/SocialLinks";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { MusicProvider } from "@/context/MusicContext";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30">
      <MusicProvider>
        <Navigation />
        <SocialLinks />
        <div id="hero">
          <Hero />
        </div>
        <Timeline />
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <ScrollToTop />
      </MusicProvider>
    </main>
  );
}
