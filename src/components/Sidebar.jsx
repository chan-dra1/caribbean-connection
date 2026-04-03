import React from 'react';
import { Radio, Video, Mic, Clock, Settings, Mic2, Tv } from 'lucide-react';
import { siteConfig } from '../data/config';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'live', icon: <Radio size={20} />, label: 'Live Stream' },
    { id: 'shows', icon: <Clock size={20} />, label: 'Schedule' },
    { id: 'youtube', icon: <Video size={20} />, label: 'YouTube Video', href: siteConfig.links.youtube },
    { id: 'podcast', icon: <Mic size={20} />, label: 'Podcasts', href: siteConfig.links.podcast },
  ];

  return (
    <aside className="w-64 h-full bg-dark-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col pt-10 pb-6 px-6 z-20">
      
      {/* Brand */}
      <div className="mb-12">
        <h1 className="text-2xl font-black text-teal-400 tracking-tighter uppercase flex items-center gap-2">
           <Mic2 className="text-emerald-400" />
           {siteConfig.radioName}
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-semibold tracking-wider font-mono">
           {siteConfig.frequency} - ON AIR
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <h3 className="text-xs uppercase text-slate-500 font-bold mb-4 tracking-widest pl-3">Studio Controls</h3>
        {menuItems.map((item) => (
          item.href ? (
            <a 
              key={item.id} 
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all w-full"
            >
              <span className="text-slate-400">{item.icon}</span>
              {item.label}
            </a>
          ) : (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-xl transition-all w-full text-left
                ${activeTab === item.id 
                  ? 'bg-teal-500/20 text-teal-300 shadow-[inset_2px_0_0_0_#14b8a6]' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <span className={activeTab === item.id ? 'text-teal-400' : 'text-slate-400'}>{item.icon}</span>
              {item.label}
            </button>
          )
        ))}
      </nav>

      {/* Footer / Newsletter */}
      <div className="mt-auto bg-dark-800/50 rounded-2xl p-5 border border-white/5">
        <h4 className="text-sm font-bold text-white mb-2">Weekly Updates</h4>
        <input 
          type="email" 
          placeholder="your@email.com" 
          className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-3 outline-none focus:border-teal-500 transition-colors"
        />
        <button className="w-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold py-2 rounded-lg transition-colors uppercase tracking-wider">
           Join Newsletter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
