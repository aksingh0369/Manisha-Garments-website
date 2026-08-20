import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  MessageCircle, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  Ruler, 
  Check, 
  Share2, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openWhatsApp, 
    setIsSizeGuideOpen, 
    setIsCheckoutOpen,
    setActiveView,
    openCategoryShop,
    showToast
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  
  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    description: true,
    fabric: true,
    shipping: false,
    care: false,
    returns: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCheckoutOpen(true);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    if (pincode.startsWith('11') || pincode.startsWith('12') || pincode.startsWith('20')) {
      setPincodeStatus('⚡ Express Same-Day / Next-Day Delivery available for Delhi NCR!');
    } else {
      setPincodeStatus('✓ Standard Delivery in 3-5 business days. Free Shipping eligible!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Manisha Garments`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  // Related products from same category or occasion
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion))
    .slice(0, 4);

  return (
    <div className="bg-[#F8F4EC] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6F6660] mb-6 sm:mb-8 font-medium">
          <button onClick={() => setActiveView('home')} className="hover:text-[#651F29] cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#B59658]" />
          <button onClick={() => openCategoryShop(product.category)} className="hover:text-[#651F29] cursor-pointer">
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3 text-[#B59658]" />
          <span className="text-[#171414] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-[#FFFFFF] border border-[#E9DED0] shadow-sm rounded-xs overflow-hidden group">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={`${product.name} angle ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.discountPercent > 0 && (
                  <span className="bg-[#651F29] text-white text-xs font-bold px-2.5 py-1 tracking-wider uppercase shadow-sm">
                    {product.discountPercent}% OFF
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#B59658] text-white text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase shadow-sm">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                  inWishlist 
                    ? 'bg-[#651F29] text-white' 
                    : 'bg-white text-[#171414] hover:text-[#651F29]'
                }`}
                title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 sm:w-24 aspect-[3/4] rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImageIdx === idx 
                        ? 'border-[#651F29] shadow-sm scale-102' 
                        : 'border-[#E9DED0] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Actions (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-[#E9DED0] pb-5">
              <div className="flex items-center justify-between text-xs text-[#6F6660]">
                <span className="uppercase tracking-[0.2em] font-bold text-[#B59658]">
                  {product.category} • {product.occasion}
                </span>
                <span className="font-mono text-[11px] text-[#6F6660]">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-normal text-[#171414] leading-tight">
                {product.name}
              </h1>

              {/* Rating and Share */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#F8F4EC] border border-[#B59658]/40 px-2 py-0.5 rounded-xs">
                    <Star className="w-3.5 h-3.5 fill-[#B59658] text-[#B59658]" />
                    <span className="text-xs font-bold text-[#171414]">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-[#6F6660] underline">
                    {product.reviewCount} Verified Customer Reviews
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="p-2 text-[#6F6660] hover:text-[#651F29] transition-colors rounded-full hover:bg-[#E9DED0]/50"
                  title="Share outfit"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price Section */}
              <div className="pt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#171414]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#6F6660] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-[#651F29] bg-[#651F29]/10 px-2 py-0.5 rounded-xs">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}%)
                </span>
              </div>
              <p className="text-[11px] text-[#6F6660]">Inclusive of all taxes. Free shipping on this order.</p>
            </div>

            {/* Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171414] block">
                  Color Shade: <span className="text-[#651F29] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs transition-all cursor-pointer ${
                        selectedColor === c.name 
                          ? 'border-[#651F29] bg-white shadow-xs font-bold text-[#651F29]' 
                          : 'border-[#E9DED0] bg-[#F8F4EC] text-[#171414] hover:border-[#651F29]/40'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/20" 
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selection & Size Guide Button */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171414]">
                  Select Size / Fitting:
                </label>
                <button
                  id="product-size-guide-btn"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-semibold text-[#651F29] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#B59658]" />
                  Size Guide & Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2.5 text-xs font-semibold tracking-wider transition-all rounded-xs cursor-pointer border ${
                      selectedSize === s
                        ? 'border-[#651F29] bg-[#651F29] text-white shadow-xs'
                        : 'border-[#E9DED0] bg-white text-[#171414] hover:border-[#651F29]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171414]">Quantity:</span>
              <div className="flex items-center border border-[#E9DED0] bg-white rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[#171414] hover:bg-[#F8F4EC] cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#171414]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-[#171414] hover:bg-[#F8F4EC] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="product-add-to-bag-btn"
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#B59658]/40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  id="product-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-[#B59658] hover:bg-[#967B44] text-[#171414] text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* Contextual WhatsApp Shopping Button */}
              <button
                id="product-whatsapp-inquire-btn"
                onClick={() => openWhatsApp(product.name, product.sku)}
                className="w-full py-3 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 rounded-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>INQUIRE & VIDEO SHOP ON WHATSAPP</span>
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 bg-white border border-[#E9DED0] rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#171414] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#651F29]" />
                <span>Check Estimated Delivery</span>
              </div>
              
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 110044)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#171414] text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#651F29] transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <p className="text-xs font-medium text-[#651F29] pt-1">{pincodeStatus}</p>
              )}
            </div>

            {/* Accordions for Specifications, Fabric, Shipping, Returns, Care */}
            <div className="border-t border-[#E9DED0] divide-y divide-[#E9DED0]">
              
              {/* Accordion 1: Description & Craft */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414] hover:text-[#651F29] text-left cursor-pointer"
                >
                  <span>Product Description & Craft Story</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.description ? 'rotate-180 text-[#651F29]' : ''}`} />
                </button>
                {openAccordions.description && (
                  <div className="pt-3 text-xs text-[#6F6660] font-light leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div><strong>Work Type:</strong> {product.workType}</div>
                      <div><strong>Occasion:</strong> {product.occasion}</div>
                      {product.blouseIncluded && <div><strong>Blouse:</strong> Included (Unstitched / Customizable)</div>}
                      {product.dupattaLength && <div><strong>Dupatta:</strong> {product.dupattaLength}</div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Material */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414] hover:text-[#651F29] text-left cursor-pointer"
                >
                  <span>Fabric & Material Specification</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.fabric ? 'rotate-180 text-[#651F29]' : ''}`} />
                </button>
                {openAccordions.fabric && (
                  <div className="pt-3 text-xs text-[#6F6660] font-light leading-relaxed space-y-1.5">
                    <p><strong>Primary Fabric:</strong> {product.fabric}</p>
                    <p><strong>Embroidery:</strong> Handcrafted Resham, Zari & Stone Detailing</p>
                    <p><strong>Origin:</strong> Handwoven by master artisans for Manisha Garments</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Delivery */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414] hover:text-[#651F29] text-left cursor-pointer"
                >
                  <span>Shipping & Delivery Policy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.shipping ? 'rotate-180 text-[#651F29]' : ''}`} />
                </button>
                {openAccordions.shipping && (
                  <div className="pt-3 text-xs text-[#6F6660] font-light leading-relaxed space-y-1.5">
                    <p>• <strong>Free Shipping</strong> on all prepaid & COD orders above ₹1999.</p>
                    <p>• Orders dispatched within 24-48 business hours with live tracking links via SMS/Email.</p>
                    <p>• Express wedding delivery available for Delhi NCR & North India.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Care Instructions */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414] hover:text-[#651F29] text-left cursor-pointer"
                >
                  <span>Care & Maintenance Instructions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.care ? 'rotate-180 text-[#651F29]' : ''}`} />
                </button>
                {openAccordions.care && (
                  <div className="pt-3 text-xs text-[#6F6660] font-light leading-relaxed">
                    <p>{product.careInstructions}</p>
                  </div>
                )}
              </div>

              {/* Accordion 5: Return & Exchange Policy */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171414] hover:text-[#651F29] text-left cursor-pointer"
                >
                  <span>7-Day Easy Exchange Policy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.returns ? 'rotate-180 text-[#651F29]' : ''}`} />
                </button>
                {openAccordions.returns && (
                  <div className="pt-3 text-xs text-[#6F6660] font-light leading-relaxed space-y-1.5">
                    <p>• We offer a hassle-free 7-day exchange policy for sizing and styling adjustments.</p>
                    <p>• Items must be unused, with original tags intact and in original packaging.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Recommendations: "YOU MAY ALSO LIKE" */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-[#E9DED0]">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
                Complete Your Look
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#171414] tracking-tight">
                YOU MAY ALSO LIKE
              </h2>
              <div className="w-12 h-[1px] bg-[#651F29] mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
