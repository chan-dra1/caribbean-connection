import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../data/config';
import logoImage from '../assets/cropped-heavy-Rolla-2.png';

const Navbar = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionLinks = [
    { label: 'Home', sectionId: 'top' },
    { label: 'Host', sectionId: 'host' },
    { label: 'Schedule', sectionId: 'schedule' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const jumpToSection = (sectionId) => {
    const scrollTarget = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollTarget, 80);
      return;
    }

    scrollTarget();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1 bg-gradient-to-tr from-soca-red to-soca-yellow rounded-lg">
              <img
                src={logoImage}
                alt="Caribbean Connection logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-widest text-slate-100 uppercase">
              {siteConfig.radioName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sectionLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => jumpToSection(link.sectionId)}
                className="text-slate-300 hover:text-soca-yellow font-semibold tracking-wide transition-colors uppercase text-sm"
              >
                {link.label}
              </button>
            ))}

            <NavLink
              to="/news"
              className={({ isActive }) => `font-semibold tracking-wide transition-colors uppercase text-sm ${isActive ? 'text-soca-yellow' : 'text-slate-300 hover:text-soca-yellow'}`}
            >
              News
            </NavLink>

            <NavLink
              to="/media"
              className={({ isActive }) => `font-semibold tracking-wide transition-colors uppercase text-sm ${isActive ? 'text-soca-yellow' : 'text-slate-300 hover:text-soca-yellow'}`}
            >
              Media
            </NavLink>

            <button 
              type="button"
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
            {sectionLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => {
                  jumpToSection(link.sectionId);
                  setMobileMenuOpen(false);
                }}
                className="text-lg text-slate-300 hover:text-soca-yellow font-semibold uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
            <NavLink
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-lg font-semibold uppercase tracking-wider ${isActive ? 'text-soca-yellow' : 'text-slate-300 hover:text-soca-yellow'}`}
            >
              News
            </NavLink>
            <NavLink
              to="/media"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `text-lg font-semibold uppercase tracking-wider ${isActive ? 'text-soca-yellow' : 'text-slate-300 hover:text-soca-yellow'}`}
            >
              Media
            </NavLink>
            <button 
              type="button"
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
