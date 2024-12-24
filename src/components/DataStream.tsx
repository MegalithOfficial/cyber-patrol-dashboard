import React, { useEffect, useState } from 'react';
import { LA_BOUNDS } from '../hooks/useDynamicLocations';

interface DebugInfo {
  timestamp: string;
  type: 'location' | 'boundary' | 'water';
  data: string;
}

export const DataStream = () => {
  const [debugLines, setDebugLines] = useState<DebugInfo[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lat = LA_BOUNDS.south + Math.random() * (LA_BOUNDS.north - LA_BOUNDS.south);
      const lng = LA_BOUNDS.east + Math.random() * (LA_BOUNDS.west - LA_BOUNDS.east);
      
      const newDebugInfo: DebugInfo[] = [
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'location',
          data: `LAT: ${lat.toFixed(4)} LNG: ${lng.toFixed(4)}`
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'boundary',
          data: `BOUNDS CHECK: N:${lat < LA_BOUNDS.north} S:${lat > LA_BOUNDS.south} E:${lng > LA_BOUNDS.east} W:${lng < LA_BOUNDS.west}`
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'water',
          data: `WATER CHECK: ${lat < 34.0 && lng < -118.4 ? 'SANTA MONICA BAY' : lat < 33.8 && lng < -118.1 ? 'PORT AREA' : 'LAND'}`
        }
      ];

      setDebugLines(prev => [...newDebugInfo, ...prev].slice(0, 15));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-cyan-400 text-xs font-bold">LOCATION DEBUG</span>
      </div>
      <div className="font-mono text-[10px] space-y-0.5">
        {debugLines.map((line, i) => (
          <div 
            key={i} 
            className={`${
              line.type === 'location' ? 'text-cyan-400/70' :
              line.type === 'boundary' ? 'text-yellow-400/70' :
              'text-red-400/70'
            }`}
            style={{ opacity: (i + 5) / debugLines.length }}
          >
            [{line.timestamp}] {line.data}
          </div>
        ))}
      </div>
    </div>
  );
}; 