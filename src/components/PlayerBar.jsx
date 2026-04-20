import React, { useState, useEffect } from 'react';
import { Play, Square, Loader2, Volume2, VolumeX, Minimize2, Maximize2, Link2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';

const PlayerBar = ({ isPlaying, setIsPlaying, audioRef, streamLoading, setStreamLoading }) => {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [minimized, setMinimized] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = audioRef?.current;
    if (!el) return;
    el.volume = volume;
  }, [audioRef, volume]);

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
      const next = !audioRef.current.muted;
      audioRef.current.muted = next;
      setMuted(next);
    }
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v > 0 && audioRef.current.muted) {
        audioRef.current.muted = false;
        setMuted(false);
      }
      if (v === 0) {
        audioRef.current.muted = true;
        setMuted(true);
      }
    }
  };

  const copyStreamUrl = async () => {
    const url = siteConfig.streamUrl;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-500 transform ${minimized ? 'translate-y-full' : 'translate-y-0'}`}>
      
      {/* Minimize Toggle Tab */}
      <button 
        type="button"
        onClick={() => setMinimized(!minimized)}
        aria-expanded={!minimized}
        aria-controls="radio-player-bar"
        className="absolute -top-10 right-8 bg-dark-900 border border-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-t-xl transition-colors flex items-center justify-center gap-2"
      >
        {minimized ? <Maximize2 size={16} aria-hidden /> : <Minimize2 size={16} aria-hidden />}
        <span className="text-xs uppercase font-bold tracking-wider">{minimized ? 'Show Player' : 'Hide Player'}</span>
      </button>

      {/* Main Bar */}
      <div
        id="radio-player-bar"
        role="region"
        aria-label="Live radio player"
        className="bg-dark-900/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 md:px-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      >
        
        {/* Track Info */}
        <div className="flex items-center gap-4 md:w-1/3 min-w-0">
          <div className={`relative w-12 h-12 rounded bg-dark-800 border border-white/10 flex-shrink-0 animate-pulse ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
            <img 
              src={siteConfig.host.image} 
              alt="" 
              className="w-full h-full object-cover rounded mix-blend-luminosity"
            />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-soca-red rounded-full animate-ping" aria-hidden />
            )}
          </div>
          <div className="hidden sm:flex flex-col overflow-hidden min-w-0">
            <span className="text-soca-yellow font-bold uppercase tracking-wider text-xs truncate">
              {siteConfig.radioName} {siteConfig.frequency}
            </span>
            <span className="text-slate-300 text-sm truncate font-medium">{siteConfig.liveLineTitle}</span>
          </div>
        </div>

        {/* Central Controls */}
        <div className="flex flex-col items-center justify-center md:w-1/3 relative">
          <button 
            type="button"
            onClick={togglePlay}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pause live stream' : 'Play live stream'}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-soca-red to-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 transition-transform"
          >
            {streamLoading ? (
              <Loader2 className="animate-spin" size={24} aria-hidden />
            ) : isPlaying ? (
              <Square size={20} fill="currentColor" aria-hidden />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" aria-hidden />
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

        {/* Secondary Controls (Volume + copy stream) */}
        <div className="flex items-center justify-end md:w-1/3 gap-3 md:gap-4 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-2 flex-1 md:flex-initial min-w-0 max-w-[200px] md:max-w-none">
            <label htmlFor="player-volume" className="sr-only">
              Volume
            </label>
            <input
              id="player-volume"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="w-full md:w-28 h-1.5 accent-soca-yellow bg-dark-800 rounded-full cursor-pointer"
            />
          </div>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="text-slate-400 hover:text-white transition-colors shrink-0"
          >
            {muted ? <VolumeX size={24} aria-hidden /> : <Volume2 size={24} aria-hidden />}
          </button>
          <button
            type="button"
            onClick={copyStreamUrl}
            aria-label="Copy stream URL to clipboard"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-soca-yellow hover:text-soca-yellow transition-colors shrink-0"
          >
            {copied ? <Check size={16} className="text-soca-green" aria-hidden /> : <Link2 size={16} aria-hidden />}
            {copied ? 'Copied' : 'Stream'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
