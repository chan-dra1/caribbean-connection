import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatWidget from './ChatWidget';
import InteractiveDial from './InteractiveDial';
import { siteConfig } from '../data/config';
import bgImage from '../assets/studio_bg.png';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="flex h-screen w-full bg-dark-950 overflow-hidden font-sans relative">
      
      {/* Background Image with Global Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-dark-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/60 to-dark-950/90" />
      </div>

      {/* Main Layout Grid */}
      <div className="flex relative z-10 w-full h-full text-white">
        
        {/* Left Sidebar Menu */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Center Stage Arena */}
        <main className="flex-1 relative overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'live' && (
              <motion.div 
                key="live"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full w-full"
              >
                <InteractiveDial />
              </motion.div>
            )}

            {activeTab === 'shows' && (
              <motion.div 
                key="shows"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full w-full p-12 md:p-24 overflow-y-auto backdrop-blur-md bg-dark-900/50"
              >
                <h2 className="text-5xl font-black mb-12 tracking-tighter text-teal-400">Broadcasting Schedule</h2>
                <div className="grid gap-6 max-w-4xl">
                  {siteConfig.shows.map((show, idx) => (
                    <div key={show.id} className="bg-dark-800/80 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-dark-800 transition-colors">
                       <div className="text-teal-400 font-black text-2xl tracking-tight md:w-64 shrink-0">
                         {show.time}
                       </div>
                       <div>
                         <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">{show.genre}</span>
                         <h3 className="text-2xl font-bold text-white mb-2">{show.name}</h3>
                         <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{show.description}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Right Chat Widget */}
        <ChatWidget />

      </div>
    </div>
  );
};

export default DashboardLayout;
