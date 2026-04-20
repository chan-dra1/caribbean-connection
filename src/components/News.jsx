import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Tv, Briefcase, Globe, ExternalLink } from 'lucide-react';
import bgImage from '../assets/max-van-den-oetelaar-5d5p6_F3haw-unsplash-scaled.jpg';
import { siteConfig } from '../data/config';

const iconMap = {
  Newspaper,
  Tv,
  Briefcase,
  Globe,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const News = () => {
  const newsLinks = siteConfig.newsLinks.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || Globe,
  }));

  return (
    <section className="py-24 relative z-10 bg-dark-950 border-t-4 border-t-soca-red overflow-hidden" id="news">
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] bg-cover bg-center h-full mix-blend-color-dodge grayscale"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter"
          >
            Caribbean <span className="text-soca-red">News</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg uppercase tracking-widest font-bold"
          >
            Stay Informed, Enlightened & Entertained
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {newsLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className="group relative block bg-dark-800 rounded-3xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${link.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-4 rounded-2xl bg-dark-900 border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <Icon className={link.textColor} size={32} />
                  </div>
                  <ExternalLink className="text-white/20 group-hover:text-white/80 transition-colors" size={20} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {link.title}
                  </h3>
                  <p className={`text-sm font-semibold ${link.textColor} uppercase tracking-wider mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {link.source}
                  </p>
                  
                  <div className="text-slate-400 text-sm font-medium flex items-center gap-2 group-hover:text-white transition-colors">
                    Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Subtle Glow inside card */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tr ${link.color} rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default News;
