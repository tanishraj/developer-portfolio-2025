import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import ConfirmationModal from './ConfirmationModal';

interface Position {
  x: number;
  y: number;
}

interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  bestTime: number;
  currentStreak: number;
  bestStreak: number;
}

interface GameHistory {
  score: number;
  date: string;
  duration: number;
}

const GRID_SIZE = 25;
const CELL_SIZE = 24;
const INITIAL_SPEED = 150;

const SnakeGame: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 12, y: 12 }]);
  const [food, setFood] = useState<Position>({ x: 18, y: 18 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    gamesPlayed: 0,
    totalScore: 0,
    averageScore: 0,
    bestTime: 0,
    currentStreak: 0,
    bestStreak: 0,
  });
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameDuration, setGameDuration] = useState<number>(0);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load game data from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    const savedHistory = localStorage.getItem('snakeGameHistory');
    const savedStats = localStorage.getItem('snakeGameStats');

    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }

    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
  }, []);

  // Generate random food position
  const generateFood = useCallback(() => {
    const isPositionOccupied = (pos: Position): boolean => {
      return snake.some((segment) => segment.x === pos.x && segment.y === pos.y);
    };
    
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (isPositionOccupied(newFood));
    
    return newFood;
  }, [snake]);

  // Save game stats
  const saveGameStats = useCallback((finalScore: number, duration: number) => {
    const newHistory: GameHistory = {
      score: finalScore,
      date: new Date().toLocaleString(),
      duration: duration,
    };

    const updatedHistory = [newHistory, ...gameHistory].slice(0, 10); // Keep last 10 games
    setGameHistory(updatedHistory);
    localStorage.setItem('snakeGameHistory', JSON.stringify(updatedHistory));

    const updatedStats = {
      ...gameStats,
      gamesPlayed: gameStats.gamesPlayed + 1,
      totalScore: gameStats.totalScore + finalScore,
      averageScore: Math.round((gameStats.totalScore + finalScore) / (gameStats.gamesPlayed + 1)),
      bestTime: Math.max(gameStats.bestTime, duration),
      currentStreak: finalScore > 50 ? gameStats.currentStreak + 1 : 0,
      bestStreak: Math.max(gameStats.bestStreak, finalScore > 50 ? gameStats.currentStreak + 1 : 0),
    };

    setGameStats(updatedStats);
    localStorage.setItem('snakeGameStats', JSON.stringify(updatedStats));
  }, [gameHistory, gameStats]);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 12, y: 12 }]);
    setFood({ x: 18, y: 18 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPaused(true);
    setGameDuration(0);
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
  };

  // Start game
  const startGame = useCallback(() => {
    if (gameOver) {
      resetGame();
    }
    setIsPaused(false);
    setDirection({ x: 1, y: 0 });
    setGameStartTime(Date.now());

    // Start duration timer
    const startTime = Date.now();
    durationIntervalRef.current = setInterval(() => {
      setGameDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  }, [gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === ' ' && (isPaused || gameOver)) {
        startGame();
        return;
      }

      if (e.key === 'Escape') {
        setIsPaused(true);
        return;
      }

      if (isPaused || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isPaused, gameOver, direction, startGame]);

  // Game loop
  useEffect(() => {
    if (!isOpen || isPaused || gameOver || (direction.x === 0 && direction.y === 0)) {
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Move head
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          const finalDuration = Math.floor((Date.now() - gameStartTime) / 1000);
          saveGameStats(score, finalDuration);
          if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
          }
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
          }
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          const finalDuration = Math.floor((Date.now() - gameStartTime) / 1000);
          saveGameStats(score, finalDuration);
          if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
          }
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
          }
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isOpen, isPaused, gameOver, direction, food, generateFood, score, highScore, gameStartTime, saveGameStats]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a0f1b] z-[60] flex"
      >
        {/* Main Game Area */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Snake Game</h1>
              <p className="text-gray-400">Guide the snake to collect food and grow longer</p>
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

          {/* Live Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 border border-purple-500/20"
            >
              <div className="text-purple-400 text-sm mb-1 font-medium">Score</div>
              <div className="text-3xl font-bold text-white">{score}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-4 border border-yellow-500/20"
            >
              <div className="text-yellow-400 text-sm mb-1 font-medium">High Score</div>
              <div className="text-3xl font-bold text-white">{highScore}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/20"
            >
              <div className="text-green-400 text-sm mb-1 font-medium">Time</div>
              <div className="text-3xl font-bold text-white">{formatTime(gameDuration)}</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20"
            >
              <div className="text-blue-400 text-sm mb-1 font-medium">Length</div>
              <div className="text-3xl font-bold text-white">{snake.length}</div>
            </motion.div>
          </div>

          {/* Game Board */}
          <div className="flex justify-center mb-6">
            <div
              className="relative bg-[#1a1f2e] rounded-lg p-4 shadow-inner"
              style={{
                width: `${GRID_SIZE * CELL_SIZE + 32}px`,
                height: `${GRID_SIZE * CELL_SIZE + 32}px`,
              }}
            >
              <div
                className="relative bg-[#0a0f1b] rounded"
                style={{
                  width: `${GRID_SIZE * CELL_SIZE}px`,
                  height: `${GRID_SIZE * CELL_SIZE}px`,
                }}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div
                        className="absolute bg-gray-500"
                        style={{
                          left: `${i * CELL_SIZE}px`,
                          top: 0,
                          width: '1px',
                          height: '100%',
                        }}
                      />
                      <div
                        className="absolute bg-gray-500"
                        style={{
                          top: `${i * CELL_SIZE}px`,
                          left: 0,
                          height: '1px',
                          width: '100%',
                        }}
                      />
                    </React.Fragment>
                  ))}
                </div>

                {/* Snake */}
                {snake.map((segment, index) => (
                  <motion.div
                    key={index}
                    className={`absolute rounded ${
                      index === 0 ? 'bg-purple-500 shadow-lg shadow-purple-500/50' : 'bg-purple-600'
                    }`}
                    style={{
                      left: `${segment.x * CELL_SIZE + 2}px`,
                      top: `${segment.y * CELL_SIZE + 2}px`,
                      width: `${CELL_SIZE - 4}px`,
                      height: `${CELL_SIZE - 4}px`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1 }}
                  />
                ))}

                {/* Food */}
                <motion.div
                  className="absolute bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
                  style={{
                    left: `${food.x * CELL_SIZE + 2}px`,
                    top: `${food.y * CELL_SIZE + 2}px`,
                    width: `${CELL_SIZE - 4}px`,
                    height: `${CELL_SIZE - 4}px`,
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />

                {/* Game Over / Pause Overlay */}
                {(gameOver || isPaused) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center rounded"
                  >
                    <div className="text-center">
                      {gameOver ? (
                        <>
                          <h3 className="text-3xl font-bold text-red-500 mb-2">Game Over!</h3>
                          <p className="text-white mb-4">Final Score: {score}</p>
                        </>
                      ) : (
                        <h3 className="text-3xl font-bold text-yellow-400 mb-4">Paused</h3>
                      )}
                      <button
                        onClick={startGame}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        {gameOver ? 'Play Again' : 'Start Game'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="text-center text-sm text-gray-400">
            <p>Use Arrow Keys or WASD to move</p>
            <p>Press Space to start/restart • ESC to pause</p>
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
                <span className="text-gray-400">Games Played</span>
                <span className="text-white font-bold">{gameStats.gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Score</span>
                <span className="text-white font-bold">{gameStats.totalScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Score</span>
                <span className="text-white font-bold">{gameStats.averageScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Time</span>
                <span className="text-white font-bold">{formatTime(gameStats.bestTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Streak</span>
                <span className="text-green-400 font-bold">{gameStats.currentStreak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Best Streak</span>
                <span className="text-yellow-400 font-bold">{gameStats.bestStreak}</span>
              </div>
            </div>
          </div>

          {/* Game History */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Recent Games</h3>
            <div className="space-y-2">
              {gameHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No games played yet</p>
              ) : (
                gameHistory.map((game, index) => (
                  <motion.div
                    key={game.score + game.date + game.duration}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-900/50 rounded-lg p-3 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold">Score: {game.score}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {game.date} • {formatTime(game.duration)}
                        </div>
                      </div>
                      {index === 0 && game.score === highScore && (
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
            localStorage.removeItem('snakeHighScore');
            localStorage.removeItem('snakeGameHistory');
            localStorage.removeItem('snakeGameStats');
            setHighScore(0);
            setGameHistory([]);
            setGameStats({
              gamesPlayed: 0,
              totalScore: 0,
              averageScore: 0,
              bestTime: 0,
              currentStreak: 0,
              bestStreak: 0,
            });
          }}
          title="Clear All Statistics?"
          message="This will permanently delete all your game statistics, including:"
          stats={[
            { label: 'High score', value: highScore },
            { label: 'Games played', value: gameStats.gamesPlayed },
          ]}
          details={[
            'Game history (last 10 games)',
            'All achievement progress',
          ]}
          confirmText="Yes, Clear Everything"
          cancelText="Cancel"
          variant="danger"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SnakeGame;
