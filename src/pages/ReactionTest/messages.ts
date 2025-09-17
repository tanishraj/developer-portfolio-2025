import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('reaction-test', {
  title: 'Reaction Time Test',
  instructions: 'Click when the screen turns green',
  clickToStart: 'Click to Start',
  waitForGreen: 'Wait for green...',
  clickNow: 'Click Now!',
  tooEarly: 'Too early! Click to try again',
  result: 'Your reaction time: {time}ms',
  average: 'Average: {avg}ms',
  bestTime: 'Best: {best}ms',
  tryAgain: 'Try Again',
});