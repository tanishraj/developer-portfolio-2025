import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const GameButton: React.FC = () => {
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showButton] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleGameSelect = (game: string) => {
    if (game === 'snake') {
      navigate('/games/snake');
    } else if (game === 'typing') {
      navigate('/games/typing');
    } else if (game === 'reaction') {
      navigate('/games/reaction');
    }
    setShowMenu(false);
  };

  // Always show the button, but with different styling when offline
  return (
    <>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 left-8 z-50 min-w-[200px]"
            style={{ marginBottom: '8px' }}
          >
            {/* Arrow pointing down to button */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[#1a1f2e] border-r border-b border-purple-500/20 transform rotate-45 z-[-1]" />

            {/* Menu content */}
            <div className="bg-[#1a1f2e] rounded-xl shadow-2xl border border-purple-500/20 p-2 backdrop-blur-sm">
              <div className="text-xs text-gray-500 uppercase tracking-wider px-4 pt-2 pb-1">
                Select Game
              </div>
              <button
                onClick={() => handleGameSelect('typing')}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                ⌨️ Typing Test
              </button>
              <button
                onClick={() => handleGameSelect('reaction')}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                ⚡ Reaction Test
              </button>
              <button
                onClick={() => handleGameSelect('snake')}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                🐍 Snake Game
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible backdrop when menu is open */}
      {showMenu && <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />}

      <AnimatePresence>
        {showButton && (
          <motion.button
            ref={buttonRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className={`hidden xl:block fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-lg transition-all ${
              isOffline
                ? 'bg-yellow-500 hover:bg-yellow-600 animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            title={isOffline ? "You're offline - Play a game!" : 'Play Games'}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>

            {isOffline && (
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                You're offline! Play a game 🎮
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

