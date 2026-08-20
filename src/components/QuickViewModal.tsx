import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  MessageCircle, 
  Ruler, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const { 
    isQuickViewOpen, 
    setIsQuickViewOpen, 
    quickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openWhatsApp, 
    openProductDetail,
    setIsSizeGuideOpen,
    setIsCheckoutOpen 
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || 'Standard';
  const currentColor = selectedColor || product.colors[0]?.name || 'Standard';
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, currentSize, currentColor, 1);
    setIsQuickViewOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          onClick={() => setIsQuickViewOpen(false)}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8"
        >
          {/* Close button */}
          <button
            id="quick-view-close-btn"
            onClick={() => setIsQuickViewOpen(false)}
            className="absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-[#651F29] text-[#171414] hover:text-white rounded-full transition-colors shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Images */}
            <div className="bg-[#F8F4EC] p-4 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-white border border-[#E9DED0]">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />

                {product.discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#651F29] text-white text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-14 aspect-[3/4] rounded-2xs overflow-hidden border-2 cursor-pointer shrink-0 ${
                        selectedImageIdx === idx ? 'border-[#651F29]' : 'border-[#E9DED0] opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#6F6660]">
                  <span className="uppercase tracking-[0.2em] font-bold text-[#B59658]">
                    {product.category}
                  </span>
                  <span className="font-mono">SKU: {product.sku}</span>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#171414] leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#F8F4EC] border border-[#B59658]/40 px-2 py-0.5 rounded-xs">
                    <Star className="w-3 h-3 fill-[#B59658] text-[#B59658]" />
                    <span className="text-xs font-bold text-[#171414]">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-[#6F6660]">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-bold text-[#171414]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-[#6F6660] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#651F29]">
                    ({product.discountPercent}% OFF)
                  </span>
                </div>

                <p className="text-xs text-[#6F6660] line-clamp-2 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Fabric & Work */}
                <div className="text-[11px] text-[#6F6660] space-y-1 bg-[#F8F4EC] p-2.5 rounded-xs border border-[#E9DED0]">
                  <div><strong>Fabric:</strong> {product.fabric}</div>
                  <div><strong>Work Type:</strong> {product.workType}</div>
                </div>

                {/* Size Selection */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#171414] uppercase tracking-wider">
                      Size:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[11px] font-semibold text-[#651F29] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3 h-3 text-[#B59658]" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition-colors cursor-pointer ${
                          currentSize === s
                            ? 'border-[#651F29] bg-[#651F29] text-white'
                            : 'border-[#E9DED0] bg-white text-[#171414] hover:border-[#651F29]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-[#E9DED0]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 bg-[#B59658] hover:bg-[#967B44] text-[#171414] text-xs font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openWhatsApp(product.name, product.sku)}
                    className="flex-1 py-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold tracking-wide uppercase transition-colors rounded-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2 border rounded-xs transition-colors cursor-pointer ${
                      inWishlist ? 'border-[#651F29] bg-[#651F29] text-white' : 'border-[#E9DED0] hover:border-[#651F29]'
                    }`}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => openProductDetail(product)}
                  className="w-full text-center text-xs font-semibold text-[#651F29] hover:underline pt-1 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Full Product Specifications</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
