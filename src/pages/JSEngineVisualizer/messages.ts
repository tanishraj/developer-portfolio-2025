import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('js-engine', {
  title: 'JavaScript Engine Visualizer',
  description: 'See how JavaScript code executes step by step',
  run: 'Run Code',
  clear: 'Clear',
  output: 'Output',
  step: 'Step',
  reset: 'Reset',
  speed: 'Speed: {speed}x',
  callStack: 'Call Stack',
  heap: 'Memory Heap',
  console: 'Console',
});