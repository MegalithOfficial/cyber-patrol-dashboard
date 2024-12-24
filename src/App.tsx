import { SatelliteView } from './components/SatelliteView';
import { Shield, AlertTriangle, Activity, Radio, Wifi, Database, Cpu, Signal, Timer, Radar, 
         BarChart, Waves, Zap, Globe, Target, Lock, Server } from 'lucide-react';
import { ScanningEffect } from './components/ScanningEffect';
import { useDynamicLocations } from './hooks/useDynamicLocations';
import { FrequencyAnalyzer } from './components/FrequencyAnalyzer';
import { SystemStatus } from './components/SystemStatus';
import { RadarScan } from './components/RadarScan';
import { DataStream } from './components/DataStream';
import { NetworkMap } from './components/NetworkMap';
import { BackgroundGrid } from './components/BackgroundGrid';
import { Footer } from './components/Footer';

function App() {
  const { locations, activityLog } = useDynamicLocations();
  const activeAlerts = locations.filter(loc => loc.type === 'alert' && loc.status === 'active').length;
  const activeSignals = locations.filter(loc => loc.type === 'signal' && loc.status === 'active').length;

  return (
    <div className="fixed inset-0 bg-gray-900/95">
      <BackgroundGrid />
      
      {/* Main Map View */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-900/50" />
        <SatelliteView locations={locations} />
        <ScanningEffect />
      </div>

      {/* Overlay Elements */}
      <div className="pointer-events-none absolute inset-0 p-6 z-20">
        {/* Top Bar */}
        <div className="pointer-events-auto flex justify-between items-center mb-6">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
        <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-400">SATELLITE SURVEILLANCE SYSTEM v2.1</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <Timer className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-red-900/50 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">ACTIVE ALERTS: {activeAlerts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Panels - Add scrolling container */}
        <div className="pointer-events-auto absolute left-6 top-24 bottom-24 w-96">
          <div className="h-full overflow-auto custom-scrollbar pr-2 space-y-4">
            {/* System Metrics */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">SYSTEM METRICS</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Signal Strength', value: '98%', icon: <Radio className="w-4 h-4" /> },
                  { label: 'Network Status', value: 'ACTIVE', icon: <Wifi className="w-4 h-4" /> },
                  { label: 'Data Transfer', value: '1.2 GB/s', icon: <Database className="w-4 h-4" /> },
                  { label: 'CPU Usage', value: '45%', icon: <Cpu className="w-4 h-4" /> },
                ].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between text-cyan-300/70">
                    <div className="flex items-center space-x-2">
                      {metric.icon}
                      <span>{metric.label}</span>
                    </div>
                    <span className="text-cyan-400">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <RadarScan />
            <NetworkMap />
            <DataStream />

            {/* Signal Analysis */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Signal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">SIGNAL ANALYSIS</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-cyan-300/70">
                  <span>Active Signals:</span>
                  <span className="text-cyan-400">{activeSignals}</span>
                </div>
                <div className="flex justify-between text-cyan-300/70">
                  <span>Signal Quality:</span>
                  <span className="text-green-400">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-cyan-300/70">
                  <span>Interference:</span>
                  <span className="text-yellow-400">LOW</span>
                </div>
              </div>
            </div>

            {/* Threat Assessment */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-red-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-red-400" />
                <h3 className="text-red-400 text-sm font-bold">THREAT ASSESSMENT</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-red-300/70">
                  <span>Threat Level:</span>
                  <span className="text-yellow-400">MODERATE</span>
                </div>
                <div className="flex justify-between text-red-300/70">
                  <span>Active Threats:</span>
                  <span className="text-red-400">{activeAlerts}</span>
                </div>
                <div className="flex justify-between text-red-300/70">
                  <span>Security Status:</span>
                  <span className="text-green-400">SECURE</span>
                </div>
              </div>
            </div>

            {/* Power Systems */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">POWER SYSTEMS</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-cyan-300/70">
                  <span>Main Power:</span>
                  <span className="text-green-400">100%</span>
                </div>
                <div className="flex justify-between text-cyan-300/70">
                  <span>Backup Power:</span>
                  <span className="text-cyan-400">98%</span>
                </div>
                <div className="flex justify-between text-cyan-300/70">
                  <span>Power Draw:</span>
                  <span className="text-yellow-400">1.2 MW</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Bottom Panels */}
        <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 space-y-4 w-[600px]">
          {/* Quick Stats */}
          <div className="flex justify-center space-x-4 mb-4">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300/70">SATELLITES: <span className="text-cyan-400">4 ACTIVE</span></span>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300/70">SECURITY: <span className="text-green-400">OPTIMAL</span></span>
              </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300/70">SERVERS: <span className="text-cyan-400">ALL ONLINE</span></span>
              </div>
            </div>
          </div>
          {/* Status Bar */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg px-4 py-2">
            <div className="flex justify-between text-xs text-cyan-300/70">
              <span>LAT: 34°03'N</span>
              <span>LONG: 118°15'W</span>
              <span>ZOOM: 150%</span>
              <span>ACTIVE NODES: 12</span>
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Right Side Panels - Add scrolling container */}
        <div className="pointer-events-auto absolute right-6 top-24 bottom-24 w-96">
          <div className="h-full overflow-auto custom-scrollbar pl-2 space-y-4">
            <FrequencyAnalyzer />
            
            {/* Network Status */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Radar className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">NETWORK STATUS</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-gray-800/50 p-2 rounded border border-cyan-900/30">
                    <div className="text-xs text-cyan-400">NODE {i + 1}</div>
                    <div className="text-[10px] text-cyan-300/70">STATUS: ACTIVE</div>
                    <div className="text-[10px] text-cyan-300/70">PING: {Math.floor(Math.random() * 100)}ms</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Frequencies */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <Waves className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">SIGNAL FREQUENCIES</h3>
              </div>
              <div className="grid grid-cols-6 gap-1 h-16">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-cyan-400/20 rounded-t"
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      animation: `pulse ${(Math.random() * 2 + 1)}s ease-in-out infinite`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* System Analytics */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart className="w-4 h-4 text-cyan-400" />
                <h3 className="text-cyan-400 text-sm font-bold">SYSTEM ANALYTICS</h3>
              </div>
              <div className="space-y-2">
                {['Memory Usage', 'Network Load', 'Storage'].map((metric, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-300/70">{metric}</span>
                      <span className="text-cyan-400">{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-4 animate-glow">
              <h3 className="text-cyan-400 text-sm font-bold mb-3">ACTIVITY LOG</h3>
              <div className="h-48 overflow-auto custom-scrollbar">
                <div className="space-y-2">
                  {activityLog.map((log, i) => (
                    <div key={i} className="flex space-x-2 text-xs">
                      <span className="text-cyan-400">[{log.timestamp}]</span>
                      <span className="text-cyan-300/70">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SystemStatus />

      {/* Add hover effects to panels */}
      <style>
        {`
          .panel-hover {
            transition: all 0.3s ease;
          }
          .panel-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
        `}
      </style>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;