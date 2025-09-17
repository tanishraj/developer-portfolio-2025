import { motion } from 'framer-motion';
import React, { useState, useCallback } from 'react';

import CallStack from './CallStack';
import CodeEditor from './CodeEditor';
import EventLoop from './EventLoop';
import ExecutionContext from './ExecutionContext';
import HelpGuide from './HelpGuide';
import { ExecutionStep, parseAndExecute } from './jsEngine';
import MemoryHeap from './MemoryHeap';
import TaskQueues from './TaskQueues';

const JSEngineVisualizer: React.FC = () => {
  const [code, setCode] = useState(`// Try these examples or write your own!
function greet(name) {
  const message = "Hello, " + name;
  console.log(message);
  return message;
}

const result = greet("World");
console.log("Result:", result);`);

  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [error, setError] = useState<string | null>(null);

  const executeCode = useCallback(() => {
    try {
      setError(null);
      const steps = parseAndExecute(code);
      setExecutionSteps(steps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setExecutionSteps([]);
    }
  }, [code]);

  const play = () => {
    if (currentStep >= executionSteps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Auto-play functionality
  React.useEffect(() => {
    if (isPlaying && currentStep < executionSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= executionSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, executionSteps.length, speed]);

  const currentStepData = executionSteps[currentStep];

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            JavaScript Engine Visualizer
          </h1>
          <p className="text-gray-400">
            See how JavaScript code executes step-by-step with visual representations of the call stack, execution context, and memory
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Code Editor */}
          <div className="space-y-6">
            <CodeEditor
              code={code}
              onChange={setCode}
              currentLine={currentStepData?.currentLine}
              error={error}
            />

            {/* Controls */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={executeCode}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium"
                  >
                    Run Code
                  </button>
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-400">Speed:</label>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="bg-gray-700 px-2 py-1 rounded text-sm"
                  >
                    <option value={2000}>0.5x</option>
                    <option value={1000}>1x</option>
                    <option value={500}>2x</option>
                    <option value={250}>4x</option>
                  </select>
                </div>
              </div>

              {executionSteps.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={stepBackward}
                      disabled={currentStep === 0}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={isPlaying ? pause : play}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={stepForward}
                      disabled={currentStep >= executionSteps.length - 1}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-700 rounded-full h-2 relative">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                          animate={{ width: `${((currentStep + 1) / executionSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {currentStep + 1} / {executionSteps.length}
                    </span>
                  </div>
                  {currentStepData && (
                    <div className="text-sm text-gray-400">
                      <span className="font-semibold">Current Operation:</span> {currentStepData.operation}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Side - Visualizations */}
          <div className="space-y-6">
            {/* Event Loop and Call Stack */}
            <div className="grid grid-cols-3 gap-4">
              <CallStack stack={currentStepData?.callStack || []} />
              <EventLoop 
                isActive={isPlaying}
                currentPhase={currentStepData?.eventLoopPhase || 'idle'}
              />
              <ExecutionContext context={currentStepData?.executionContext || {}} />
            </div>
            
            {/* Task Queues */}
            <TaskQueues
              microtasks={currentStepData?.microtaskQueue || []}
              macrotasks={currentStepData?.macrotaskQueue || []}
              currentlyExecuting={
                currentStepData?.eventLoopPhase === 'microtask' ? 'microtask' :
                currentStepData?.eventLoopPhase === 'macrotask' ? 'macrotask' : null
              }
            />
            
            {/* Memory Heap */}
            <MemoryHeap heap={currentStepData?.heap || {}} />

            {/* Console Output */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Console Output</h3>
              <div className="bg-black/50 rounded-lg p-3 font-mono text-sm max-h-32 overflow-y-auto">
                {currentStepData?.console.length ? (
                  currentStepData.console.map((log, index) => (
                    <div key={index} className="text-green-400">
                      {'>'} {log}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No output yet...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Try These Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setCode(`// Closure Example
function outer() {
  let count = 0;
  
  function inner() {
    count++;
    console.log("Count:", count);
  }
  
  return inner;
}

const counter = outer();
counter(); // Count: 1
counter(); // Count: 2`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-blue-400 mb-1">Closures</div>
              <div className="text-xs text-gray-400">See how closures capture variables</div>
            </button>

            <button
              onClick={() => setCode(`// Recursion Example
function factorial(n) {
  console.log("Calculating:", n);
  
  if (n <= 1) {
    return 1;
  }
  
  return n * factorial(n - 1);
}

const result = factorial(5);
console.log("Result:", result);`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-green-400 mb-1">Recursion</div>
              <div className="text-xs text-gray-400">Watch the call stack grow and shrink</div>
            </button>

            <button
              onClick={() => setCode(`// Scope Chain Example
const global = "Global";

function outer() {
  const outerVar = "Outer";
  
  function inner() {
    const innerVar = "Inner";
    console.log(global, outerVar, innerVar);
  }
  
  inner();
}

outer();`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-yellow-400 mb-1">Scope Chain</div>
              <div className="text-xs text-gray-400">Understand variable scope</div>
            </button>

            <button
              onClick={() => setCode(`// Async Example with Event Loop
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-red-400 mb-1">Event Loop</div>
              <div className="text-xs text-gray-400">See micro vs macro tasks</div>
            </button>

            <button
              onClick={() => setCode(`// Object and Array Operations
const person = {
  name: "Alice",
  age: 25
};

const hobbies = ["reading", "coding", "music"];

console.log(person.name);
console.log(hobbies[0]);

person.city = "New York";
hobbies.push("travel");

console.log(person);
console.log(hobbies);`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-indigo-400 mb-1">Objects & Arrays</div>
              <div className="text-xs text-gray-400">Heap memory allocation</div>
            </button>

            <button
              onClick={() => setCode(`// Loop Example
const numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum = sum + numbers[i];
  console.log("Current sum:", sum);
}

console.log("Final sum:", sum);`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-pink-400 mb-1">Loops</div>
              <div className="text-xs text-gray-400">Iteration visualization</div>
            </button>

            <button
              onClick={() => setCode(`// Conditional Logic
const score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}

console.log("Score:", score);
console.log("Grade:", grade);`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-teal-400 mb-1">Conditionals</div>
              <div className="text-xs text-gray-400">If-else branching</div>
            </button>

            <button
              onClick={() => setCode(`// This Binding Example
const obj = {
  name: "Object",
  greet: function() {
    console.log("Hello from " + this.name);
  }
};

obj.greet();

const greetFunc = obj.greet;
greetFunc(); // 'this' is undefined`)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold text-orange-400 mb-1">This Binding</div>
              <div className="text-xs text-gray-400">Context binding</div>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Help Guide Button */}
      <HelpGuide />
    </div>
  );
};

export default JSEngineVisualizer;