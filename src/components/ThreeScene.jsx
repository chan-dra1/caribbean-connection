import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ThreeScene = ({ playing }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      if (playing) {
        groupRef.current.rotation.x += delta * 0.5;
        groupRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1.5, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#14b8a6" wireframe />
        </Icosahedron>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#2dd4bf"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.8}
            roughness={0.2}
            distort={playing ? 0.6 : 0.3}
            speed={playing ? 5 : 2}
          />
        </Sphere>
      </Float>

      {/* Background Orbits */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3, 3.02, 64]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.02, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {playing && (
        <pointLight position={[0, 0, 0]} intensity={2} color="#2dd4bf" />
      )}
    </group>
  );
};

export default ThreeScene;
