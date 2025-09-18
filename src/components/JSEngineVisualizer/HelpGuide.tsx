import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

export const HelpGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">JavaScript Engine Visualizer Guide</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* How it works */}
                <section>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">How It Works</h3>
                  <p className="text-gray-300 mb-3">
                    This visualizer simulates how the JavaScript engine executes your code step by step. 
                    Write or select example code, click "Run Code", and watch the execution unfold.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">1. Write Code</h4>
                      <p className="text-sm text-gray-400">
                        Enter JavaScript code in the editor or select from examples
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400 mb-2">2. Run & Watch</h4>
                      <p className="text-sm text-gray-400">
                        Click Run Code and use playback controls to step through execution
                      </p>
                    </div>
                  </div>
                </section>

                {/* Components */}
                <section>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Understanding the Components</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-300 mb-2">📚 Call Stack</h4>
                      <p className="text-sm text-gray-400">
                        Shows the execution order of functions. Functions are pushed when called and popped when they return.
                        The yellow indicator shows the currently executing function.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-300 mb-2">🔄 Event Loop</h4>
                      <p className="text-sm text-gray-400">
                        Visualizes the event loop phases: Call Stack → Microtasks → Render → Macrotasks.
                        The rotating animation shows which phase is currently active.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-300 mb-2">📦 Execution Context</h4>
                      <p className="text-sm text-gray-400">
                        Displays the current scope, 'this' binding, and all available variables in the current execution context.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-300 mb-2">⚡ Task Queues</h4>
                      <p className="text-sm text-gray-400">
                        <strong>Microtasks:</strong> High-priority (Promises, queueMicrotask)<br/>
                        <strong>Macrotasks:</strong> Regular priority (setTimeout, setInterval, I/O)
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="font-semibold text-green-300 mb-2">💾 Memory Heap</h4>
                      <p className="text-sm text-gray-400">
                        Shows objects, arrays, and functions stored in memory. Each item has a unique memory address.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Controls */}
                <section>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Playback Controls</h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">◀</span>
                        <span>Previous Step</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-500">▶/⏸</span>
                        <span>Play/Pause</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">▶</span>
                        <span>Next Step</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Speed</span>
                        <span>Control animation speed</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tips */}
                <section>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Start with simple examples to understand the basics
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Use slow speed to follow complex execution flows
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Watch how async operations interact with the event loop
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Hover over components to see additional information
                    </li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

