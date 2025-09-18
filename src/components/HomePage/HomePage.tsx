import React, { useState, useEffect } from 'react';
import { About } from '../About';
import { AnimatedBackground } from '../AnimatedBackground';
import { Contact } from '../Contact';
import { CustomCursor } from '../CustomCursor';
import { Footer } from '../Footer';
import { GameButton } from '../GameButton';
import { Hero } from '../Hero';
import { Navigation } from '../Navigation';
import { Portfolio } from '../Portfolio';
import { Services } from '../Services';
import { Skills } from '../Skills';
import { VoiceCommand } from '../VoiceCommand';

export function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
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
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
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

