"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* 3D Athena Statue (Strategic Wisdom) - Bust ONLY, no pillar */
export function AthenaStatue3D({ isHovered = false }) {
  const groupRef = useRef<THREE.Group>(null);
  const [localHovered, setLocalHovered] = useState(false);

  const active = isHovered || localHovered;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Smoothly transition rotation speed
      const targetSpeed = active ? 0.8 : 0.2;
      groupRef.current.rotation.y += (targetSpeed * 0.05);

      // Add a subtle head bob
      groupRef.current.position.y = -0.4 + Math.sin(time * 2) * 0.08;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setLocalHovered(true)}
      onPointerOut={() => setLocalHovered(false)}
      scale={2.1}
      position={[0, -0.4, 0]}
    >
      {/* Carved Athena Bust */}
      <group position={[0, 0, 0]}>
        {/* Chest Plate / Toga shoulders */}
        <mesh position={[0, -0.25, 0]}>
          <coneGeometry args={[0.75, 0.6, 5]} />
          <meshStandardMaterial color="#dddddd" roughness={0.2} metalness={0.05} flatShading />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.3, 8]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.25} metalness={0.05} flatShading />
        </mesh>

        {/* Head (Highly defined low-poly facets for carved look) */}
        <mesh position={[0, 0.5, 0]}>
          <icosahedronGeometry args={[0.38, 1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.0} flatShading />
        </mesh>

        {/* Crown/Helmet */}
        <mesh position={[0, 0.8, 0.05]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[0.25, 0.5, 4]} />
          <meshStandardMaterial color="#b3b3b3" roughness={0.2} metalness={0.2} flatShading />
        </mesh>
      </group>
    </group>
  );
}

/* 3D Atlas Statue (Systems Support) */
export function AtlasStatue3D({ isHovered = false }) {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const [localHovered, setLocalHovered] = useState(false);

  const active = isHovered || localHovered;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Slow rotation for base, faster for active
      const targetSpeed = active ? 0.6 : 0.15;
      groupRef.current.rotation.y += (targetSpeed * 0.04);
    }
    
    if (globeRef.current) {
      // Globe rotates on its own axis counter-clockwise
      globeRef.current.rotation.y -= 0.01;
      globeRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setLocalHovered(true)}
      onPointerOut={() => setLocalHovered(false)}
      scale={1.2}
      position={[0, -0.6, 0]}
    >
      {/* Plinth */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.3, 8]} />
        <meshStandardMaterial color="#dddddd" roughness={0.2} metalness={0.05} flatShading />
      </mesh>

      {/* Atlas Body Model (Low poly stylized muscle statue) */}
      <group position={[0, -1.2, 0]}>
        {/* Knees/Base legs */}
        <mesh position={[0, 0.2, 0]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.7, 0.5, 0.6]} />
          <meshStandardMaterial color="#cccccc" roughness={0.25} metalness={0.05} flatShading />
        </mesh>

        {/* Torso (Bent over under weight) */}
        <mesh position={[0, 0.7, 0.2]} rotation={[-0.5, 0, 0]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial color="#e5e5e5" roughness={0.15} metalness={0.05} flatShading />
        </mesh>

        {/* Arms holding the globe */}
        <mesh position={[-0.45, 0.9, 0.1]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 6]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.05} flatShading />
        </mesh>
        <mesh position={[0.45, 0.9, 0.1]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 6]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.05} flatShading />
        </mesh>
      </group>

      {/* The Globe (Celestial Sphere) */}
      <mesh ref={globeRef} position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[0.75, 2]} />
        {/* Semi-transparent wireframe globe */}
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={active ? 0.9 : 0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Inner glowing core of the globe */}
      <mesh position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={active ? 0.35 : 0.15}
          roughness={0.1}
          metalness={0.0}
          flatShading
        />
      </mesh>
    </group>
  );
}
