import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import ConfirmationModal from '../ConfirmationModal';

interface TestResult {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  date: string;
  difficulty: string;
}

interface Stats {
  totalTests: number;
  averageWPM: number;
  bestWPM: number;
  averageAccuracy: number;
  totalTime: number;
  favoriteLanguage: string;
}

const TypingTest: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // Code snippets for different languages
  const codeSnippets = {
    javascript: [
      `const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};`,
      `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}`,
      `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};`,
    ],
    python: [
      `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
      `class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node`,
    ],
    react: [
      `import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};`,
      `const TodoList = ({ items, onToggle }) => {
  return (
    <ul className="todo-list">
      {items.map(item => (
        <li key={item.id} onClick={() => onToggle(item.id)}>
          <span className={item.completed ? 'completed' : ''}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
};`,
    ],
    html: [
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="navbar">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
</body>
</html>`,
    ],
  };

  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof codeSnippets>('javascript');
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalTests: 0,
    averageWPM: 0,
    bestWPM: 0,
    averageAccuracy: 0,
    totalTime: 0,
    favoriteLanguage: 'javascript',
  });
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load stats from localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    const savedStats = localStorage.getItem('typingTestStats');

    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Select random snippet
  const selectRandomSnippet = useCallback(() => {
    const snippets = codeSnippets[selectedLanguage];
    const randomIndex = Math.floor(Math.random() * snippets.length);
    setCurrentText(snippets[randomIndex]);
  }, [selectedLanguage]);

  // Start test
  const startTest = () => {
    selectRandomSnippet();
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsTestActive(true);
    setIsTestComplete(false);
    setStartTime(Date.now());
    setEndTime(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Stop test and save partial results
  const stopTest = () => {
    if (isTestActive && startTime && userInput.length > 0) {
      // Save partial results
      const end = Date.now();
      setEndTime(end);
      setIsTestActive(false);
      setIsTestComplete(true);

      const timeInSeconds = (end - startTime) / 1000;
      const timeInMinutes = timeInSeconds / 60;
      const wordsTyped = userInput.split(' ').filter((w) => w.length > 0).length;
      const wpm = Math.round(wordsTyped / timeInMinutes) || 0;
      const accuracy = Math.round(((userInput.length - errors) / userInput.length) * 100);

      const result: TestResult = {
        wpm,
        accuracy,
        time: Math.round(timeInSeconds),
        errors,
        date: new Date().toLocaleString(),
        difficulty: selectedLanguage,
      };

      // Save result
      const newResults = [result, ...testResults].slice(0, 20);
      setTestResults(newResults);
      localStorage.setItem('typingTestResults', JSON.stringify(newResults));

      // Update stats
      updateStats(result);
    } else {
      resetTest();
    }
  };

  // Reset test
  const resetTest = () => {
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsTestActive(false);
    setIsTestComplete(false);
    setStartTime(null);
    setEndTime(null);
    selectRandomSnippet();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive || isTestComplete) return;

    const value = e.target.value;

    // Don't allow going backwards
    if (value.length < userInput.length) {
      return;
    }

    const newChar = value[value.length - 1];
    const expectedChar = currentText[currentIndex];

    if (newChar !== expectedChar) {
      setErrors(errors + 1);
    }

    setUserInput(value);
    setCurrentIndex(currentIndex + 1);

    // Check if test is complete
    if (value === currentText) {
      completeTest();
    }
  };

  // Complete test
  const completeTest = () => {
    const end = Date.now();
    setEndTime(end);
    setIsTestActive(false);
    setIsTestComplete(true);

    if (startTime) {
      const timeInSeconds = (end - startTime) / 1000;
      const timeInMinutes = timeInSeconds / 60;
      const wordsTyped = currentText.split(' ').length;
      const wpm = Math.round(wordsTyped / timeInMinutes);
      const accuracy = Math.round(((currentText.length - errors) / currentText.length) * 100);

      const result: TestResult = {
        wpm,
        accuracy,
        time: Math.round(timeInSeconds),
        errors,
        date: new Date().toLocaleString(),
        difficulty: selectedLanguage,
      };

      // Save result
      const newResults = [result, ...testResults].slice(0, 20); // Keep last 20 results
      setTestResults(newResults);
      localStorage.setItem('typingTestResults', JSON.stringify(newResults));

      // Update stats
      updateStats(result);
    }
  };

  // Update statistics
  const updateStats = (result: TestResult) => {
    const newTotalTests = stats.totalTests + 1;
    const newTotalWPM = stats.averageWPM * stats.totalTests + result.wpm;
    const newAverageWPM = Math.round(newTotalWPM / newTotalTests);
    const newBestWPM = Math.max(stats.bestWPM, result.wpm);
    const newTotalAccuracy = stats.averageAccuracy * stats.totalTests + result.accuracy;
    const newAverageAccuracy = Math.round(newTotalAccuracy / newTotalTests);
    const newTotalTime = stats.totalTime + result.time;

    const newStats: Stats = {
      totalTests: newTotalTests,
      averageWPM: newAverageWPM,
      bestWPM: newBestWPM,
      averageAccuracy: newAverageAccuracy,
      totalTime: newTotalTime,
      favoriteLanguage: selectedLanguage, // Could be more sophisticated
    };

    setStats(newStats);
    localStorage.setItem('typingTestStats', JSON.stringify(newStats));
  };

  // Calculate current WPM
  const calculateCurrentWPM = () => {
    if (!startTime || !isTestActive) return 0;
    const currentTime = Date.now();
    const timeInMinutes = (currentTime - startTime) / 1000 / 60;
    const wordsTyped = userInput.split(' ').filter((w) => w.length > 0).length;
    return Math.round(wordsTyped / timeInMinutes) || 0;
  };

  // Calculate accuracy
  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    return Math.round(((userInput.length - errors) / userInput.length) * 100);
  };

  // Get last result
  const getLastResult = () => {
    if (!isTestComplete || !startTime || !endTime) return null;
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    const wordsTyped = currentText.split(' ').length;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    const accuracy = Math.round(((currentText.length - errors) / currentText.length) * 100);
    return { wpm, accuracy, time: Math.round(timeInSeconds), errors };
  };

  const lastResult = getLastResult();

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isOpen) {
      selectRandomSnippet();
    }
  }, [isOpen, selectRandomSnippet]);

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
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Typing Speed Test</h1>
              <p className="text-gray-400">Test your coding speed with real code snippets</p>
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

          {/* Language Selector */}
          <div className="flex gap-2 mb-6">
            {Object.keys(codeSnippets).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang as keyof typeof codeSnippets);
                  resetTest();
                }}
                disabled={isTestActive}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedLanguage === lang
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                } ${isTestActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20"
            >
              <div className="text-blue-400 text-sm mb-1 font-medium">WPM</div>
              <div className="text-3xl font-bold text-white">
                {isTestActive ? calculateCurrentWPM() : lastResult?.wpm || 0}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20"
            >
              <div className="text-green-400 text-sm mb-1 font-medium">Accuracy</div>
              <div className="text-3xl font-bold text-white">
                {isTestActive ? calculateAccuracy() : lastResult?.accuracy || 100}%
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl p-4 border border-red-500/20"
            >
              <div className="text-red-400 text-sm mb-1 font-medium">Errors</div>
              <div className="text-3xl font-bold text-white">{errors}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/20"
            >
              <div className="text-purple-400 text-sm mb-1 font-medium">Time</div>
              <div className="text-3xl font-bold text-white">
                {startTime && !endTime
                  ? formatTime(Math.floor((Date.now() - startTime) / 1000))
                  : lastResult
                    ? formatTime(lastResult.time)
                    : '0:00'}
              </div>
            </motion.div>
          </div>

          {/* Text Display */}
          <div className="bg-gray-900/50 rounded-xl p-6 mb-6 font-mono text-sm leading-relaxed">
            <div className="relative">
              {currentText.split('').map((char, index) => {
                let className = 'text-gray-500';
                if (index < userInput.length) {
                  className = userInput[index] === char ? 'text-green-400' : 'text-red-400';
                }
                if (index === currentIndex && isTestActive) {
                  className += ' bg-gray-700';
                }
                return (
                  <span key={index} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={!isTestActive || isTestComplete}
              placeholder={isTestActive ? 'Start typing...' : "Click 'Start Test' to begin"}
              className="w-full h-32 p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isTestActive && !isTestComplete && (
              <button
                onClick={startTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Test
              </button>
            )}
            {isTestActive && (
              <button
                onClick={stopTest}
                className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Stop Test
              </button>
            )}
            {isTestComplete && (
              <>
                <button
                  onClick={startTest}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={resetTest}
                  className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
                >
                  New Text
                </button>
              </>
            )}
          </div>

          {/* Test Complete Message */}
          {isTestComplete && lastResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {userInput === currentText ? 'Test Complete! 🎉' : 'Test Stopped Early 🛑'}
              </h3>
              {userInput !== currentText && (
                <p className="text-gray-400 mb-4">
                  Progress: {Math.round((userInput.length / currentText.length) * 100)}% completed
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Your Speed:</span>
                  <span className="ml-2 text-white font-bold">{lastResult.wpm} WPM</span>
                </div>
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="ml-2 text-white font-bold">{lastResult.accuracy}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Time:</span>
                  <span className="ml-2 text-white font-bold">{formatTime(lastResult.time)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Errors:</span>
                  <span className="ml-2 text-white font-bold">{lastResult.errors}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats Panel - Always Visible */}
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
                <span className="text-gray-400">Average WPM</span>
                <span className="text-white font-bold">{stats.averageWPM}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best WPM</span>
                <span className="text-yellow-400 font-bold">{stats.bestWPM}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Accuracy</span>
                <span className="text-white font-bold">{stats.averageAccuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Time</span>
                <span className="text-white font-bold">{formatTime(stats.totalTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Language</span>
                <span className="text-purple-400 font-bold capitalize">
                  {stats.favoriteLanguage}
                </span>
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
                        <span className="text-white font-bold">{result.wpm} WPM</span>
                        <span className="text-gray-400 ml-2">• {result.accuracy}%</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {result.date} • {result.difficulty}
                        </div>
                      </div>
                      {result.wpm === stats.bestWPM && (
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
            localStorage.removeItem('typingTestResults');
            localStorage.removeItem('typingTestStats');
            setTestResults([]);
            setStats({
              totalTests: 0,
              averageWPM: 0,
              bestWPM: 0,
              averageAccuracy: 0,
              totalTime: 0,
              favoriteLanguage: 'javascript',
            });
          }}
          title="Clear All Statistics?"
          message="This will permanently delete all your typing test statistics, including:"
          stats={[
            { label: 'Total tests', value: stats.totalTests },
            { label: 'Best WPM', value: stats.bestWPM },
            { label: 'Average WPM', value: stats.averageWPM },
            { label: 'Average Accuracy', value: `${stats.averageAccuracy}%` },
          ]}
          details={[
            'Test history',
            'All performance metrics',
            'Language preferences',
          ]}
          confirmText="Yes, Clear Everything"
          cancelText="Cancel"
          variant="danger"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default TypingTest;
