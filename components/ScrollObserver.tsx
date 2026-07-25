'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollObserver() {
  useEffect(() => {

    /* ═══════════════════════════════════════════════════════════
       ↓1 + ↓3 + ↓8 + ↓9  — Reveal classes (Intersection Observer)
       Adds `.in-view` when elements enter, removes it on exit
       so reverse (up-scroll) animations replay automatically.
    ═══════════════════════════════════════════════════════════ */
    const revealSel = [
      '.reveal', '.reveal-left', '.reveal-right',
      '.reveal-scale', '.reveal-blur', '.reveal-rotate',
      '.reveal-line', '.reveal-clip',
    ].join(',');

    /* ── Enter observer (fires on scroll DOWN) ── */
    const enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('out-view');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    /* ── Exit observer (fires on scroll UP — ↑1 ↑3 ↑8 ↑9) ── */
    const exitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Only re-hide when element exits from ABOVE (i.e. user scrolled back up)
            const rect = entry.boundingClientRect;
            if (rect.bottom < 0) {
              // element scrolled off the top → re-apply hidden state for up-scroll reverse
              el.classList.remove('in-view');
              el.classList.add('out-view');
            }
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );

    const allRevealEls = Array.from(document.querySelectorAll(revealSel));
    allRevealEls.forEach((el) => {
      enterObserver.observe(el);
      exitObserver.observe(el);
    });

    /* Re-observe when new elements are injected (tab changes, etc.) */
    const mutationObs = new MutationObserver(() => {
      document.querySelectorAll(revealSel).forEach((el) => {
        if (!el.classList.contains('in-view') && !enterObserver) return;
        enterObserver.observe(el);
        exitObserver.observe(el);
      });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    /* ═══════════════════════════════════════════════════════════
       ↓4 / ↑4  Text Split — Character-level stagger with GSAP
       Targets `.split-text` for character split
       Targets `.split-words` for word split (existing)
    ═══════════════════════════════════════════════════════════ */

    /* Word-level split (existing, upgraded with span classes) */
    document.querySelectorAll('.split-words').forEach((el) => {
      const text = (el as HTMLElement).dataset.text || el.textContent || '';
      // Store original text for re-render safety
      if (!(el as HTMLElement).dataset.text) {
        (el as HTMLElement).dataset.text = text;
      }
      el.innerHTML = text
        .split(' ')
        .map(
          (word, i) =>
            `<span class="word-span" style="display:inline-block;overflow:hidden;margin-right:0.28em">` +
            `<span class="word-inner" style="display:inline-block;transition:transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, opacity 0.7s ease ${i * 70}ms">` +
            `${word}</span></span>`
        )
        .join('');
    });

    /* Character-level split for headings with `.split-chars` */
    document.querySelectorAll('.split-chars').forEach((el) => {
      const text = (el as HTMLElement).dataset.text || el.textContent || '';
      if (!(el as HTMLElement).dataset.text) {
        (el as HTMLElement).dataset.text = text;
      }
      el.innerHTML = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return `<span style="display:inline-block;width:0.32em">&nbsp;</span>`;
          return (
            `<span class="char-span" style="display:inline-block;` +
            `transition:transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 28}ms,` +
            `opacity 0.6s ease ${i * 28}ms,` +
            `filter 0.5s ease ${i * 28}ms">` +
            `${char}</span>`
          );
        })
        .join('');
    });

    /* GSAP-driven char reveal observer */
    const charEnterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const chars = el.querySelectorAll<HTMLElement>('.char-span');
          const words = el.querySelectorAll<HTMLElement>('.word-inner');

          if (entry.isIntersecting) {
            chars.forEach((c) => {
              c.style.transform = 'translateY(0) rotate(0deg)';
              c.style.opacity = '1';
              c.style.filter = 'blur(0px)';
            });
            words.forEach((w) => {
              w.style.transform = 'translateY(0)';
              w.style.opacity = '1';
            });
          } else {
            const rect = entry.boundingClientRect;
            if (rect.bottom < 0) {
              // ↑4 — Reverse: collapse chars back on scroll-up
              chars.forEach((c) => {
                c.style.transform = 'translateY(60%) rotate(8deg)';
                c.style.opacity = '0';
                c.style.filter = 'blur(4px)';
              });
              words.forEach((w) => {
                w.style.transform = 'translateY(100%)';
                w.style.opacity = '0';
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll('.split-chars, .split-words').forEach((el) => {
      // Set initial hidden state
      el.querySelectorAll<HTMLElement>('.char-span').forEach((c) => {
        c.style.transform = 'translateY(60%) rotate(8deg)';
        c.style.opacity = '0';
        c.style.filter = 'blur(4px)';
      });
      el.querySelectorAll<HTMLElement>('.word-inner').forEach((w) => {
        w.style.transform = 'translateY(100%)';
        w.style.opacity = '0';
      });
      charEnterObs.observe(el);
    });

    /* ═══════════════════════════════════════════════════════════
       ↓2 / ↑2  Parallax — GSAP ScrollTrigger multi-layer
    ═══════════════════════════════════════════════════════════ */
    const parallaxPairs: Array<{ sel: string; y: number }> = [
      { sel: '.hero-glow',        y: -60 },
      { sel: '.hero-image-frame', y: -35 },
      { sel: '.sk-bg-glow',       y: -45 },
      { sel: '.hero-ring',        y: -25 },
    ];

    const parallaxTweens = parallaxPairs.map(({ sel, y }) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return null;
      return gsap.to(el, {
        y,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    /* ═══════════════════════════════════════════════════════════
       Navbar: compact + hide/show on scroll (up-scroll ↑)
    ═══════════════════════════════════════════════════════════ */
    const navbar = document.querySelector('.navbar') as HTMLElement | null;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      /* Navbar compact */
      if (navbar) {
        navbar.classList.toggle('scrolled', y > 80);
        if (y > lastY + 8 && y > 200) {
          navbar.classList.add('nav-hidden');
        } else if (y < lastY - 4) {
          navbar.classList.remove('nav-hidden');
        }
      }

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      enterObserver.disconnect();
      exitObserver.disconnect();
      mutationObs.disconnect();
      charEnterObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      parallaxTweens.forEach((t) => {
        if (t?.scrollTrigger) t.scrollTrigger.kill();
        t?.kill();
      });
    };
  }, []);

  return null;
}
