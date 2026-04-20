import React from 'react';
import Hero from '../components/Hero';
import DedicationTicker from '../components/DedicationTicker';
import HostSpotlight from '../components/HostSpotlight';
import Schedule from '../components/Schedule';
import Contact from '../components/Contact';
import SupportSection from '../components/SupportSection';
import Footer from '../components/Footer';

const HomePage = ({ isPlaying, streamLoading, onTogglePlay }) => {
  return (
    <>
      <Hero
        isPlaying={isPlaying}
        streamLoading={streamLoading}
        onTogglePlay={onTogglePlay}
      />
      <DedicationTicker />
      <HostSpotlight />
      <Schedule />
      <Contact />
      <SupportSection />
      <Footer />
    </>
  );
};

export default HomePage;
