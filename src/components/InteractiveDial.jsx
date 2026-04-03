import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Play, Square } from 'lucide-react';
import { siteConfig } from '../data/config';

const InteractiveDial = () => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // Simple Web Audio API visualizer emulation values
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setPulse(1 + Math.random() * 0.15);
      }, 200);
    } else {
      setPulse(1);
    }
    return () => clearInterval(interval);
  }, [playing]);

  const toggleRadio = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      audioRef.current.play().then(() => {
        setPlaying(true);
        setLoading(false);
      }).catch(err => {
        console.error("Audio play error:", err);
        setLoading(false);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
      <audio 
        ref={audioRef} 
        src={siteConfig.streamUrl} 
        crossOrigin="anonymous"
      />

      <div className="text-center mb-12">
         <p className="text-teal-400 font-bold tracking-[0.3em] uppercase text-sm mb-2">Current Frequency</p>
         <h2 className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(20,184,166,0.3)] tracking-tighter">
            104.2<span className="text-teal-500">FM</span>
         </h2>
      </div>

      {/* The Dial */}
      <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/10 border-t-teal-500 shadow-[0_0_50px_rgba(20,184,166,0.1)]"
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Glass Ring */}
        <motion.div 
          className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-md border border-white/5"
          animate={{ scale: pulse }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />

        {/* Labels positioned around the dial */}
        <div className="absolute top-4 w-full flex justify-center text-xs font-bold text-slate-500 tracking-widest uppercase">
           Soca Beat
        </div>
        <div className="absolute bottom-10 left-8 text-xs font-bold text-slate-500 tracking-widest uppercase rotate-[-30deg]">
           Reggae Roots
        </div>
        <div className="absolute bottom-10 right-8 text-xs font-bold text-slate-500 tracking-widest uppercase rotate-[30deg]">
           Calypso Gold
        </div>

        {/* Center Button */}
        <button 
          onClick={toggleRadio}
          className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-teal-500 to-emerald-700 shadow-[0_0_40px_rgba(20,184,166,0.4)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group"
        >
          {loading ? (
             <Loader2 size={48} className="text-white animate-spin" />
          ) : playing ? (
             <Square size={40} className="text-white fill-white" />
          ) : (
             <Play size={48} className="text-white fill-white ml-2 group-hover:scale-110 transition-transform" />
          )}
          
          {/* Inner ring decoration */}
          <div className="absolute inset-2 rounded-full border-2 border-white/20" />
        </button>

      </div>

      {/* Sliders Area (Visual Only for dashboard aesthetic) */}
      <div className="mt-20 flex gap-12 text-slate-400 font-bold text-xs tracking-widest uppercase">
         <div className="flex flex-col items-center gap-3">
            <span>Volume</span>
            <div className="w-32 h-1 bg-dark-800 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-teal-500" />
            </div>
         </div>
         <div className="flex flex-col items-center gap-3">
            <span>Pulse</span>
            <div className="w-32 h-1 bg-dark-800 rounded-full overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-rose-500" 
                 animate={{ width: playing ? ["30%", "80%", "40%"] : "30%" }}
                 transition={{ duration: 1.5, repeat: Infinity }}
               />
            </div>
         </div>
      </div>
      
    </div>
  );
};

export default InteractiveDial;
