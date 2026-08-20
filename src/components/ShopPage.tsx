import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShopPage: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedOccasion, 
    setSelectedOccasion 
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-low' | 'price-high' | 'best-selling'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options definitions
  const allCategories = ['All', 'Sarees', 'Lehengas', 'Kids Wear', 'Girls Wear', 'Gents Wear', 'Wedding', 'Festive'];
  const allOccasions = ['All', 'Wedding', 'Festive', 'Party', 'Traditional'];
  const allSizes = ['Free Size (5.5m + 0.8m Blouse)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)', 'Semi-Stitched', 'Custom Made to Measure', '4-5 Years', '6-7 Years', '8-9 Years', '10-12 Years'];
  const allColors = [
    { name: 'Maroon', hex: '#651F29' },
    { name: 'Royal Blue', hex: '#1E3A8A' },
    { name: 'Emerald Green', hex: '#064E3B' },
    { name: 'Pastel Pink', hex: '#FBCFE8' },
    { name: 'Ivory Cream', hex: '#FDFBF7' },
    { name: 'Gold / Mustard', hex: '#D97706' },
    { name: 'Deep Wine', hex: '#581C87' },
    { name: 'Bridal Red', hex: '#991B1B' }
  ];
  const allFabrics = ['Pure Katan Silk', 'Raw Silk', 'Banarasi Georgette', 'Chanderi Silk', 'Micro Velvet', 'Cotton Silk Blend', 'Net with Cotton Lining', 'Jacquard Brocade'];

  // Toggle filter helper
  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setMaxPrice(30000);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedOccasion !== 'All' || 
    selectedSizes.length > 0 || 
    selectedColors.length > 0 || 
    selectedFabrics.length > 0 || 
    maxPrice < 30000 ||
    searchQuery.trim().length > 0;

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // Size filter
      if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) {
        return false;
      }
      // Color filter
      if (selectedColors.length > 0) {
        const matchesColor = p.colors.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!matchesColor) return false;
      }
      // Fabric filter
      if (selectedFabrics.length > 0) {
        const matchesFabric = selectedFabrics.some(f => p.fabric.toLowerCase().includes(f.toLowerCase()));
        if (!matchesFabric) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q) || 
          p.fabric.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return b.rating - a.rating; // recommended default
    });
  }, [selectedCategory, selectedOccasion, selectedSizes, selectedColors, selectedFabrics, maxPrice, sortBy, searchQuery]);

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
            The Manisha Garments Catalog
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171414] tracking-tight">
            {selectedCategory === 'All' ? 'ALL COLLECTIONS' : selectedCategory.toUpperCase()}
          </h1>
          <div className="w-12 h-[1.5px] bg-[#651F29] mx-auto my-2"></div>
          <p className="text-xs sm:text-sm text-[#6F6660] font-light">
            Browse our curated assortment of genuine handloom sarees, bespoke lehengas, and festive wear.
          </p>
        </div>

        {/* Top Control Bar: Search, Item Count, Sort By & Mobile Filter Trigger */}
        <div className="bg-white border border-[#E9DED0] p-4 mb-8 rounded-xs shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search within collection */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6F6660] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in collection..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6F6660]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs text-[#6F6660] font-medium hidden md:block">
            Showing <span className="font-bold text-[#171414]">{filteredProducts.length}</span> Designs
          </div>

          {/* Controls: Mobile Filter Button + Sort Dropdown */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button
              id="mobile-filter-open-btn"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#651F29] text-white text-xs font-bold tracking-wider uppercase rounded-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6F6660] hidden sm:inline whitespace-nowrap">Sort By:</span>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#F8F4EC] border border-[#E9DED0] text-xs font-semibold text-[#171414] focus:outline-none focus:border-[#651F29] rounded-xs cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-[#6F6660] font-medium text-[11px] uppercase tracking-wider">Active Filters:</span>
            
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#651F29] text-[#651F29] font-medium rounded-xs">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-black">×</button>
              </span>
            )}

            {selectedOccasion !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#651F29] text-[#651F29] font-medium rounded-xs">
                Occasion: {selectedOccasion}
                <button onClick={() => setSelectedOccasion('All')} className="hover:text-black">×</button>
              </span>
            )}

            {selectedSizes.map(s => (
              <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E9DED0] text-[#171414] rounded-xs">
                Size: {s}
                <button onClick={() => toggleItem(selectedSizes, setSelectedSizes, s)} className="hover:text-[#651F29]">×</button>
              </span>
            ))}

            {selectedColors.map(c => (
              <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E9DED0] text-[#171414] rounded-xs">
                Color: {c}
                <button onClick={() => toggleItem(selectedColors, setSelectedColors, c)} className="hover:text-[#651F29]">×</button>
              </span>
            ))}

            {selectedFabrics.map(f => (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E9DED0] text-[#171414] rounded-xs">
                Fabric: {f}
                <button onClick={() => toggleItem(selectedFabrics, setSelectedFabrics, f)} className="hover:text-[#651F29]">×</button>
              </span>
            ))}

            {maxPrice < 30000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E9DED0] text-[#171414] rounded-xs">
                Max ₹{maxPrice.toLocaleString('en-IN')}
                <button onClick={() => setMaxPrice(30000)} className="hover:text-[#651F29]">×</button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[#651F29] underline hover:text-[#8B0000] font-semibold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Catalog Layout (Left Sidebar + Right Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-[#E9DED0] p-6 rounded-xs space-y-6 shadow-2xs sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9DED0] pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-[#171414] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#651F29]" />
                <span>Filters</span>
              </h3>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs text-[#651F29] hover:underline cursor-pointer">
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171414]">Category</h4>
              <div className="space-y-1.5 text-xs text-[#6F6660]">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat 
                        ? 'bg-[#651F29] text-white font-bold' 
                        : 'hover:bg-[#F8F4EC] hover:text-[#171414]'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E9DED0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171414]">Occasion</h4>
              <div className="space-y-1.5 text-xs text-[#6F6660]">
                {allOccasions.map(occ => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`w-full text-left py-1 px-2 rounded-xs transition-colors flex items-center justify-between ${
                      selectedOccasion === occ 
                        ? 'bg-[#651F29] text-white font-bold' 
                        : 'hover:bg-[#F8F4EC] hover:text-[#171414]'
                    }`}
                  >
                    <span>{occ}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E9DED0]">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414]">
                <span>Price Range</span>
                <span className="text-[#651F29] font-mono">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#651F29] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6F6660]">
                <span>₹2,000</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Colour Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E9DED0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171414]">Colour</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {allColors.map(c => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleItem(selectedColors, setSelectedColors, c.name)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-xs border text-[11px] transition-colors cursor-pointer ${
                        isSelected 
                          ? 'border-[#651F29] bg-[#F8F4EC] font-bold text-[#651F29]' 
                          : 'border-[#E9DED0] hover:border-[#651F29]/40'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#E9DED0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171414]">Fabric</h4>
              <div className="space-y-1.5 text-xs">
                {allFabrics.map(f => {
                  const isSelected = selectedFabrics.includes(f);
                  return (
                    <label key={f} className="flex items-center gap-2 cursor-pointer text-[#6F6660] hover:text-[#171414]">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleItem(selectedFabrics, setSelectedFabrics, f)}
                        className="accent-[#651F29]"
                      />
                      <span className={isSelected ? 'font-bold text-[#171414]' : ''}>{f}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* Right Product Grid (9 cols on lg -> 4 cols internally on xl, 3 on md, 2 on sm) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E9DED0] p-12 text-center rounded-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F4EC] flex items-center justify-center mx-auto text-[#651F29]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#171414]">
                  No matching designs found
                </h3>
                <p className="text-xs text-[#6F6660] max-w-sm mx-auto">
                  Try adjusting your filters or price slider to see more exquisite ethnic collections.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#651F29] text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#8B0000] cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
              onClick={() => setIsMobileFilterOpen(false)} 
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10"
            >
              <div className="p-4 border-b border-[#E9DED0] flex items-center justify-between">
                <h3 className="font-serif-luxury text-lg font-bold text-[#171414]">Filter Collection</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-[#171414]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
                {/* Category */}
                <div className="space-y-2">
                  <h4 className="font-bold uppercase text-[#171414]">Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {allCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xs text-xs ${
                          selectedCategory === cat ? 'bg-[#651F29] text-white font-bold' : 'bg-[#F8F4EC] text-[#171414]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-2 pt-4 border-t border-[#E9DED0]">
                  <h4 className="font-bold uppercase text-[#171414]">Occasion</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {allOccasions.map(occ => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-3 py-1.5 rounded-xs text-xs ${
                          selectedOccasion === occ ? 'bg-[#651F29] text-white font-bold' : 'bg-[#F8F4EC] text-[#171414]'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div className="space-y-2 pt-4 border-t border-[#E9DED0]">
                  <div className="flex justify-between font-bold text-[#171414]">
                    <span>Max Price</span>
                    <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="30000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#651F29]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-[#E9DED0] grid grid-cols-2 gap-2 bg-[#F8F4EC]">
                <button
                  onClick={clearAllFilters}
                  className="py-2.5 bg-white border border-[#E9DED0] text-xs font-bold uppercase rounded-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="py-2.5 bg-[#651F29] text-white text-xs font-bold uppercase rounded-xs"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
