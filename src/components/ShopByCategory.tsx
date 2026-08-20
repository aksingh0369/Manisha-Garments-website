import React from 'react';
import { categories } from '../data/categories';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ShopByCategory: React.FC = () => {
  const { openCategoryShop } = useShop();

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
            Curated Wardrobes
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <div className="w-12 h-[1px] bg-[#B59658] mx-auto my-2"></div>
          <p className="text-sm sm:text-base text-[#6F6660] font-light">
            Discover styles made for every celebration, crafted with timeless traditions.
          </p>
        </div>

        {/* 3-Column Desktop Grid / 2-Column Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => openCategoryShop(cat.categoryKey)}
              className="group relative overflow-hidden bg-[#E9DED0] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 rounded-xs flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171414]/80 via-[#171414]/20 to-transparent transition-opacity duration-300"></div>

                {/* Item Count Chip */}
                <div className="absolute top-3 right-3">
                  <span className="bg-[#F8F4EC]/90 text-[#171414] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 backdrop-blur-xs">
                    {cat.itemCount}+ Designs
                  </span>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] sm:text-xs text-[#E9DED0] uppercase tracking-[0.18em] font-medium block mb-1">
                    {cat.tagline}
                  </span>
                  
                  <h3 className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide text-[#FFFFFF] group-hover:text-[#F8F4EC] transition-colors">
                    {cat.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/20 group-hover:border-[#B59658] transition-colors">
                    <span className="text-xs sm:text-sm font-bold tracking-[0.15em] text-[#B59658] group-hover:text-white uppercase transition-colors">
                      SHOP NOW
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B59658] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
