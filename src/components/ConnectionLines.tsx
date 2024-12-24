import React from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { Location } from '../types/locations';

interface ConnectionLinesProps {
  locations: Location[];
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ locations }) => {
  const map = useMap();

  // Function to determine if two points should be connected
  const shouldConnect = (loc1: Location, loc2: Location) => {
    // Only connect points that are within a reasonable distance
    const distance = map.distance([loc1.lat, loc1.lng], [loc2.lat, loc2.lng]);
    if (distance > 10000) return false; // Don't connect points more than 10km apart

    // Connect surveillance points to nearby alerts, but only if they're active
    if ((loc1.type === 'surveillance' && loc2.type === 'alert') ||
        (loc1.type === 'alert' && loc2.type === 'surveillance')) {
      return loc1.status === 'active' && loc2.status === 'active';
    }

    // Connect signal points to each other only if both are active
    if (loc1.type === 'signal' && loc2.type === 'signal') {
      return loc1.status === 'active' && loc2.status === 'active';
    }

    // Connect network nodes only if they're close and active
    if (loc1.type === 'network' && loc2.type === 'network') {
      return loc1.status === 'active' && loc2.status === 'active' && distance < 5000;
    }

    // Reduce perimeter connections
    if (loc1.type === 'perimeter' || loc2.type === 'perimeter') {
      // Only connect perimeter to alerts/surveillance if they're active and close
      if ((loc1.type === 'alert' || loc1.type === 'surveillance' ||
           loc2.type === 'alert' || loc2.type === 'surveillance')) {
        return loc1.status === 'active' && loc2.status === 'active' && distance < 3000;
      }
      // Connect perimeter points to each other only if very close
      if (loc1.type === 'perimeter' && loc2.type === 'perimeter') {
        return distance < 2000;
      }
    }

    return false;
  };

  // Function to get line style based on connection type
  const getLineStyle = (loc1: Location, loc2: Location) => {
    if ((loc1.type === 'surveillance' && loc2.type === 'alert') ||
        (loc1.type === 'alert' && loc2.type === 'surveillance')) {
      return { 
        color: '#ef4444', 
        weight: 1.5, 
        opacity: 0.5, 
        dashArray: '4',
        className: 'animate-pulse'
      };
    }
    if (loc1.type === 'signal' && loc2.type === 'signal') {
      return { color: '#22d3ee', weight: 1, opacity: 0.3 };
    }
    if (loc1.type === 'network' && loc2.type === 'network') {
      return { color: '#8b5cf6', weight: 1, opacity: 0.3 };
    }
    if (loc1.type === 'perimeter' || loc2.type === 'perimeter') {
      return { color: '#ec4899', weight: 1, opacity: 0.2, dashArray: '6,4' };
    }
    return { color: '#22d3ee', weight: 1, opacity: 0.3 };
  };

  // Calculate connections
  const connections = locations.flatMap((loc1, i) => 
    locations.slice(i + 1).map(loc2 => {
      if (shouldConnect(loc1, loc2)) {
        return {
          id: `${loc1.id}-${loc2.id}`,
          positions: [[loc1.lat, loc1.lng], [loc2.lat, loc2.lng]],
          style: getLineStyle(loc1, loc2)
        };
      }
      return null;
    }).filter(Boolean)
  );

  return (
    <>
      {connections.map(connection => (
        <Polyline
          key={connection.id}
          positions={connection.positions}
          pathOptions={connection.style}
        />
      ))}
    </>
  );
}; 