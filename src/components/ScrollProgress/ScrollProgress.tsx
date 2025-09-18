import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sections = [
    { id: 'home', label: 'Home', position: 0 },
    { id: 'about', label: 'About', position: 16.6 },
    { id: 'services', label: 'Services', position: 33.3 },
    { id: 'skills', label: 'Skills', position: 50 },
    { id: 'portfolio', label: 'Portfolio', position: 66.6 },
    { id: 'contact', label: 'Contact', position: 83.3 },
    { id: 'footer', label: 'Footer', position: 100 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Determine which section we're in based on actual scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].id);
          break;
        }
      }

      // Show the progress bar when scrolling
      setIsVisible(true);

      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Hide the progress bar 5 seconds after scrolling stops
      hideTimeoutRef.current = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 5000);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => {
            setIsHovered(true);
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            // Hide after 5 seconds when mouse leaves
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false);
            }, 5000);
          }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-4"
        >
          {/* Section labels - only visible on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-[29px] items-end"
              >
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    whileHover={{ scale: 1.1 }}
                    className={`text-xs font-medium transition-all cursor-pointer ${
                      currentSection === section.id
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vertical progress bar with dotted line and circles */}
          <div className="relative h-[200px] flex flex-col items-center justify-between">
            {/* Dotted line background */}
            <svg
              className="absolute inset-0 w-full h-full"
              width="20"
              height="200"
              viewBox="0 0 20 200"
              fill="none"
            >
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="200"
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            </svg>

            {/* Progress line */}
            <svg
              className="absolute inset-0 w-full h-full"
              width="20"
              height="200"
              viewBox="0 0 20 200"
              fill="none"
            >
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <line
                x1="10"
                y1="200"
                x2="10"
                y2={200 - scrollProgress * 2}
                stroke="url(#progressGradient)"
                strokeWidth="2"
              />
            </svg>

            {/* Section circles */}
            {sections.map((section) => {
              const isActive = currentSection === section.id;
              const isPassed = 100 - section.position <= scrollProgress;

              return (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                  style={{ top: `${section.position}%` }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-all ${
                      isPassed ? 'border-purple-500 bg-purple-500' : 'border-gray-600 bg-gray-900'
                    }`}
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(168, 85, 247, 0.7)',
                              '0 0 0 10px rgba(168, 85, 247, 0)',
                              '0 0 0 0 rgba(168, 85, 247, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      isActive
                        ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full"
                        animate={{
                          scale: [0.5, 0.8, 0.5],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </motion.div>
                </motion.button>
              );
            })}

            {/* Moving indicator */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4"
              style={{ top: `${100 - scrollProgress}%` }}
              animate={{ top: `${100 - scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="w-full h-full bg-white rounded-full shadow-lg shadow-white/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Percentage tooltip - only visible on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -left-16 bg-gray-900 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap"
                  style={{ top: `${100 - scrollProgress}%` }}
                >
                  {Math.round(scrollProgress)}%
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

