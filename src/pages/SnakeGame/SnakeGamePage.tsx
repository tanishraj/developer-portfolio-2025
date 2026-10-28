import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatedBackground } from '../../components/AnimatedBackground';
import { CustomCursor } from '../../components/CustomCursor';
import { SEO } from '../../components/SEO';
import { SnakeGame } from '../../components/SnakeGame';

const SnakeGamePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
      <SEO
        title="Snake Game | Tanish Raj"
        description="Play the classic Snake game in this interactive browser game by Tanish Raj."
        path="/games/snake"
      />
      <AnimatedBackground />
      <CustomCursor />
      <SnakeGame isOpen={true} onClose={handleClose} />
    </div>
  );
};

export default SnakeGamePage;
