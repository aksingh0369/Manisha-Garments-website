import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, ActiveView } from '../types';
import { products } from '../data/products';

interface ShopContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isOrderLookupOpen: boolean;
  setIsOrderLookupOpen: (open: boolean) => void;
  lastCompletedOrder: OrderDetails | null;
  setLastCompletedOrder: (order: OrderDetails | null) => void;
  coupon: { code: string; discountPercent?: number; discountAmount?: number } | null;
  toasts: { id: string; message: string; type: 'success' | 'info' | 'error' }[];
  
  // Actions
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  openProductDetail: (product: Product) => void;
  openCategoryShop: (category: string) => void;
  openOccasionShop: (occasion: string) => void;
  openQuickView: (product: Product) => void;
  openWhatsApp: (productName?: string, sku?: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // Computations
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  cartItemCount: number;
  wishlistItemCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mg_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: products[0],
          selectedSize: products[0].sizes[0] || 'Free Size',
          selectedColor: products[0].colors[0]?.name || 'Royal Maroon',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mg_wishlist');
      return saved ? JSON.parse(saved) : [products[1], products[6]];
    } catch {
      return [products[1]];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderDetails | null>(null);
  const [coupon, setCoupon] = useState<{ code: string; discountPercent?: number; discountAmount?: number } | null>(null);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('mg_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mg_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (
    product: Product,
    size: string = product.sizes[0] || 'Standard',
    color: string = product.colors[0]?.name || 'Standard',
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`Added "${product.name}" to your Shopping Bag!`, 'success');
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    showToast('Item removed from Shopping Bag.', 'info');
  };

  const updateQuantity = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from your Wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added to your Wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FESTIVE10') {
      setCoupon({ code: 'FESTIVE10', discountPercent: 10 });
      showToast('Coupon FESTIVE10 applied! 10% Extra Discount.', 'success');
      return true;
    } else if (clean === 'MANISHA500') {
      setCoupon({ code: 'MANISHA500', discountAmount: 500 });
      showToast('Coupon MANISHA500 applied! ₹500 Flat Discount.', 'success');
      return true;
    } else if (clean === 'ROYALWEDDING') {
      setCoupon({ code: 'ROYALWEDDING', discountPercent: 15 });
      showToast('Coupon ROYALWEDDING applied! 15% Wedding Season Discount.', 'success');
      return true;
    } else {
      showToast('Invalid or expired coupon code. Try FESTIVE10 or MANISHA500', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    setIsQuickViewOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategoryShop = (category: string) => {
    setSelectedCategory(category);
    setSelectedOccasion('All');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOccasionShop = (occasion: string) => {
    setSelectedOccasion(occasion);
    setSelectedCategory('All');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const openWhatsApp = (productName?: string, sku?: string) => {
    const phone = '919899025177';
    let text = 'Hello Manisha Garments, I’m interested in your ethnic fashion collection.';
    if (productName) {
      text = `Hello Manisha Garments, I’m interested in ${productName}${sku ? ` (SKU: ${sku})` : ''}. Please share more details, fabric videos, and sizing availability.`;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1999;
  const cartShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 150;
  
  let cartDiscount = 0;
  if (coupon?.discountPercent) {
    cartDiscount = Math.round((cartSubtotal * coupon.discountPercent) / 100);
  } else if (coupon?.discountAmount) {
    cartDiscount = Math.min(coupon.discountAmount, cartSubtotal);
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        selectedProduct,
        setSelectedProduct,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        isOrderLookupOpen,
        setIsOrderLookupOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        coupon,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        openProductDetail,
        openCategoryShop,
        openOccasionShop,
        openQuickView,
        openWhatsApp,
        showToast,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        freeShippingThreshold,
        freeShippingProgress,
        cartItemCount,
        wishlistItemCount
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
