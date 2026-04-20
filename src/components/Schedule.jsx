import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Music, Timer } from 'lucide-react';
import { siteConfig } from '../data/config';
import bgImage from '../assets/max-van-den-oetelaar-5d5p6_F3haw-unsplash-scaled.jpg';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Calculate seconds until the next show in EST
const getNextShowSeconds = () => {
  const now = new Date();
  
  // Get components of current time in America/New_York
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    weekday: 'short',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
  });

  const parts = formatter.formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  // Create a Date object that "looks" like the current time in EST
  // This is for easier comparison logic (math stays consistent)
  const estNow = new Date(
    parseInt(parts.year),
    parseInt(parts.month) - 1,
    parseInt(parts.day),
    parseInt(parts.hour),
    parseInt(parts.minute),
    parseInt(parts.second)
  );
  
  const day = estNow.getDay();
  const hour = estNow.getHours();
  
  let target = new Date(estNow);
  target.setMinutes(0, 0, 0);
  
  // SATURDAY: 12 PM - 3 PM (12:00 - 15:00)
  // SUNDAY: 5 PM - 7 PM (17:00 - 19:00)

  if (day === 6) { // Saturday
    if (hour < 12) {
      target.setHours(12);
    } else if (hour >= 12 && hour < 15) {
      return 0; // LIVE
    } else {
      // It's after 3 PM Sat -> Next target is Sunday 5 PM
      target.setDate(target.getDate() + 1);
      target.setHours(17);
    }
  } else if (day === 0) { // Sunday
    if (hour < 17) {
      target.setHours(17);
    } else if (hour >= 17 && hour < 19) {
      return 0; // LIVE
    } else {
      // It's after 7 PM Sun -> Next target is next Saturday 12 PM
      target.setDate(target.getDate() + 6);
      target.setHours(12);
    }
  } else { // Monday - Friday
    const daysToSaturday = (6 - day + 7) % 7;
    target.setDate(target.getDate() + daysToSaturday);
    target.setHours(12);
  }
  
  return Math.max(0, Math.floor((target.getTime() - estNow.getTime()) / 1000));
};

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isLive: false });

  useEffect(() => {
    const updateTimer = () => {
      const totalSeconds = getNextShowSeconds();
      
      if (totalSeconds === 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }
      
      // Calculate days to display correctly in hours if > 24
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      setTimeLeft({ hours, minutes, seconds, isLive: false });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

const Schedule = () => {
  const timeLeft = useCountdown();

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-dark-900 border-t-4 border-t-soca-yellow" id="schedule">
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] bg-cover bg-center h-full mix-blend-color-dodge"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header section with Countdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter"
            >
              Weekend <span className="text-soca-teal">Lineup</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg uppercase tracking-widest font-bold"
            >
              The party starts every weekend
            </motion.p>
          </div>

          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-dark-800 p-4 rounded-2xl border border-white/10 shadow-2xl"
          >
            {timeLeft.isLive ? (
              <div className="flex items-center justify-center gap-4 px-2 py-1">
                <div className="flex items-center justify-center w-12 h-12 bg-soca-red rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse">
                  <Music className="text-white" size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-black font-mono text-soca-red tracking-tighter uppercase animate-pulse">
                  LIVE NOW
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center w-12 h-12 bg-soca-red rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <Timer className="text-white" size={24} />
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black font-mono text-soca-yellow tracking-tighter">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Hrs</div>
                  </div>
                  <div className="text-3xl font-black text-slate-700">:</div>
                  <div>
                    <div className="text-3xl font-black font-mono text-soca-yellow tracking-tighter">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Min</div>
                  </div>
                  <div className="text-3xl font-black text-slate-700">:</div>
                  <div className="w-12 text-left">
                    <div className="text-3xl font-black font-mono text-soca-red tracking-tighter">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Sec</div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Schedule Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(siteConfig.schedule).map(([day, show], idx) => {
             const isSat = day === 'saturday';
             const themeColor = isSat ? 'from-soca-yellow to-soca-red' : 'from-soca-teal to-soca-green';
             const textHighlight = isSat ? 'text-soca-yellow' : 'text-soca-teal';
             
             return (
              <motion.div key={day} variants={cardVariants} className="group relative overflow-hidden rounded-3xl bg-dark-800 border border-white/5 shadow-2xl hover:border-white/10 transition-colors">
                
                {/* Accent Header */}
                <div className={`h-2 w-full bg-gradient-to-r ${themeColor}`} />
                
                <div className="p-8 pb-10">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-5xl font-black text-white/10 uppercase tracking-tighter group-hover:text-white/20 transition-colors">
                      {day}
                    </h3>
                    <div className={`p-4 rounded-full bg-dark-900 border border-white/5`}>
                      {isSat ? <Music className="text-soca-yellow" size={28} /> : <Calendar className="text-soca-teal" size={28} />}
                    </div>
                  </div>
                  
                  <h4 className="text-3xl font-bold mb-3 text-white">
                    {show.showName}
                  </h4>
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/50 border border-white/5 ${textHighlight} text-sm font-bold tracking-wider mb-6`}>
                    <Clock size={16} /> {show.time}
                  </div>
                  
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {show.description}
                  </p>
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tr ${themeColor} rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none`} />
              </motion.div>
             );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
