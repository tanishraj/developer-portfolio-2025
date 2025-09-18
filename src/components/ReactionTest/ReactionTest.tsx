import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { ConfirmationModal } from '../ConfirmationModal';

interface TestResult {
  time: number;
  mode: string;
  date: string;
  success: boolean;
}

interface Stats {
  totalTests: number;
  averageTime: number;
  bestTime: number;
  worstTime: number;
  successRate: number;
  currentStreak: number;
  bestStreak: number;
}

type TestMode = 'simple' | 'color' | 'shape' | 'position';

export const ReactionTest: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [testMode, setTestMode] = useState<TestMode>('simple');
  const [testState, setTestState] = useState<
    'idle' | 'waiting' | 'ready' | 'testing' | 'complete' | 'tooEarly'
  >('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [, setReactionTime] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalTests: 0,
    averageTime: 0,
    bestTime: Infinity,
    worstTime: 0,
    successRate: 100,
    currentStreak: 0,
    bestStreak: 0,
  });
  const [currentRound, setCurrentRound] = useState(0);
  const [roundResults, setRoundResults] = useState<number[]>([]);
  const [targetColor, setTargetColor] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [targetShape, setTargetShape] = useState('');
  const [currentShape, setCurrentShape] = useState('');
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [showInstructions, setShowInstructions] = useState(true);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const waitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'star', 'hexagon'];
  const maxRounds = 5;

  // Load stats from localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem('reactionTestResults');
    const savedStats = localStorage.getItem('reactionTestStats');

    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Start test
  const startTest = useCallback(() => {
    setTestState('waiting');
    setReactionTime(null);
    setShowInstructions(false);
    setCurrentRound(0);
    setRoundResults([]);

    // Set up test based on mode
    if (testMode === 'color') {
      const target = colors[Math.floor(Math.random() * colors.length)];
      setTargetColor(target);
      setCurrentColor(colors.filter((c) => c !== target)[0]);
    } else if (testMode === 'shape') {
      const target = shapes[Math.floor(Math.random() * shapes.length)];
      setTargetShape(target);
      setCurrentShape(shapes.filter((s) => s !== target)[0]);
    } else if (testMode === 'position') {
      setTargetPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      });
    }

    // Random wait time between 1 and 5 seconds
    const waitTime = 1000 + Math.random() * 4000;

    waitTimeoutRef.current = setTimeout(() => {
      setTestState('ready');
      setStartTime(Date.now());

      // For color/shape modes, change to target after delay
      if (testMode === 'color') {
        setTimeout(() => setCurrentColor(targetColor), 0);
      } else if (testMode === 'shape') {
        setTimeout(() => setCurrentShape(targetShape), 0);
      }
    }, waitTime);
  }, [testMode, targetColor, targetShape]);

  // Handle click/reaction
  const handleReaction = useCallback(() => {
    if (testState === 'waiting') {
      // Clicked too early
      setTestState('tooEarly');
      if (waitTimeoutRef.current) {
        clearTimeout(waitTimeoutRef.current);
      }
      return;
    }

    if (testState === 'ready' && startTime) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);

      const newRoundResults = [...roundResults, time];
      setRoundResults(newRoundResults);

      if (currentRound + 1 < maxRounds) {
        // Continue to next round
        setCurrentRound(currentRound + 1);
        setTestState('waiting');

        // Start next round after brief pause
        setTimeout(() => {
          // Set up next test
          if (testMode === 'color') {
            const target = colors[Math.floor(Math.random() * colors.length)];
            setTargetColor(target);
            setCurrentColor(colors.filter((c) => c !== target)[0]);
          } else if (testMode === 'shape') {
            const target = shapes[Math.floor(Math.random() * shapes.length)];
            setTargetShape(target);
            setCurrentShape(shapes.filter((s) => s !== target)[0]);
          } else if (testMode === 'position') {
            setTargetPosition({
              x: 20 + Math.random() * 60,
              y: 20 + Math.random() * 60,
            });
          }

          const waitTime = 1000 + Math.random() * 4000;

          waitTimeoutRef.current = setTimeout(() => {
            setTestState('ready');
            setStartTime(Date.now());

            if (testMode === 'color') {
              setCurrentColor(targetColor);
            } else if (testMode === 'shape') {
              setCurrentShape(targetShape);
            }
          }, waitTime);
        }, 1000);
      } else {
        // Test complete
        setTestState('complete');
        saveResults(newRoundResults);
      }
    }
  }, [testState, startTime, currentRound, roundResults, testMode, targetColor, targetShape]);

  // Save results
  const saveResults = (results: number[]) => {
    const averageTime = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
    const bestTime = Math.min(...results);

    const result: TestResult = {
      time: averageTime,
      mode: testMode,
      date: new Date().toLocaleString(),
      success: true,
    };

    // Save result
    const newResults = [result, ...testResults].slice(0, 50);
    setTestResults(newResults);
    localStorage.setItem('reactionTestResults', JSON.stringify(newResults));

    // Update stats
    updateStats(result, bestTime);
  };

  // Update statistics
  const updateStats = (result: TestResult, bestRoundTime: number) => {
    const newTotalTests = stats.totalTests + 1;
    const newTotalTime = stats.averageTime * stats.totalTests + result.time;
    const newAverageTime = Math.round(newTotalTime / newTotalTests);
    const newBestTime = Math.min(
      stats.bestTime === Infinity ? result.time : stats.bestTime,
      bestRoundTime,
    );
    const newWorstTime = Math.max(stats.worstTime, result.time);
    const newCurrentStreak = result.success ? stats.currentStreak + 1 : 0;
    const newBestStreak = Math.max(stats.bestStreak, newCurrentStreak);

    const newStats: Stats = {
      totalTests: newTotalTests,
      averageTime: newAverageTime,
      bestTime: newBestTime,
      worstTime: newWorstTime,
      successRate: 100, // Always 100 for completed tests
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
    };

    setStats(newStats);
    localStorage.setItem('reactionTestStats', JSON.stringify(newStats));
  };

  // Reset test
  const resetTest = () => {
    if (waitTimeoutRef.current) {
      clearTimeout(waitTimeoutRef.current);
    }
    setTestState('idle');
    setReactionTime(null);
    setStartTime(null);
    setCurrentRound(0);
    setRoundResults([]);
    setShowInstructions(true);
  };

  // Get average of round results
  const getAverageTime = () => {
    if (roundResults.length === 0) return 0;
    return Math.round(roundResults.reduce((a, b) => a + b, 0) / roundResults.length);
  };

  // Get reaction time color
  const getTimeColor = (time: number) => {
    if (time < 250) return 'text-green-400';
    if (time < 350) return 'text-yellow-400';
    if (time < 450) return 'text-orange-400';
    return 'text-red-400';
  };

  // Get reaction time label
  const getTimeLabel = (time: number) => {
    if (time < 200) return 'Lightning Fast! ⚡';
    if (time < 250) return 'Excellent! 🚀';
    if (time < 300) return 'Great! 👍';
    if (time < 350) return 'Good 😊';
    if (time < 400) return 'Average 👌';
    if (time < 500) return 'Below Average 😐';
    return 'Slow 🐌';
  };

  // Render shape
  const renderShape = (shape: string) => {
    switch (shape) {
      case 'circle':
        return <div className="w-24 h-24 bg-purple-500 rounded-full" />;
      case 'square':
        return <div className="w-24 h-24 bg-purple-500" />;
      case 'triangle':
        return (
          <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[86px] border-b-purple-500" />
        );
      case 'diamond':
        return <div className="w-24 h-24 bg-purple-500 transform rotate-45" />;
      case 'star':
        return <div className="text-purple-500 text-7xl">★</div>;
      case 'hexagon':
        return (
          <div
            className="w-24 h-24 bg-purple-500"
            style={{
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          />
        );
      default:
        return null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (waitTimeoutRef.current) {
        clearTimeout(waitTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0f1b] z-[60] flex"
      >
        {/* Main Test Area */}
        <div className="flex-1 flex flex-col p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Reaction Time Test</h1>
              <p className="text-gray-400">Test your reflexes and response time</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setTestMode('simple');
                resetTest();
              }}
              disabled={testState !== 'idle' && testState !== 'complete'}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                testMode === 'simple'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              } ${testState !== 'idle' && testState !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Simple Click
            </button>
            <button
              onClick={() => {
                setTestMode('color');
                resetTest();
              }}
              disabled={testState !== 'idle' && testState !== 'complete'}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                testMode === 'color'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              } ${testState !== 'idle' && testState !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Color Change
            </button>
            <button
              onClick={() => {
                setTestMode('shape');
                resetTest();
              }}
              disabled={testState !== 'idle' && testState !== 'complete'}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                testMode === 'shape'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              } ${testState !== 'idle' && testState !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Shape Match
            </button>
            <button
              onClick={() => {
                setTestMode('position');
                resetTest();
              }}
              disabled={testState !== 'idle' && testState !== 'complete'}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                testMode === 'position'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              } ${testState !== 'idle' && testState !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Target Click
            </button>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20"
            >
              <div className="text-green-400 text-sm mb-1 font-medium">Best Time</div>
              <div className="text-3xl font-bold text-white">
                {stats.bestTime === Infinity ? '—' : `${stats.bestTime}ms`}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20"
            >
              <div className="text-blue-400 text-sm mb-1 font-medium">Average</div>
              <div className="text-3xl font-bold text-white">
                {testState === 'complete' ? getAverageTime() : stats.averageTime}ms
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/20"
            >
              <div className="text-purple-400 text-sm mb-1 font-medium">Tests Done</div>
              <div className="text-3xl font-bold text-white">{stats.totalTests}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-4 border border-yellow-500/20"
            >
              <div className="text-yellow-400 text-sm mb-1 font-medium">Streak</div>
              <div className="text-3xl font-bold text-white">{stats.currentStreak}</div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          {testState !== 'idle' && testState !== 'complete' && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>
                  Round {currentRound + 1} of {maxRounds}
                </span>
                <span>Current Average: {getAverageTime()}ms</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentRound / maxRounds) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Test Area */}
          <div
            className="flex-1 bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center relative overflow-hidden cursor-pointer"
            onClick={handleReaction}
          >
            {/* Instructions */}
            {showInstructions && testState === 'idle' && (
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {testMode === 'simple' && 'Click Test'}
                  {testMode === 'color' && 'Color Change Test'}
                  {testMode === 'shape' && 'Shape Match Test'}
                  {testMode === 'position' && 'Target Click Test'}
                </h2>
                <p className="text-gray-400 mb-6 max-w-md">
                  {testMode === 'simple' && 'Click as fast as you can when the screen turns green!'}
                  {testMode === 'color' && 'Click when the color changes to the target color!'}
                  {testMode === 'shape' && 'Click when the shape matches the target shape!'}
                  {testMode === 'position' &&
                    'Click the target as fast as you can when it appears!'}
                </p>
                <p className="text-gray-500 text-sm">
                  You'll complete {maxRounds} rounds. Your average time will be recorded.
                </p>
              </div>
            )}

            {/* Test States */}
            {testState === 'waiting' && (
              <div className="text-center">
                {testMode === 'simple' && (
                  <div className="text-6xl font-bold text-red-500">Wait...</div>
                )}
                {testMode === 'color' && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-gray-400">Target Color:</div>
                    <div
                      className="w-32 h-32 rounded-lg shadow-lg"
                      style={{ backgroundColor: targetColor }}
                    />
                    <div className="text-gray-400 mt-4">Current:</div>
                    <div
                      className="w-24 h-24 rounded-lg"
                      style={{ backgroundColor: currentColor }}
                    />
                  </div>
                )}
                {testMode === 'shape' && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-gray-400">Target Shape:</div>
                    {renderShape(targetShape)}
                    <div className="text-gray-400 mt-4">Current:</div>
                    <div className="scale-75 opacity-50">{renderShape(currentShape)}</div>
                  </div>
                )}
                {testMode === 'position' && (
                  <div className="text-6xl font-bold text-red-500">Get Ready...</div>
                )}
              </div>
            )}

            {testState === 'ready' && (
              <>
                {testMode === 'simple' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl font-bold text-green-500"
                  >
                    CLICK NOW!
                  </motion.div>
                )}
                {testMode === 'color' && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-gray-400">Click when it matches!</div>
                    <div
                      className="w-32 h-32 rounded-lg shadow-lg transition-colors duration-100"
                      style={{ backgroundColor: currentColor }}
                    />
                  </div>
                )}
                {testMode === 'shape' && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-gray-400">Click when it matches!</div>
                    {renderShape(currentShape)}
                  </div>
                )}
                {testMode === 'position' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-16 h-16 bg-purple-500 rounded-full cursor-pointer hover:bg-purple-400"
                    style={{
                      left: `${targetPosition.x}%`,
                      top: `${targetPosition.y}%`,
                    }}
                  />
                )}
              </>
            )}

            {testState === 'tooEarly' && (
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500 mb-4">Too Early!</div>
                <p className="text-gray-400">Wait for the signal before clicking</p>
              </div>
            )}

            {testState === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-6">Test Complete!</h3>
                <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-8">
                  <div>
                    <div className="text-gray-400 mb-2">Average Time</div>
                    <div className={`text-4xl font-bold ${getTimeColor(getAverageTime())}`}>
                      {getAverageTime()}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Best Round</div>
                    <div
                      className={`text-4xl font-bold ${getTimeColor(Math.min(...roundResults))}`}
                    >
                      {Math.min(...roundResults)}ms
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-4">
                  {getTimeLabel(getAverageTime())}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {roundResults.map((time, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg px-3 py-2">
                      <span className="text-gray-400 text-xs">R{index + 1}: </span>
                      <span className={`font-bold ${getTimeColor(time)}`}>{time}ms</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {testState === 'idle' && (
              <button
                onClick={startTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Test
              </button>
            )}
            {testState === 'tooEarly' && (
              <button
                onClick={resetTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Try Again
              </button>
            )}
            {testState === 'complete' && (
              <>
                <button
                  onClick={startTest}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Test Again
                </button>
                <button
                  onClick={resetTest}
                  className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
                >
                  Change Mode
                </button>
              </>
            )}
            {(testState === 'waiting' || testState === 'ready') && (
              <button
                onClick={resetTest}
                className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Cancel Test
              </button>
            )}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="w-96 bg-gradient-to-b from-[#0f1624] to-[#0a0f1b] border-l border-purple-500/20 p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Statistics
          </h2>

          {/* Overall Stats */}
          <div className="mb-8 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Career Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Tests</span>
                <span className="text-white font-bold">{stats.totalTests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Time</span>
                <span className={`font-bold ${getTimeColor(stats.averageTime)}`}>
                  {stats.averageTime}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Time</span>
                <span className="text-green-400 font-bold">
                  {stats.bestTime === Infinity ? '—' : `${stats.bestTime}ms`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Worst Time</span>
                <span className="text-red-400 font-bold">
                  {stats.worstTime === 0 ? '—' : `${stats.worstTime}ms`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Streak</span>
                <span className="text-purple-400 font-bold">{stats.currentStreak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Streak</span>
                <span className="text-yellow-400 font-bold">{stats.bestStreak}</span>
              </div>
            </div>
          </div>

          {/* Reaction Time Ranges */}
          <div className="mb-8 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Reaction Ranges</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-400">Excellent</span>
                <span className="text-gray-400">&lt; 250ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-400">Good</span>
                <span className="text-gray-400">250-350ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-400">Average</span>
                <span className="text-gray-400">350-450ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Below Average</span>
                <span className="text-gray-400">&gt; 450ms</span>
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Recent Tests</h3>
            <div className="space-y-2">
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tests completed yet</p>
              ) : (
                testResults.slice(0, 10).map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-900/50 rounded-lg p-3 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`font-bold ${getTimeColor(result.time)}`}>
                          {result.time}ms
                        </span>
                        <span className="text-gray-400 ml-2 capitalize">• {result.mode}</span>
                        <div className="text-xs text-gray-500 mt-1">{result.date}</div>
                      </div>
                      {result.time === stats.bestTime && (
                        <span className="text-yellow-400 text-xs">Best!</span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Clear Stats Button */}
          <button
            onClick={() => setShowClearConfirmation(true)}
            className="mt-8 w-full px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
          >
            Clear All Stats
          </button>
        </div>

        {/* Clear Confirmation Modal */}
        <ConfirmationModal
          isOpen={showClearConfirmation}
          onClose={() => setShowClearConfirmation(false)}
          onConfirm={() => {
            localStorage.removeItem('reactionTestResults');
            localStorage.removeItem('reactionTestStats');
            setTestResults([]);
            setStats({
              totalTests: 0,
              averageTime: 0,
              bestTime: Infinity,
              worstTime: 0,
              successRate: 100,
              currentStreak: 0,
              bestStreak: 0,
            });
          }}
          title="Clear All Statistics?"
          message="This will permanently delete all your reaction test statistics, including:"
          stats={[
            { label: 'Total tests', value: stats.totalTests },
            { label: 'Best time', value: stats.bestTime === Infinity ? 'N/A' : `${stats.bestTime}ms` },
            { label: 'Average time', value: stats.averageTime === 0 ? 'N/A' : `${stats.averageTime}ms` },
          ]}
          details={[
            'Test history',
            'All performance metrics',
            'Consistency scores',
          ]}
          confirmText="Yes, Clear Everything"
          cancelText="Cancel"
          variant="danger"
        />
      </motion.div>
    </AnimatePresence>
  );
};

