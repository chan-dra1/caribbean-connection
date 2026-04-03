import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';
import { siteConfig } from '../data/config';

const DedicationTicker = () => {
  return (
    <div className="bg-soca-teal text-dark-900 py-3 relative z-20 flex overflow-hidden border-b-4 border-dark-900 shadow-md">
      
      {/* Static Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-soca-teal px-4 md:px-8 flex items-center justify-center font-black uppercase tracking-widest shadow-[10px_0_20px_rgba(20,184,166,1)]">
        <MessageSquareQuote size={20} className="mr-2" />
        <span className="hidden sm:inline">Shoutouts</span>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-1 overflow-hidden ml-12 sm:ml-40 pr-4">
        <motion.div 
          className="flex whitespace-nowrap items-center font-bold tracking-wider uppercase text-sm"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {siteConfig.dedications.map((text, i) => (
            <React.Fragment key={i}>
              <span className="mx-8">{text}</span>
              <span className="w-2 h-2 rounded-full bg-dark-900/50 mx-4" />
            </React.Fragment>
          ))}
          {/* Double map for seamless loop */}
          {siteConfig.dedications.map((text, i) => (
            <React.Fragment key={`repeat-${i}`}>
              <span className="mx-8">{text}</span>
              <span className="w-2 h-2 rounded-full bg-dark-900/50 mx-4" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default DedicationTicker;
