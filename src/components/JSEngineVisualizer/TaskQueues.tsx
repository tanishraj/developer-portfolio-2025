import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import InfoTooltip from './InfoTooltip';

interface Task {
  id: string;
  type: 'promise' | 'mutation-observer' | 'timeout' | 'interval' | 'io' | 'immediate';
  name: string;
  callback: string;
  delay?: number;
}

interface TaskQueuesProps {
  microtasks: Task[];
  macrotasks: Task[];
  currentlyExecuting?: 'microtask' | 'macrotask' | null;
}

const TaskQueues: React.FC<TaskQueuesProps> = ({ microtasks, macrotasks, currentlyExecuting }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'promise':
        return '⚡';
      case 'mutation-observer':
        return '👁️';
      case 'timeout':
        return '⏱️';
      case 'interval':
        return '🔄';
      case 'io':
        return '📡';
      case 'immediate':
        return '🚀';
      default:
        return '📦';
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'promise':
        return 'from-blue-500 to-blue-600';
      case 'mutation-observer':
        return 'from-purple-500 to-purple-600';
      case 'timeout':
        return 'from-orange-500 to-orange-600';
      case 'interval':
        return 'from-green-500 to-green-600';
      case 'io':
        return 'from-red-500 to-red-600';
      case 'immediate':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Microtask Queue */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-blue-400">Microtask Queue</h3>
            <InfoTooltip
              title="Microtask Queue"
              description="High-priority tasks executed after call stack empties but before rendering."
              details={[
                'Promise callbacks (.then, .catch, .finally)',
                'queueMicrotask() callbacks',
                'MutationObserver callbacks',
                'Executed until queue is empty',
              ]}
            />
          </div>
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
            Priority: High
          </span>
        </div>
        
        <div className="space-y-2 min-h-[200px] max-h-[300px] overflow-y-auto">
          {microtasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-8">
              Queue is empty
            </div>
          ) : (
            <AnimatePresence mode="sync">
              {microtasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: currentlyExecuting === 'microtask' && index === 0 ? 1.05 : 1,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${getTaskColor(task.type)} p-3`}
                >
                  {currentlyExecuting === 'microtask' && index === 0 && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTaskIcon(task.type)}</span>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {task.name}
                        </div>
                        <div className="text-[10px] text-white/80 font-mono">
                          {task.callback}
                        </div>
                      </div>
                    </div>
                    {index === 0 && currentlyExecuting === 'microtask' && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Count: {microtasks.length}</span>
            <span>Next: {microtasks[0]?.name || 'None'}</span>
          </div>
        </div>
      </div>

      {/* Macrotask Queue */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-orange-400">Macrotask Queue</h3>
            <InfoTooltip
              title="Macrotask Queue"
              description="Regular priority tasks executed one at a time between microtask queue checks."
              details={[
                'setTimeout and setInterval callbacks',
                'I/O operations',
                'setImmediate (Node.js)',
                'UI events and user interactions',
              ]}
            />
          </div>
          <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
            Priority: Normal
          </span>
        </div>
        
        <div className="space-y-2 min-h-[200px] max-h-[300px] overflow-y-auto">
          {macrotasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-8">
              Queue is empty
            </div>
          ) : (
            <AnimatePresence mode="sync">
              {macrotasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: currentlyExecuting === 'macrotask' && index === 0 ? 1.05 : 1,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${getTaskColor(task.type)} p-3`}
                >
                  {currentlyExecuting === 'macrotask' && index === 0 && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTaskIcon(task.type)}</span>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {task.name}
                        </div>
                        <div className="text-[10px] text-white/80 font-mono">
                          {task.callback}
                        </div>
                        {task.delay && (
                          <div className="text-[10px] text-white/60">
                            Delay: {task.delay}ms
                          </div>
                        )}
                      </div>
                    </div>
                    {index === 0 && currentlyExecuting === 'macrotask' && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Count: {macrotasks.length}</span>
            <span>Next: {macrotasks[0]?.name || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskQueues;