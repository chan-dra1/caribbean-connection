import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, MeshWobbleMaterial, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

// --- Music Nodes / Particles ---
const MusicNodes = ({ playing }) => {
  const count = 30;
  const meshRef = useRef();
  
  // Custom particle data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
            t: Math.random() * 100,
            factor: 0.1 + Math.random() * 1,
            speed: 0.01 + Math.random() / 50,
            xFactor: -2 + Math.random() * 4,
            yFactor: -2 + Math.random() * 4,
            zFactor: -2 + Math.random() * 4,
        });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!playing) {
        meshRef.current.visible = false;
        return;
    }
    meshRef.current.visible = true;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      const matrix = new THREE.Matrix4();
      matrix.setPosition(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Animation scaling
      const scale = Math.abs(s) * 0.3;
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#14b8a6" transparent opacity={0.6} />
    </instancedMesh>
  );
};

// --- Vintage Radio Model ---
const ThreeRadio = ({ onToggle, playing }) => {
  const radioRef = useRef();
  const knobRef = useRef();
  
  useFrame((state, delta) => {
    if (radioRef.current) {
        radioRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (playing && knobRef.current) {
        knobRef.current.rotation.z += delta * 2;
    }
  });

  return (
    <group ref={radioRef} scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]}>
      {/* Radio Body (Wood) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 2.5, 1.5]} />
        <meshStandardMaterial color="#5d4037" roughness={0.5} />
      </mesh>

      {/* Front Panel (Beige/Metal) */}
      <mesh position={[0, 0, 0.76]}>
        <boxGeometry args={[3.8, 2.3, 0.1]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>

      {/* Speaker Grill */}
      <mesh position={[-0.8, -0.2, 0.82]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color="#3e2723" wireframe />
      </mesh>

      {/* Radio Tuning Dial */}
      <mesh position={[1, 0.4, 0.82]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      <Text position={[1, 0.4, 0.83]} fontSize={0.1} color="white">
        FM  AM  SW
      </Text>

      {/* Play/Pause Knob */}
      <group position={[1, -0.5, 0.82]} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
        <mesh ref={knobRef}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#757575" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text position={[0, -0.5, 0]} fontSize={0.15} color="white">
          {playing ? "STOP" : "PLAY"}
        </Text>
      </group>

      {/* Music Particles */}
      <group position={[-0.8, -0.2, 1]}>
        <MusicNodes playing={playing} />
      </group>

      {/* Antenna */}
      <mesh position={[-1.8, 1.5, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.02, 0.02, 2.5, 8]} />
        <meshStandardMaterial color="#bdbdbd" metalness={0.9} />
      </mesh>

      {/* Glow when playing */}
      {playing && (
        <pointLight position={[0, 0, 1]} distance={5} intensity={2} color="#14b8a6" />
      )}
    </group>
  );
};

export default ThreeRadio;
