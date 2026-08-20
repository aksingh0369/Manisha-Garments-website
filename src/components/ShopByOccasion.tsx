import React from 'react';
import { occasions } from '../data/occasions';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const ShopByOccasion: React.FC = () => {
  const { openOccasionShop } = useShop();

  return (
    <section className="py-14 sm:py-20 bg-[#E9DED0]/40 border-y border-[#E9DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Celebrate Every Moment
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
              SHOP BY OCCASION
            </h2>
            <div className="w-12 h-[1.5px] bg-[#651F29]"></div>
          </div>
          <p className="text-sm text-[#6F6660] max-w-md font-light">
            From regal wedding mandaps to vibrant Diwali gatherings, find the ensemble crafted specifically for your milestone event.
          </p>
        </div>

        {/* 4 Large Visual Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {occasions.map((occ, index) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openOccasionShop(occ.occasionKey)}
              className="group relative overflow-hidden bg-[#171414] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 rounded-xs aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={occ.image}
                alt={occ.name}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171414] via-[#171414]/40 to-transparent"></div>

              {/* Gold Framing Border on Hover */}
              <div className="absolute inset-3 border border-[#B59658]/0 group-hover:border-[#B59658]/70 transition-all duration-500 pointer-events-none"></div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B59658] font-bold">
                  {occ.outfitCount}+ Looks
                </span>
                
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white mt-1 mb-1.5 group-hover:text-[#F8F4EC] transition-colors">
                  {occ.name}
                </h3>

                <p className="text-xs text-[#E9DED0] font-light line-clamp-2 leading-relaxed mb-3">
                  {occ.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#B59658] uppercase">
                  <span>Explore Outfits</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
