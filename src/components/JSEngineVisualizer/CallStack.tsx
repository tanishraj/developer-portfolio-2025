import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { InfoTooltip } from './InfoTooltip';

interface StackFrame {
  name: string;
  type: 'function' | 'global' | 'anonymous';
  line?: number;
}

interface CallStackProps {
  stack: StackFrame[];
}

export const CallStack: React.FC<CallStackProps> = ({ stack }) => {
  const getFrameColor = (type: string) => {
    switch (type) {
      case 'function':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-300';
      case 'global':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
      case 'anonymous':
        return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <h3 className="text-lg font-semibold text-purple-400">Call Stack</h3>
        <InfoTooltip
          title="Call Stack"
          description="The call stack tracks function execution order using LIFO (Last In, First Out)."
          details={[
            'Functions are pushed when called',
            'Functions are popped when they return', 
            'Stack overflow occurs when too many functions are nested',
            'Global execution context is always at the bottom',
          ]}
        />
      </div>
      
      <div className="space-y-2 min-h-[200px]">
        {stack.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            Stack is empty
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {[...stack].reverse().map((frame, index) => (
              <motion.div
                key={`${frame.name}-${stack.length - index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-3 rounded-lg border ${getFrameColor(frame.type)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-mono text-sm font-semibold">
                      {frame.name}
                    </span>
                  </div>
                  {frame.line && (
                    <span className="text-xs opacity-70">
                      Line {frame.line}
                    </span>
                  )}
                </div>
                {index === 0 && (
                  <motion.div
                    className="absolute -left-1 top-0 bottom-0 w-1 bg-yellow-400 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Stack Size: {stack.length}</span>
          <span>Max: 10000</span>
        </div>
        <div className="mt-2 bg-gray-700 rounded-full h-2 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-yellow-500"
            animate={{ width: `${Math.min((stack.length / 20) * 100, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

