'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { setLenis } from '../lib/lenisInstance';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });

    /* Store in singleton so other components can access the Lenis instance */
    setLenis(lenis);

    /* Forward every Lenis scroll tick as a window CustomEvent.
       Components listen to 'lenis:scroll' regardless of mount order. */
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      window.dispatchEvent(new CustomEvent('lenis:scroll', { detail: { scroll } }));
    });

    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      setLenis(null);
      gsap.ticker.remove(rafCb);
    };
  }, []);

  return <>{children}</>;
}
