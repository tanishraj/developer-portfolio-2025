import React, { useEffect } from 'react';

import { JSEngineVisualizer } from '../../components/JSEngineVisualizer';
import { SEO } from '../../components/SEO';

const JSEngineVisualizerPage: React.FC = () => {
  useEffect(() => {
    // Override cursor styles for this page
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: auto !important;
      }
      a, button {
        cursor: pointer !important;
      }
      input, textarea {
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);

    // Show the default cursor
    document.body.style.cursor = 'auto';

    return () => {
      // Cleanup
      document.head.removeChild(style);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <SEO
        title="JavaScript Engine Visualizer | Tanish Raj"
        description="Explore a visual JavaScript execution walkthrough with call stack, memory heap, task queues, and event loop."
        path="/games/js-engine"
      />
      <JSEngineVisualizer />
    </>
  );
};

export default JSEngineVisualizerPage;
