import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedCollection: React.FC = () => {
  const { openCategoryShop } = useShop();

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#171414] text-white overflow-hidden">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=2000&q=85"
          alt="Royal Indian Wedding Collection Editorial"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171414] via-[#171414]/80 to-[#171414]/60"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent to-[#171414]/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#651F29]/80 border border-[#B59658]/40 rounded-full text-xs font-bold tracking-[0.25em] text-[#E9DED0] uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B59658]" />
            Exclusive Bridal & Groom Trousseau
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
              THE <span className="italic font-normal text-[#B59658]">WEDDING EDIT</span>
            </h2>
            <div className="w-20 h-[1.5px] bg-[#B59658]"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#E9DED0] text-base sm:text-lg font-light leading-relaxed"
          >
            Celebrate every unforgettable moment in timeless Indian style. Featuring handcrafted crimson bridal lehengas, Kadwa zari Banarasi sarees, and pure jacquard groom sherwanis.
          </motion.p>

          {/* Features Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#E9DED0]"
          >
            <div className="border-l-2 border-[#B59658] pl-3">
              <span className="font-bold text-white block">Custom Stitching</span>
              <span className="text-[11px] text-[#A89F91]">Master Tailoring</span>
            </div>
            <div className="border-l-2 border-[#B59658] pl-3">
              <span className="font-bold text-white block">Pure Silk & Zardozi</span>
              <span className="text-[11px] text-[#A89F91]">Certified Handloom</span>
            </div>
            <div className="border-l-2 border-[#B59658] pl-3 col-span-2 sm:col-span-1">
              <span className="font-bold text-white block">Video Shopping</span>
              <span className="text-[11px] text-[#A89F91]">Live on WhatsApp</span>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <button
              id="featured-wedding-collection-btn"
              onClick={() => openCategoryShop('Wedding')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#651F29] text-[#F8F4EC] hover:bg-[#8B0000] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl border border-[#B59658]/50 group cursor-pointer"
            >
              <span>SHOP WEDDING COLLECTION</span>
              <ArrowRight className="w-4 h-4 text-[#B59658] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
