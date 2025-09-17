import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface InfoTooltipProps {
  title: string;
  description: string;
  details?: string[];
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="ml-2 w-5 h-5 rounded-full bg-gray-700 hover:bg-gray-600 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center"
      >
        ?
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute z-50 left-0 top-7 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4"
          >
            <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
            <p className="text-xs text-gray-400 mb-2">{description}</p>
            {details && details.length > 0 && (
              <ul className="text-xs text-gray-500 space-y-1">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoTooltip;