import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import conchImage from '../images/magic_conch.png';

interface MagicConchProps {
  onPull?: () => void;
}

export const MagicConch: React.FC<MagicConchProps> = ({ onPull }) => {
  const [isPulling, setIsPulling] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, {
    stiffness: 400,
    damping: 25,
    mass: 0.5,
    restDelta: 0.5
  });
  
  const springY = useSpring(y, {
    stiffness: 400,
    damping: 25,
    mass: 0.5,
    restDelta: 0.5
  });

  // Calculate string paths with better cursor tracking
  const createStringPath = (offsetX: number, offsetY: number) => useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      if (!isPulling && latestX === 0 && latestY === 0) {
        return 'M 0,0 Q 0,0 0,0';
      }

      // Calculate control points for a more natural curve
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      const tension = Math.min(distance * 0.3, 20); // Adjust tension based on pull distance
      
      const controlX = latestX * 0.5 + offsetX;
      const controlY = latestY * 0.5 + offsetY - tension;

      return `M ${offsetX},${offsetY} C ${controlX},${controlY} ${latestX * 0.7 + offsetX},${latestY * 0.7 + offsetY} ${latestX},${latestY}`;
    }
  );

  const mainStringPath = createStringPath(0, 0);
  const shadowStringPath = createStringPath(0.5, 0.5);
  const highlightStringPath = createStringPath(-0.5, -0.5);

  const handlePullStart = () => {
    setIsPulling(true);
  };

  const handlePullEnd = () => {
    setIsPulling(false);
    const distance = Math.sqrt(x.get() * x.get() + y.get() * y.get());
    if (distance > 30) {
      onPull?.();
    }
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative">
      <img 
        src={conchImage} 
        alt="Magic Conch Shell"
        className="w-64 h-auto"
      />
      
      <motion.div
        className="absolute left-[76%] top-[38%] origin-center cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{
          top: -50,
          bottom: 50,
          left: -50,
          right: 50,
        }}
        dragElastic={0.2} // Reduced elasticity for better control
        onDragStart={handlePullStart}
        onDragEnd={handlePullEnd}
        style={{
          x: springX,
          y: springY,
        }}
        whileDrag={{ scale: 1.1 }}
        animate={isPulling ? {} : { x: 0, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {/* SVG String with 3D effect */}
        <svg
          width="100"
          height="100"
          viewBox="-50 -50 100 100"
          className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-12"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <filter id="string-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
              <feOffset dx="1" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="string-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f0f0f0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Shadow layer */}
          <motion.path
            d={shadowStringPath}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#string-shadow)"
          />

          {/* Main string */}
          <motion.path
            d={mainStringPath}
            stroke="url(#string-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Highlight layer */}
          <motion.path
            d={highlightStringPath}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Pull Knob */}
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg border border-gray-300" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-500 to-gray-600" />
        </div>
      </motion.div>
    </div>
  );
};