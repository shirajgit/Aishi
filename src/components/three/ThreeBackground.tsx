import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Orb({
  position,
  color,
  emissive,
  scale,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.06;
    ref.current.rotation.y = state.clock.elapsedTime * 0.11;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          distort={0.28}
          speed={1.8}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

// Deterministic PRNG (mulberry32) so particle positions are stable across
// renders — keeps the render pure (no Math.random side effect) and avoids any
// hydration mismatch.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 160;
    const rand = mulberry32(0x5eed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 22;
      arr[i * 3 + 1] = (rand() - 0.5) * 12;
      arr[i * 3 + 2] = (rand() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.038} color="#38d9f5" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.07;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[3.5, 0.012, 2, 120]} />
      <meshBasicMaterial color="#38d9f5" transparent opacity={0.18} />
    </mesh>
  );
}

function CameraMotion() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 0.4;
    state.camera.position.y = Math.cos(t * 0.15) * 0.25;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Animated 3D hero background (three.js Canvas). Mounting is gated by the
 * parent (Hero) so this heavy chunk is only ever downloaded on desktop.
 */
export default function ThreeBackground() {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.88,
        mixBlendMode: 'screen',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, #02050f)',
        }}
      />
      <Canvas camera={{ position: [0, 0, 8], fov: 44 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={2.8} color="#38d9f5" />
          <pointLight position={[-5, -3, 3]} intensity={2.2} color="#7b8cde" />
          <fog attach="fog" args={['#02050f', 7, 20]} />
          <Particles />
          <Ring />
          <Orb position={[-4.8, 2.4, -2]} color="#22d3ee" emissive="#0f766e" scale={1.5} />
          <Orb position={[4.8, -2.2, -2]} color="#6366f1" emissive="#312e81" scale={2.1} />
          <Orb position={[0.5, 3.5, -5]} color="#60a5fa" emissive="#1d4ed8" scale={0.9} />
          <CameraMotion />
        </Suspense>
      </Canvas>
    </div>
  );
}
