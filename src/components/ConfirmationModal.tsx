import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  details?: string[];
  stats?: { label: string; value: string | number }[];
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  details,
  stats,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: 'text-red-500',
          border: 'border-red-500/30',
          confirmButton: 'bg-red-600 hover:bg-red-700',
        };
      case 'warning':
        return {
          icon: 'text-yellow-500',
          border: 'border-yellow-500/30',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700',
        };
      case 'info':
        return {
          icon: 'text-blue-500',
          border: 'border-blue-500/30',
          confirmButton: 'bg-blue-600 hover:bg-blue-700',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-md mx-4 ${styles.border} border shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <svg
                className={`w-8 h-8 ${styles.icon} mr-3`}
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
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>

            <p className="text-gray-300 mb-6">{message}</p>

            {stats && stats.length > 0 && (
              <ul className="text-gray-400 text-sm mb-6 space-y-1">
                {stats.map((stat, index) => (
                  <li key={index}>
                    • {stat.label}: <span className="text-white font-semibold">{stat.value}</span>
                  </li>
                ))}
              </ul>
            )}

            {details && details.length > 0 && (
              <ul className="text-gray-400 text-sm mb-6 space-y-1">
                {details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 px-4 py-2 ${styles.confirmButton} text-white rounded-lg transition-colors font-medium`}
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;