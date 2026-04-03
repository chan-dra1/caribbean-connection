import React, { useRef, useState, useEffect } from 'react';
import { Play, Square, Loader2, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';

const PlayerBar = ({ isPlaying, setIsPlaying, audioRef, streamLoading, setStreamLoading }) => {
  const [muted, setMuted] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setStreamLoading(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStreamLoading(false);
      }).catch(e => {
        console.error("Audio error:", e);
        setStreamLoading(false);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(audioRef.current.muted);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 transform ${minimized ? 'translate-y-full' : 'translate-y-0'}`}>
      
      {/* Minimize Toggle Tab */}
      <button 
        onClick={() => setMinimized(!minimized)}
        className="absolute -top-10 right-8 bg-dark-900 border border-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-t-xl transition-colors flex items-center justify-center gap-2"
      >
        {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        <span className="text-xs uppercase font-bold tracking-wider">{minimized ? 'Show Player' : 'Hide Player'}</span>
      </button>

      {/* Main Bar */}
      <div className="bg-dark-900/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 md:px-8 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3">
          <div className={`relative w-12 h-12 rounded bg-dark-800 border border-white/10 flex-shrink-0 animate-pulse ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
            <img 
              src={siteConfig.host.image} 
              alt="Host" 
              className="w-full h-full object-cover rounded mix-blend-luminosity"
            />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-soca-red rounded-full animate-ping" />
            )}
          </div>
          <div className="hidden sm:flex flex-col overflow-hidden">
            <span className="text-soca-yellow font-bold uppercase tracking-wider text-xs truncate">
              {siteConfig.radioName} {siteConfig.frequency}
            </span>
            <span className="text-slate-300 text-sm truncate font-medium">LIVE: Caribbean Connection</span>
          </div>
        </div>

        {/* Central Controls */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-soca-red to-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 transition-transform"
          >
            {streamLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : isPlaying ? (
              <Square size={20} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </button>
          <AnimatePresence>
            {streamLoading && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-[-25px] text-soca-red text-xs font-bold tracking-widest uppercase"
              >
                Connecting...
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Secondary Controls (Volume) */}
        <div className="flex items-center justify-end w-1/3 gap-4">
          <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors">
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
