export type LocationType = 
  | 'alert'           // Security alerts
  | 'signal'          // Signal detection
  | 'surveillance'    // Surveillance cameras
  | 'network'         // Network nodes
  | 'energy'          // Power stations
  | 'dataCenter'      // Data processing centers
  | 'sensor'          // Environmental sensors
  | 'drone'           // Mobile surveillance units
  | 'perimeter'       // Perimeter monitoring
  | 'runaway'         // Runaway vehicle tracking
  | 'police';         // Police vehicle tracking

export type LocationStatus = 
  | 'active'
  | 'warning'
  | 'critical'
  | 'inactive'
  | 'maintenance';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Alert {
  timestamp: string;
  message: string;
  severity: 'critical' | 'warning';
}

export interface Metrics {
  signalStrength?: number;    // 0-100
  powerLevel?: number;        // 0-100
  temperature?: number;       // Celsius
  bandwidth?: number;         // Mbps
  uptime?: number;           // Hours
  batteryLevel?: number;     // 0-100
  cpuLoad?: number;          // 0-100
  memoryUsage?: number;      // 0-100
  errorRate?: number;        // 0-100
  packetLoss?: number;       // 0-100
  speed?: number;            // km/h
  lastUpdate?: string;       // ISO date string
}

export interface Location {
  id: string;
  lat: number;
  lng: number;
  type: LocationType;
  status: LocationStatus;
  title: string;
  details: string;
  timestamp: string;
  metrics?: Metrics;
  alerts?: Alert[];
  priority?: Priority;
  lastMaintenance?: string;  // ISO date string
  nextMaintenance?: string;  // ISO date string
  operationalHours?: number; // Total hours of operation
  firmware?: string;         // Version string
  area?: {
    points: [number, number][];  // Array of lat/lng points forming the area
    timestamp: string;
  };
}