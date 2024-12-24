import React, { useEffect, useState } from 'react';

export const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="fixed w-4 h-4 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.x,
        top: position.y,
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
        filter: 'blur(2px)',
      }}
    />
  );
}; 