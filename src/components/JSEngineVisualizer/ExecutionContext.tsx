import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import InfoTooltip from './InfoTooltip';

interface Variable {
  name: string;
  value: any;
  type: string;
}

interface ExecutionContextProps {
  context: {
    variables?: Variable[];
    thisBinding?: any;
    scope?: string;
  };
}

const ExecutionContext: React.FC<ExecutionContextProps> = ({ context }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string':
        return 'text-green-400';
      case 'number':
        return 'text-yellow-400';
      case 'boolean':
        return 'text-blue-400';
      case 'function':
        return 'text-purple-400';
      case 'object':
        return 'text-orange-400';
      case 'undefined':
        return 'text-gray-500';
      case 'null':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatValue = (value: any, type: string) => {
    if (type === 'string') return `"${value}"`;
    if (type === 'function') return 'ƒ()';
    if (type === 'object') {
      if (value === null) return 'null';
      if (Array.isArray(value)) return `[${value.length}]`;
      return '{}';
    }
    return String(value);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <h3 className="text-lg font-semibold text-blue-400">Execution Context</h3>
        <InfoTooltip
          title="Execution Context"
          description="Each function creates its own execution context with variables, scope chain, and 'this' binding."
          details={[
            "Variables: Local variables and parameters",
            "Scope Chain: Access to outer scopes",
            "This Binding: What 'this' refers to",
            "Created when function is invoked"
          ]}
        />
      </div>
      
      <div className="space-y-3">
        {/* Scope */}
        <div className="bg-gray-900/30 rounded-lg p-2 border border-gray-700/50">
          <div className="text-xs text-gray-500 mb-1">Scope</div>
          <div className="text-sm font-mono text-cyan-400">
            {context.scope || 'Global'}
          </div>
        </div>

        {/* This Binding */}
        <div className="bg-gray-900/30 rounded-lg p-2 border border-gray-700/50">
          <div className="text-xs text-gray-500 mb-1">this</div>
          <div className="text-sm font-mono text-orange-400">
            {context.thisBinding || 'window'}
          </div>
        </div>

        {/* Variables */}
        <div className="bg-gray-900/30 rounded-lg p-2 border border-gray-700/50">
          <div className="text-xs text-gray-500 mb-2">Variables</div>
          <div className="space-y-1 max-h-[150px] overflow-y-auto">
            {!context.variables || context.variables.length === 0 ? (
              <div className="text-gray-600 text-xs text-center py-2">
                No variables
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {context.variables.map((variable, index) => (
                  <motion.div
                    key={variable.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between text-xs font-mono bg-gray-800/50 px-2 py-1 rounded"
                  >
                    <span className="text-gray-300">{variable.name}</span>
                    <span className="flex items-center gap-2">
                      <span className={getTypeColor(variable.type)}>
                        {formatValue(variable.value, variable.type)}
                      </span>
                      <span className="text-gray-600 text-[10px]">
                        ({variable.type})
                      </span>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Lexical Environment Indicator */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Lexical Environment Active</span>
        </div>
      </div>
    </div>
  );
};

export default ExecutionContext;