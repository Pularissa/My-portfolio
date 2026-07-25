'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  /** How many px to shift per 100px of scroll. Positive = moves down (slow), negative = moves up (fast). Default: -40 */
  speed?: number;
  /** ScrollTrigger scrub value. true = 1. Default: true */
  scrub?: boolean | number;
  /** Extra trigger start. Default: 'top bottom' */
  start?: string;
  /** Extra trigger end. Default: 'bottom top' */
  end?: string;
}

/**
 * Attach GSAP ScrollTrigger parallax to a ref element.
 * Returns the ref — attach it to the element you want to move.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  opts: ParallaxOptions = {}
) {
  const { speed = -40, scrub = 1.2, start = 'top bottom', end = 'bottom top' } = opts;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = gsap.to(el, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });

    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill();
      st.kill();
    };
  }, [speed, scrub, start, end]);

  return ref;
}

/**
 * Multi-element parallax — pass an array of { selector, speed } pairs
 * and they all get wired to the same trigger element.
 */
export function useGsapMultiParallax(
  triggerSelector: string,
  layers: Array<{ selector: string; speed: number }>,
  scrub: boolean | number = 1.2
) {
  useEffect(() => {
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    const tweens = layers.map(({ selector, speed }) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el) return null;
      return gsap.to(el, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      });
    });

    return () => {
      tweens.forEach((t) => {
        if (t?.scrollTrigger) t.scrollTrigger.kill();
        t?.kill();
      });
    };
  }, [triggerSelector, layers, scrub]);
}
