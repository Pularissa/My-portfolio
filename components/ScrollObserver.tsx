'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    let enterObs: IntersectionObserver;
    let mutObs: MutationObserver;

    const revealSel = [
      '.reveal', '.reveal-left', '.reveal-right',
      '.reveal-scale', '.reveal-blur', '.reveal-rotate',
      '.reveal-line', '.reveal-clip',
    ].join(',');

    // Add js-ready after first paint so elements render visibly first
    const timer = setTimeout(() => {
      document.body.classList.add('js-ready');

      // IntersectionObserver — triggers .in-view when element enters viewport
      enterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('in-view');
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      );

      document.querySelectorAll(revealSel).forEach(el => enterObs.observe(el));

      // Re-observe when tab changes inject new cards
      mutObs = new MutationObserver(() => {
        document.querySelectorAll(revealSel).forEach(el => {
          if (!el.classList.contains('in-view')) enterObs.observe(el);
        });
      });
      mutObs.observe(document.body, { childList: true, subtree: true });
    }, 60);

    // Parallax + navbar on scroll
    const heroGlow = () => document.querySelector('.hero-glow') as HTMLElement | null;
    const heroRing = () => document.querySelector('.hero-ring') as HTMLElement | null;
    const navbar   = () => document.querySelector('.navbar')    as HTMLElement | null;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const g = heroGlow();
      const r = heroRing();
      const n = navbar();

      if (g) g.style.transform = `translateY(${y * 0.22}px)`;
      if (r) r.style.transform = `translateY(${y * 0.08}px) rotate(${y * 0.018}deg)`;

      if (n) {
        n.classList.toggle('scrolled', y > 80);
        if (y > lastY + 10 && y > 200) n.classList.add('nav-hidden');
        else if (y < lastY - 6) n.classList.remove('nav-hidden');
      }

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('js-ready');
      enterObs?.disconnect();
      mutObs?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
