
import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import conchImage from '../images/magic_conch.png';

interface MagicConchProps {
  onPull?: () => void;
}

export const MagicConch: React.FC<MagicConchProps> = ({ onPull }) => {
  const [isPulling, setIsPulling] = useState(false);
  
  // Motion values for the pull handle position
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  
  // Create natural spring physics for the handle
  const springConfig = {
    stiffness: 300,
    damping: 20,
    mass: 0.8,
    restDelta: 0.1
  };
  
  const springX = useSpring(pullX, springConfig);
  const springY = useSpring(pullY, springConfig);

  // Calculate the string path - using custom transform function to create straight line
  const stringPath = useTransform(
    [springX, springY] as const,
    ([x, y]: [number, number]) => {
      // If not pulling and at rest, don't show string
      if (!isPulling && Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        return 'M 0,0 L 0,0';
      }

      // Create a simple straight line from origin (0,0) to the current handle position (x,y)
      return `M 0,0 L ${x},${y}`;
    }
  );
  
  // Add string highlight for a subtle 3D effect
  const stringHighlight = useTransform(
    [springX, springY] as const,
    ([x, y]: [number, number]) => {
      if (!isPulling && Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        return 'M 0,0 L 0,0';
      }
      
      // Create a subtle highlight line with a slight offset
      const offset = 0.5;
      return `M 0,0 L ${x - offset},${y - offset}`;
    }
  );
  
  // Add string shadow for depth
  const stringShadow = useTransform(
    [springX, springY] as const,
    ([x, y]: [number, number]) => {
      if (!isPulling && Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        return 'M 0,0 L 0,0';
      }
      
      // Create a subtle shadow line with a slight offset
      const offset = 0.5;
      return `M 0,0 L ${x + offset},${y + offset}`;
    }
  );

  const handlePullStart = () => {
    setIsPulling(true);
  };

  const handlePullEnd = () => {
    setIsPulling(false);
    
    // Detect a meaningful pull
    const distance = Math.sqrt(pullX.get() * pullX.get() + pullY.get() * pullY.get());
    
    // Trigger the onPull callback if pulled far enough
    if (distance > 20) {
      onPull?.();
      
      // Add a tiny delay before resetting to create a visual feedback
      setTimeout(() => {
        pullX.set(0);
        pullY.set(0);
      }, 50);
    } else {
      // If not pulled far enough, reset immediately
      pullX.set(0);
      pullY.set(0);
    }
  };

  return (
    <div className="relative">
      <img 
        src={conchImage} 
        alt="Magic Conch Shell"
        className="w-64 h-auto"
      />
      
      {/* String Connection Point - Position this element with absolute positioning */}
      <div className="absolute left-[76%] top-[38%] w-0 h-0">
        {/* Container for both string SVG and draggable handle */}
        <div className="relative">
          {/* String Visualization - SVG positioned precisely with the handle's center */}
          <svg
            width="120"
            height="120"
            viewBox="-60 -60 120 120"
            className="absolute top-0 left-0"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <filter id="string-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <linearGradient id="string-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E1" />
                <stop offset="50%" stopColor="#FFE0B2" />
                <stop offset="100%" stopColor="#FFCC80" />
              </linearGradient>
            </defs>

            {/* Shadow layer */}
            <motion.path
              d={stringShadow}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Main string */}
            <motion.path
              d={stringPath}
              stroke="url(#string-gradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#string-glow)"
            />

            {/* Highlight layer */}
            <motion.path
              d={stringHighlight}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Draggable Pull Handle - positioned exactly at SVG center (0,0) */}
          <motion.div
            className="absolute w-5 h-5 top-[-10px] left-[-10px] cursor-grab active:cursor-grabbing"
            drag
            dragConstraints={{
              top: -60,
              bottom: 60,
              left: -60, 
              right: 60
            }}
            dragElastic={0.3}
            onDragStart={handlePullStart}
            onDragEnd={handlePullEnd}
            style={{
              x: springX,
              y: springY,
              zIndex: 20
            }}
            whileDrag={{ scale: 1.1 }}
            animate={isPulling ? {} : { x: 0, y: 0 }}
            transition={{
              type: "spring",
              ...springConfig
            }}
          >
            {/* Pull Knob */}
            <div className="relative w-5 h-5">
              {/* Main knob */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-md border border-yellow-400">
                {/* Inner detail */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600" />
              </div>
              
              {/* Knob highlight */}
              <div className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-white opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
