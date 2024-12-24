import React from 'react';

export const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-[2px] bg-cyan-500/10 animate-scan-fast" />
        <div className="absolute w-full h-[1px] bg-cyan-500/20 animate-scan-slow" />
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/20 to-gray-900/40" />
      
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/20 animate-extend-right" />
        <div className="absolute top-0 left-0 h-full w-[2px] bg-cyan-500/20 animate-extend-down" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-cyan-500/20 animate-extend-left" />
        <div className="absolute top-0 right-0 h-full w-[2px] bg-cyan-500/20 animate-extend-down" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/20 animate-extend-right" />
        <div className="absolute bottom-0 left-0 h-full w-[2px] bg-cyan-500/20 animate-extend-up" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-cyan-500/20 animate-extend-left" />
        <div className="absolute bottom-0 right-0 h-full w-[2px] bg-cyan-500/20 animate-extend-up" />
      </div>
    </div>
  );
}; 