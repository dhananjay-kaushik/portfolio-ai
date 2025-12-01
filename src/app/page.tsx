import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import SkillsCloud from "@/components/SkillsCloud";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30">
      <Hero />
      <Timeline />
      <SkillsCloud />
      <Projects />
      <Contact />
    </main>
  );
}
