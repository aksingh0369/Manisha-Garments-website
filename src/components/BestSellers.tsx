import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Flame, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const BestSellers: React.FC = () => {
  const { openCategoryShop } = useShop();

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#651F29]" />
              Most Loved By Customers
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
              BEST SELLERS
            </h2>
            <div className="w-12 h-[1.5px] bg-[#651F29]"></div>
          </div>
          
          <button
            id="view-all-bestsellers-btn"
            onClick={() => openCategoryShop('All')}
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] text-[#651F29] hover:text-[#8B0000] uppercase self-start md:self-auto cursor-pointer"
          >
            <span>Explore All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellerProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
