import { useEffect, useState } from 'react';

export const Bubble = () => {
  const [position, setPosition] = useState({ x: 0, size: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      size: Math.random() * 30 + 10,
    });
  }, []);

  return (
    <div
      className="absolute rounded-full bg-white/10 animate-bubble-float"
      style={{
        left: `${position.x}%`,
        width: `${position.size}px`,
        height: `${position.size}px`,
      }}
    />
  );
};