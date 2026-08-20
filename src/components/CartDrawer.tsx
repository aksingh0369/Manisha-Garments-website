import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartShipping, 
    cartDiscount, 
    cartTotal, 
    freeShippingThreshold, 
    freeShippingProgress,
    coupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    openCategoryShop
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag className="w-5 h-5 text-[#651F29]" />
                <h2 className="font-serif-luxury text-xl font-bold text-[#171414]">
                  Shopping Bag ({cart.length})
                </h2>
              </div>
              <button
                id="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-[#E9DED0]/50 p-3.5 border-b border-[#E9DED0] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#171414]">
                  <Truck className="w-3.5 h-3.5 text-[#651F29]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-[#128C7E] font-bold">🎉 Congratulations! You have unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add <strong className="text-[#651F29]">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for FREE Shipping!</span>
                  )}
                </span>
                <span className="text-[10px] font-bold text-[#6F6660]">₹1,999 Threshold</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#651F29] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E9DED0]/60 flex items-center justify-center text-[#651F29]">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#171414]">
                    Your shopping bag is empty
                  </h3>
                  <p className="text-xs text-[#6F6660] max-w-xs">
                    Discover our royal handlooms, sarees, and festive wear crafted for every celebration.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      openCategoryShop('All');
                    }}
                    className="px-6 py-3 bg-[#651F29] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-xs hover:bg-[#8B0000] transition-colors cursor-pointer"
                  >
                    EXPLORE COLLECTIONS
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3.5 p-3.5 bg-white border border-[#E9DED0] rounded-xs shadow-2xs relative"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-26 object-cover object-top rounded-xs shrink-0 bg-[#F8F4EC]"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif-luxury text-sm font-semibold text-[#171414] leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                            className="text-[#6F6660] hover:text-[#651F29] p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6F6660] mt-0.5">
                          Size: <strong className="text-[#171414]">{item.selectedSize}</strong> | Color: <strong className="text-[#171414]">{item.selectedColor}</strong>
                        </p>
                      </div>

                      {/* Price & Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E9DED0]/60">
                        <span className="text-xs font-bold text-[#171414]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center border border-[#E9DED0] rounded-xs bg-[#F8F4EC]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                            className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#E9DED0] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#E9DED0] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout Section (Only if cart not empty) */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-[#E9DED0] space-y-4">
                
                {/* Coupon input */}
                <div>
                  {coupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#F8F4EC] border border-[#B59658]/40 rounded-xs text-xs">
                      <div className="flex items-center gap-1.5 text-[#651F29] font-bold">
                        <Tag className="w-3.5 h-3.5 text-[#B59658]" />
                        <span>Code {coupon.code} applied! (-₹{cartDiscount.toLocaleString('en-IN')})</span>
                      </div>
                      <button onClick={removeCoupon} className="text-xs text-[#6F6660] hover:text-black underline cursor-pointer">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount Code (e.g. FESTIVE10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none uppercase rounded-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#171414] hover:bg-[#651F29] text-white text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-[#6F6660] pt-2 border-t border-[#E9DED0]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171414]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#128C7E] font-medium">
                      <span>Discount Coupon</span>
                      <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    {cartShipping === 0 ? (
                      <span className="font-bold text-[#128C7E]">FREE</span>
                    ) : (
                      <span className="font-semibold text-[#171414]">₹{cartShipping}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#171414] pt-2 border-t border-[#E9DED0]">
                    <span>Total Amount</span>
                    <span className="text-base text-[#651F29]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={handleProceedCheckout}
                    className="w-full py-4 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#B59658]/40"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 text-[#B59658]" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 bg-transparent hover:bg-[#F8F4EC] text-xs font-semibold text-[#171414] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>

              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
