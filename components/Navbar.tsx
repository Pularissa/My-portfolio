'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [hidden, setHidden]     = useState(false);
  const [compact, setCompact]   = useState(false);
  const [lastY, setLastY]       = useState(0);
  const { scrollY } = useScroll();

  // Up-scroll #2 — Sticky Navbar Transformation
  useMotionValueEvent(scrollY, 'change', (y) => {
    setCompact(y > 80);
    setHidden(y > lastY && y > 200); // hide on down, show on up
    setLastY(y);
  });

  return (
    <motion.nav
      className="navbar"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      animate={{
        y: hidden ? -100 : 0,
        backgroundColor: compact ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: compact ? 'blur(16px)' : 'none',
        boxShadow: compact ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
        paddingTop: compact ? '12px' : '32px',
        paddingBottom: compact ? '12px' : '0px',
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="logo">
        <Image src="/images/logo.png" alt="Prisca Larissa Logo"
          width={compact ? 40 : 52} height={compact ? 40 : 52}
          className="logo-img" priority
          style={{ transition: 'all 0.4s ease' }}
        />
      </div>

      <ul className="nav-links">
        {['/', '#skills', '#projects', '#experience', '#contact'].map((href, i) => (
          <li key={href}>
            <Link href={href}>
              {['Home','Skills','Projects','Education','Contact'][i]}
            </Link>
          </li>
        ))}
      </ul>

      <a href="#contact" className="nav-cta">Let&apos;s talk</a>
    </motion.nav>
  );
}
