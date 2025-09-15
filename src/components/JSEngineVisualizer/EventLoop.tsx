import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import InfoTooltip from './InfoTooltip';

interface EventLoopProps {
  isActive: boolean;
  currentPhase: 'idle' | 'call-stack' | 'microtask' | 'macrotask' | 'render';
}

const EventLoop: React.FC<EventLoopProps> = ({ isActive, currentPhase }) => {
  const phases = [
    { id: 'call-stack', label: 'Call Stack', color: 'from-purple-500 to-purple-600' },
    { id: 'microtask', label: 'Microtasks', color: 'from-blue-500 to-blue-600' },
    { id: 'render', label: 'Render', color: 'from-green-500 to-green-600' },
    { id: 'macrotask', label: 'Macrotasks', color: 'from-orange-500 to-orange-600' },
  ];

  const getRotation = () => {
    switch (currentPhase) {
      case 'call-stack': return 0;
      case 'microtask': return 90;
      case 'render': return 180;
      case 'macrotask': return 270;
      default: return 0;
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <h3 className="text-lg font-semibold text-cyan-400">Event Loop</h3>
        <InfoTooltip
          title="Event Loop"
          description="The event loop coordinates asynchronous operations, ensuring JavaScript remains single-threaded but non-blocking."
          details={[
            "1. Execute call stack until empty",
            "2. Process all microtasks (Promises)",
            "3. Render if needed",
            "4. Process one macrotask (setTimeout, I/O)",
            "Repeat the cycle continuously"
          ]}
        />
      </div>
      
      <div className="relative w-48 h-48 mx-auto">
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-600"
          />
        </svg>

        {/* Phase segments */}
        {phases.map((phase, index) => {
          const angle = (index * 90) - 90;
          const isActive = currentPhase === phase.id;
          
          return (
            <div
              key={phase.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive ? 1 : 0.5,
                }}
                className={`absolute top-4 w-16 h-8 rounded-lg bg-gradient-to-r ${phase.color} flex items-center justify-center shadow-lg`}
              >
                <span
                  className="text-xs text-white font-semibold"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {phase.label}
                </span>
              </motion.div>
            </div>
          );
        })}

        {/* Center spinner */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: isActive ? getRotation() : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20"
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-full h-full text-white p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Current phase indicator */}
        {currentPhase !== 'idle' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: getRotation() }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 w-1 h-20 bg-yellow-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">Current Phase</div>
        <div className="text-lg font-semibold text-white capitalize">
          {currentPhase === 'idle' ? 'Idle' : phases.find(p => p.id === currentPhase)?.label}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-2 text-xs">
        {phases.map(phase => (
          <div key={phase.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded bg-gradient-to-r ${phase.color}`} />
            <span className="text-gray-400">{phase.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventLoop;