import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(true);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if screen is large enough (laptop/desktop)
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hover states for interactive elements
    const handleElementHover = () => {
      const addHoverListeners = (element: Element) => {
        element.addEventListener('mouseenter', () => setCursorVariant('hover'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      };

      // Add listeners to interactive elements
      document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(addHoverListeners);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up hover listeners after a short delay to ensure DOM is ready
    setTimeout(handleElementHover, 100);

    // Re-apply listeners when DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(handleElementHover, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [isLargeScreen, cursorX, cursorY]);

  // Don't render cursor on touch devices
  if (!isLargeScreen) {
    return null;
  }

  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white/20 border border-white/50 rounded-full pointer-events-none z-[10000] hidden xl:block will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      
      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10001] hidden xl:block will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

