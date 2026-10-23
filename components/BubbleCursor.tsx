'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Droplet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
}

const VIEW_SIZE = 340;
const HALF_SIZE = VIEW_SIZE / 2; // 170

export default function BubbleCursor() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipPathElemRef = useRef<SVGPathElement>(null);
  const boundaryPathRef = useRef<SVGPathElement>(null);
  const darkRimRef = useRef<SVGPathElement>(null);
  const specArcRef = useRef<SVGPathElement>(null);
  const specArcGlowRef = useRef<SVGPathElement>(null);
  const rimArcRef = useRef<SVGPathElement>(null);
  const centerDotRef = useRef<HTMLDivElement>(null);
  const ripplesGroupRef = useRef<SVGGElement>(null);
  const dropletsGroupRef = useRef<SVGGElement>(null);
  const specGleamRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Ignore on touch-only mobile devices
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let vx = 0;
    let vy = 0;
    let prevSpeed = 0;
    let wobbleAmp = 0;
    let wobblePhase = 0;
    let clickImpulse = 0;
    let clickVelocity = 0;
    let isHoveringInteractive = false;
    let hoverScale = 1.0;
    let isVisible = false;

    const ripples: Ripple[] = [];
    const droplets: Droplet[] = [];
    let nextId = 0;

    const N = 12; // 12-point smooth organic fluid contour
    const angles: number[] = [];
    for (let i = 0; i < N; i++) {
      angles.push((i * 2 * Math.PI) / N);
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        currentX = targetX;
        currentY = targetY;
        if (containerRef.current) containerRef.current.style.opacity = '1';
        if (centerDotRef.current) centerDotRef.current.style.opacity = '1';
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Atmospheric pressure compression squish
      clickImpulse = -26;
      clickVelocity = 0;

      // Concentric shockwave ripple
      ripples.push({
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
        r: 18,
        maxR: 110,
        opacity: 0.9,
      });

      // Spawn 3-5 luminous micro-bubbles
      for (let k = 0; k < 4; k++) {
        const pAngle = Math.random() * Math.PI * 2;
        const pDist = 35 + Math.random() * 30;
        const pSpeed = 2 + Math.random() * 4;
        droplets.push({
          id: nextId++,
          x: e.clientX + Math.cos(pAngle) * pDist,
          y: e.clientY + Math.sin(pAngle) * pDist,
          vx: Math.cos(pAngle) * pSpeed,
          vy: Math.sin(pAngle) * pSpeed - 1.0,
          size: 4 + Math.random() * 6.5,
          opacity: 0.95,
          life: 0,
          maxLife: 35 + Math.random() * 20,
        });
      }
    };

    const onMouseUp = () => {
      // Elastic rebound bounce
      clickImpulse = 20;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, [role="button"], input, textarea, select, .hero-btn-primary, .hero-btn-secondary, .sk-card, .timeline-card, .testimonial-card, .project-card, .hscroll-card, .nav-cta, .logo'
        )
      ) {
        isHoveringInteractive = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related ||
        !related.closest(
          'a, button, [role="button"], input, textarea, select, .hero-btn-primary, .hero-btn-secondary, .sk-card, .timeline-card, .testimonial-card, .project-card, .hscroll-card, .nav-cta, .logo'
        )
      ) {
        isHoveringInteractive = false;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) containerRef.current.style.opacity = '0';
      if (centerDotRef.current) centerDotRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) containerRef.current.style.opacity = '1';
      if (centerDotRef.current) centerDotRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    let time = 0;

    // Helper: generate smooth closed quadratic bezier SVG path through points
    const pointsToSmoothPath = (pts: { x: number; y: number }[]) => {
      const len = pts.length;
      if (len < 3) return '';
      const midpoints: { x: number; y: number }[] = [];
      for (let i = 0; i < len; i++) {
        const next = pts[(i + 1) % len];
        midpoints.push({
          x: (pts[i].x + next.x) / 2,
          y: (pts[i].y + next.y) / 2,
        });
      }
      let d = `M ${midpoints[len - 1].x.toFixed(2)} ${midpoints[len - 1].y.toFixed(2)}`;
      for (let i = 0; i < len; i++) {
        d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${midpoints[i].x.toFixed(2)} ${midpoints[i].y.toFixed(2)}`;
      }
      return d + ' Z';
    };

    // Helper: generate smooth open arc through a subset of points
    const pointsToOpenArc = (pts: { x: number; y: number }[]) => {
      if (pts.length < 2) return '';
      let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
      }
      d += ` L ${pts[pts.length - 1].x.toFixed(2)} ${pts[pts.length - 1].y.toFixed(2)}`;
      return d;
    };

    const render = () => {
      time += 0.026;

      // 1. Viscous Spring-Damper Inertial Follow
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const spring = 0.095;
      const damping = 0.77;

      vx += dx * spring;
      vy += dy * spring;
      vx *= damping;
      vy *= damping;

      currentX += vx;
      currentY += vy;

      const speed = Math.hypot(vx, vy);
      const moveAngle = Math.atan2(vy, vx);

      // 2. Squash and Stretch factor along movement velocity
      const stretchRatio = Math.min(speed * 0.013, 0.46);

      // 3. Deceleration Jelly Wobble
      if (prevSpeed - speed > 1.3) {
        wobbleAmp = Math.min(wobbleAmp + (prevSpeed - speed) * 0.88, 28);
      }
      prevSpeed = speed;
      wobbleAmp *= 0.935;
      wobblePhase += 0.22;

      // 4. Click compression spring decay
      clickVelocity += (0 - clickImpulse) * 0.22;
      clickVelocity *= 0.72;
      clickImpulse += clickVelocity;

      // 5. Interactive target hover expansion (matches Hero Liquid Lens scale)
      const targetHoverScale = isHoveringInteractive ? 1.25 : 1.0;
      hoverScale += (targetHoverScale - hoverScale) * 0.12;

      // Base radius ~94px (approx 188px diameter, expanding to ~235px on hover)
      const baseR = 94 * hoverScale;

      // Spawn micro-droplets on high velocity flick
      if (speed > 16 && Math.random() < 0.24 && droplets.length < 12) {
        const spawnAngle = moveAngle + Math.PI + (Math.random() - 0.5) * 1.3;
        droplets.push({
          id: nextId++,
          x: currentX + Math.cos(spawnAngle) * (baseR * 0.75),
          y: currentY + Math.sin(spawnAngle) * (baseR * 0.75),
          vx: -vx * 0.22 + (Math.random() - 0.5) * 1.5,
          vy: -vy * 0.22 + (Math.random() - 0.5) * 1.5 - 0.5,
          size: 3.5 + Math.random() * 5.5,
          opacity: 0.85,
          life: 0,
          maxLife: 26 + Math.random() * 14,
        });
      }

      // 6. Compute 12 contour points centered at (HALF_SIZE, HALF_SIZE)
      const bubblePts: { x: number; y: number }[] = [];
      const specPts: { x: number; y: number }[] = [];
      const rimPts: { x: number; y: number }[] = [];
      const darkRimPts: { x: number; y: number }[] = [];

      for (let i = 0; i < N; i++) {
        const theta = angles[i];

        // Multi-frequency sinusoidal fluid waves (surface tension breathing)
        const idleWave =
          Math.sin(time * 2.1 + i * 1.8) * 5.8 +
          Math.cos(time * 1.3 + i * 2.9) * 4.2 +
          Math.sin(time * 3.2 + theta * 3) * 2.2;

        // Velocity stretch along travel vector (area-preserving ellipse)
        const angleDiff = theta - moveAngle;
        const velStretch = stretchRatio * 36 * Math.cos(2 * angleDiff);

        // Damped jelly oscillation
        const jellyWobble = wobbleAmp * Math.sin(wobblePhase + i * 1.7);

        // Instantaneous radius
        const r = Math.max(35, baseR + idleWave + velStretch + jellyWobble + clickImpulse);

        const px = HALF_SIZE + r * Math.cos(theta);
        const py = HALF_SIZE + r * Math.sin(theta);
        bubblePts.push({ x: px, y: py });

        // Dark Fresnel refractive inner rim points (inset by 4px)
        const darkR = r - 4;
        darkRimPts.push({
          x: HALF_SIZE + darkR * Math.cos(theta),
          y: HALF_SIZE + darkR * Math.sin(theta),
        });

        // Top-left specular highlight arc (angles ~180° to ~300°, i = 6 to 10)
        // Inset by 6.5px to hug the upper-left crest
        if (i >= 6 && i <= 10) {
          const specR = r - 6.5;
          specPts.push({
            x: HALF_SIZE + specR * Math.cos(theta),
            y: HALF_SIZE + specR * Math.sin(theta),
          });
        }

        // Bottom-right rim light arc (angles ~30° to ~120°, i = 1 to 4)
        if (i >= 1 && i <= 4) {
          const rimR = r - 5;
          rimPts.push({
            x: HALF_SIZE + rimR * Math.cos(theta),
            y: HALF_SIZE + rimR * Math.sin(theta),
          });
        }
      }

      const smoothPathD = pointsToSmoothPath(bubblePts);
      const darkRimPathD = pointsToSmoothPath(darkRimPts);

      // Update main SVG paths and clip path
      if (pathRef.current) pathRef.current.setAttribute('d', smoothPathD);
      if (clipPathElemRef.current) clipPathElemRef.current.setAttribute('d', smoothPathD);
      if (boundaryPathRef.current) boundaryPathRef.current.setAttribute('d', smoothPathD);
      if (darkRimRef.current) darkRimRef.current.setAttribute('d', darkRimPathD);

      // Update top-left signature highlight arc
      if (specArcRef.current && specPts.length > 1) {
        const specArcD = pointsToOpenArc(specPts);
        specArcRef.current.setAttribute('d', specArcD);
        if (specArcGlowRef.current) specArcGlowRef.current.setAttribute('d', specArcD);
      }
      // Update bottom-right rim highlight arc
      if (rimArcRef.current && rimPts.length > 1) {
        rimArcRef.current.setAttribute('d', pointsToOpenArc(rimPts));
      }

      // Update oval specular gleam spot
      if (specGleamRef.current) {
        const gleamX = HALF_SIZE - baseR * 0.38 + Math.sin(time) * 2;
        const gleamY = HALF_SIZE - baseR * 0.42 + Math.cos(time * 0.8) * 2;
        const gleamRx = baseR * 0.22;
        const gleamRy = baseR * 0.12;
        specGleamRef.current.setAttribute('cx', gleamX.toFixed(2));
        specGleamRef.current.setAttribute('cy', gleamY.toFixed(2));
        specGleamRef.current.setAttribute('rx', gleamRx.toFixed(2));
        specGleamRef.current.setAttribute('ry', gleamRy.toFixed(2));
        specGleamRef.current.setAttribute('transform', `rotate(-32, ${gleamX}, ${gleamY})`);
      }

      // Translate Bubble Container
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentX - HALF_SIZE}px, ${currentY - HALF_SIZE}px, 0)`;
      }

      // Translate Precision Center Dot (tracks mouse with zero lag)
      if (centerDotRef.current) {
        centerDotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        if (isHoveringInteractive) {
          centerDotRef.current.classList.add('hovering');
        } else {
          centerDotRef.current.classList.remove('hovering');
        }
      }

      // 7. Update Ripples
      if (ripplesGroupRef.current) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.r += (rip.maxR - rip.r) * 0.14 + 1.2;
          rip.opacity *= 0.905;
          if (rip.opacity < 0.02 || rip.r >= rip.maxR - 2) {
            ripples.splice(i, 1);
          }
        }
        let ripplesSvg = '';
        for (const rip of ripples) {
          ripplesSvg += `<circle cx="${(HALF_SIZE + rip.x - currentX).toFixed(1)}" cy="${(HALF_SIZE + rip.y - currentY).toFixed(1)}" r="${rip.r.toFixed(1)}" fill="none" stroke="rgba(255,255,255,${rip.opacity.toFixed(3)})" stroke-width="2.5" stroke-dasharray="4 2" />`;
        }
        ripplesGroupRef.current.innerHTML = ripplesSvg;
      }

      // 8. Update Micro-droplets
      if (dropletsGroupRef.current) {
        for (let i = droplets.length - 1; i >= 0; i--) {
          const d = droplets[i];
          d.life++;
          d.x += d.vx;
          d.y += d.vy;
          d.vx *= 0.94;
          d.vy *= 0.94;
          d.opacity = Math.max(0, 1 - d.life / d.maxLife);
          if (d.life >= d.maxLife) {
            droplets.splice(i, 1);
          }
        }
        let dropletsSvg = '';
        for (const d of droplets) {
          const relX = (HALF_SIZE + d.x - currentX).toFixed(1);
          const relY = (HALF_SIZE + d.y - currentY).toFixed(1);
          const s = d.size.toFixed(1);
          const op = (d.opacity * 0.88).toFixed(3);
          dropletsSvg += `
            <g transform="translate(${relX}, ${relY})" opacity="${op}">
              <circle r="${s}" fill="url(#droplet-fill)" stroke="rgba(255,255,255,0.75)" stroke-width="0.8" />
              <ellipse cx="${(-d.size * 0.3).toFixed(1)}" cy="${(-d.size * 0.35).toFixed(1)}" rx="${(d.size * 0.35).toFixed(1)}" ry="${(d.size * 0.2).toFixed(1)}" fill="#ffffff" transform="rotate(-30)" />
            </g>
          `;
        }
        dropletsGroupRef.current.innerHTML = dropletsSvg;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* SVG Definitions for Refraction, Displacement & Shaders */}
      <svg
        className="liquid-bubble-defs"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <defs>
          {/* Real-time Liquid Lens Refraction Filter without chromatic aberration */}
          <filter id="liquid-bubble-refract" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.013" numOctaves="2" result="fluidNoise" seed="3" />
            <feDisplacementMap in="SourceGraphic" in2="fluidNoise" scale="28" xChannelSelector="R" yChannelSelector="G" result="refracted" />
            <feGaussianBlur in="refracted" stdDeviation="0.3" result="softRefracted" />
            <feMerge>
              <feMergeNode in="softRefracted" />
            </feMerge>
          </filter>

          {/* Dynamic Morphing Clip Path (Coordinates in [0, 340] x [0, 340]) */}
          <clipPath id="bubble-clip-shape" clipPathUnits="userSpaceOnUse">
            <path ref={clipPathElemRef} d="" />
          </clipPath>

          {/* Master 3D Bubble Volume Shading Radial Gradient */}
          <radialGradient id="bubble-volume-grad" cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="72%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="90%" stopColor="#000000" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </radialGradient>

          {/* Pure Clean White Glass Top-Left Specular Highlight Glow */}
          <linearGradient id="specular-arc-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1.0" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Specular Outer Soft Glass Glow */}
          <linearGradient id="specular-glow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Bottom-Right Translucent White Rim Glow */}
          <linearGradient id="rim-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Specular Oval Gleam Radial Falloff */}
          <radialGradient id="specular-gleam-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="82%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </radialGradient>

          {/* Micro-droplet Gradient */}
          <radialGradient id="droplet-fill" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </radialGradient>

          {/* Highlight Gaussian Glow Filter */}
          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main Liquid Glass Bubble Container */}
      <div
        ref={containerRef}
        className="liquid-bubble-container"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: VIEW_SIZE,
          height: VIEW_SIZE,
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform',
        }}
      >
        {/* Layer 1: Backdrop Refraction Lens (Clipped strictly inside the organic bubble contour) */}
        <div
          className="liquid-bubble-refract-layer"
          style={{
            position: 'absolute',
            inset: 0,
            width: VIEW_SIZE,
            height: VIEW_SIZE,
            clipPath: 'url(#bubble-clip-shape)',
            WebkitClipPath: 'url(#bubble-clip-shape)',
            backdropFilter: 'url(#liquid-bubble-refract) blur(0.4px) contrast(1.15) brightness(1.05) saturate(1.22)',
            WebkitBackdropFilter: 'url(#liquid-bubble-refract) blur(0.4px) contrast(1.15) brightness(1.05) saturate(1.22)',
            background:
              'radial-gradient(circle at 44% 40%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0.32) 100%)',
          }}
        />

        {/* Layer 2: Vector Shading, 3D Iridescence & Specular Highlights */}
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: VIEW_SIZE,
            height: VIEW_SIZE,
            overflow: 'visible',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 24px 36px rgba(0,0,0,0.45)) drop-shadow(0 6px 14px rgba(0,0,0,0.28))',
          }}
        >
          {/* Ripples Shockwave Group */}
          <g ref={ripplesGroupRef} />

          {/* Micro-Droplets Group */}
          <g ref={dropletsGroupRef} />

          {/* Dark Fresnel total internal reflection rim (creates true glass depth) */}
          <path
            ref={darkRimRef}
            d=""
            fill="none"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="5"
            strokeOpacity="0.5"
          />

          {/* Inner Soap Bubble Volume Shading */}
          <path
            ref={pathRef}
            d=""
            fill="url(#bubble-volume-grad)"
            stroke="none"
          />

          {/* Crisp Glass Boundary Line */}
          <path
            ref={boundaryPathRef}
            d=""
            fill="none"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.4"
          />

          {/* Bottom-Right Translucent Cyan/White Rim Light Arc */}
          <path
            ref={rimArcRef}
            d=""
            fill="none"
            stroke="url(#rim-arc-grad)"
            strokeWidth="3.6"
            strokeLinecap="round"
            filter="url(#soft-glow)"
          />

          {/* Top-Left Signature Specular Highlight: Outer Warm/Golden Halo */}
          <path
            ref={specArcGlowRef}
            d=""
            fill="none"
            stroke="url(#specular-glow-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#soft-glow)"
          />

          {/* Top-Left Signature Specular Highlight: Brilliant Core Arc */}
          <path
            ref={specArcRef}
            d=""
            fill="none"
            stroke="url(#specular-arc-grad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            filter="url(#soft-glow)"
          />

          {/* Glossy White Reflection Gleam Spot */}
          <ellipse
            ref={specGleamRef}
            cx={HALF_SIZE - 36}
            cy={HALF_SIZE - 40}
            rx="22"
            ry="12"
            fill="url(#specular-gleam-grad)"
          />
        </svg>
      </div>

      {/* Precision Center Indicator (Zero-lag Pearl Dot) */}
      <div
        ref={centerDotRef}
        className="liquid-bubble-center-dot"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 6px 1.5px rgba(255,255,255,0.95), 0 0 14px 3px rgba(255,255,255,0.45)',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: 0,
          transition: 'opacity 0.2s ease, transform 0.05s ease-out, scale 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
