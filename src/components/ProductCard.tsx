import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { 
    openProductDetail, 
    openQuickView, 
    toggleWishlist, 
    isInWishlist, 
    addToCart 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'Standard', product.colors[0]?.name || 'Standard', 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#E9DED0]/70 hover:border-[#651F29]/40 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer overflow-hidden rounded-xs"
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F8F4EC]">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Badges (Discount, New, Best Seller) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-[#651F29] text-white text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#B59658] text-white text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-[#171414] text-white text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist 
              ? 'bg-[#651F29] text-white shadow-md' 
              : 'bg-white/90 text-[#171414] hover:text-[#651F29] hover:bg-white shadow-xs'
          }`}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View & Quick Add Overlay Bar (Slide up on Desktop Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#171414]/70 via-[#171414]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center gap-2">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={handleQuickViewClick}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#171414] text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#651F29]" />
            <span>Quick View</span>
          </button>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="flex-1 py-2 bg-[#651F29] hover:bg-[#8B0000] text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B59658]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#6F6660] mb-1">
            <span className="uppercase tracking-widest font-medium text-[#B59658]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#171414] font-medium">
              <Star className="w-3 h-3 fill-[#B59658] text-[#B59658]" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#6F6660] text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-luxury text-sm sm:text-base font-semibold text-[#171414] group-hover:text-[#651F29] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Fabric Subtitle */}
          <p className="text-[11px] text-[#6F6660] line-clamp-1 mt-0.5 font-light">
            {product.fabric}
          </p>
        </div>

        {/* Price Row & Mobile Add Button */}
        <div className="pt-2.5 mt-2 border-t border-[#E9DED0]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-[#171414]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#6F6660] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile Direct Add To Cart button */}
          <button
            id={`mobile-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="sm:hidden p-1.5 bg-[#651F29] text-white rounded-xs hover:bg-[#8B0000] transition-colors"
            aria-label="Add to Bag"
          >
            {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
