import React from 'react';

export const UnderwaterBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Pineapple House */}
      <div className="absolute bottom-0 left-[10%] w-32 h-48 bg-yellow-400 rounded-t-[100px] transform -rotate-2">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI1IiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMikiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute top-1/2 left-1/2 w-12 h-16 bg-blue-400 rounded-lg transform -translate-x-1/2" />
      </div>
      
      {/* Rock House */}
      <div className="absolute bottom-0 right-[15%] w-40 h-36 bg-gray-600 rounded-t-[50px] transform rotate-2">
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-blue-300 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-blue-300 rounded-full" />
      </div>
      
      {/* Seaweed */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-32 bg-green-600 rounded-full animate-float"
            style={{
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${Math.sin(i) * 10}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};