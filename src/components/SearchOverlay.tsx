import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { Search, X, ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, openCategoryShop } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  const popularSearches = ['Sarees', 'Lehengas', 'Wedding Wear', 'Kids Wear', 'Festive Wear', 'Silk Kurta'];

  const searchResults = searchTerm.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.occasion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="min-h-screen bg-[#F8F4EC] text-[#171414] px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between border-b border-[#E9DED0] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#651F29] rounded-xs flex items-center justify-center text-white font-serif text-xs font-bold">
                  M
                </div>
                <span className="font-brand text-sm font-bold tracking-[0.15em] text-[#651F29]">
                  MANISHA GARMENTS
                </span>
              </div>

              <button
                id="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-[#171414] hover:text-[#651F29] hover:bg-[#E9DED0] rounded-full transition-colors cursor-pointer"
                title="Close Search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large Search Input */}
            <div className="relative">
              <Search className="w-6 h-6 text-[#B59658] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                id="main-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What are you looking for? (e.g. Silk Saree, Bridal Lehenga, Kurta...)"
                className="w-full pl-14 pr-12 py-5 bg-white border-2 border-[#E9DED0] focus:border-[#651F29] text-base sm:text-lg text-[#171414] placeholder-[#6F6660]/70 rounded-xs shadow-md focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6F6660] hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular Searches Chips */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6F6660]">
                <Sparkles className="w-3.5 h-3.5 text-[#B59658]" />
                <span>Popular Searches:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchTerm(term);
                    }}
                    className="px-4 py-2 bg-white hover:bg-[#651F29] hover:text-white border border-[#E9DED0] rounded-full text-xs font-medium tracking-wide transition-all shadow-2xs cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Results */}
            {searchTerm.trim().length > 1 && (
              <div className="space-y-4 pt-4 border-t border-[#E9DED0]">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#171414]">
                    Matching Outfits ({searchResults.length})
                  </h3>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-8 text-center bg-white border border-[#E9DED0] rounded-xs space-y-2">
                    <p className="text-sm text-[#6F6660]">
                      No exact results found for "{searchTerm}".
                    </p>
                    <p className="text-xs text-[#B59658]">
                      Try searching by general terms like "Saree", "Lehenga", or "Gents".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          openProductDetail(product);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 bg-white border border-[#E9DED0] hover:border-[#651F29] transition-all rounded-xs cursor-pointer shadow-2xs group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-20 object-cover rounded-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#B59658] uppercase font-bold tracking-wider block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-serif-luxury font-semibold text-[#171414] group-hover:text-[#651F29] truncate">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-bold text-[#171414]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-[10px] text-[#6F6660] line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B59658] group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
