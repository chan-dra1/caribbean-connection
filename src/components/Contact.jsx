import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Twitter, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      title: "Studio Line",
      value: "(305) 523-9176",
      icon: Phone,
      color: "text-soca-red",
      bg: "bg-soca-red/10",
      href: "tel:3055239176"
    },
    {
      title: "Main Office / Text",
      value: "(305) 527-7664",
      icon: Phone,
      color: "text-soca-yellow",
      bg: "bg-soca-yellow/10",
      href: "tel:3055277664"
    },
    {
      title: "Email Us",
      value: "andrewsconnection@hotmail.com",
      icon: Mail,
      color: "text-soca-teal",
      bg: "bg-soca-teal/10",
      href: "mailto:andrewsconnection@hotmail.com"
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-dark-900 overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter"
          >
            Get In <span className="text-soca-teal">Touch</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg uppercase tracking-widest font-bold"
          >
            We Inform, We Enlighten & We Entertain
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={item.color} size={32} />
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                <p className="text-xl md:text-2xl font-black text-white tracking-tight">{item.value}</p>
              </motion.a>
            ))}

            {/* Facebook Card */}
            <motion.a
              href="https://www.facebook.com/caribbeanconnectionenterprises"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Facebook className="text-blue-500" size={32} />
              </div>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Connect</h3>
              <p className="text-xl md:text-2xl font-black text-white tracking-tight">Facebook</p>
            </motion.a>

            {/* Instagram Card */}
            <motion.a
              href="https://www.instagram.com/caribbeanconnectionusa/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-pink-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="text-pink-500" size={32} />
              </div>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Follow</h3>
              <p className="text-xl md:text-2xl font-black text-white tracking-tight">Instagram</p>
            </motion.a>

            {/* Twitter Card */}
            <motion.a
              href="https://twitter.com/caribconnectusa"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Twitter className="text-sky-500" size={32} />
              </div>
              <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Updates</h3>
              <p className="text-xl md:text-2xl font-black text-white tracking-tight">Twitter / X</p>
            </motion.a>
          </div>

          {/* Side Info / CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/5 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 bg-soca-red rounded-full flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                <Send className="text-white translate-x-0.5 -translate-y-0.5" size={32} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">LEAVE A MESSAGE</h3>
              <p className="text-slate-300 mb-8 leading-relaxed font-medium">
                Have a song request or a shoutout? Connect with us on social media or give us a call at the studio during our live hours!
              </p>
              <button 
                 onClick={() => window.location.href = 'mailto:andrewsconnection@hotmail.com'}
                 className="w-full py-4 bg-white text-dark-900 font-black rounded-2xl hover:bg-soca-yellow transition-colors uppercase tracking-widest text-sm shadow-xl"
              >
                Send Email
              </button>
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-soca-teal/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-soca-red/10 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
