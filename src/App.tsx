import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';
import JSEngineVisualizerPage from './pages/JSEngineVisualizer';
import ReactionTestPage from './pages/ReactionTest';
import SnakeGamePage from './pages/SnakeGame';
import TypingTestPage from './pages/TypingTest';
import { LocaleProvider } from './providers/LocaleProvider';

function App() {
  return (
    <LocaleProvider defaultLocale="en">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games/snake" element={<SnakeGamePage />} />
          <Route path="/games/typing" element={<TypingTestPage />} />
          <Route path="/games/reaction" element={<ReactionTestPage />} />
          <Route path="/games/js-engine" element={<JSEngineVisualizerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LocaleProvider>
  );
}

export default App;
