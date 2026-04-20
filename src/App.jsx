import React, { useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import PlayerBar from './components/PlayerBar';
import HomePage from './pages/HomePage';
import MediaPage from './pages/MediaPage';
import NewsPage from './pages/NewsPage';
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
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[100] h-px w-px overflow-hidden focus:left-4 focus:top-4 focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-lg focus:bg-soca-yellow focus:px-4 focus:py-2 focus:font-bold focus:text-dark-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>

      {/* Global Audio Element */}
      <audio 
        ref={audioRef} 
        src={siteConfig.streamUrl}
        playsInline
        preload="none"
      />

      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                isPlaying={isPlaying}
                streamLoading={streamLoading}
                onTogglePlay={toggleRadio}
              />
            )}
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </main>

      {/* Floating Action Button for Chat */}
      <button 
        type="button"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open live chat"
        className={`fixed bottom-24 right-6 w-14 h-14 bg-soca-red hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] z-40 transition-transform ${isChatOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={24} aria-hidden />
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
