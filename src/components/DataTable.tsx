import React from 'react';
import { laLocations } from '../data/laLocations';

export function DataTable() {
  return (
    <div className="font-mono text-xs">
      <table className="w-full">
        <thead>
          <tr className="text-cyan-400 border-b border-cyan-900/50">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">LOCATION</th>
            <th className="p-2 text-left">STATUS</th>
            <th className="p-2 text-left">TYPE</th>
            <th className="p-2 text-left">PRIORITY</th>
          </tr>
        </thead>
        <tbody>
          {laLocations.map((location) => (
            <tr 
              key={location.id} 
              className="border-b border-cyan-900/30 hover:bg-cyan-900/20 transition-colors"
            >
              <td className="p-2">{location.id}</td>
              <td className="p-2">{location.name}</td>
              <td className="p-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  location.status === 'active' ? 'bg-green-900/50 text-green-400' :
                  location.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-gray-900/50 text-gray-400'
                }`}>
                  {location.status.toUpperCase()}
                </span>
              </td>
              <td className="p-2">{location.type.toUpperCase()}</td>
              <td className="p-2">
                <span className={`${
                  location.priority === 'HIGH' ? 'text-red-400' :
                  location.priority === 'MEDIUM' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {location.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}