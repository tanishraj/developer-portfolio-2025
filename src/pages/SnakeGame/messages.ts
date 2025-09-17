import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('snake-game', {
  title: 'Snake Game',
  score: 'Score: {score}',
  highScore: 'High Score: {highScore}',
  gameOver: 'Game Over!',
  playAgain: 'Play Again',
  instructions: 'Use arrow keys to move',
  pause: 'Pause',
  resume: 'Resume',
  newGame: 'New Game',
});