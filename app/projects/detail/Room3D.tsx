"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

function Room() {
  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      {/* Rug */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {/* Sofa (Main Body) */}
      <mesh position={[0, 0.4, -1]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 1]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      
      {/* Sofa (Backrest) */}
      <mesh position={[0, 1, -1.3]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.4]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      
      {/* Sofa (Armrests) */}
      <mesh position={[-1.6, 0.7, -1]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 1]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <mesh position={[1.6, 0.7, -1]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.6, 1]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* Coffee Table */}
      <mesh position={[0, 0.3, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      <mesh position={[0, 0.15, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Modern Floor Lamp */}
      <mesh position={[-2.5, 1.5, -2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 3, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-2.5, 2.8, -1.5]} rotation={[0, 0, -Math.PI / 4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-2, 2.3, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.5} />
      </mesh>

      {/* TV Console */}
      <mesh position={[0, 0.3, 3]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.6, 0.8]} />
        <meshStandardMaterial color="#f5f5f4" />
      </mesh>

      {/* Gizmo (Transform Control Mockup) */}
      <group position={[0, 0.35, 0.5]}>
        {/* X Axis */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.06, 0.2]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        
        {/* Y Axis */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.06, 0.2]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        
        {/* Z Axis */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.06, 0.2]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      </group>
    </group>
  );
}

export default function Room3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas shadows camera={{ position: [4, 3, 4], fov: 50 }}>
        <color attach="background" args={["#eef2ff"]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={2048}
        />
        <Suspense fallback={null}>
          <Room />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.99, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
