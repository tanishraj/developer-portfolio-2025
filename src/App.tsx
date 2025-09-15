import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import JSEngineVisualizerPage from './pages/JSEngineVisualizerPage';
import ReactionTestPage from './pages/ReactionTestPage';
import SnakeGamePage from './pages/SnakeGamePage';
import TypingTestPage from './pages/TypingTestPage';

function App() {
  return (
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
  );
}

export default App;
