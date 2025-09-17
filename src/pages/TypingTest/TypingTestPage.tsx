import React from 'react';
import { useNavigate } from 'react-router-dom';

import AnimatedBackground from '../../components/AnimatedBackground';
import CustomCursor from '../../components/CustomCursor';
import TypingTest from '../../components/TypingTest';

const TypingTestPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1b] text-white relative cursor-none">
      <AnimatedBackground />
      <CustomCursor />
      <TypingTest isOpen={true} onClose={handleClose} />
    </div>
  );
};

export default TypingTestPage;
