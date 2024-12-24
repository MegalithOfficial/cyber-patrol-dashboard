import React from 'react';

export const AlertPanel = () => {
  return (
    <div className="absolute bottom-4 right-4 w-72 bg-gray-900/90 border border-cyan-900/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-cyan-400 text-sm font-bold">SYSTEM STATUS</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500 text-xs">ONLINE</span>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Satellite Link</span>
          <span className="text-cyan-400">ACTIVE</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Signal Strength</span>
          <span className="text-cyan-400">98%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Data Stream</span>
          <span className="text-cyan-400">1.2 GB/s</span>
        </div>
      </div>
    </div>
  );
};