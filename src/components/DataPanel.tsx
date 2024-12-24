import React from 'react';
import { Shield, User, AlertTriangle, Activity } from 'lucide-react';

interface DataItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const data: DataItem[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    label: "THREAT LEVEL",
    value: "MODERATE",
    color: "text-yellow-400"
  },
  {
    icon: <User className="w-6 h-6" />,
    label: "SUSPECTS",
    value: "3",
    color: "text-blue-400"
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    label: "INCIDENTS",
    value: "7",
    color: "text-red-400"
  },
  {
    icon: <Activity className="w-6 h-6" />,
    label: "SYSTEM STATUS",
    value: "OPTIMAL",
    color: "text-green-400"
  }
];

export function DataPanel() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className={`${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}