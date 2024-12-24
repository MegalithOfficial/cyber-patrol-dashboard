import React from 'react';
import { AlertCircle } from 'lucide-react';

const activities = [
  { time: '15:42:12', message: 'Signal anomaly detected in sector A7', type: 'warning' },
  { time: '15:41:03', message: 'Bandwidth spike at checkpoint C3', type: 'info' },
  { time: '15:40:55', message: 'Movement pattern analyzed', type: 'success' },
  { time: '15:39:47', message: 'Network latency increased', type: 'error' },
];

export function ActivityLog() {
  return (
    <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-[600px] bg-gray-900/80 backdrop-blur-sm border border-cyan-900/30 rounded p-3">
      <div className="flex items-center space-x-2 mb-2">
        <AlertCircle className="w-4 h-4 text-cyan-400" />
        <span className="text-xs text-cyan-400">SYSTEM ACTIVITY LOG</span>
      </div>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="text-xs flex items-center space-x-2">
            <span className="text-cyan-400">{activity.time}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activity.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
              activity.type === 'error' ? 'bg-red-500/20 text-red-400' :
              activity.type === 'success' ? 'bg-green-500/20 text-green-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {activity.type.toUpperCase()}
            </span>
            <span className="text-white">{activity.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}