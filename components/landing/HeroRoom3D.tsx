"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";

/* Brand palette (Tailwind tokens can't reach the WebGL canvas, so use hex). */
const C = {
  ctaBlue: "#4361EE",
  teal: "#14B8A6",
  lime: "#84CC16",
  wood: "#A87B53",
  woodDark: "#8A6440",
  floor: "#E7E2D8",
  wall: "#F4F1EA",
  wallSide: "#ECE7DD",
  rug: "#DCE3F5",
  cushion: "#5B76F0",
  metal: "#3A3D46",
  lampShade: "#FBE9C4",
  pot: "#C9A27A",
  chair: "#8B93A1",
  rugWarm: "#F0E6DA",
  wallB: "#EEF1F7",
};

function Sofa() {
  return (
    <group position={[-0.55, 0, -0.35]}>
      {/* seat base */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.32, 0.8]} />
        <meshStandardMaterial color={C.ctaBlue} roughness={0.8} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 0.62, -0.34]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.56, 0.18]} />
        <meshStandardMaterial color={C.ctaBlue} roughness={0.8} />
      </mesh>
      {/* arms */}
      {[-0.78, 0.78].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.18, 0.5, 0.8]} />
          <meshStandardMaterial color={C.ctaBlue} roughness={0.8} />
        </mesh>
      ))}
      {/* seat cushions */}
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.52, 0.04]} castShadow>
          <boxGeometry args={[0.66, 0.14, 0.66]} />
          <meshStandardMaterial color={C.cushion} roughness={0.7} />
        </mesh>
      ))}
      {/* legs */}
      {[
        [-0.7, -0.32],
        [0.7, -0.32],
        [-0.7, 0.32],
        [0.7, 0.32],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.08, z]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.16, 12]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CoffeeTable() {
  return (
    <group position={[-0.55, 0, 0.85]}>
      {/* top */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.08, 0.6]} />
        <meshStandardMaterial color={C.wood} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* legs */}
      {[
        [-0.42, -0.23],
        [0.42, -0.23],
        [-0.42, 0.23],
        [0.42, 0.23],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.4, 10]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Rug() {
  return (
    <mesh position={[-0.55, 0.011, 0.35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[2.4, 1.9]} />
      <meshStandardMaterial color={C.rug} roughness={0.95} />
    </mesh>
  );
}

function FloorLamp() {
  return (
    <group position={[1.05, 0, -0.55]}>
      {/* base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.06, 20]} />
        <meshStandardMaterial color={C.metal} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* pole */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.55, 12]} />
        <meshStandardMaterial color={C.metal} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* shade */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.26, 0.34, 24, 1, true]} />
        <meshStandardMaterial
          color={C.lampShade}
          emissive={C.lampShade}
          emissiveIntensity={0.6}
          roughness={0.6}
          side={2}
        />
      </mesh>
      <pointLight position={[0, 1.5, 0]} intensity={6} distance={4} color="#FFE6B0" />
    </group>
  );
}

function Plant() {
  return (
    <group position={[1.15, 0, 0.85]}>
      {/* pot */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.17, 0.13, 0.36, 18]} />
        <meshStandardMaterial color={C.pot} roughness={0.7} />
      </mesh>
      {/* foliage */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <coneGeometry args={[0.3, 0.7, 14]} />
        <meshStandardMaterial color={C.teal} roughness={0.85} />
      </mesh>
      <mesh position={[0.08, 0.95, 0.02]} castShadow>
        <coneGeometry args={[0.22, 0.55, 12]} />
        <meshStandardMaterial color={C.lime} roughness={0.85} />
      </mesh>
    </group>
  );
}

function SideCabinet() {
  return (
    <group position={[1.05, 0, 0.05]}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.7, 0.45]} />
        <meshStandardMaterial color={C.wood} roughness={0.5} />
      </mesh>
      {/* drawer line */}
      <mesh position={[0, 0.35, 0.231]} castShadow>
        <boxGeometry args={[0.62, 0.04, 0.02]} />
        <meshStandardMaterial color={C.woodDark} roughness={0.5} />
      </mesh>
      {/* knobs */}
      {[0.2, 0.55].map((y) => (
        <mesh key={y} position={[0, y, 0.235]} castShadow>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color={C.metal} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Chair({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* seat */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
        <meshStandardMaterial color={C.chair} roughness={0.7} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 0.72, -0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.5, 0.06]} />
        <meshStandardMaterial color={C.chair} roughness={0.7} />
      </mesh>
      {/* legs */}
      {[
        [-0.17, -0.17],
        [0.17, -0.17],
        [-0.17, 0.17],
        [0.17, 0.17],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.23, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.46, 10]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function DiningTable() {
  return (
    <group position={[4.2, 0, -0.1]}>
      {/* top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.08, 0.85]} />
        <meshStandardMaterial color={C.wood} roughness={0.4} metalness={0.05} />
      </mesh>
      {/* legs */}
      {[
        [-0.65, -0.33],
        [0.65, -0.33],
        [-0.65, 0.33],
        [0.65, 0.33],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.72, 10]} />
          <meshStandardMaterial color={C.woodDark} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Pendant() {
  return (
    <group position={[4.2, 0, -0.1]}>
      {/* cord */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
        <meshStandardMaterial color={C.metal} roughness={0.5} metalness={0.6} />
      </mesh>
      {/* shade */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <coneGeometry args={[0.28, 0.3, 24, 1, true]} />
        <meshStandardMaterial
          color={C.lampShade}
          emissive={C.lampShade}
          emissiveIntensity={0.55}
          roughness={0.6}
          side={2}
        />
      </mesh>
      <pointLight position={[0, 1.8, 0]} intensity={5} distance={4} color="#FFE6B0" />
    </group>
  );
}

function DiningRoom() {
  return (
    <group>
      {/* rug */}
      <mesh
        position={[4.2, 0.011, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.6, 2.2]} />
        <meshStandardMaterial color={C.rugWarm} roughness={0.95} />
      </mesh>

      <DiningTable />
      <Pendant />

      <Chair position={[3.8, 0, 0.62]} rotation={Math.PI} />
      <Chair position={[4.6, 0, 0.62]} rotation={Math.PI} />
      <Chair position={[3.8, 0, -0.82]} rotation={0} />
      <Chair position={[4.6, 0, -0.82]} rotation={0} />

      {/* plant in the corner */}
      <group position={[5.5, 0, -1.35]}>
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.32, 16]} />
          <meshStandardMaterial color={C.pot} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <coneGeometry args={[0.26, 0.7, 12]} />
          <meshStandardMaterial color={C.lime} roughness={0.85} />
        </mesh>
      </group>

      {/* wall art on the shared back wall */}
      <mesh position={[4.2, 1.85, -1.88]}>
        <planeGeometry args={[1.3, 0.6]} />
        <meshStandardMaterial color={C.teal} roughness={0.6} />
      </mesh>
      <mesh position={[4.2, 1.85, -1.885]}>
        <planeGeometry args={[1.42, 0.72]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Room() {
  return (
    <group>
      {/* floor — spans both rooms */}
      <mesh position={[1.8, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color={C.floor} roughness={0.9} />
      </mesh>
      {/* back wall — continuous behind both rooms */}
      <mesh position={[1.8, 1.6, -1.9]} receiveShadow>
        <planeGeometry args={[9, 3.4]} />
        <meshStandardMaterial color={C.wall} roughness={1} />
      </mesh>
      {/* left wall (living room) */}
      <mesh position={[-2.4, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 3.4]} />
        <meshStandardMaterial color={C.wallSide} roughness={1} />
      </mesh>
      {/* right wall (dining room) */}
      <mesh position={[6, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 3.4]} />
        <meshStandardMaterial color={C.wallB} roughness={1} />
      </mesh>
      {/* partition between the two rooms, with a doorway gap (z ≈ -0.4..1.0) */}
      <mesh position={[2.4, 1.6, -1.15]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[1.5, 3.4]} />
        <meshStandardMaterial color={C.wallSide} roughness={1} side={2} />
      </mesh>
      <mesh position={[2.4, 1.6, 1.55]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[1.1, 3.4]} />
        <meshStandardMaterial color={C.wallSide} roughness={1} side={2} />
      </mesh>
      {/* lintel above the doorway */}
      <mesh position={[2.4, 3.0, 0.3]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[1.4, 0.6]} />
        <meshStandardMaterial color={C.wallSide} roughness={1} side={2} />
      </mesh>
      {/* wall art on back wall (living room) */}
      <mesh position={[-0.55, 1.85, -1.88]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshStandardMaterial color={C.ctaBlue} roughness={0.6} />
      </mesh>
      <mesh position={[-0.55, 1.85, -1.885]}>
        <planeGeometry args={[1.12, 0.82]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Hotspot({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[10, 0]}>
      <div className="group relative -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full bg-landing-ctaBlue/40"
            style={{ animation: "pulse-ring 2.2s ease-out infinite" }}
          />
          <span className="relative h-3 w-3 rounded-full border-2 border-white bg-landing-ctaBlue shadow" />
        </span>
        <span className="pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-landing-ink px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block">
          {label}
        </span>
      </div>
    </Html>
  );
}

export default function HeroRoom3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [6.2, 3.6, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#F4F6FB"]} />
      <fog attach="fog" args={["#F4F6FB", 12, 22]} />

      {/* lighting */}
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffffff", "#cbd5e1", 0.5]} />
      <directionalLight
        position={[5, 7, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <Room />

      {/* living room */}
      <Rug />
      <Sofa />
      <CoffeeTable />
      <FloorLamp />
      <Plant />
      <SideCabinet />

      {/* dining room */}
      <DiningRoom />

      <Hotspot position={[-0.55, 0.95, -0.35]} label="Custom sofa" />
      <Hotspot position={[1.05, 1.7, -0.55]} label="Ambient lighting" />
      <Hotspot position={[4.2, 1.0, -0.1]} label="Dining set" />

      {/* soft grounding shadow under furniture */}
      <ContactShadows
        position={[1.8, 0.005, 0.1]}
        opacity={0.33}
        scale={14}
        blur={2.4}
        far={4}
      />

      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        minDistance={4}
        maxDistance={13}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.15}
        target={[1.6, 0.7, 0]}
      />
    </Canvas>
  );
}
