import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';

export const PromoBanner: React.FC = () => {
  const { openCategoryShop } = useShop();

  return (
    <section className="py-12 sm:py-16 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#651F29] text-[#F8F4EC] p-8 sm:p-12 lg:p-16 overflow-hidden rounded-xs border border-[#B59658]/40 shadow-xl"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B59658]/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#171414]/30 rounded-full blur-xl pointer-events-none -ml-10 -mb-10"></div>

          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B59658]/60 pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#B59658]/60 pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#B59658]/60 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B59658]/60 pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#B59658]/20 border border-[#B59658]/50 rounded-full text-xs font-bold tracking-[0.2em] text-[#E9DED0] uppercase">
              <Tag className="w-3.5 h-3.5 text-[#B59658]" />
              Limited Festive Special Offer
            </div>

            {/* Headline */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              STYLE FOR EVERY <span className="italic font-normal text-[#B59658]">CELEBRATION</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#E9DED0] text-sm sm:text-base font-light max-w-lg mx-auto">
              Beautiful ethnic wear at prices you'll love. Discover exquisite handloom sarees, flared festive lehengas, and gent’s sets starting at just ₹2,499.
            </p>

            {/* Coupon Callout */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="text-xs text-[#E9DED0]">Use Code:</span>
              <span className="bg-[#4A141C] border border-[#B59658] px-3 py-1 font-mono text-xs font-bold text-[#B59658] tracking-widest">
                FESTIVE10
              </span>
              <span className="text-xs text-[#E9DED0]">for Flat 10% Extra Off</span>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                id="promo-shop-now-btn"
                onClick={() => openCategoryShop('All')}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B59658] hover:bg-[#967B44] text-[#171414] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-[#171414] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
