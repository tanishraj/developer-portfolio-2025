import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatedBackground } from '../../components/AnimatedBackground';
import { CustomCursor } from '../../components/CustomCursor';
import { ReactionTest } from '../../components/ReactionTest';
import { SEO } from '../../components/SEO';

const ReactionTestPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
      <SEO
        title="Reaction Time Test | Tanish Raj"
        description="Measure your reaction time with a quick interactive browser test by Tanish Raj."
        path="/games/reaction"
      />
      <AnimatedBackground />
      <CustomCursor />
      <ReactionTest isOpen={true} onClose={handleClose} />
    </div>
  );
};

export default ReactionTestPage;
