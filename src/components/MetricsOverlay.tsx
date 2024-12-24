import React from 'react';
import { Activity, Wifi, Radio, Cpu, Signal } from 'lucide-react';

const metrics = [
  { icon: <Signal className="w-4 h-4" />, label: 'NETWORK', value: '98.2%' },
  { icon: <Wifi className="w-4 h-4" />, label: 'UPLINK', value: '1.2 TB/s' },
  { icon: <Radio className="w-4 h-4" />, label: 'SIGNAL', value: '42 dB' },
  { icon: <Cpu className="w-4 h-4" />, label: 'LOAD', value: '76%' },
  { icon: <Activity className="w-4 h-4" />, label: 'LATENCY', value: '12ms' },
];

export function MetricsOverlay() {
  return (
    <div className="absolute left-4 top-16 space-y-2">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/30 rounded p-2 w-40 flex items-center space-x-3"
        >
          <div className="text-cyan-400">{metric.icon}</div>
          <div>
            <div className="text-[10px] text-cyan-400">{metric.label}</div>
            <div className="text-sm text-white">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}