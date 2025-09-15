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
  callStack: Array<{
    name: string;
    type: 'function' | 'global' | 'anonymous';
    line?: number;
  }>;
  executionContext: {
    variables?: Array<{
      name: string;
      value: any;
      type: string;
    }>;
    thisBinding?: any;
    scope?: string;
  };
  heap: Record<string, {
    id: string;
    type: 'object' | 'array' | 'function' | 'string';
    value: any;
    references?: string[];
  }>;
  console: string[];
  microtaskQueue: Task[];
  macrotaskQueue: Task[];
  eventLoopPhase: 'idle' | 'call-stack' | 'microtask' | 'macrotask' | 'render';
}

export function parseAndExecute(code: string): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const consoleOutput: string[] = [];
  let heapCounter = 0;
  let taskCounter = 0;
  
  // Task queues
  const microtaskQueue: Task[] = [];
  const macrotaskQueue: Task[] = [];
  
  // Helper to generate heap IDs
  const generateHeapId = () => `heap_${heapCounter++}`;
  const generateTaskId = () => `task_${taskCounter++}`;
  
  // Helper to get type
  const getType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };
  
  // Helper to create step with default values
  const createStep = (
    operation: string,
    currentLine: number,
    callStack: any[],
    executionContext: any,
    heap: any,
    console: string[],
    phase: 'idle' | 'call-stack' | 'microtask' | 'macrotask' | 'render' = 'call-stack'
  ): ExecutionStep => ({
    operation,
    currentLine,
    callStack,
    executionContext,
    heap,
    console,
    microtaskQueue: [...microtaskQueue],
    macrotaskQueue: [...macrotaskQueue],
    eventLoopPhase: phase
  });

  // Parse the code into meaningful lines
  const lines = code.split('\n');
  const codeStructure: Array<{
    line: string;
    lineNumber: number;
    type: string;
    indent: number;
  }> = [];

  // Analyze code structure
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//')) {
      const indent = line.length - line.trimStart().length;
      let type = 'statement';
      
      if (trimmed.startsWith('function ')) type = 'function_declaration';
      else if (trimmed.startsWith('const ') || trimmed.startsWith('let ') || trimmed.startsWith('var ')) type = 'variable_declaration';
      else if (trimmed.includes('console.log')) type = 'console_log';
      else if (trimmed.includes('setTimeout')) type = 'timeout';
      else if (trimmed.includes('Promise')) type = 'promise';
      else if (trimmed.startsWith('return ')) type = 'return';
      else if (trimmed === '}') type = 'block_end';
      else if (trimmed === '{') type = 'block_start';
      
      codeStructure.push({
        line: trimmed,
        lineNumber: index + 1,
        type,
        indent
      });
    }
  });

  // Simulation state
  let currentHeap: Record<string, any> = {};
  let globalVariables: Array<any> = [];
  let callStack: Array<{
    name: string;
    type: 'function' | 'global' | 'anonymous';
    line?: number;
    variables?: Array<any>;
  }> = [{ name: 'Global', type: 'global', variables: [] }];
  
  // Store function definitions
  const functions: Record<string, {
    name: string;
    params: string[];
    body: Array<any>;
    startLine: number;
  }> = {};

  // Initial step - Global Execution Context
  steps.push(createStep(
    'Creating Global Execution Context',
    1,
    [{ name: 'Global', type: 'global' }],
    {
      scope: 'Global',
      thisBinding: 'window',
      variables: []
    },
    {},
    [],
    'idle'
  ));

  // First pass - collect function declarations
  let i = 0;
  while (i < codeStructure.length) {
    const item = codeStructure[i];
    
    if (item.type === 'function_declaration') {
      const match = item.line.match(/function\s+(\w+)\s*\(([^)]*)\)/);
      if (match) {
        const funcName = match[1];
        const params = match[2].split(',').map(p => p.trim()).filter(p => p);
        const funcBody: Array<any> = [];
        
        // Collect function body
        // Check if the function declaration itself ends with {
        if (item.line.endsWith('{')) {
          let depth = 1; // Start with depth 1 since we have an opening brace
          let j = i + 1;
          while (j < codeStructure.length && depth > 0) {
            if (codeStructure[j].type === 'block_start' || codeStructure[j].line.endsWith('{')) {
              depth++;
            } else if (codeStructure[j].type === 'block_end') {
              depth--;
              if (depth === 0) break;
            }
            if (depth > 0) {
              funcBody.push(codeStructure[j]);
            }
            j++;
          }
        } else {
          // Function declaration on separate line from opening brace
          let depth = 0;
          let j = i + 1;
          while (j < codeStructure.length) {
            if (codeStructure[j].type === 'block_start' || codeStructure[j].line.endsWith('{')) {
              depth++;
            } else if (codeStructure[j].type === 'block_end') {
              depth--;
              if (depth === 0) break;
            }
            if (depth > 0) {
              funcBody.push(codeStructure[j]);
            }
            j++;
          }
        }
        
        functions[funcName] = {
          name: funcName,
          params,
          body: funcBody,
          startLine: item.lineNumber
        };

        // Add to heap
        const funcId = generateHeapId();
        currentHeap[funcId] = {
          id: funcId,
          type: 'function',
          value: { name: funcName, params },
          references: []
        };
        
        globalVariables.push({
          name: funcName,
          value: `function ${funcName}`,
          type: 'function'
        });
        
        steps.push(createStep(
          `Hoisting function ${funcName}`,
          item.lineNumber,
          [...callStack],
          {
            scope: 'Global',
            thisBinding: 'window',
            variables: [...globalVariables]
          },
          { ...currentHeap },
          [...consoleOutput],
          'call-stack'
        ));
      }
    }
    i++;
  }

  // Second pass - execute statements
  i = 0;
  while (i < codeStructure.length) {
    const item = codeStructure[i];
    
    // Skip function declarations (already hoisted)
    if (item.type === 'function_declaration') {
      // Skip to end of function
      let depth = 0;
      while (i < codeStructure.length) {
        if (codeStructure[i].line.endsWith('{')) depth++;
        if (codeStructure[i].type === 'block_end') {
          depth--;
          if (depth === 0) break;
        }
        i++;
      }
      i++;
      continue;
    }
    
    // Handle setTimeout
    if (item.type === 'timeout') {
      const match = item.line.match(/setTimeout\s*\(\s*\(\)\s*=>\s*\{?([^}]*)\}?\s*,\s*(\d+)\s*\)/);
      if (match) {
        const callback = match[1] || 'callback';
        const delay = parseInt(match[2]);
        
        const task: Task = {
          id: generateTaskId(),
          type: 'timeout',
          name: `setTimeout`,
          callback: callback.trim(),
          delay
        };
        
        macrotaskQueue.push(task);
        
        steps.push(createStep(
          `Adding setTimeout to macrotask queue`,
          item.lineNumber,
          [...callStack],
          {
            scope: 'Global',
            thisBinding: 'window',
            variables: [...globalVariables]
          },
          { ...currentHeap },
          [...consoleOutput],
          'call-stack'
        ));
      }
    }
    
    // Handle Promise
    if (item.type === 'promise') {
      const promiseMatch = item.line.match(/Promise\.resolve\(\)/);
      if (promiseMatch) {
        // Look for .then() chains
        let j = i + 1;
        while (j < codeStructure.length && codeStructure[j].line.includes('.then')) {
          const thenMatch = codeStructure[j].line.match(/\.then\s*\(\s*\(\)\s*=>\s*(.+)\)/);
          if (thenMatch) {
            const task: Task = {
              id: generateTaskId(),
              type: 'promise',
              name: 'Promise.then',
              callback: thenMatch[1].trim()
            };
            
            microtaskQueue.push(task);
          }
          j++;
        }
        
        steps.push(createStep(
          `Adding Promise callbacks to microtask queue`,
          item.lineNumber,
          [...callStack],
          {
            scope: 'Global',
            thisBinding: 'window',
            variables: [...globalVariables]
          },
          { ...currentHeap },
          [...consoleOutput],
          'call-stack'
        ));
      }
    }
    
    // Variable declaration with function call
    if (item.type === 'variable_declaration') {
      const match = item.line.match(/(const|let|var)\s+(\w+)\s*=\s*(.+);?$/);
      if (match) {
        const varName = match[2];
        const varValue = match[3].replace(/;$/, '');
        
        // Check if it's a function call
        const funcCallMatch = varValue.match(/(\w+)\(([^)]*)\)/);
        let functionReturnValue = 'undefined'; // Declare at outer scope
        
        if (funcCallMatch && functions[funcCallMatch[1]]) {
          const funcName = funcCallMatch[1];
          const args = funcCallMatch[2].split(',').map(a => a.trim().replace(/["']/g, ''));
          const func = functions[funcName];
          
          // Push function to call stack
          const funcContext = {
            name: funcName,
            type: 'function' as const,
            line: item.lineNumber,
            variables: func.params.map((param, idx) => ({
              name: param,
              value: args[idx] || 'undefined',
              type: 'string'
            }))
          };
          
          callStack.push(funcContext);
          
          steps.push(createStep(
            `Calling function ${funcName}(${args.join(', ')})`,
            item.lineNumber,
            callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
            {
              scope: funcName,
              thisBinding: 'undefined',
              variables: funcContext.variables
            },
            { ...currentHeap },
            [...consoleOutput],
            'call-stack'
          ));
          
          // Execute function body
          for (const bodyItem of func.body) {
            if (bodyItem.type === 'variable_declaration') {
              const bodyMatch = bodyItem.line.match(/(const|let|var)\s+(\w+)\s*=\s*(.+);?$/);
              if (bodyMatch) {
                const localVarName = bodyMatch[2];
                const localVarValue = bodyMatch[3].replace(/;$/, '');
                
                // Evaluate the value
                let evaluatedValue = localVarValue;
                
                // Handle string concatenation with +
                if (localVarValue.includes('+')) {
                  const parts = localVarValue.split('+').map((p: string) => p.trim());
                  const evaluatedParts = parts.map((part: string) => {
                    // Check if it's a variable
                    const variable = funcContext.variables?.find(v => v.name === part);
                    if (variable) {
                      return variable.value;
                    }
                    // Otherwise it's a string literal
                    return part.replace(/["']/g, '');
                  });
                  evaluatedValue = evaluatedParts.join('');
                } else {
                  // Simple assignment
                  funcContext.variables?.forEach(v => {
                    evaluatedValue = evaluatedValue.replace(new RegExp(`\\b${v.name}\\b`, 'g'), v.value);
                  });
                  evaluatedValue = evaluatedValue.replace(/["']/g, '');
                }
                
                // Ensure variables array exists and add the new variable
                if (!funcContext.variables) {
                  funcContext.variables = [];
                }
                funcContext.variables.push({
                  name: localVarName,
                  value: evaluatedValue,
                  type: 'string'
                });
                
                steps.push(createStep(
                  `Creating local variable ${localVarName} = "${evaluatedValue}"`,
                  bodyItem.lineNumber,
                  callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
                  {
                    scope: funcName,
                    thisBinding: 'undefined',
                    variables: funcContext.variables
                  },
                  { ...currentHeap },
                  [...consoleOutput],
                  'call-stack'
                ));
              }
            } else if (bodyItem.type === 'console_log') {
              const logMatch = bodyItem.line.match(/console\.log\(([^)]+)\)/);
              if (logMatch) {
                const logExpr = logMatch[1].trim();
                
                // Check if it's a variable
                const logVar = funcContext.variables?.find(v => v.name === logExpr);
                let logValue = '';
                if (logVar) {
                  logValue = logVar.value;
                } else if (logExpr.startsWith('"') || logExpr.startsWith("'")) {
                  // It's a string literal
                  logValue = logExpr.replace(/["']/g, '');
                } else {
                  // Complex expression - try to evaluate
                  logValue = logExpr;
                  funcContext.variables?.forEach(v => {
                    logValue = logValue.replace(new RegExp(`\\b${v.name}\\b`, 'g'), v.value);
                  });
                  logValue = logValue.replace(/["']/g, '');
                }
                
                consoleOutput.push(logValue);
                
                steps.push(createStep(
                  `Console.log: ${logValue}`,
                  bodyItem.lineNumber,
                  callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
                  {
                    scope: funcName,
                    thisBinding: 'undefined',
                    variables: funcContext.variables
                  },
                  { ...currentHeap },
                  [...consoleOutput],
                  'call-stack'
                ));
              }
            } else if (bodyItem.type === 'return') {
              const returnMatch = bodyItem.line.match(/return\s+(.+);?$/);
              if (returnMatch) {
                const returnExpr = returnMatch[1].replace(/;$/, '').trim();
                // Find the variable being returned
                const returnVar = funcContext.variables?.find(v => v.name === returnExpr);
                if (returnVar) {
                  functionReturnValue = returnVar.value;
                } else {
                  // Direct value return
                  functionReturnValue = returnExpr.replace(/["']/g, '');
                }
                
                steps.push(createStep(
                  `Returning "${functionReturnValue}"`,
                  bodyItem.lineNumber,
                  callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
                  {
                    scope: funcName,
                    thisBinding: 'undefined',
                    variables: funcContext.variables
                  },
                  { ...currentHeap },
                  [...consoleOutput],
                  'call-stack'
                ));
              }
            }
          }
          
          // Pop from call stack
          callStack.pop();
          
          // Store return value in variable
          globalVariables.push({
            name: varName,
            value: functionReturnValue,
            type: 'string'
          });
          
          steps.push(createStep(
            `Storing return value in ${varName} = "${functionReturnValue}"`,
            item.lineNumber,
            callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
            {
              scope: 'Global',
              thisBinding: 'window',
              variables: [...globalVariables]
            },
            { ...currentHeap },
            [...consoleOutput],
            'call-stack'
          ));
        } else {
          // Simple variable assignment
          globalVariables.push({
            name: varName,
            value: varValue.replace(/["']/g, ''),
            type: 'string'
          });
          
          steps.push(createStep(
            `Declaring ${varName} = ${varValue}`,
            item.lineNumber,
            callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
            {
              scope: 'Global',
              thisBinding: 'window',
              variables: [...globalVariables]
            },
            { ...currentHeap },
            [...consoleOutput],
            'call-stack'
          ));
        }
      }
    }
    
    // Console.log in global scope
    if (item.type === 'console_log') {
      const logMatch = item.line.match(/console\.log\(([^)]+)\)/);
      if (logMatch) {
        let logValue = logMatch[1];
        
        // Split by comma to handle multiple arguments
        const args = logValue.split(',').map(arg => arg.trim());
        const evaluatedArgs = args.map(arg => {
          // Check if it's a string literal
          if (arg.startsWith('"') || arg.startsWith("'")) {
            return arg.replace(/["']/g, '');
          }
          // Check if it's a variable
          const variable = globalVariables.find(v => v.name === arg);
          if (variable) {
            return variable.value;
          }
          // If not found, return 'undefined' for variables
          return 'undefined';
        });
        
        logValue = evaluatedArgs.join(' ');
        
        consoleOutput.push(logValue);
        
        steps.push(createStep(
          `Console.log: ${logValue}`,
          item.lineNumber,
          callStack.map(f => ({ name: f.name, type: f.type, line: f.line })),
          {
            scope: 'Global',
            thisBinding: 'window',
            variables: [...globalVariables]
          },
          { ...currentHeap },
          [...consoleOutput],
          'call-stack'
        ));
      }
    }
    
    i++;
  }
  
  // Process microtasks
  if (microtaskQueue.length > 0) {
    steps.push(createStep(
      'Processing Microtask Queue',
      lines.length,
      [],
      {
        scope: 'Global',
        thisBinding: 'window',
        variables: globalVariables
      },
      currentHeap,
      consoleOutput,
      'microtask'
    ));
    
    while (microtaskQueue.length > 0) {
      const task = microtaskQueue.shift()!;
      
      // Execute the task callback (simplified - just log it)
      if (task.callback.includes('console.log')) {
        const match = task.callback.match(/console\.log\(["']([^"']+)["']\)/);
        if (match) {
          consoleOutput.push(match[1]);
          steps.push(createStep(
            `Executing microtask: ${match[1]}`,
            lines.length,
            [],
            {
              scope: 'Global',
              thisBinding: 'window',
              variables: globalVariables
            },
            currentHeap,
            [...consoleOutput],
            'microtask'
          ));
        }
      }
    }
  }
  
  // Process macrotasks
  if (macrotaskQueue.length > 0) {
    steps.push(createStep(
      'Processing Macrotask Queue',
      lines.length,
      [],
      {
        scope: 'Global',
        thisBinding: 'window',
        variables: globalVariables
      },
      currentHeap,
      consoleOutput,
      'macrotask'
    ));
    
    while (macrotaskQueue.length > 0) {
      const task = macrotaskQueue.shift()!;
      
      // Execute the task callback (simplified - just log it)
      if (task.callback.includes('console.log')) {
        const match = task.callback.match(/console\.log\(["']([^"']+)["']\)/);
        if (match) {
          consoleOutput.push(match[1]);
          steps.push(createStep(
            `Executing macrotask: ${match[1]}`,
            lines.length,
            [],
            {
              scope: 'Global',
              thisBinding: 'window',
              variables: globalVariables
            },
            currentHeap,
            [...consoleOutput],
            'macrotask'
          ));
        }
      }
    }
  }
  
  // Final step - Execution Complete
  steps.push(createStep(
    'Execution Complete',
    lines.length,
    [],
    {
      scope: 'Global',
      thisBinding: 'window',
      variables: globalVariables
    },
    currentHeap,
    consoleOutput,
    'idle'
  ));
  
  return steps;
}