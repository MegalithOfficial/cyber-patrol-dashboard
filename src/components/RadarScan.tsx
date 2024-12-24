import React from 'react';

export const RadarScan = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-cyan-400 text-xs font-bold">RADAR SCAN</span>
      </div>
      <div className="relative w-full h-48 rounded-full overflow-hidden">
        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
        <div className="absolute inset-[15%] border border-cyan-500/15 rounded-full" />
        <div className="absolute inset-[30%] border border-cyan-500/10 rounded-full" />
        <div className="absolute inset-[45%] border border-cyan-500/5 rounded-full" />
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-[50%] bg-cyan-400/50 origin-[0%_0%]"
          style={{ 
            animation: 'radar-sweep 4s linear infinite',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            transform: 'translateX(-50%)'
          }}
        />
        {/* Random blips */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}; 