import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

export const AnimatedBackground: React.FC = () => {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);
  const mirroredMouseX = useMotionValue(window.innerWidth / 2 - 144);
  const mirroredMouseY = useMotionValue(window.innerHeight / 2 - 144);

  const primaryX = useSpring(useTransform(mouseX, (x) => x - 192), {
    stiffness: 30,
    damping: 20,
  });
  const primaryY = useSpring(useTransform(mouseY, (y) => y - 192), {
    stiffness: 30,
    damping: 20,
  });
  const secondaryX = useSpring(useTransform(mouseX, (x) => x - 160), {
    stiffness: 20,
    damping: 25,
  });
  const secondaryY = useSpring(useTransform(mouseY, (y) => y - 160), {
    stiffness: 20,
    damping: 25,
  });
  const tertiaryX = useSpring(mirroredMouseX, { stiffness: 15, damping: 30 });
  const tertiaryY = useSpring(mirroredMouseY, { stiffness: 15, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mirroredMouseX.set(window.innerWidth - e.clientX - 144);
      mirroredMouseY.set(window.innerHeight - e.clientY - 144);
    };

    const handleResize = () => {
      mirroredMouseX.set(window.innerWidth - mouseX.get() - 144);
      mirroredMouseY.set(window.innerHeight - mouseY.get() - 144);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mirroredMouseX, mirroredMouseY, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary blob - follows mouse directly */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-[100px]"
        style={{ x: primaryX, y: primaryY }}
      />

      {/* Secondary blob - follows with delay */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-[80px]"
        style={{ x: secondaryX, y: secondaryY }}
      />

      {/* Tertiary blob - opposite movement */}
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-green-500/15 to-yellow-500/15 rounded-full filter blur-[90px]"
        style={{ x: tertiaryX, y: tertiaryY }}
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

