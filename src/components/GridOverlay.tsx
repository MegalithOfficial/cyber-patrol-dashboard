import React from 'react';

export const GridOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Horizontal Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute w-full h-px bg-cyan-500/10"
          style={{ top: `${(i + 1) * 5}%` }}
        />
      ))}
      {/* Vertical Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute h-full w-px bg-cyan-500/10"
          style={{ left: `${(i + 1) * 5}%` }}
        />
      ))}
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/20" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-500/20" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-500/20" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/20" />
    </div>
  );
}; 