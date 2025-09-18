import { motion } from 'framer-motion';
import React, { useRef } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  currentLine?: number;
  error?: string | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, currentLine, error }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Generate line numbers
  const lines = code.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  // Removed auto-resize to prevent issues

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
      <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-purple-400">Code Editor</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="relative">
        <div className="flex">
          {/* Line Numbers */}
          <div
            ref={lineNumbersRef}
            className="bg-gray-900/30 text-gray-500 text-sm font-mono p-4 pr-2 select-none overflow-hidden"
            style={{ minWidth: '50px' }}
          >
            {lineNumbers.map((num) => (
              <div
                key={num}
                className={`leading-6 ${
                  currentLine === num
                    ? 'bg-yellow-500/20 text-yellow-400 font-bold relative'
                    : ''
                }`}
              >
                {currentLine === num && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"
                  />
                )}
                <span className="px-2">{num}</span>
              </div>
            ))}
          </div>

          {/* Code Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onChange(e.target.value)}
              onScroll={handleScroll}
              className="w-full min-h-[400px] p-4 bg-gray-900/50 text-gray-300 font-mono text-sm leading-6 resize-none outline-none cursor-text focus:bg-gray-900/70 transition-colors"
              style={{ cursor: 'text' }}
              spellCheck={false}
              placeholder="// Write your JavaScript code here..."
            />
            
            {/* Removed syntax highlighting overlay to prevent issues */}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border-t border-red-500/50 p-3"
          >
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

