import React, { useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DedicationTicker from './components/DedicationTicker';
import Schedule from './components/Schedule';
import HostSpotlight from './components/HostSpotlight';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import PlayerBar from './components/PlayerBar';
import { siteConfig } from './data/config';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamLoading, setStreamLoading] = useState(false);
  const audioRef = useRef(null);

  const toggleRadio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setStreamLoading(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStreamLoading(false);
      }).catch(err => {
        console.error("Audio play error:", err);
        setStreamLoading(false);
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-dark-900 text-slate-100 overflow-x-hidden font-sans">
      {/* Global Audio Element */}
      <audio 
        ref={audioRef} 
        src={siteConfig.streamUrl} 
      />

      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <Hero 
        isPlaying={isPlaying} 
        streamLoading={streamLoading} 
        onTogglePlay={toggleRadio} 
      />

      <DedicationTicker />
      <HostSpotlight />
      <Schedule />
      <Footer />

      {/* Floating Action Button for Chat */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-24 right-6 w-14 h-14 bg-soca-red hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] z-40 transition-transform ${isChatOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Slide-out Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Persistent Player Bar */}
      <PlayerBar 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        streamLoading={streamLoading}
        setStreamLoading={setStreamLoading}
      />
    </div>
  );
}

export default App;
