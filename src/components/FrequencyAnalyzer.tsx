import React from 'react';

export const FrequencyAnalyzer = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-cyan-400 text-xs font-bold">FREQUENCY ANALYSIS</span>
      </div>
      <div className="h-24 flex items-end space-x-1">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 bg-cyan-400/30 rounded-t animate-pulse-custom-${i}`}
            style={{
              height: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 