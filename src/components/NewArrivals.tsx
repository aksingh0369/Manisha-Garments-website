import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const NewArrivals: React.FC = () => {
  const { openCategoryShop } = useShop();
  const [selectedTab, setSelectedTab] = useState<string>('All');

  const tabs = ['All', 'Sarees', 'Lehengas', 'Gents Wear', 'Kids Wear', 'Girls Wear'];

  const filteredProducts = products.filter((p) => {
    if (selectedTab === 'All') return true;
    return p.category === selectedTab;
  });

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#651F29] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B59658]" />
            Season Highlights
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
            NEW ARRIVALS
          </h2>
          <div className="w-12 h-[1px] bg-[#B59658] mx-auto my-2"></div>
          <p className="text-sm sm:text-base text-[#6F6660] font-light">
            Fresh styles, beautiful fabrics and new-season favourites crafted with authentic handlooms and royal zardozi.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`tab-filter-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full cursor-pointer ${
                selectedTab === tab
                  ? 'bg-[#651F29] text-[#F8F4EC] shadow-xs'
                  : 'bg-[#E9DED0]/60 text-[#171414] hover:bg-[#E9DED0] hover:text-[#651F29]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: Desktop 4 cols, Tablet 3 cols, Mobile 2 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="text-center mt-10 sm:mt-14">
          <button
            id="view-all-new-arrivals-btn"
            onClick={() => openCategoryShop('All')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#651F29] text-[#651F29] hover:bg-[#651F29] hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
