import React from 'react';
import { Activity, Wifi, Radio } from 'lucide-react';

const stats = [
  { label: 'BANDWIDTH', value: '1.2 TB/s', change: '+0.2 TB/s' },
  { label: 'LATENCY', value: '12ms', change: '-2ms' },
  { label: 'PACKET LOSS', value: '0.01%', change: '0%' },
];

export function NetworkStats() {
  return (
    <div className="absolute bottom-24 left-4 bg-gray-900/80 backdrop-blur-sm border border-cyan-900/30 rounded p-3 w-64">
      <div className="flex items-center space-x-2 mb-3">
        <Activity className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-cyan-400">NETWORK METRICS</span>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs">{stat.label}</span>
            <div className="text-right">
              <div className="text-sm font-mono text-cyan-400">{stat.value}</div>
              <div className="text-[10px] text-green-400">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}