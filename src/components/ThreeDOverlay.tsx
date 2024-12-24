import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Location } from '../types/locations';

interface ThreeDOverlayProps {
  location: Location;
}

export function ThreeDOverlay({ location }: ThreeDOverlayProps) {
  return (
    <div className="absolute left-4 bottom-4 w-64 h-64 bg-gray-900/80 backdrop-blur-sm border border-cyan-900/30 rounded">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        
        {/* Signal Strength Visualization */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#00ffff"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Location Label */}
        <Text
          position={[0, 1.5, 0]}
          color="#00ffff"
          fontSize={0.2}
          anchorX="center"
        >
          {location.name}
        </Text>
      </Canvas>
    </div>
  );
}