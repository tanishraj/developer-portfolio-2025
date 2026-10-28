import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { LocaleProvider } from './providers/LocaleProvider';

const NotFound = lazy(() => import('./components/NotFound').then((module) => ({ default: module.NotFound })));
const JSEngineVisualizerPage = lazy(() => import('./pages/JSEngineVisualizer'));
const ReactionTestPage = lazy(() => import('./pages/ReactionTest'));
const SnakeGamePage = lazy(() => import('./pages/SnakeGame'));
const TypingTestPage = lazy(() => import('./pages/TypingTest'));

function App() {
  return (
    <LocaleProvider defaultLocale="en">
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-[#0a0f1b]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/snake" element={<SnakeGamePage />} />
            <Route path="/games/typing" element={<TypingTestPage />} />
            <Route path="/games/reaction" element={<ReactionTestPage />} />
            <Route path="/games/js-engine" element={<JSEngineVisualizerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </LocaleProvider>
  );
}

export default App;
