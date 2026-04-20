import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Cylinder, Sphere, Stars, RoundedBox, Torus } from '@react-three/drei';
import * as THREE from 'three';

// --- Particle System ---
const MusicParticles = ({ playing }) => {
  const count = 30;
  const meshRef = useRef();
  
  // Initialize particles with random positions, velocities, and lifetimes
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          -0.8 + (Math.random() - 0.5) * 0.5, // Emitting from left speaker area
          0,
          1
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          Math.random() * 2 + 1,
          Math.random() * 2 + 0.5
        ),
        scale: Math.random() * 0.15 + 0.05,
        life: Math.random() * 2, // Current life
        maxLife: 2 + Math.random() * 2,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      if (playing) {
        p.life += delta;
        p.position.addScaledVector(p.velocity, delta);
        
        // Add a little swirl
        p.velocity.x += Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;

        // Reset particle if it dies
        if (p.life > p.maxLife) {
          p.life = 0;
          p.position.set(-0.8 + (Math.random() - 0.5) * 0.5, 0, 1);
          p.velocity.set(
            (Math.random() - 0.5) * 2,
            Math.random() * 2 + 1,
            Math.random() * 2 + 0.5
          );
        }
      } else {
        // If not playing, slowly fade/shrink existing particles and don't respawn
        if (p.life < p.maxLife) {
            p.life += delta * 2;
            p.position.addScaledVector(p.velocity, delta * 0.5);
        }
      }

      // Calculate scale factoring life
      const lifeProgress = p.life / p.maxLife;
      const currentScale = playing 
        ? p.scale * Math.max(0, 1 - Math.pow(lifeProgress, 2)) // Expand then shrink
        : p.scale * Math.max(0, 1 - lifeProgress); // Just shrink
        
      if (lifeProgress >= 1) {
         dummy.scale.set(0.001, 0.001, 0.001); // Hide dead particles
      } else {
         dummy.position.copy(p.position);
         dummy.scale.setScalar(currentScale);
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Use vibrant Soca colors for instanced material
  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color="#2dd4bf" 
        emissive="#14b8a6" 
        emissiveIntensity={2} 
        toneMapped={false} 
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};


// --- Retro Radio Model ---
const RetroRadio = ({ playing, onTogglePlay }) => {
  const radioGroup = useRef();
  const playButtonRef = useRef();

  useFrame((state, delta) => {
    // Gentle bobbing of the radio
    const t = state.clock.getElapsedTime();
    if (radioGroup.current) {
        radioGroup.current.position.y = Math.sin(t * 1.5) * 0.1;
        radioGroup.current.rotation.z = Math.sin(t * 0.8) * 0.02;
    }
    
    // Animate play button pulse if not playing, pulse intensely if playing
    if (playButtonRef.current) {
        if (playing) {
            playButtonRef.current.scale.setScalar(1 + Math.sin(t * 10) * 0.05);
            playButtonRef.current.material.emissiveIntensity = 2 + Math.sin(t * 10);
        } else {
            playButtonRef.current.scale.setScalar(1);
            playButtonRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 3) * 0.5;
        }
    }
  });

  return (
    <group ref={radioGroup} scale={1.2}>
      {/* Wood Chassis (Outer Box) */}
      <RoundedBox args={[4, 2.5, 1.8]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#5c3a21" roughness={0.7} metalness={0.1} />
      </RoundedBox>

      {/* Front Cream Panel */}
      <RoundedBox args={[3.6, 2.1, 0.1]} radius={0.1} smoothness={4} position={[0, 0, 0.9]}>
        <meshStandardMaterial color="#f0e6d2" roughness={0.4} />
      </RoundedBox>

      {/* Left Speaker Grill */}
      <Box args={[1.5, 1.6, 0.05]} position={[-0.8, 0, 0.96]}>
        <meshStandardMaterial color="#2d2d2d" wireframe={true} wireframeLinewidth={2} roughness={0.8} />
      </Box>
      {/* Inner Speaker Cone (Behind Grill) */}
      <Cylinder args={[0.6, 0.2, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.8, 0, 0.9]}>
         <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>

      {/* Tuning Display Panel */}
      <Box args={[1.6, 0.6, 0.1]} position={[0.9, 0.5, 0.95]}>
        <meshStandardMaterial color="#111" emissive="#2dd4bf" emissiveIntensity={0.2} />
      </Box>
      <Box args={[1.4, 0.02, 0.05]} position={[0.9, 0.5, 1.0]} rotation={[0, 0, 0.1]}>
        <meshBasicMaterial color="#ef4444" />
      </Box> {/* Tuning Needle */}

      {/* Right Knobs */}
      <Cylinder args={[0.2, 0.25, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.5, -0.4, 1.0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.2, 0.25, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} position={[1.3, -0.4, 1.0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Interactive PLAY Button (Center Base) */}
      <Cylinder 
        ref={playButtonRef}
        args={[0.25, 0.25, 0.15, 32]} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0.9, -0.4, 1.05]}
        onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
            // Provide haptic/visual feedback by briefly scaling in the event handler if needed, 
            // though useFrame handles the pulsing
        }}
        onPointerOver={(e) => {
            e.object.material.color.set("#ef4444");
            document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
            e.object.material.color.set("#fbbf24");
            document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} roughness={0.2} metalness={0.5} />
      </Cylinder>

      {/* Top Handle */}
      <Torus args={[1.6, 0.08, 16, 50, Math.PI]} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.25, 0]}>
         <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
      </Torus>
      <Cylinder args={[0.1, 0.1, 0.2, 16]} rotation={[0, 0, Math.PI/2]} position={[-1.6, 1.25, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.2, 16]} rotation={[0, 0, Math.PI/2]} position={[1.6, 1.25, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} />
      </Cylinder>

      {/* Back Antenna */}
      <Cylinder args={[0.02, 0.02, 3, 16]} position={[1.5, 2, -0.8]} rotation={[0, 0, -Math.PI / 6]}>
        <meshStandardMaterial color="#e5e5e5" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Sphere args={[0.08]} position={[2.25, 3.3, -0.8]}>
        <meshStandardMaterial color="#e5e5e5" metalness={0.9} roughness={0.1} />
      </Sphere>

    </group>
  );
};


// --- Main Scene Component ---
const ThreeScene = ({ playing, onTogglePlay }) => {
  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 3D Radio Group */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
         <RetroRadio playing={playing} onTogglePlay={onTogglePlay} />
         <MusicParticles playing={playing} />
      </Float>

      {/* dynamic lighting that reacts to the music playing */}
      {playing && (
        <>
            <pointLight position={[-1, 0, 2]} intensity={3} color="#2dd4bf" distance={5} />
            <pointLight position={[1, -1, 2]} intensity={2} color="#fbbf24" distance={5} />
        </>
      )}
    </group>
  );
};

export default ThreeScene;
