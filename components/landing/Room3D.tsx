"use client";

import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import * as THREE from "three";

const ACCENT = "#2D7FF9";

/* A furniture group that scales into place when `show` flips true. */
function Piece({
  show,
  children,
  ...props
}: { show: boolean; children: ReactNode } & ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const target = show ? 1 : 0.0001;
    const s = THREE.MathUtils.lerp(g.scale.x, target, 0.16);
    g.scale.set(s, s, s);
    g.visible = s > 0.02;
  });
  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}

function Box({
  args,
  color,
  metalness = 0,
  roughness = 0.75,
  ...props
}: {
  args: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
} & Omit<ThreeElements["mesh"], "args">) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

function Cyl({
  args,
  color,
  metalness = 0,
  roughness = 0.7,
  ...props
}: {
  args: [number, number, number, number?];
  color: string;
  metalness?: number;
  roughness?: number;
} & Omit<ThreeElements["mesh"], "args">) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={[args[0], args[1], args[2], args[3] ?? 32]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

function Armchair({ body, cushion }: { body: string; cushion: string }) {
  return (
    <group>
      <Box args={[0.95, 0.4, 0.9]} color={body} position={[0, 0.3, 0]} />
      <Box args={[0.95, 0.62, 0.2]} color={body} position={[0, 0.58, -0.36]} />
      <Box args={[0.18, 0.46, 0.9]} color={body} position={[-0.46, 0.42, 0]} />
      <Box args={[0.18, 0.46, 0.9]} color={body} position={[0.46, 0.42, 0]} />
      <Box args={[0.7, 0.18, 0.7]} color={cushion} position={[0, 0.5, 0.04]} roughness={0.85} />
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cyl args={[0.18, 0.14, 0.32]} color="#b5663c" position={[0, 0.16, 0]} roughness={0.9} />
      <mesh castShadow position={[0, 0.62, 0]}>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial color="#3f7d4f" flatShading roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.16, 0.5, 0.05]}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color="#4a8d5a" flatShading roughness={0.9} />
      </mesh>
    </group>
  );
}

function Hotspot({
  position,
  delay = "0s",
}: {
  position: [number, number, number];
  delay?: string;
}) {
  return (
    <Html position={position} center distanceFactor={9} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
      <span className="relative flex h-6 w-6 items-center justify-center" style={{ animation: "pin-pop .4s cubic-bezier(.2,.8,.2,1) both", animationDelay: delay }}>
        <span className="absolute inset-0 rounded-full" style={{ background: "rgba(45,127,249,0.45)", animation: "pulse-ring 2.2s ease-out infinite" }} />
        <span className="relative h-6 w-6 rounded-full border-2 border-white shadow-lg" style={{ background: ACCENT }} />
      </span>
    </Html>
  );
}

function Scene({ progress }: { progress: number }) {
  const show = (n: number) => progress >= n;
  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#5b6480", 0.5]} />
      <directionalLight
        position={[5, 7.5, 5]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      {/* Room shell */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#c3a980" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.7, -2.3]} receiveShadow>
        <planeGeometry args={[7.4, 3.6]} />
        <meshStandardMaterial color="#e9edf4" roughness={1} />
      </mesh>
      <mesh position={[-3.5, 1.7, 0]} rotation-y={Math.PI / 2} receiveShadow>
        <planeGeometry args={[6, 3.6]} />
        <meshStandardMaterial color="#e2e6ef" roughness={1} />
      </mesh>
      {/* baseboard */}
      <Box args={[7.4, 0.12, 0.04]} color="#ffffff" position={[0, 0.06, -2.27]} roughness={1} />

      {/* Rug */}
      <Piece show={show(1)} position={[0, 0, 0]}>
        <Box args={[3.6, 0.04, 2.4]} color="#ece6db" position={[0, 0.02, 0]} roughness={1} />
      </Piece>

      {/* Sofa */}
      <Piece show={show(2)} position={[0, 0, -1.45]}>
        <Box args={[2.5, 0.45, 0.95]} color="#323b52" position={[0, 0.34, 0]} />
        <Box args={[2.5, 0.72, 0.22]} color="#2b3346" position={[0, 0.66, -0.38]} />
        <Box args={[0.24, 0.58, 0.95]} color="#2b3346" position={[-1.13, 0.46, 0]} />
        <Box args={[0.24, 0.58, 0.95]} color="#2b3346" position={[1.13, 0.46, 0]} />
        <Box args={[1.1, 0.2, 0.8]} color="#39435a" position={[-0.6, 0.56, 0.04]} roughness={0.85} />
        <Box args={[1.1, 0.2, 0.8]} color="#39435a" position={[0.6, 0.56, 0.04]} roughness={0.85} />
      </Piece>

      {/* Armchairs */}
      <Piece show={show(3)} position={[-1.85, 0, 0.35]} rotation-y={0.6}>
        <Armchair body="#c79a4f" cushion="#d8b066" />
      </Piece>
      <Piece show={show(4)} position={[1.85, 0, 0.35]} rotation-y={-0.6}>
        <Armchair body="#2b3346" cushion="#39435a" />
      </Piece>

      {/* Coffee table (twin ovals) */}
      <Piece show={show(5)} position={[0, 0, -0.25]}>
        <Cyl args={[0.66, 0.66, 0.32]} color="#3a3f4c" position={[-0.25, 0.18, 0]} metalness={0.25} roughness={0.4} />
        <Cyl args={[0.46, 0.46, 0.36]} color="#454b59" position={[0.45, 0.2, 0.1]} metalness={0.25} roughness={0.4} />
      </Piece>

      {/* Accents: lamp, plants, art */}
      <Piece show={show(6)} position={[-2.5, 0, -1.2]}>
        <Cyl args={[0.2, 0.2, 0.04]} color="#1c2230" position={[0, 0.02, 0]} />
        <Cyl args={[0.03, 0.03, 1.7]} color="#1c2230" position={[0, 0.87, 0]} />
        <mesh castShadow position={[0, 1.62, 0]} rotation-x={Math.PI}>
          <sphereGeometry args={[0.24, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#23272f" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 1.45, 0]} intensity={1.6} distance={4} color="#ffe7b0" />
      </Piece>
      <Piece show={show(6)} position={[0, 0, 0]}>
        <Plant position={[-1.0, 0, -1.9]} />
        <Plant position={[1.0, 0, -1.9]} />
        {/* wall art */}
        <Box args={[1.5, 1.0, 0.05]} color="#2b2f3a" position={[0, 1.75, -2.24]} roughness={0.6} />
        <Box args={[1.32, 0.84, 0.06]} color="#8ea0c8" position={[0, 1.75, -2.22]} roughness={0.5} />
      </Piece>

      {/* Live hotspots */}
      {show(2) && <Hotspot position={[0, 1.0, -1.0]} />}
      {show(5) && <Hotspot position={[0.2, 0.65, -0.2]} delay="0.1s" />}
      {show(4) && <Hotspot position={[1.85, 0.85, 0.35]} delay="0.2s" />}

      {/* Avatar marker in-scene */}
      {show(3) && (
        <Html position={[-0.4, 1.35, 0.5]} center distanceFactor={9} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#966eff] px-2 py-0.5 text-[10px] font-bold text-white shadow-lg" style={{ animation: "pin-pop .4s ease both" }}>
            <span className="h-3.5 w-3.5 overflow-hidden rounded-full bg-white/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80" alt="" className="h-full w-full object-cover" />
            </span>
            Sara · Client
          </span>
        </Html>
      )}

      <ContactShadows position={[0, 0.03, 0]} opacity={0.5} scale={14} blur={2.4} far={4.5} color="#0a0e17" />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        target={[0, 0.7, -0.4]}
        minPolarAngle={0.7}
        maxPolarAngle={1.45}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

export default function Room3D({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.2, 3.2, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
