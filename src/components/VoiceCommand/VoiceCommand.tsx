import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const VoiceCommand: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [commandExecuted, setCommandExecuted] = useState('');
  const [showUnsupportedModal, setShowUnsupportedModal] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      // Use default voice or first available voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Check if speech recognition is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setShowUnsupportedModal(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      setTranscript(transcript);

      if (event.results[current].isFinal) {
        handleVoiceCommand(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setCommandExecuted('No speech detected. Please try again.');
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    recognitionRef.current = recognition;

    // Keyboard shortcut to activate voice command (Ctrl/Cmd + Shift + V)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        toggleListening();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setShowFeedback(false);
      setCommandExecuted('');
      setTranscript('');
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      setCommandExecuted('Listening...');
      setShowFeedback(true);
    }
  };

  const handleVoiceCommand = (command: string) => {
    let executed = false;
    let feedbackMessage = '';
    const mentionsCv = command.includes('resume') || command.includes('cv');
    const requestsCv = mentionsCv && (command.includes('download') || command.includes('share'));

    // Introduction command
    if (
      command.includes('introduction') ||
      command.includes('introduce') ||
      command.includes('who are you')
    ) {
      feedbackMessage =
        "Hi, I'm Tanish Raj, a full-stack developer passionate about creating innovative web solutions. I specialize in React, Node.js, and modern web technologies. Welcome to my portfolio!";
      executed = true;
      // Navigate to home/hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Navigation commands
    else if (command.includes('home') || command.includes('start')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      feedbackMessage = 'Navigating to Home';
      executed = true;
    } else if (command.includes('about')) {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        feedbackMessage = 'Navigating to About';
        executed = true;
      }
    } else if (command.includes('service')) {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        feedbackMessage = 'Navigating to Services';
        executed = true;
      }
    } else if (command.includes('skill')) {
      const element = document.getElementById('skills');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        feedbackMessage = 'Navigating to Skills';
        executed = true;
      }
    } else if (command.includes('portfolio') || command.includes('work')) {
      const element = document.getElementById('portfolio');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        feedbackMessage = 'Navigating to Portfolio';
        executed = true;
      }
    } else if (command.includes('contact')) {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        feedbackMessage = 'Navigating to Contact';
        executed = true;
      }
    }
    // Scroll commands
    else if (command.includes('scroll down') || command.includes('down')) {
      window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
      feedbackMessage = 'Scrolling down';
      executed = true;
    } else if (command.includes('scroll up') || command.includes('up')) {
      window.scrollBy({ top: -window.innerHeight * 0.5, behavior: 'smooth' });
      feedbackMessage = 'Scrolling up';
      executed = true;
    } else if (command.includes('top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      feedbackMessage = 'Going to top';
      executed = true;
    } else if (command.includes('bottom')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      feedbackMessage = 'Going to bottom';
      executed = true;
    }
    // Action commands
    else if (requestsCv) {
      // Trigger resume download if available
      const resumeLink = document.querySelector('a[data-cv-download]') as HTMLAnchorElement;
      if (resumeLink) {
        resumeLink.click();
        feedbackMessage = 'Downloading CV';
        executed = true;
      }
    } else if (command.includes('email') || command.includes('mail')) {
      const emailLink = document.querySelector('a[href^="mailto:"]') as HTMLAnchorElement;
      if (emailLink) {
        emailLink.click();
        feedbackMessage = 'Opening email client';
        executed = true;
      }
    }
    // Snake Game command
    else if (command.includes('snake game') || command.includes('play snake')) {
      navigate('/games/snake');
      feedbackMessage = 'Opening Snake Game';
      executed = true;
    }
    // Typing Test command
    else if (
      command.includes('typing test') ||
      command.includes('typing game') ||
      command.includes('type test')
    ) {
      navigate('/games/typing');
      feedbackMessage = 'Opening Typing Speed Test';
      executed = true;
    }
    // Reaction Test command
    else if (
      command.includes('reaction test') ||
      command.includes('reaction time') ||
      command.includes('reflex test') ||
      command.includes('speed test')
    ) {
      navigate('/games/reaction');
      feedbackMessage = 'Opening Reaction Time Test';
      executed = true;
    }
    // General game command (opens reaction test by default as it's quick)
    else if (command.includes('play game') || command.includes('game')) {
      navigate('/games/reaction');
      feedbackMessage = 'Opening Reaction Time Test';
      executed = true;
    }
    // Help command
    else if (command.includes('help') || command.includes('commands')) {
      feedbackMessage =
        'Say: Introduction, Home, About, Services, Skills, Portfolio, Contact, Snake Game, Typing Test, Reaction Test, Scroll Up/Down';
      executed = true;
    }

    if (executed) {
      setCommandExecuted(feedbackMessage);
      speak(feedbackMessage); // Speak the feedback
    } else {
      const errorMessage = `Command not recognized: "${command}"`;
      setCommandExecuted(errorMessage);
      speak('Command not recognized'); // Speak simplified error
    }

    setShowFeedback(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      setCommandExecuted('');
    }, 3000);
  };

  // Check if browser supports speech recognition
  const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <>
      {/* Voice Command Button - Only show when supported */}
      {isSupported && (
        <motion.button
          onClick={toggleListening}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isListening ? 'Stop listening' : 'Voice Command'}
          title={isListening ? 'Click to stop listening' : 'Press Ctrl+Shift+V to activate'}
        >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isListening ? (
            // Stop icon
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          ) : (
            // Microphone icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          )}
        </svg>
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
      )}

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-sm"
          >
            <div className="flex items-center gap-3">
              {isListening && (
                <motion.div
                  className="w-3 h-3 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <div>
                {transcript && isListening && (
                  <p className="text-sm text-gray-400 mb-1">Hearing: "{transcript}"</p>
                )}
                <p className="text-sm font-medium">{commandExecuted}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions on first visit */}
      <AnimatePresence>
        {!localStorage.getItem('voiceCommandShown') && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-24 right-8 z-50 bg-purple-900/20 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl max-w-xs border border-purple-500/30"
            onAnimationComplete={() => {
              setTimeout(() => {
                localStorage.setItem('voiceCommandShown', 'true');
              }, 5000);
            }}
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Voice Commands Available
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Click the mic button or press{' '}
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+Shift+V</kbd> to start
            </p>
            <p className="text-xs text-gray-400">
              Try saying: "Go to About", "Scroll down", "Contact", etc.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unsupported Browser Modal */}
      <AnimatePresence>
        {showUnsupportedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center"
            onClick={() => setShowUnsupportedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-md mx-4 border border-yellow-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-white">Browser Not Supported</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Speech recognition is not supported in your current browser. Voice commands require a modern browser with Web Speech API support.
              </p>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-3">Supported browsers include:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Google Chrome (Desktop & Mobile)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Safari (macOS & iOS)</li>
                  <li>• Samsung Internet</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnsupportedModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Understood
                </button>
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Get Chrome
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
