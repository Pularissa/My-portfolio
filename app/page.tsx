import Hero from "../components/Hero";
import SkillsSection from "../components/SkillSection";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import ContactFooterPage from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsSection />
      <Projects/>
      <Experience/>
      <Testimonials/>
      <ContactFooterPage/>
    </main>
  );
}