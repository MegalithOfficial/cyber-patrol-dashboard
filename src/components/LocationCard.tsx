import React from 'react';
import { AlertCircle, Signal, Activity } from 'lucide-react';
import { Location } from '../types/locations';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/30 rounded p-3 w-64 text-white">
      <div className="space-y-2">
        <div className="flex justify-between items-center border-b border-cyan-900/30 pb-2">
          <div className="font-bold">{location.name}</div>
          <div className={`
            px-2 py-0.5 rounded-full text-[10px]
            ${location.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
              location.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'}
          `}>
            {location.priority}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <Signal className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-xs">{location.metrics.signalStrength}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Activity className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-xs">{location.metrics.bandwidth} TB/s</span>
          </div>
          <div className="flex flex-col items-center">
            <AlertCircle className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-xs">{location.alerts.length}</span>
          </div>
        </div>

        {location.alerts.length > 0 && (
          <div className="border-t border-cyan-900/30 pt-2 mt-2">
            <div className="text-[10px] text-cyan-400 mb-1">RECENT ALERTS</div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {location.alerts.map((alert, index) => (
                <div key={index} className="text-[10px] text-gray-300">
                  {new Date(alert.timestamp).toLocaleTimeString()}: {alert.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}