import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Play, Square, Loader2 } from 'lucide-react';
import bgImage from '../assets/home-main-bg.png';
import logoBadgeImage from '../assets/hero-badge-replacement.png';
import ThreeScene from './ThreeScene';

const Hero = ({ isPlaying, streamLoading, onTogglePlay }) => {
  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-dark-900 pt-32 pb-10 border-b-4 border-b-soca-red">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-70 bg-cover bg-center h-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-900/25 via-dark-900/45 to-dark-900/70" />

      {/* Branded circular logo badge inspired by reference */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="absolute z-10 left-4 md:left-10 bottom-8 md:bottom-12"
      >
        <img
          src={logoBadgeImage}
          alt="Caribbean Connection badge"
          className="w-40 sm:w-52 md:w-72 rounded-2xl border-2 border-soca-yellow/80 shadow-[0_0_50px_rgba(0,0,0,0.55)]"
        />
      </motion.div>

      {/* Content Header */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mb-2">
        <motion.h1 
          className="text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-soca-yellow via-soca-red to-soca-teal block">
            Caribbean Connection Radio Show
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-3xl text-slate-200 mb-8 max-w-3xl font-light uppercase tracking-widest drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          The most versatile show on the radio
          <br />
          keeping you in touch with your Caribbean heritage.
        </motion.p>

        {/* Play Button Overlay */}
        <motion.button
          type="button"
          onClick={onTogglePlay}
          aria-pressed={isPlaying}
          aria-label={streamLoading ? 'Connecting to live stream' : isPlaying ? 'Pause live stream' : 'Play live stream'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`relative group flex items-center gap-3 px-10 py-5 rounded-full font-black text-xl md:text-2xl transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20 overflow-hidden uppercase tracking-wider ${isPlaying ? 'bg-dark-800 text-soca-yellow border-2 border-soca-yellow' : 'bg-soca-red text-white hover:bg-red-500'}`}
        >
          {isPlaying && (
            <div className="absolute inset-0 bg-soca-yellow/10 animate-pulse" />
          )}

          <div className="relative z-10 flex items-center gap-4">
            {streamLoading ? (
               <Loader2 className="animate-spin" size={28} />
            ) : isPlaying ? (
               <Square size={28} fill="currentColor" />
            ) : (
               <Play size={28} fill="currentColor" />
            )}
            {streamLoading ? "Tuning In..." : isPlaying ? "Live On Air" : "Listen Now"}
          </div>
        </motion.button>
      </div>

      {/* 3D Interactive Canvas */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative z-10 w-full h-[50vh] md:h-[60vh] cursor-grab active:cursor-grabbing"
      >
        <Canvas shadows camera={{ position: [0, 1.5, 9], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow color="#fbbf24" />
          <spotLight position={[-10, 10, -10]} angle={0.2} penumbra={1} intensity={1} color="#ef4444" />
          <Environment preset="night" />
          
          <ThreeScene playing={isPlaying} onTogglePlay={onTogglePlay} />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#10b981" />

          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 4}
            autoRotate={!isPlaying}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </motion.div>
    </section>
  );
};

export default Hero;
