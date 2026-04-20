import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, HandHeart, Wallet, DollarSign } from 'lucide-react';
import { siteConfig } from '../data/config';

const SupportSection = ({ onOpenChat }) => {
  const { support } = siteConfig;

  return (
    <section className="py-24 relative z-10 bg-dark-950 border-t border-white/10" id="support">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-3 uppercase tracking-tighter"
          >
            Support <span className="text-soca-yellow">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-300 text-lg max-w-3xl mx-auto"
          >
            {support.headline}. {support.subtext}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-dark-800 border border-white/10 p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-soca-teal" size={24} />
              <h3 className="text-2xl font-black text-white uppercase tracking-wide">Live Chat</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Join the conversation during the show, send shoutouts, and request your favorite tracks.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenChat}
                className="px-5 py-3 bg-soca-red hover:bg-red-500 text-white font-bold rounded-full transition-colors"
              >
                Open Website Chat
              </button>
              <a
                href={support.liveChatLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={support.liveChatLinks.messenger}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-colors"
              >
                Messenger
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-dark-800 border border-white/10 p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <HandHeart className="text-soca-yellow" size={24} />
              <h3 className="text-2xl font-black text-white uppercase tracking-wide">Donate</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Love the show? Your support helps keep us live on air and growing the Caribbean community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={support.zelleLink}
                className="p-4 rounded-2xl border border-white/10 bg-dark-900 hover:border-soca-yellow transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="text-soca-yellow" size={18} />
                  <span className="font-black text-white uppercase text-sm">Zelle</span>
                </div>
                <p className="text-slate-300 text-xs break-all">{support.zelleLabel}</p>
              </a>

              <a
                href={support.paypalLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border border-white/10 bg-dark-900 hover:border-soca-teal transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-soca-teal" size={18} />
                  <span className="font-black text-white uppercase text-sm">PayPal</span>
                </div>
                <p className="text-slate-300 text-xs">Send support via PayPal</p>
              </a>

              <a
                href={support.cashappLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border border-white/10 bg-dark-900 hover:border-green-400 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="text-green-400" size={18} />
                  <span className="font-black text-white uppercase text-sm">Cash App</span>
                </div>
                <p className="text-slate-300 text-xs">Support with Cash App</p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
