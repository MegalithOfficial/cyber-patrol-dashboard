import React from 'react';

export const ScanningEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent animate-scan" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400/30 animate-scanline" />
    </div>
  );
};