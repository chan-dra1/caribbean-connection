import React, { useState, useEffect } from 'react';
import { Menu, X, Radio } from 'lucide-react';
import { siteConfig } from '../data/config';

const Navbar = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Host Spotlight", href: "#host" },
    { label: "Schedule", href: "#schedule" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-tr from-soca-red to-soca-yellow rounded-lg text-dark-900">
              <Radio size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-widest text-slate-100 uppercase">
              {siteConfig.radioName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-slate-300 hover:text-soca-yellow font-semibold tracking-wide transition-colors uppercase text-sm"
              >
                {link.label}
              </a>
            ))}
            
            <button 
              onClick={onOpenChat}
              className="px-6 py-2 bg-soca-red hover:bg-red-500 text-white font-bold rounded-full transition-transform hover:scale-105 uppercase text-sm tracking-wider shadow-lg shadow-red-500/30"
            >
              Live Chat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-slate-300 hover:text-soca-yellow font-semibold uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 mt-4 bg-soca-red hover:bg-red-500 text-white font-bold rounded-lg uppercase tracking-wider"
            >
              Live Chat
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
