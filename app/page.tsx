import Intro from "../components/Intro";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import StickyAbout from "../components/StickyAbout";
import SkillsSection from "../components/SkillSection";
import HScrollStrip from "../components/HScrollStrip";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import ContactFooterPage from "../components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Hero />
        <Marquee />
        <StickyAbout />
        <SkillsSection />
        <HScrollStrip />
        <Projects />
        <Experience />
        <Testimonials />
        <ContactFooterPage />
      </main>
    </>
  );
}
