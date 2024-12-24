import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Location } from '../types/locations';
import { getMarkerIcon, getTypeConfig, getStatusColor } from './LocationMarker';

interface PoliceVehicleProps {
  location: Location;
  onLocationUpdate?: (newLat: number, newLng: number) => void;
}

interface MovementState {
  centerLat: number;
  centerLng: number;
  direction: number;
  speed: number;
}

export const PoliceVehicle: React.FC<PoliceVehicleProps> = ({ location, onLocationUpdate }) => {
  const [movement, setMovement] = useState<MovementState>({
    centerLat: location.lat,
    centerLng: location.lng,
    direction: Math.random() * Math.PI * 2,
    speed: 0.0002 + Math.random() * 0.0003     // Keep higher speed for city-wide movement
  });

  useEffect(() => {
    const updateMovement = () => {
      setMovement(prev => {
        // More dynamic movement pattern for police vehicles
        const directionChange = (Math.random() - 0.5) * 0.3; // Smoother turns for realistic movement
        const newDirection = prev.direction + directionChange;
        
        // Calculate new position
        const newLat = prev.centerLat + Math.cos(prev.direction) * prev.speed;
        const newLng = prev.centerLng + Math.sin(prev.direction) * prev.speed;

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

    const interval = setInterval(updateMovement, 50); // Keep smooth movement
    return () => clearInterval(interval);
  }, [onLocationUpdate]);

  const config = getTypeConfig(location.type, location.status);
  const IconComponent = config.component;

  return (
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
          className="bg-gray-900/95 backdrop-blur-sm border border-blue-900/50 rounded p-4 min-w-[300px] max-w-[400px] shadow-xl"
          style={{ zIndex: 1000 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-900/30 pb-3 mb-3">
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
            <div className="text-blue-300/70">{location.details}</div>
            <div className="flex justify-between items-center">
              <div className="text-blue-400">[{location.timestamp}]</div>
              <div className={getStatusColor(location.status)}>
                Status: {location.status.toUpperCase()}
              </div>
            </div>

            {/* Metrics Grid */}
            {location.metrics && (
              <div className="grid grid-cols-2 gap-2 mt-3 border-t border-blue-900/30 pt-3">
                {location.metrics.signalStrength !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">Signal:</span>
                    <span className="text-blue-400">{location.metrics.signalStrength}%</span>
                  </div>
                )}
                {location.metrics.powerLevel !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">Power:</span>
                    <span className="text-blue-400">{location.metrics.powerLevel}%</span>
                  </div>
                )}
                {location.metrics.speed !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-blue-300/70">Speed:</span>
                    <span className="text-blue-400">{location.metrics.speed} km/h</span>
                  </div>
                )}
              </div>
            )}

            {/* System Info */}
            <div className="border-t border-blue-900/30 pt-3 mt-3 grid grid-cols-2 gap-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-blue-300/70">Unit ID:</span>
                <span className="text-blue-400">{location.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300/70">Last Update:</span>
                <span className="text-blue-400">
                  {location.metrics?.lastUpdate 
                    ? new Date(location.metrics.lastUpdate).toLocaleTimeString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}; 