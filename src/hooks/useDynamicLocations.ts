import { useState, useEffect } from 'react';
import { Location, LocationType, LocationStatus, Alert } from '../types/locations';
import { laLocations } from '../data/laLocations';

// Define LA County boundaries (approximate)
export const LA_BOUNDS = {
  north: 34.3373, // Santa Clarita
  south: 33.6019, // Irvine
  east: -117.5959, // Irvine
  west: -118.6682, // Malibu
};

// Helper to check if point is in water (approximate)
const isInWater = (lat: number, lng: number) => {
  // Santa Monica Bay
  if (lat < 34.0 && lng < -118.4) return true;
  // Port of LA / Long Beach area
  if (lat < 33.75 && lng < -118.1 && lng > -118.25) return true;
  // Catalina Channel
  if (lat < 33.8 && lng < -118.3) return true;
  // Newport Beach / Balboa Peninsula
  if (lat < 33.65 && lng < -117.9) return true;
  return false;
};

const generateRandomLocation = (id: string): Location => {
  // Common types that appear frequently
  const commonTypes: LocationType[] = [
    'alert', 'signal', 'surveillance', 'network', 
    'energy', 'dataCenter', 'sensor', 'drone'
  ];
  
  // Rare types that appear less frequently
  const rareTypes: LocationType[] = [
    'perimeter', 'runaway'
  ];

  // Police cars have their own very low probability
  const isPolice = Math.random() < 0.05; // 5% chance for police cars
  
  // For non-police, 85% chance for common types, 15% chance for rare types
  const randomType = isPolice ? 'police' : (Math.random() < 0.85
    ? commonTypes[Math.floor(Math.random() * commonTypes.length)]
    : rareTypes[Math.floor(Math.random() * rareTypes.length)]);
  
  const statuses: LocationStatus[] = [
    'active', 'warning', 'critical', 'inactive', 'maintenance'
  ];

  // Type-specific messages
  const messages: Record<LocationType, string[]> = {
    alert: [
      'Unauthorized access detected',
      'Security breach attempt',
      'Perimeter violation',
      'Suspicious activity pattern',
      'Authentication failure'
    ],
    signal: [
      'Unknown frequency detected',
      'Signal interference',
      'Anomalous transmission',
      'Encrypted communication',
      'Bandwidth spike detected'
    ],
    surveillance: [
      'Movement detected',
      'Target identified',
      'Area scan complete',
      'Object tracking initiated',
      'Coverage gap detected'
    ],
    network: [
      'High latency detected',
      'Packet loss reported',
      'Network congestion',
      'Route optimization',
      'Protocol violation'
    ],
    energy: [
      'Power fluctuation',
      'Load balancing active',
      'Grid stability check',
      'Energy surge detected',
      'Backup power engaged'
    ],
    dataCenter: [
      'Processing queue full',
      'Storage optimization',
      'Cache synchronization',
      'Data throughput peak',
      'Redundancy check'
    ],
    sensor: [
      'Environmental anomaly',
      'Radiation level change',
      'Temperature variance',
      'Pressure differential',
      'Air quality alert'
    ],
    drone: [
      'Patrol route updated',
      'Target acquisition',
      'Battery optimization',
      'Navigation recalibrated',
      'Weather adjustment'
    ],
    perimeter: [
      'Perimeter breach detected',
      'Boundary check initiated',
      'Zone monitoring active',
      'Access point secured',
      'Fence integrity check'
    ],
    runaway: [
      'Critical asset moving',
      'Tracking signal lost',
      'Recovery initiated',
      'Location triangulating',
      'Pursuit protocol active'
    ],
    police: [
      'Patrol unit deployed',
      'Responding to alert',
      'Area surveillance active',
      'Backup unit requested',
      'Pursuit in progress'
    ]
  };

  // Generate location within LA County bounds with better distribution
  const generateValidCoordinates = (): { lat: number, lng: number } => {
    let lat: number, lng: number;
    do {
      lat = LA_BOUNDS.south + Math.random() * (LA_BOUNDS.north - LA_BOUNDS.south);
      lng = LA_BOUNDS.west + Math.random() * (LA_BOUNDS.east - LA_BOUNDS.west);
      console.log('LAT:', lat, 'LNG:', lng);
      console.log('BOUNDS CHECK:', {
        N: lat <= LA_BOUNDS.north,
        S: lat >= LA_BOUNDS.south,
        E: lng >= LA_BOUNDS.east,
        W: lng <= LA_BOUNDS.west
      });
      console.log('WATER CHECK:', isInWater(lat, lng) ? 'WATER' : 'LAND');
    } while (isInWater(lat, lng));

    return { lat, lng };
  };

  const { lat, lng } = generateValidCoordinates();

  const baseLocation = { lat, lng };

  // Generate realistic metrics based on type
  const metrics = {
    signalStrength: Math.floor(Math.random() * 30 + 70), // 70-100
    powerLevel: Math.floor(Math.random() * 40 + 60),     // 60-100
    temperature: Math.floor(Math.random() * 15 + 20),    // 20-35 Celsius
    bandwidth: Math.floor(Math.random() * 900 + 100),    // 100-1000 Mbps
    uptime: Math.floor(Math.random() * 168),            // 0-168 hours (1 week)
    batteryLevel: Math.floor(Math.random() * 100),      // 0-100
    cpuLoad: Math.floor(Math.random() * 60 + 40),      // 40-100%
    memoryUsage: Math.floor(Math.random() * 50 + 50),  // 50-100%
    errorRate: Math.floor(Math.random() * 5),          // 0-5%
    packetLoss: Math.floor(Math.random() * 3),         // 0-3%
    speed: randomType === 'police' || randomType === 'runaway' 
      ? Math.floor(Math.random() * 60 + 40)           // 40-100 km/h for vehicles
      : undefined,
    lastUpdate: new Date().toISOString()
  };

  // Generate some alerts based on metrics and status
  const alerts: Alert[] = [];
  if (metrics.signalStrength < 80) alerts.push({ 
    timestamp: new Date().toISOString(),
    message: 'Low signal strength detected',
    severity: 'warning'
  });
  if (metrics.powerLevel < 70) alerts.push({
    timestamp: new Date().toISOString(),
    message: 'Power levels below optimal',
    severity: 'warning'
  });
  if (metrics.errorRate > 3) alerts.push({
    timestamp: new Date().toISOString(),
    message: 'High error rate detected',
    severity: 'critical'
  });
  if (metrics.packetLoss > 2) alerts.push({
    timestamp: new Date().toISOString(),
    message: 'Significant packet loss',
    severity: 'warning'
  });

  // Add type-specific alerts
  switch (randomType) {
    case 'surveillance':
      if (Math.random() < 0.3) alerts.push({
        timestamp: new Date().toISOString(),
        message: 'Motion detected in restricted area',
        severity: 'warning'
      });
      break;
    case 'network':
      if (metrics.bandwidth < 300) alerts.push({
        timestamp: new Date().toISOString(),
        message: 'Network congestion detected',
        severity: 'warning'
      });
      break;
    case 'energy':
      if (metrics.powerLevel < 65) alerts.push({
        timestamp: new Date().toISOString(),
        message: 'Power grid instability',
        severity: 'critical'
      });
      break;
    case 'drone':
      if (metrics.batteryLevel < 30) alerts.push({
        timestamp: new Date().toISOString(),
        message: 'Low battery warning',
        severity: 'warning'
      });
      break;
  }

  return {
    id,
    ...baseLocation,
    type: randomType,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    title: `${randomType.toUpperCase()} ${id.slice(-4)}`,
    details: messages[randomType][Math.floor(Math.random() * messages[randomType].length)],
    timestamp: new Date().toLocaleTimeString(),
    metrics,
    alerts,
    priority: alerts.some(a => a.severity === 'critical') ? 'HIGH' :
              alerts.length > 0 ? 'MEDIUM' : 'LOW',
    lastMaintenance: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last week
    nextMaintenance: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random date within next week
    operationalHours: Math.floor(Math.random() * 8760), // Random hours up to a year
    firmware: `v${Math.floor(Math.random() * 3 + 1)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}` // Random version number
  };
};

export const useDynamicLocations = () => {
  // Transform initial locations to have prefixed IDs
  const initialLocations = laLocations.map(loc => ({
    ...loc,
    id: `initial-${loc.id}` // Add prefix to initial locations
  }));

  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [nextId, setNextId] = useState(1000); // Start from 1000 to avoid any conflicts
  const [activityLog, setActivityLog] = useState<Array<{timestamp: string; message: string}>>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    totalPower: 0,
    avgSignalStrength: 0,
    activeNodes: 0,
    totalBandwidth: 0,
    threatLevel: 'LOW' as 'LOW' | 'MODERATE' | 'HIGH',
    systemLoad: 0
  });

  // Initialize with 3 police cars
  useEffect(() => {
    const addInitialPoliceCars = () => {
      setLocations(prevLocations => {
        const policeCars = Array.from({ length: 3 }, (_, i) => {
          const id = `police-${nextId + i}`; // Unique police ID
          const baseLocation = generateRandomLocation(id);
          return {
            ...baseLocation,
            type: 'police' as const,
            status: 'active' as const,
            title: `POLICE ${(nextId + i).toString().slice(-4)}`,
            details: 'Initial patrol unit deployed'
          } satisfies Location;
        });
        setNextId(prev => prev + 3);
        return [...prevLocations, ...policeCars];
      });
    };

    // Only add initial police cars if there aren't any
    if (locations.filter(loc => loc.type === 'police').length === 0) {
      addInitialPoliceCars();
    }
  }, []);

  // Calculate metrics whenever locations change
  useEffect(() => {
    const calculateMetrics = () => {
      setSystemMetrics({
        totalPower: locations.length ? locations.reduce((sum, loc) => sum + (loc.metrics?.powerLevel || 0), 0) / locations.length : 0,
        avgSignalStrength: locations.length ? locations.reduce((sum, loc) => sum + (loc.metrics?.signalStrength || 0), 0) / locations.length : 0,
        activeNodes: locations.filter(l => l.status === 'active').length,
        totalBandwidth: locations.reduce((sum, loc) => sum + (loc.metrics?.bandwidth || 0), 0),
        threatLevel: locations.filter(l => l.status === 'critical').length > 2 ? 'HIGH' : 
                    locations.filter(l => l.status === 'critical').length > 0 ? 'MODERATE' : 'LOW',
        systemLoad: locations.length ? (locations.filter(l => l.status === 'active').length / locations.length) * 100 : 0
      });
    };

    calculateMetrics();
  }, [locations]);

  useEffect(() => {
    const addLocation = () => {
      setLocations(prevLocations => {
        const currentPoliceCars = prevLocations.filter(loc => loc.type === 'police').length;
        const forcePolice = currentPoliceCars < 3 && prevLocations.length < 35;
        
        // Generate unique ID based on type
        const getUniqueId = (type: LocationType) => {
          switch(type) {
            case 'police': return `police-${nextId}`;
            case 'runaway': return `runaway-${nextId}`;
            default: return `loc-${nextId}`;
          }
        };

        const baseLocation = generateRandomLocation(getUniqueId(forcePolice ? 'police' : 'runaway'));
        const newLocation: Location = forcePolice ? {
          ...baseLocation,
          type: 'police' as const,
          status: 'active' as const,
          title: `POLICE ${nextId.toString().slice(-4)}`,
          details: 'Patrol unit deployed'
        } : baseLocation;

        setNextId(prev => prev + 1);

        // Add to activity log
        setActivityLog(prev => [{
          timestamp: new Date().toLocaleTimeString(),
          message: `${newLocation.title}: ${newLocation.details}`
        }, ...prev].slice(0, 50));

        // If we already have 35 locations, remove the oldest non-police one
        if (prevLocations.length >= 35) {
          const sortedLocations = [...prevLocations].sort((a, b) => {
            // Extract numeric part from ID for comparison
            const aNum = parseInt(a.id.split('-')[1]);
            const bNum = parseInt(b.id.split('-')[1]);
            return aNum - bNum;
          });
          
          // If we're adding a police car and already have enough, remove the oldest police car
          if (newLocation.type === 'police' && currentPoliceCars >= 3) {
            const oldestPoliceIndex = sortedLocations.findIndex(loc => loc.type === 'police');
            if (oldestPoliceIndex !== -1) {
              sortedLocations.splice(oldestPoliceIndex, 1);
              return [...sortedLocations, newLocation];
            }
            return prevLocations;
          }
          
          // Otherwise, remove the oldest non-police location
          const oldestNonPoliceIndex = sortedLocations.findIndex(loc => loc.type !== 'police');
          if (oldestNonPoliceIndex !== -1) {
            sortedLocations.splice(oldestNonPoliceIndex, 1);
            return [...sortedLocations, newLocation];
          }
          return prevLocations;
        }

        return [...prevLocations, newLocation];
      });
    };

    const interval = setInterval(addLocation, 3000);
    return () => clearInterval(interval);
  }, [nextId]);

  return {
    locations,
    activityLog,
    systemMetrics
  };
}; 