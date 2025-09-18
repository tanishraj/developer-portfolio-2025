import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
            className="text-[150px] xl:text-[200px] font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off into the digital void. Don't
            worry, even the best developers encounter 404s sometimes!
          </p>
        </motion.div>

        {/* Glitch Effect Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block relative">
            <motion.span
              animate={{
                x: [-2, 2, -2],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 text-red-500 text-xl"
              style={{ clipPath: 'inset(40% 0 60% 0)' }}
            >
              ERROR_PATH_NOT_FOUND
            </motion.span>
            <motion.span
              animate={{
                x: [2, -2, 2],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.1,
              }}
              className="absolute inset-0 text-blue-500 text-xl"
              style={{ clipPath: 'inset(60% 0 40% 0)' }}
            >
              ERROR_PATH_NOT_FOUND
            </motion.span>
            <span className="text-gray-500 text-xl">ERROR_PATH_NOT_FOUND</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.button
            onClick={handleGoHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Take Me Home
          </motion.button>
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            Go Back
          </motion.button>
        </motion.div>

        {/* Auto-redirect countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-gray-500 text-sm"
        >
          Redirecting to home in{' '}
          <motion.span
            key={countdown}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-blue-400 font-semibold"
          >
            {countdown}
          </motion.span>{' '}
          seconds...
        </motion.div>

        {/* Fun ASCII Art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-gray-700 text-xs mt-12 hidden xl:block"
        >
          {`
     ___________________________
    !___________________________!
    !                           !
    !  ┌─┐┌─┐┌─┐┬ ┬  ┌┐┌┌─┐┌┬┐ !
    !  │ ││ │├─┘└─┘  ││││ │ │  !
    !  └─┘└─┘┴       ┘└┘└─┘ ┴  !
    !  ┌─┐┌─┐┬ ┬┌┐┌┌┬┐        !
    !  ├┤ │ ││ │││││ ││        !
    !  └  └─┘└─┘┘└┘─┴┘        !
    !___________________________!
`}
        </motion.pre>

        {/* Floating 404 particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-100, -200],
              x: [0, (i - 2) * 30],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
            className="absolute text-gray-700 text-2xl font-bold pointer-events-none"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '10%',
            }}
          >
            404
          </motion.div>
        ))}
      </div>
    </section>
  );
};

