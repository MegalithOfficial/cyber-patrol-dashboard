import React from 'react';

export const NetworkMap = () => {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    status: Math.random() > 0.2 ? 'active' : 'warning'
  }));

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-cyan-400 text-xs font-bold">NETWORK MAP</span>
      </div>
      <div className="relative h-48 border border-cyan-900/30 rounded">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {nodes.map((node, i) => 
            nodes.slice(i + 1).map((target, j) => (
              <line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={node.status === 'active' && target.status === 'active' ? '#22d3ee' : '#fbbf24'}
                strokeWidth="1"
                strokeOpacity="0.2"
              />
            ))
          )}
        </svg>
        {nodes.map((node, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              node.status === 'active' ? 'bg-cyan-400' : 'bg-yellow-400'
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 10px ${node.status === 'active' ? '#22d3ee' : '#fbbf24'}`,
              zIndex: 1
            }}
          />
        ))}
      </div>
    </div>
  );
}; 