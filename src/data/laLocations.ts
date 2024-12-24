import { Location } from '../types/locations';

export const laLocations: Location[] = [
  // Downtown LA
  {
    id: '1',
    lat: 34.0522,
    lng: -118.2437,
    type: 'alert',
    status: 'active',
    title: 'Security Breach',
    details: 'Multiple unauthorized access attempts detected',
    timestamp: '15:42:12'
  },
  // Santa Monica
  {
    id: '2',
    lat: 34.0195,
    lng: -118.4912,
    type: 'alert',
    status: 'warning',
    title: 'Perimeter Alert',
    details: 'Movement detected in restricted area',
    timestamp: '15:41:03'
  },
  // Pasadena
  {
    id: '3',
    lat: 34.1478,
    lng: -118.1445,
    type: 'signal',
    status: 'active',
    title: 'Signal Anomaly',
    details: 'Unusual frequency patterns detected',
    timestamp: '15:40:55'
  },
  // Long Beach
  {
    id: '4',
    lat: 33.7701,
    lng: -118.1937,
    type: 'signal',
    status: 'warning',
    title: 'Signal Interference',
    details: 'Communication disruption in sector 7',
    timestamp: '15:39:47'
  },
  {
    id: '5',
    lat: 34.1000,
    lng: -118.2900,
    type: 'signal',
    status: 'inactive',
    title: 'Dead Zone',
    details: 'No signal detected in this area',
    timestamp: '15:38:22'
  },

  // Surveillance Points
  {
    id: '6',
    lat: 34.0458,
    lng: -118.4000,
    type: 'surveillance',
    status: 'active',
    title: 'Surveillance Point Alpha',
    details: 'All systems operational',
    timestamp: '15:37:15'
  },
  {
    id: '7',
    lat: 34.0200,
    lng: -118.2800,
    type: 'surveillance',
    status: 'active',
    title: 'Surveillance Point Beta',
    details: 'Tracking multiple targets',
    timestamp: '15:36:08'
  },
  {
    id: '8',
    lat: 34.0700,
    lng: -118.3200,
    type: 'surveillance',
    status: 'warning',
    title: 'Surveillance Point Delta',
    details: 'Camera feed degraded',
    timestamp: '15:35:30'
  },

  // Additional Alert Points
  {
    id: '9',
    lat: 34.0300,
    lng: -118.2200,
    type: 'alert',
    status: 'active',
    title: 'Data Breach',
    details: 'Unauthorized data transfer detected',
    timestamp: '15:34:55'
  },
  {
    id: '10',
    lat: 34.0800,
    lng: -118.2600,
    type: 'alert',
    status: 'inactive',
    title: 'Past Incident',
    details: 'Previous security breach - contained',
    timestamp: '15:33:42'
  },

  // Additional Signal Points
  {
    id: '11',
    lat: 34.0550,
    lng: -118.3500,
    type: 'signal',
    status: 'active',
    title: 'High Energy Signal',
    details: 'Unusual energy signature detected',
    timestamp: '15:32:18'
  },
  {
    id: '12',
    lat: 34.0150,
    lng: -118.2900,
    type: 'signal',
    status: 'warning',
    title: 'Signal Degradation',
    details: 'Signal strength dropping in sector 4',
    timestamp: '15:31:05'
  },

  // Add these to your locations array
  {
    id: '13',
    lat: 34.0450,
    lng: -118.2500,
    type: 'perimeter',
    status: 'active',
    title: 'Search Warrant A-113',
    details: 'Active search perimeter established',
    timestamp: '15:30:22',
    metrics: {
      signalStrength: 95,
      powerLevel: 88,
      temperature: 23,
      bandwidth: 500,
      uptime: 2,
      batteryLevel: 92
    }
  },
  {
    id: '14',
    lat: 34.0480,
    lng: -118.2520,
    type: 'perimeter',
    status: 'warning',
    title: 'Search Warrant B-227',
    details: 'Perimeter breach detected',
    timestamp: '15:29:15',
    metrics: {
      signalStrength: 82,
      powerLevel: 76,
      temperature: 25,
      bandwidth: 450,
      uptime: 4,
      batteryLevel: 65
    }
  },
  {
    id: '15',
    lat: 34.0600,
    lng: -118.2700,
    type: 'runaway',
    status: 'critical',
    title: 'Runaway Vehicle Alert',
    details: 'High-speed pursuit in progress',
    timestamp: '15:28:45',
    metrics: {
      signalStrength: 98,
      powerLevel: 100,
      bandwidth: 800,
      uptime: 0.5,
    },
    area: {
      points: [],
      timestamp: '15:28:45'
    }
  }
];