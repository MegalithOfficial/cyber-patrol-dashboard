import React from 'react';
import { Activity, AlertCircle, Radio, Signal } from 'lucide-react';

const metrics = [
  { icon: <Activity className="w-4 h-4" />, label: 'SIGNAL STRENGTH', value: '98%' },
  { icon: <Radio className="w-4 h-4" />, label: 'BANDWIDTH', value: '1.2 TB/s' },
  { icon: <Signal className="w-4 h-4" />, label: 'LATENCY', value: '12ms' },
  { icon: <AlertCircle className="w-4 h-4" />, label: 'ALERTS', value: '2' },
];

export function MetricsPanel() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="bg-gray-900/60 p-2 rounded border border-cyan-900/30"
        >
          <div className="flex items-center space-x-2 text-cyan-400">
            {metric.icon}
            <span className="text-[10px]">{metric.label}</span>
          </div>
          <div className="text-lg font-bold mt-1">{metric.value}</div>
        </div>
      ))}
    </div>
  );
}