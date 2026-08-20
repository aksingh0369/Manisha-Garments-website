import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    openProductDetail,
    openCategoryShop 
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsWishlistOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-screen max-w-md bg-[#F8F4EC] shadow-2xl flex flex-col border-l border-[#E9DED0]"
          >
            
            {/* Header */}
            <div className="p-5 bg-white border-b border-[#E9DED0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-[#651F29] text-[#651F29]" />
                <h2 className="font-serif-luxury text-xl font-bold text-[#171414]">
                  My Saved Wishlist ({wishlist.length})
                </h2>
              </div>
              <button
                id="wishlist-drawer-close-btn"
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E9DED0]/60 flex items-center justify-center text-[#651F29]">
                    <Heart className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#171414]">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs text-[#6F6660] max-w-xs">
                    Save your favorite handloom sarees, bridal lehengas and festive outfits here to review later.
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openCategoryShop('All');
                    }}
                    className="px-6 py-3 bg-[#651F29] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-xs hover:bg-[#8B0000] transition-colors cursor-pointer"
                  >
                    EXPLORE DESIGNS
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3.5 p-3.5 bg-white border border-[#E9DED0] rounded-xs shadow-2xs relative"
                  >
                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product);
                      }}
                      className="w-20 h-26 object-cover object-top rounded-xs shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[10px] text-[#B59658] font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-[#6F6660] hover:text-[#651F29] p-1 cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductDetail(product);
                          }}
                          className="font-serif-luxury text-sm font-semibold text-[#171414] leading-snug line-clamp-1 hover:text-[#651F29] cursor-pointer"
                        >
                          {product.name}
                        </h4>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-bold text-[#171414]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[11px] text-[#6F6660] line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Move to Bag Button */}
                      <button
                        onClick={() => {
                          addToCart(product, product.sizes[0], product.colors[0]?.name, 1);
                        }}
                        className="mt-2 py-2 px-3 bg-[#651F29] hover:bg-[#8B0000] text-white text-[11px] font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions */}
            {wishlist.length > 0 && (
              <div className="p-4 bg-white border-t border-[#E9DED0] space-y-2">
                <button
                  onClick={() => {
                    wishlist.forEach((item) => {
                      addToCart(item, item.sizes[0], item.colors[0]?.name, 1);
                    });
                    setIsWishlistOpen(false);
                  }}
                  className="w-full py-3.5 bg-[#B59658] hover:bg-[#967B44] text-[#171414] text-xs font-bold tracking-[0.18em] uppercase transition-colors rounded-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>MOVE ALL TO SHOPPING BAG</span>
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
