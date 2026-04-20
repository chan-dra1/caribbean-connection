import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import DedicationTicker from '../components/DedicationTicker';
import HostSpotlight from '../components/HostSpotlight';
import Schedule from '../components/Schedule';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = ({ isPlaying, streamLoading, onTogglePlay }) => {
  const navigate = useNavigate();

  const jumpToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Hero
        isPlaying={isPlaying}
        streamLoading={streamLoading}
        onTogglePlay={onTogglePlay}
        onJumpToSection={jumpToSection}
        onOpenMedia={() => navigate('/media')}
      />
      <DedicationTicker />
      <HostSpotlight />
      <Schedule />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
