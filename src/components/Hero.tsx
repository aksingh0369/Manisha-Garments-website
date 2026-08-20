import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Scissors, Award, Gem } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { openCategoryShop } = useShop();

  return (
    <section className="relative w-full bg-[#F8F4EC] overflow-hidden pt-4 pb-12 sm:py-16 lg:py-20 border-b border-[#E9DED0]">
      {/* Subtle Background Ornament */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9DED0]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#651F29]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Content (approx 35-40% width on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            
            {/* Season Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mx-auto lg:mx-0"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E9DED0]/80 border border-[#B59658]/30 text-[#651F29] text-xs tracking-[0.2em] uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#B59658]" />
                Wedding & Festive Edition 2026
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-serif-luxury text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight text-[#171414] leading-[1.1]">
                THE ART OF <br />
                <span className="italic font-normal text-[#651F29]">INDIAN ELEGANCE</span>
              </h1>
              <div className="w-16 h-[1.5px] bg-[#B59658] mx-auto lg:mx-0 mt-3"></div>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#6F6660] text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Timeless ethnic wear for weddings, celebrations and every beautiful occasion. Discover handcrafted pure silks, bridal lehengas and festive family ensembles.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                id="hero-shop-collection-btn"
                onClick={() => openCategoryShop('All')}
                className="w-full sm:w-auto bg-[#651F29] text-[#F8F4EC] hover:bg-[#4A141C] px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group border border-[#B59658]/40 cursor-pointer"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4 text-[#B59658] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-new-btn"
                onClick={() => openCategoryShop('Sarees')}
                className="w-full sm:w-auto bg-transparent hover:bg-[#E9DED0]/60 text-[#171414] px-7 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 border border-[#171414]/30 hover:border-[#651F29] cursor-pointer"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </motion.div>

            {/* Trust Highlights Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-[#E9DED0] grid grid-cols-3 gap-4 text-center lg:text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#651F29]">
                  <Gem className="w-3.5 h-3.5 text-[#B59658]" />
                  <span className="text-xs font-bold font-serif-luxury uppercase tracking-wider">100% Authentic</span>
                </div>
                <p className="text-[11px] text-[#6F6660]">Pure Katan & Zari</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#651F29]">
                  <Scissors className="w-3.5 h-3.5 text-[#B59658]" />
                  <span className="text-xs font-bold font-serif-luxury uppercase tracking-wider">Custom Fit</span>
                </div>
                <p className="text-[11px] text-[#6F6660]">Master Tailoring</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#651F29]">
                  <Award className="w-3.5 h-3.5 text-[#B59658]" />
                  <span className="text-xs font-bold font-serif-luxury uppercase tracking-wider">Delhi Store</span>
                </div>
                <p className="text-[11px] text-[#6F6660]">Trusted Heritage</p>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Image (approx 60-65% visual prominence) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Outer Decorative Frame */}
              <div className="relative z-10 overflow-hidden shadow-2xl rounded-xs bg-[#E9DED0]">
                
                {/* Main Realistic Indian Fashion Photography */}
                <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
                    alt="Indian woman in royal maroon embroidered bridal silk saree with traditional jewellery"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                    loading="eager"
                  />
                  
                  {/* Subtle Luxury Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171414]/60 via-transparent to-transparent"></div>

                  {/* Floating Collection Card on Image */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm bg-[#F8F4EC]/95 backdrop-blur-md p-4 sm:p-5 border border-[#E9DED0] shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B59658] block">
                          Spotlight Ensemble
                        </span>
                        <h4 className="font-serif-luxury text-base sm:text-lg font-semibold text-[#171414] leading-snug">
                          Katan Silk Bridal Saree
                        </h4>
                        <p className="text-xs text-[#6F6660] mt-0.5">₹4,999 <span className="line-through text-[11px] text-[#6F6660]/70 ml-1">₹7,999</span></p>
                      </div>
                      <button
                        onClick={() => openCategoryShop('Sarees')}
                        className="px-3.5 py-2 bg-[#651F29] text-[#F8F4EC] text-[11px] font-bold tracking-wider uppercase hover:bg-[#8B0000] transition-colors shrink-0 cursor-pointer"
                      >
                        VIEW LOOK
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offset Gold Border Accent */}
              <div className="hidden sm:block absolute -inset-3 border border-[#B59658]/40 -z-0 pointer-events-none transform translate-x-2 translate-y-2"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
