import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary blob - follows mouse directly */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-[100px]"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: 'spring',
          stiffness: 30,
          damping: 20,
        }}
      />

      {/* Secondary blob - follows with delay */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-[80px]"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{
          type: 'spring',
          stiffness: 20,
          damping: 25,
          delay: 0.1,
        }}
      />

      {/* Tertiary blob - opposite movement */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-green-500/15 to-yellow-500/15 rounded-full filter blur-[90px]"
        animate={{
          x: window.innerWidth - mousePosition.x - 144,
          y: window.innerHeight - mousePosition.y - 144,
        }}
        transition={{
          type: 'spring',
          stiffness: 15,
          damping: 30,
        }}
      />

      {/* Static animated blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-full filter blur-[80px]"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

