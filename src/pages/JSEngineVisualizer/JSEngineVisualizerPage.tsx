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
        route="jsEngine"
      />
      <JSEngineVisualizer />
    </>
  );
};

export default JSEngineVisualizerPage;
