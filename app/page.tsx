import Hero from "../components/Hero";
import SkillsSection from "../components/SkillSection";
import Projects from "../components/Projects";
import Experience from "../components/Experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsSection />
      <Projects/>
      <Experience/>
    </main>
  );
}