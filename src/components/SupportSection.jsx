import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart } from 'lucide-react';
import { siteConfig } from '../data/config';

const paymentIconBase = `${import.meta.env.BASE_URL}payment-icons`;

const PaymentBrandIcon = ({ src, title }) => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 p-1.5 ring-1 ring-white/10" title={title}>
    <img src={src} alt="" className="h-full w-full object-contain brightness-0 invert opacity-95" />
  </span>
);

const SupportSection = () => {
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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                <div className="flex items-center gap-3 mb-2">
                  <PaymentBrandIcon src={`${paymentIconBase}/zelle.svg`} title="Zelle" />
                  <span className="font-black text-white uppercase text-sm">Zelle</span>
                </div>
                <p className="text-slate-300 text-xs tracking-wide">{support.zelleLabel}</p>
              </a>

              <a
                href={support.paypalLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border border-white/10 bg-dark-900 hover:border-soca-teal transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <PaymentBrandIcon src={`${paymentIconBase}/paypal.svg`} title="PayPal" />
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
                <div className="flex items-center gap-3 mb-2">
                  <PaymentBrandIcon src={`${paymentIconBase}/cashapp.svg`} title="Cash App" />
                  <span className="font-black text-white uppercase text-sm">Cash App</span>
                </div>
                <p className="text-slate-300 text-xs">
                  <span className="font-semibold text-green-400">{support.cashappCashtag}</span>
                  <span className="text-slate-400"> · </span>
                  Send on Cash App
                </p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
