import React from 'react';
import { Mail, MapPin, Radio, Globe } from 'lucide-react';
import { siteConfig } from '../data/config';

const Footer = () => {
  return (
    <footer className="bg-dark-950 pt-20 pb-36 px-4 border-t-2 border-white/5 relative z-10" id="footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-tr from-soca-red to-soca-yellow rounded-lg text-dark-900">
              <Radio size={28} strokeWidth={2.5} />
            </div>
            <h4 className="text-2xl font-black tracking-widest text-white uppercase">
              {siteConfig.radioName}
            </h4>
          </div>
          <p className="text-slate-400 mb-6 leading-relaxed">
             {siteConfig.tagline}. We are the premier station for Soca, Calypso, and Caribbean culture straight from South Florida.
          </p>
          <div className="flex flex-col gap-3 text-slate-300 font-medium tracking-wide">
            <p className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="text-soca-red" size={18}/> info@caribbeanconnectionusa.com
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="text-soca-yellow" size={18}/> South Florida, USA
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links / Shows */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-10 border-t border-white/10 md:border-t-0 pt-8 md:pt-0">
          <h5 className="font-black text-white mb-6 uppercase tracking-widest border-b-2 border-soca-teal pb-2 inline-block">Shows</h5>
          <div className="flex flex-col gap-4">
            <a href="#schedule" className="text-slate-400 hover:text-soca-yellow transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-soca-yellow" /> Saturday Vibes
            </a>
            <a href="#schedule" className="text-slate-400 hover:text-soca-teal transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-soca-teal" /> Sunday Smoothies
            </a>
            <a href="#host" className="text-slate-400 hover:text-soca-green transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2 mt-4">
              Host Spotlight
            </a>
          </div>
        </div>

        {/* Column 3: Social & Connect */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left border-t border-white/10 md:border-t-0 pt-8 md:pt-0">
          <h5 className="font-black text-white mb-6 uppercase tracking-widest border-b-2 border-soca-red pb-2 inline-block">Connect</h5>
          <div className="grid grid-cols-2 gap-4 w-full max-w-[250px]">
            <a href={siteConfig.links.facebook} className="flex items-center gap-3 p-3 bg-dark-900 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-[#1877F2]">
              <Globe size={18} /> Facebook
            </a>
            <a href={siteConfig.links.instagram} className="flex items-center gap-3 p-3 bg-dark-900 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-[#E4405F]">
              <Globe size={18} /> Instagram
            </a>
            <a href={siteConfig.links.twitter} className="flex items-center gap-3 p-3 bg-dark-900 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-[#1DA1F2]">
              <Globe size={18} /> Twitter
            </a>
            <a href={siteConfig.links.youtube} className="flex items-center gap-3 p-3 bg-dark-900 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-[#FF0000]">
              <Globe size={18} /> YouTube
            </a>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto text-center border-t border-white/10 pt-8 text-slate-500 text-sm font-bold tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} {siteConfig.radioName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
