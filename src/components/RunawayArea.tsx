import React, { useEffect, useState, useMemo } from 'react';
import { Polygon, Marker, Popup } from 'react-leaflet';
import { Location } from '../types/locations';
import { getMarkerIcon, getTypeConfig, getStatusColor } from './LocationMarker';

interface RunawayAreaProps {
  location: Location;
  onLocationUpdate?: (newLat: number, newLng: number) => void;
}

interface MovementState {
  centerLat: number;
  centerLng: number;
  direction: number;
  speed: number;
}

export const RunawayArea: React.FC<RunawayAreaProps> = ({ location, onLocationUpdate }) => {
  const [movement, setMovement] = useState<MovementState>({
    centerLat: location.lat,
    centerLng: location.lng,
    direction: Math.random() * Math.PI * 2,
    speed: 0.0003 + Math.random() * 0.0002
  });

  useEffect(() => {
    const updateMovement = () => {
      setMovement(prev => {
        const directionChange = (Math.random() - 0.5) * 0.8;
        const newDirection = prev.direction + directionChange;
        const newLat = prev.centerLat + Math.cos(newDirection) * prev.speed;
        const newLng = prev.centerLng + Math.sin(newDirection) * prev.speed;
        
        // Update parent component with new location
        requestAnimationFrame(() => onLocationUpdate?.(newLat, newLng));
        
        return {
          ...prev,
          centerLat: newLat,
          centerLng: newLng,
          direction: newDirection,
        };
      });
    };

    const interval = setInterval(updateMovement, 50);
    return () => clearInterval(interval);
  }, [onLocationUpdate]);

  const points = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 5) * Math.PI * 2;
      const radius = 0.005;
      return [
        movement.centerLat + Math.cos(angle) * radius,
        movement.centerLng + Math.sin(angle) * radius
      ] as [number, number];
    });
  }, [movement.centerLat, movement.centerLng]);

  const config = getTypeConfig(location.type, location.status);
  const IconComponent = config.component;

  return (
    <>
      <Polygon
        positions={points}
        pathOptions={{
          color: '#ef4444',
          weight: 2,
          opacity: 0.8,
          fillColor: '#ef4444',
          fillOpacity: 0.1,
          className: 'animate-pulse'
        }}
      />
      <Marker 
        position={[movement.centerLat, movement.centerLng]}
        icon={getMarkerIcon(location.type, location.status)}
        eventHandlers={{
          mouseover: (e) => {
            const marker = e.target;
            marker.openPopup();
          }
        }}
      >
        <Popup 
          className="custom-popup" 
          closeButton={false}
          autoPan={true}
          closeOnClick={false}
          interactive={true}
        >
          <div 
            className="bg-gray-900/95 backdrop-blur-sm border border-cyan-900/50 rounded p-4 min-w-[300px] max-w-[400px] shadow-xl"
            style={{ zIndex: 1000 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-900/30 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                <span className="text-sm font-bold text-white" style={{ color: config.color }}>{location.title}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-[10px] ${
                location.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                location.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {location.priority || 'LOW'}
              </div>
            </div>

            {/* Status and Details */}
            <div className="space-y-3 text-xs">
              <div className="text-cyan-300/70">{location.details}</div>
              <div className="flex justify-between items-center">
                <div className="text-cyan-400">[{location.timestamp}]</div>
                <div className={getStatusColor(location.status)}>
                  Status: {location.status.toUpperCase()}
                </div>
              </div>

              {/* Metrics Grid */}
              {location.metrics && (
                <div className="grid grid-cols-2 gap-2 mt-3 border-t border-cyan-900/30 pt-3">
                  {location.metrics.signalStrength !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Signal:</span>
                      <span className="text-cyan-400">{location.metrics.signalStrength}%</span>
                    </div>
                  )}
                  {location.metrics.powerLevel !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Power:</span>
                      <span className="text-cyan-400">{location.metrics.powerLevel}%</span>
                    </div>
                  )}
                  {location.metrics.temperature !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Temp:</span>
                      <span className="text-cyan-400">{location.metrics.temperature}°C</span>
                    </div>
                  )}
                  {location.metrics.bandwidth !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">BW:</span>
                      <span className="text-cyan-400">{location.metrics.bandwidth} Mbps</span>
                    </div>
                  )}
                  {location.metrics.cpuLoad !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">CPU:</span>
                      <span className="text-cyan-400">{location.metrics.cpuLoad}%</span>
                    </div>
                  )}
                  {location.metrics.memoryUsage !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Memory:</span>
                      <span className="text-cyan-400">{location.metrics.memoryUsage}%</span>
                    </div>
                  )}
                  {location.metrics.errorRate !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Errors:</span>
                      <span className="text-cyan-400">{location.metrics.errorRate}%</span>
                    </div>
                  )}
                  {location.metrics.packetLoss !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/70">Packet Loss:</span>
                      <span className="text-cyan-400">{location.metrics.packetLoss}%</span>
                    </div>
                  )}
                </div>
              )}

              {/* Alerts Section */}
              {location.alerts && location.alerts.length > 0 && (
                <div className="border-t border-cyan-900/30 pt-3 mt-3">
                  <div className="text-[10px] font-bold text-cyan-400 mb-2">ALERTS</div>
                  <div className="space-y-2 max-h-24 overflow-y-auto">
                    {location.alerts.map((alert, index) => (
                      <div 
                        key={index} 
                        className={`text-[10px] ${
                          alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                        }`}
                      >
                        {new Date(alert.timestamp).toLocaleTimeString()}: {alert.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Info */}
              <div className="border-t border-cyan-900/30 pt-3 mt-3 grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-cyan-300/70">Firmware:</span>
                  <span className="text-cyan-400">{location.firmware || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/70">Uptime:</span>
                  <span className="text-cyan-400">{location.metrics?.uptime || 0}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/70">Last Update:</span>
                  <span className="text-cyan-400">
                    {location.metrics?.lastUpdate 
                      ? new Date(location.metrics.lastUpdate).toLocaleTimeString()
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/70">Next Maintenance:</span>
                  <span className="text-cyan-400">
                    {location.nextMaintenance 
                      ? new Date(location.nextMaintenance).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
}; 