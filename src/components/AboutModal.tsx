import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, MapPin, Award, Users, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, openCategoryShop } = useShop();

  if (!isAboutOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          onClick={() => setIsAboutOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#171414] text-white flex items-center justify-between shrink-0 border-b border-[#B59658]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#651F29] rounded-xs flex items-center justify-center text-white font-serif text-sm font-bold border border-[#B59658]">
                M
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold tracking-wide text-white">
                  About Manisha Garments
                </h3>
                <span className="text-[11px] text-[#B59658] tracking-widest uppercase">
                  The Art of Indian Elegance
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="p-1.5 text-[#E9DED0] hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs text-[#171414] leading-relaxed">
            
            {/* Story intro */}
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658] block">
                Our Heritage & Ethos
              </span>
              <h4 className="font-serif-luxury text-2xl font-normal text-[#171414]">
                Weaving Timeless Traditions for Modern Celebrations
              </h4>
              <p className="text-[#6F6660] font-light text-sm">
                Founded with a passionate commitment to preserving India's royal textile legacies, 
                <strong> Manisha Garments</strong> is your trusted destination for handcrafted ethnic fashion. 
                From the timeless ghats of Varanasi and royal courts of Rajasthan to the looms of Chanderi and Kanchipuram, 
                we curate bridal lehengas, regal sarees, sharp gents kurtas, and charming kids festive attire that honor life's most precious milestones.
              </p>
            </div>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#F8F4EC] rounded-xs border border-[#E9DED0] space-y-2">
                <Award className="w-6 h-6 text-[#651F29]" />
                <h5 className="font-serif-luxury text-sm font-bold text-[#171414]">Artisanal Purity</h5>
                <p className="text-[#6F6660] text-[11px]">
                  Direct relationships with master handloom weavers ensure 100% authentic pure silks, katan weaves, and intricate zari detailing.
                </p>
              </div>

              <div className="p-4 bg-[#F8F4EC] rounded-xs border border-[#E9DED0] space-y-2">
                <Users className="w-6 h-6 text-[#B59658]" />
                <h5 className="font-serif-luxury text-sm font-bold text-[#171414]">10,000+ Happy Families</h5>
                <p className="text-[#6F6660] text-[11px]">
                  Generations of families in Delhi NCR and worldwide trust us to dress brides, grooms, and children for life’s grand celebrations.
                </p>
              </div>

              <div className="p-4 bg-[#F8F4EC] rounded-xs border border-[#E9DED0] space-y-2">
                <Heart className="w-6 h-6 text-[#651F29]" />
                <h5 className="font-serif-luxury text-sm font-bold text-[#171414]">Bespoke Tailoring</h5>
                <p className="text-[#6F6660] text-[11px]">
                  In-house master karigars provide custom blouse stitching, lehenga fittings, and personalized bridal adjustments.
                </p>
              </div>
            </div>

            {/* Flagship Showroom details */}
            <div className="p-5 bg-[#F8F4EC] border-l-4 border-[#651F29] rounded-xs space-y-2">
              <div className="flex items-center gap-2 font-serif-luxury text-base font-bold text-[#171414]">
                <MapPin className="w-4 h-4 text-[#651F29]" />
                <span>Visit Our Delhi Flagship Boutique</span>
              </div>
              <p className="text-[#6F6660]">
                Experience our extensive fabric vaults and try on bridal trousseaus in person at our flagship destination:
                <br />
                <strong className="text-[#171414] font-medium">Manisha Garments</strong>, B-8, Gali No. 4, Near Chockan Mandir, Saurabh Vihar, Jaitpur, Badarpur, New Delhi – 110044.
              </p>
            </div>

            {/* Call to action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E9DED0]">
              <span className="text-xs text-[#6F6660]">
                Have questions or need bridal recommendations?
              </span>
              <button
                onClick={() => {
                  setIsAboutOpen(false);
                  openCategoryShop('All');
                }}
                className="px-6 py-2.5 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                EXPLORE OUR CREATIONS
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
