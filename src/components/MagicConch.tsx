import { useState } from 'react';
import conchImage from '/lovable-uploads/e56a5474-d63d-48c3-82d9-1971e1d7fb0b.png';

interface MagicConchProps {
  onPull: () => void;
}

export const MagicConch = ({ onPull }: MagicConchProps) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullPosition, setPullPosition] = useState(0);

  const handlePullStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsPulling(true);
  };

  const handlePullMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPulling) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newPosition = Math.min(Math.max(clientY - 300, 0), 50);
    setPullPosition(newPosition);
  };

  const handlePullEnd = () => {
    if (isPulling && pullPosition > 30) {
      onPull();
    }
    setIsPulling(false);
    setPullPosition(0);
  };

  return (
    <div 
      className="relative w-64 h-64 select-none animate-float"
      onMouseMove={handlePullMove}
      onMouseUp={handlePullEnd}
      onMouseLeave={handlePullEnd}
      onTouchMove={handlePullMove}
      onTouchEnd={handlePullEnd}
    >
      <img 
        src={conchImage} 
        alt="Magic Conch Shell"
        className="w-full h-full object-contain"
      />
      <div
        className="absolute left-[70%] top-[75%] w-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handlePullStart}
        onTouchStart={handlePullStart}
        style={{
          transform: `translateY(${pullPosition}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <div className="w-full h-16 bg-yellow-300 rounded-full shadow-md" />
        <div className="w-full h-4 bg-yellow-400 rounded-full mt-1" />
        <div className="w-full h-4 bg-yellow-400 rounded-full mt-1" />
      </div>
    </div>
  );
};