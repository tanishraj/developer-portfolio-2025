export interface Variable {
  name: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function' | 'undefined' | 'null';
}

export interface StackFrame {
  name: string;
  type: 'function' | 'global' | 'anonymous' | 'arrow' | 'async';
  line?: number;
  variables?: Variable[];
}

export interface HeapObject {
  id: string;
  type: 'object' | 'array' | 'function' | 'string';
  value: any;
  references?: string[];
}

export interface Task {
  id: string;
  type: 'promise' | 'mutation-observer' | 'timeout' | 'interval' | 'io' | 'immediate';
  name: string;
  callback: string;
  delay?: number;
}

export interface ExecutionStep {
  operation: string;
  currentLine: number;
  callStack: StackFrame[];
  executionContext: {
    scope: string;
    thisBinding: string;
    variables: Variable[];
  };
  heap: Record<string, HeapObject>;
  console: string[];
  eventLoopPhase: 'idle' | 'call-stack' | 'microtask' | 'macrotask' | 'render';
  microtaskQueue: Task[];
  macrotaskQueue: Task[];
}

// Helper to detect variable type
function getVariableType(value: any): Variable['type'] {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'function') return 'function';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'undefined';
}

// Helper to evaluate expressions
function evaluateExpression(expr: string, variables: Variable[]): any {
  expr = expr.trim();
  
  // String literal
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }
  
  // Number literal
  if (!isNaN(Number(expr))) {
    return Number(expr);
  }
  
  // Boolean literal
  if (expr === 'true') return true;
  if (expr === 'false') return false;
  if (expr === 'null') return null;
  if (expr === 'undefined') return undefined;
  
  // Array literal
  if (expr.startsWith('[') && expr.endsWith(']')) {
    const items = expr.slice(1, -1).split(',').map(item => evaluateExpression(item.trim(), variables));
    return items;
  }
  
  // Object literal (simple)
  if (expr.startsWith('{') && expr.endsWith('}')) {
    const obj: any = {};
    const pairs = expr.slice(1, -1).split(',');
    pairs.forEach(pair => {
      const [key, val] = pair.split(':').map(s => s.trim());
      obj[key.replace(/["']/g, '')] = evaluateExpression(val, variables);
    });
    return obj;
  }
  
  // Variable reference
  const variable = variables.find(v => v.name === expr);
  if (variable) return variable.value;
  
  // Binary operations
  if (expr.includes('+')) {
    const parts = expr.split('+').map(p => evaluateExpression(p.trim(), variables));
    if (parts.every(p => typeof p === 'number')) {
      return parts.reduce((a, b) => a + b, 0);
    }
    return parts.join('');
  }
  
  if (expr.includes('-')) {
    const parts = expr.split('-').map(p => evaluateExpression(p.trim(), variables));
    if (parts.every(p => typeof p === 'number')) {
      return parts.reduce((a, b) => a - b);
    }
  }
  
  if (expr.includes('*')) {
    const parts = expr.split('*').map(p => evaluateExpression(p.trim(), variables));
    if (parts.every(p => typeof p === 'number')) {
      return parts.reduce((a, b) => a * b, 1);
    }
  }
  
  if (expr.includes('/')) {
    const parts = expr.split('/').map(p => evaluateExpression(p.trim(), variables));
    if (parts.every(p => typeof p === 'number')) {
      return parts.reduce((a, b) => a / b);
    }
  }
  
  // Property access
  if (expr.includes('.')) {
    const [objName, ...propPath] = expr.split('.');
    const obj = variables.find(v => v.name === objName);
    if (obj) {
      let value = obj.value;
      for (const prop of propPath) {
        value = value[prop];
      }
      return value;
    }
  }
  
  // Array access
  if (expr.includes('[') && expr.includes(']')) {
    const match = expr.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const [, arrName, index] = match;
      const arr = variables.find(v => v.name === arrName);
      if (arr && Array.isArray(arr.value)) {
        return arr.value[parseInt(index)];
      }
    }
  }
  
  return expr;
}

// Enhanced parser with more features
export function parseAndExecute(code: string): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const lines = code.split('\n');
  
  // Global state
  let globalVariables: Variable[] = [];
  let functions: Record<string, any> = {};
  let heap: Record<string, HeapObject> = {};
  let callStack: StackFrame[] = [{ name: 'Global', type: 'global', variables: globalVariables }];
  let consoleOutput: string[] = [];
  let microtaskQueue: Task[] = [];
  let macrotaskQueue: Task[] = [];
  let taskIdCounter = 0;
  
  const generateTaskId = () => `task_${++taskIdCounter}`;
  const generateHeapId = () => `heap_${Object.keys(heap).length + 1}`;
  
  const createStep = (
    operation: string,
    line: number,
    phase: ExecutionStep['eventLoopPhase'] = 'call-stack'
  ): ExecutionStep => ({
    operation,
    currentLine: line,
    callStack: [...callStack],
    executionContext: {
      scope: callStack[callStack.length - 1]?.name || 'Global',
      thisBinding: callStack[callStack.length - 1]?.type === 'global' ? 'window' : 'undefined',
      variables: [...(callStack[callStack.length - 1]?.variables || [])]
    },
    heap: { ...heap },
    console: [...consoleOutput],
    eventLoopPhase: phase,
    microtaskQueue: [...microtaskQueue],
    macrotaskQueue: [...macrotaskQueue]
  });
  
  // Parse and execute line by line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//')) continue;
    
    const currentContext = callStack[callStack.length - 1];
    
    // Variable declaration
    if (line.match(/^(const|let|var)\s+/)) {
      const match = line.match(/(const|let|var)\s+(\w+)\s*=\s*(.+);?$/);
      if (match) {
        const [, , varName, varValue] = match;
        const value = evaluateExpression(varValue.replace(/;$/, ''), currentContext.variables || []);
        const type = getVariableType(value);
        
        const variable: Variable = { name: varName, value, type };
        
        if (currentContext.variables) {
          currentContext.variables.push(variable);
        } else {
          currentContext.variables = [variable];
        }
        
        // Add to heap if it's an object/array
        if (type === 'object' || type === 'array') {
          const heapId = generateHeapId();
          heap[heapId] = {
            id: heapId,
            type: type as 'object' | 'array',
            value,
            references: []
          };
        }
        
        steps.push(createStep(
          `Declaring ${varName} = ${JSON.stringify(value)}`,
          i + 1
        ));
      }
    }
    
    // Function declaration
    else if (line.startsWith('function ')) {
      const match = line.match(/function\s+(\w+)\s*\(([^)]*)\)/);
      if (match) {
        const [, funcName, params] = match;
        const paramList = params.split(',').map(p => p.trim()).filter(p => p);
        
        // Find function body
        let bodyLines: string[] = [];
        let depth = 0;
        let j = i + 1;
        
        while (j < lines.length) {
          const bodyLine = lines[j];
          if (bodyLine.includes('{')) depth++;
          if (bodyLine.includes('}')) {
            depth--;
            if (depth === 0) break;
          }
          if (depth > 0) {
            bodyLines.push(bodyLine);
          }
          j++;
        }
        
        functions[funcName] = {
          name: funcName,
          params: paramList,
          body: bodyLines
        };
        
        // Add function to heap
        const heapId = generateHeapId();
        heap[heapId] = {
          id: heapId,
          type: 'function',
          value: { name: funcName, params: paramList },
          references: []
        };
        
        steps.push(createStep(
          `Defining function ${funcName}(${paramList.join(', ')})`,
          i + 1
        ));
        
        i = j; // Skip to end of function
      }
    }
    
    // Arrow function
    else if (line.includes('=>')) {
      const match = line.match(/(const|let|var)\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/);
      if (match) {
        const [, , funcName, params] = match;
        const paramList = params.split(',').map(p => p.trim()).filter(p => p);
        
        steps.push(createStep(
          `Defining arrow function ${funcName}(${paramList.join(', ')})`,
          i + 1
        ));
      }
    }
    
    // Function call
    else if (line.match(/^\w+\([^)]*\);?$/)) {
      const match = line.match(/^(\w+)\(([^)]*)\)/);
      if (match) {
        const [, funcName, args] = match;
        const argList = args.split(',').map(a => a.trim()).filter(a => a);
        
        if (funcName === 'console' || line.startsWith('console.log')) {
          // Handle console.log
          const logMatch = line.match(/console\.log\(([^)]+)\)/);
          if (logMatch) {
            const logArgs = logMatch[1].split(',').map(arg => {
              return evaluateExpression(arg.trim(), currentContext.variables || []);
            });
            const output = logArgs.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            
            consoleOutput.push(output);
            steps.push(createStep(`Console: ${output}`, i + 1));
          }
        } else if (funcName === 'setTimeout') {
          // Handle setTimeout
          const timeoutMatch = line.match(/setTimeout\s*\(\s*\(\)\s*=>\s*\{?([^}]*)\}?\s*,\s*(\d+)\s*\)/);
          if (timeoutMatch) {
            const [, callback, delay] = timeoutMatch;
            const task: Task = {
              id: generateTaskId(),
              type: 'timeout',
              name: 'setTimeout',
              callback: callback.trim(),
              delay: parseInt(delay)
            };
            macrotaskQueue.push(task);
            steps.push(createStep(`Scheduling setTimeout (${delay}ms)`, i + 1));
          }
        } else if (functions[funcName]) {
          // Regular function call
          const func = functions[funcName];
          const funcFrame: StackFrame = {
            name: funcName,
            type: 'function',
            line: i + 1,
            variables: func.params.map((p: string, idx: number) => ({
              name: p,
              value: evaluateExpression(argList[idx] || 'undefined', currentContext.variables || []),
              type: getVariableType(evaluateExpression(argList[idx] || 'undefined', currentContext.variables || []))
            }))
          };
          
          callStack.push(funcFrame);
          steps.push(createStep(`Calling ${funcName}(${argList.join(', ')})`, i + 1));
          
          // Execute function body
          for (const bodyLine of func.body) {
            // Process function body lines...
            // This would be similar to the main loop but scoped to the function
          }
          
          callStack.pop();
          steps.push(createStep(`Returning from ${funcName}`, i + 1));
        }
      }
    }
    
    // If statement
    else if (line.startsWith('if ')) {
      const match = line.match(/if\s*\(([^)]+)\)/);
      if (match) {
        const condition = match[1];
        const evaluated = evaluateExpression(condition, currentContext.variables || []);
        steps.push(createStep(`Evaluating condition: ${condition} = ${evaluated}`, i + 1));
      }
    }
    
    // For loop
    else if (line.startsWith('for ')) {
      const match = line.match(/for\s*\(([^;]+);\s*([^;]+);\s*([^)]+)\)/);
      if (match) {
        const [, init, condition, update] = match;
        steps.push(createStep(`Starting loop: ${init}; ${condition}; ${update}`, i + 1));
      }
    }
    
    // While loop
    else if (line.startsWith('while ')) {
      const match = line.match(/while\s*\(([^)]+)\)/);
      if (match) {
        const condition = match[1];
        steps.push(createStep(`While loop: ${condition}`, i + 1));
      }
    }
    
    // Promise
    else if (line.includes('Promise')) {
      if (line.includes('Promise.resolve')) {
        steps.push(createStep('Creating resolved Promise', i + 1));
        
        // Check for .then() on next lines
        if (i + 1 < lines.length && lines[i + 1].includes('.then')) {
          const task: Task = {
            id: generateTaskId(),
            type: 'promise',
            name: 'Promise.then',
            callback: 'promise callback'
          };
          microtaskQueue.push(task);
          steps.push(createStep('Adding Promise.then to microtask queue', i + 2));
        }
      }
    }
  }
  
  // Process microtasks
  while (microtaskQueue.length > 0) {
    const task = microtaskQueue.shift()!;
    steps.push(createStep(`Processing microtask: ${task.name}`, lines.length, 'microtask'));
  }
  
  // Process macrotasks
  while (macrotaskQueue.length > 0) {
    const task = macrotaskQueue.shift()!;
    steps.push(createStep(`Processing macrotask: ${task.name}`, lines.length, 'macrotask'));
  }
  
  return steps;
}