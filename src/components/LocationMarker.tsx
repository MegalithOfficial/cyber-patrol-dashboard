import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '../types/locations';
import { AlertTriangle, Radio, Camera, Network, Zap, Server, Thermometer, Plane, Search, Car } from 'lucide-react';

export const getTypeConfig = (type: Location['type'], status: Location['status']) => {
  const configs = {
    alert: {
      color: status === 'critical' ? '#ef4444' : // red
            status === 'warning' ? '#f59e0b' :   // amber
            status === 'active' ? '#22d3ee' :    // cyan
            '#6b7280',                           // gray
      icon: '!',
      component: AlertTriangle,
      pulseAnimation: 'animate-ping'
    },
    signal: {
      color: '#22d3ee',
      icon: '◈',
      component: Radio,
      pulseAnimation: 'animate-pulse'
    },
    surveillance: {
      color: '#22d3ee',
      icon: '◉',
      component: Camera,
      pulseAnimation: 'animate-wave'
    },
    network: {
      color: '#8b5cf6', // violet
      icon: '⬡',
      component: Network,
      pulseAnimation: 'animate-pulse'
    },
    energy: {
      color: '#eab308', // yellow
      icon: '⚡',
      component: Zap,
      pulseAnimation: 'animate-ping'
    },
    dataCenter: {
      color: '#06b6d4', // cyan
      icon: '□',
      component: Server,
      pulseAnimation: 'animate-wave'
    },
    sensor: {
      color: '#10b981', // emerald
      icon: '○',
      component: Thermometer,
      pulseAnimation: 'animate-pulse'
    },
    drone: {
      color: '#3b82f6', // blue
      icon: '△',
      component: Plane,
      pulseAnimation: 'animate-ping'
    },
    perimeter: {
      color: '#ec4899', // pink
      icon: '⊗',
      component: Search,
      pulseAnimation: 'animate-wave'
    },
    runaway: {
      color: '#ef4444', // red
      icon: '⚠',
      component: AlertTriangle,
      pulseAnimation: 'animate-ping'
    },
    police: {
      color: '#3b82f6', // blue
      icon: '🚓',
      component: Car,
      pulseAnimation: 'animate-pulse'
    }
  };

  return configs[type];
};

export const getStatusColor = (status: Location['status']) => {
  switch (status) {
    case 'active': return 'text-green-400';
    case 'warning': return 'text-yellow-400';
    case 'critical': return 'text-red-400';
    case 'maintenance': return 'text-blue-400';
    default: return 'text-gray-400';
  }
};

export const getMarkerIcon = (type: Location['type'], status: Location['status']) => {
  const config = getTypeConfig(type, status);
  const color = config.color;
  const animation = status === 'active' ? config.pulseAnimation : '';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative cursor-pointer">
        <div class="absolute -top-4 -left-4 w-8 h-8 bg-gray-900/80 backdrop-blur-sm border-2 border-${color} rounded-full flex items-center justify-center hover:scale-110 transition-transform">
          <span class="text-lg" style="color: ${color}">${config.icon}</span>
        </div>
        ${status === 'active' ? `
          <div class="${animation} absolute -top-4 -left-4 w-8 h-8 bg-${color}/20 rounded-full"></div>
          <div class="${animation} absolute -top-5 -left-5 w-10 h-10 bg-${color}/10 rounded-full" style="animation-delay: 0.2s"></div>
        ` : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20]
  });
};

export const LocationMarker: React.FC<{ location: Location }> = ({ location }) => {
  const icon = getMarkerIcon(location.type, location.status);
  const config = getTypeConfig(location.type, location.status);
  const IconComponent = config.component;
  
  return (
    <Marker 
      position={[location.lat, location.lng]} 
      icon={icon}
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
  );
}; 