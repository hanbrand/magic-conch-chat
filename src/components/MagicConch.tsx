import { useState } from 'react';

interface MagicConchProps {
  onPull: () => void;
}

export const MagicConch = ({ onPull }: MagicConchProps) => {
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    onPull();
    setTimeout(() => setIsPulling(false), 500);
  };

  return (
    <div className="relative w-48 h-48 animate-float">
      <div className="absolute inset-0 bg-shell-primary rounded-full transform rotate-45 shadow-lg" />
      <div
        className={`absolute left-1/2 top-3/4 w-1 h-16 bg-coral cursor-pointer transform -translate-x-1/2 origin-top ${
          isPulling ? 'animate-pull-string' : ''
        }`}
        onClick={handlePull}
      />
    </div>
  );
};