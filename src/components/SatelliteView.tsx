import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { LocationMarker } from './LocationMarker';
import { Location } from '../types/locations';
import { ConnectionLines } from './ConnectionLines';
import { RunawayArea } from './RunawayArea';
import { PoliceVehicle } from './PoliceVehicle';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


export const SatelliteView: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const [updatedLocations, setUpdatedLocations] = useState(locations);

  // Update internal state when locations prop changes
  useEffect(() => {
    setUpdatedLocations(locations);
  }, [locations]);

  const handleLocationUpdate = (id: string, lat: number, lng: number) => {
    setUpdatedLocations(prev => 
      prev.map(loc => 
        loc.id === id ? { ...loc, lat, lng } : loc
      )
    );
  };

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <MapContainer
        center={[34.0522, -118.2437]}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        minZoom={3}
        maxZoom={18}
        dragging={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        keyboard={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ConnectionLines locations={updatedLocations} />
        {updatedLocations.map(location => (
          <React.Fragment key={location.id}>
            {location.type === 'runaway' && (
              <RunawayArea 
                location={location} 
                onLocationUpdate={(lat, lng) => handleLocationUpdate(location.id, lat, lng)}
              />
            )}
            {location.type === 'police' && (
              <PoliceVehicle 
                location={location} 
                onLocationUpdate={(lat, lng) => handleLocationUpdate(location.id, lat, lng)}
              />
            )}
            {location.type !== 'runaway' && location.type !== 'police' && <LocationMarker location={location} />}
          </React.Fragment>
        ))}
        <ZoomControl position="bottomright" />
      </MapContainer>
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[400]" 
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};