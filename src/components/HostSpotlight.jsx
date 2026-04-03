import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Mic2, Radio, Award } from 'lucide-react';

const HostSpotlight = () => {
  return (
    <section id="host" className="py-24 bg-dark-800 relative z-10 overflow-hidden border-t-8 border-t-soca-green">
      
      {/* Decorative Text */}
      <h2 className="absolute top-10 left-[-5%] text-[150px] font-black uppercase text-white/5 whitespace-nowrap z-0 pointer-events-none">
        The Voice
      </h2>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Host Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Backing shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-soca-red to-soca-yellow rounded-full blur-3xl opacity-20 transform -translate-y-4" />
              
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-soca-yellow shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                <img 
                  src={siteConfig.host.image} 
                  alt={siteConfig.host.name} 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent mix-blend-multiply" />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-4 -right-4 bg-dark-900 border border-white/10 glass px-6 py-3 shadow-xl rounded-full flex items-center gap-3">
                <div className="w-3 h-3 bg-soca-red rounded-full animate-ping" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-100">Live Every Weekend</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h4 className="text-soca-teal font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
              <Mic2 size={16} /> Host Spotlight
            </h4>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              {siteConfig.host.name}
            </h2>
            
            <h3 className="text-2xl text-soca-yellow font-bold uppercase tracking-wider mb-6">
              {siteConfig.host.role}
            </h3>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {siteConfig.host.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-dark-900 p-6 rounded border border-white/5 flex gap-4 items-start hover:border-soca-red/50 transition-colors">
                <Radio className="text-soca-red mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">Authentic Mix</h4>
                  <p className="text-sm text-slate-400">Soca, Calypso, Reggae & Caribbean Jazz</p>
                </div>
              </div>

              <div className="bg-dark-900 p-6 rounded border border-white/5 flex gap-4 items-start hover:border-soca-yellow/50 transition-colors">
                <Award className="text-soca-yellow mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider mb-1">Award Winning</h4>
                  <p className="text-sm text-slate-400">Voted Best AM Radio Personality</p>
                </div>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HostSpotlight;
