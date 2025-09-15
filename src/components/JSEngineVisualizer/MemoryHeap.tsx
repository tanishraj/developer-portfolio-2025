import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import InfoTooltip from './InfoTooltip';

interface HeapObject {
  id: string;
  type: 'object' | 'array' | 'function' | 'string';
  value: any;
  references?: string[];
}

interface MemoryHeapProps {
  heap: Record<string, HeapObject>;
}

const MemoryHeap: React.FC<MemoryHeapProps> = ({ heap }) => {
  const getObjectColor = (type: string) => {
    switch (type) {
      case 'object':
        return 'from-orange-500 to-orange-600';
      case 'array':
        return 'from-blue-500 to-blue-600';
      case 'function':
        return 'from-purple-500 to-purple-600';
      case 'string':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'object':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'array':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'function':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const formatValue = (obj: HeapObject) => {
    if (obj.type === 'array') {
      return `[${obj.value.length} items]`;
    }
    if (obj.type === 'function') {
      return `ƒ ${obj.value.name || 'anonymous'}()`;
    }
    if (obj.type === 'string') {
      return `"${obj.value.substring(0, 20)}${obj.value.length > 20 ? '...' : ''}"`;
    }
    if (obj.type === 'object') {
      const keys = Object.keys(obj.value);
      return `{${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}}`;
    }
    return JSON.stringify(obj.value);
  };

  const heapEntries = Object.entries(heap);

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-green-400">Memory Heap</h3>
          <InfoTooltip
            title="Memory Heap"
            description="The heap stores objects, arrays, and functions. JavaScript uses automatic garbage collection."
            details={[
              "Objects are stored by reference",
              "Primitive values stored in stack", 
              "Garbage collection removes unreferenced objects",
              "Memory leaks from retained references"
            ]}
          />
        </div>
        <div className="text-xs text-gray-500">
          Objects: {heapEntries.length}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 min-h-[200px]">
        {heapEntries.length === 0 ? (
          <div className="col-span-3 text-gray-500 text-sm text-center py-8">
            Heap is empty
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {heapEntries.map(([id, obj], index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${getObjectColor(obj.type)} p-3 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
                  <div className="flex items-center gap-2 mb-1">
                    {getIcon(obj.type)}
                    <span className="text-xs font-semibold uppercase opacity-80">
                      {obj.type}
                    </span>
                  </div>
                  <div className="text-xs font-mono break-all">
                    {formatValue(obj)}
                  </div>
                  <div className="text-[10px] opacity-60 mt-1">
                    @{id.substring(0, 6)}
                  </div>
                </div>

                {/* References */}
                {obj.references && obj.references.length > 0 && (
                  <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {obj.references.length}
                  </div>
                )}

                {/* Hover Details */}
                <div className="absolute top-full left-0 mt-2 p-2 bg-gray-900 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 min-w-[150px]">
                  <div className="text-xs text-gray-400">
                    <div>ID: {id}</div>
                    {obj.references && (
                      <div className="mt-1">
                        References: {obj.references.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Memory Usage Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>Memory Usage</span>
          <span>{(heapEntries.length * 0.1).toFixed(1)} MB</span>
        </div>
        <div className="bg-gray-700 rounded-full h-2 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-yellow-500"
            animate={{ width: `${Math.min(heapEntries.length * 5, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryHeap;