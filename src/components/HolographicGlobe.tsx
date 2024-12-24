import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function HolographicGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (globeRef.current && wireframeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      wireframeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[1, 32, 32]}>
        <meshPhongMaterial
          color="#00ff88"
          transparent
          opacity={0.2}
          emissive="#00ff88"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere ref={wireframeRef} args={[1.01, 32, 32]}>
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.4}
        />
      </Sphere>
    </group>
  );
}