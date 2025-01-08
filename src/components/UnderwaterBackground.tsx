import React from 'react';
import backgroundImage from '../images/spongebob_street.jpg';

export const UnderwaterBackground = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <img 
        src={backgroundImage} 
        alt="Underwater background"
        className="absolute w-full h-full object-cover object-center"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
        }}
      />
    </div>
  );
};  