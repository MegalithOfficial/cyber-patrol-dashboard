import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Location } from '../types/locations';
import { AlertCircle, Signal, Activity } from 'lucide-react';

const getMarkerIcon = (type: Location['type'], priority: Location['priority']) => {
  const color = priority === 'HIGH' ? '#ef4444' : 
                priority === 'MEDIUM' ? '#f59e0b' : 
                '#22c55e';
                
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
        <circle cx="12" cy="12" r="8" fill="${color}" stroke="white" stroke-width="2"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface MapMarkerProps {
  location: Location;
}

export function MapMarker({ location }: MapMarkerProps) {
  const icon = getMarkerIcon(location.type, location.priority);

  return (
    <Marker position={location.coordinates} icon={icon}>
      <Popup className="font-mono text-xs w-64">
        <div className="space-y-2">
          <div className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-2">
            {location.name} ({location.id})
          </div>
          
          {/* Status and Type */}
          <div className="flex justify-between items-center">
            <div className={`
              inline-block px-2 py-0.5 rounded-full text-white text-[10px]
              ${location.status === 'active' ? 'bg-green-500' :
                location.status === 'pending' ? 'bg-yellow-500' :
                'bg-gray-500'}
            `}>
              {location.status.toUpperCase()}
            </div>
            <div className="text-gray-600 text-[10px]">
              {location.type.toUpperCase()}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-200 pt-2">
            <div className="flex items-center space-x-1">
              <Signal className="w-3 h-3 text-cyan-500" />
              <span>{location.metrics.signalStrength}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-cyan-500" />
              <span>{location.metrics.bandwidth} TB/s</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 text-cyan-500" />
              <span>{location.alerts.length}</span>
            </div>
          </div>

          {/* Alerts */}
          {location.alerts.length > 0 && (
            <div className="border-t border-gray-200 pt-2">
              <div className="text-[10px] font-bold text-gray-600 mb-1">RECENT ALERTS</div>
              <div className="space-y-1">
                {location.alerts.map((alert, index) => (
                  <div key={index} className="text-[10px] text-gray-600">
                    {new Date(alert.timestamp).toLocaleTimeString()}: {alert.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}