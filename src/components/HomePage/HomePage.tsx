import React, { useEffect, useRef } from 'react';

import { About } from '../About';
import { AnimatedBackground } from '../AnimatedBackground';
import { Contact } from '../Contact';
import { CustomCursor } from '../CustomCursor';
import { Footer } from '../Footer';
import { GameButton } from '../GameButton';
import { Hero } from '../Hero';
import { Navigation } from '../Navigation';
import { Portfolio } from '../Portfolio';
import { SEO } from '../SEO';
import { Services } from '../Services';
import { Skills } from '../Skills';
import { VoiceCommand } from '../VoiceCommand';

export function HomePage() {
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      if (frameId !== 0) return;

      frameId = window.requestAnimationFrame(() => {
        mouseGlowRef.current?.style.setProperty('--pointer-x', `${pointerX}px`);
        mouseGlowRef.current?.style.setProperty('--pointer-y', `${pointerY}px`);
        frameId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
      <SEO
        route="home"
      />
      {/* Fixed background layers that stay consistent across all sections */}
      <div className="fixed inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1b] via-[#0a0f1b] to-[#0f1624]" />
        
        {/* Animated background with mouse-responsive blurs */}
        <AnimatedBackground />
        
        {/* Very subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Interactive mouse-following blur effect */}
        <div
          ref={mouseGlowRef}
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle 800px at var(--pointer-x, 0px) var(--pointer-y, 0px), rgba(59, 130, 246, 0.15), transparent 40%)',
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <CustomCursor />
        <VoiceCommand />
        <GameButton />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Services />
          <Skills />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

