import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('typing-test', {
  title: 'Typing Speed Test',
  wpm: 'WPM: {wpm}',
  accuracy: 'Accuracy: {accuracy}%',
  time: 'Time: {time}s',
  start: 'Start Test',
  restart: 'Restart',
  instructions: 'Type the text shown below',
  results: 'Your Results',
  averageWpm: 'Average WPM: {wpm}',
  testComplete: 'Test Complete!',
});