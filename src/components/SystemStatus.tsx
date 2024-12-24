import React from 'react';
import { Activity, Shield, Cpu } from 'lucide-react';

export const SystemStatus = () => {
  return (
    <div className="fixed top-4 right-4 space-y-2">
      <div className="flex items-center space-x-2 text-xs">
        <Activity className="w-4 h-4 text-cyan-400" />
        <div className="flex space-x-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-3 bg-cyan-400/30 rounded-sm"
              style={{
                animation: 'pulse 1s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded px-2 py-1">
        <Shield className="w-3 h-3 text-green-400" />
        <span className="text-[10px] text-green-400">SECURE</span>
      </div>
      <div className="flex items-center justify-between bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded px-2 py-1">
        <Cpu className="w-3 h-3 text-cyan-400" />
        <span className="text-[10px] text-cyan-400">45%</span>
      </div>
    </div>
  );
};