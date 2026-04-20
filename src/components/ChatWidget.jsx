import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/config';

const ChatWidget = ({ isOpen, onClose }) => {
  const { chatEmbedUrl } = siteConfig.support;

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: isOpen ? 0 : '100%', opacity: isOpen ? 1 : 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-dark-950 flex flex-col z-50 shadow-2xl border-l border-white/5"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
       {/* Glassmorphism Backdrop Overlay for the specific drawer */}
       <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-3xl -z-10" />

       {/* Header */}
       <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-dark-800/20 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-soca-teal/20 flex items-center justify-center border border-soca-teal/30">
               <MessageCircle className="text-soca-teal" size={20} />
             </div>
             <div>
                <h3 className="text-white font-black text-sm uppercase tracking-wider">Live Shoutouts</h3>
                <p className="text-[10px] text-soca-teal font-bold uppercase tracking-tighter">Real-time Caribbean Chat</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={chatEmbedUrl} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-soca-teal transition-colors"
              title="Open in new window"
            >
              <ExternalLink size={18} />
            </a>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
       </div>

       {/* Iframe Content */}
       <div className="flex-1 bg-white relative">
          <iframe 
            src={chatEmbedUrl}
            title="Caribbean Connection Shoutbox"
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media"
          />
          
          {/* Subtle overlay to soften the iframe integration if needed */}
          <div className="absolute inset-0 pointer-events-none border-x-4 border-dark-950/20" />
       </div>

       {/* Footer Branding */}
       <div className="p-4 bg-dark-900 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
            Home of Caribbean Music & Culture
          </p>
       </div>
    </motion.div>
  );
};

export default ChatWidget;
