import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  MapPin,
  HelpCircle,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { 
    cartItemCount, 
    wishlistItemCount, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    openCategoryShop, 
    openOccasionShop,
    setActiveView,
    activeView,
    setIsAboutOpen,
    setIsContactOpen,
    setIsOrderLookupOpen,
    openWhatsApp
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'NEW ARRIVALS', action: () => { openCategoryShop('All'); } },
    { 
      name: 'SAREES', 
      action: () => openCategoryShop('Sarees'),
      dropdown: ['Pure Katan Silk', 'Banarasi Silk', 'Chanderi Silk', 'Georgette Sarees', 'Bridal Drapes']
    },
    { 
      name: 'LEHENGAS', 
      action: () => openCategoryShop('Lehengas'),
      dropdown: ['Bridal Lehengas', 'Festive Flared', 'Mirror Work', 'Pastel Sangeet Sets']
    },
    { 
      name: 'KIDS WEAR', 
      action: () => openCategoryShop('Kids Wear'),
      dropdown: ['Boys Dhoti Kurtas', 'Festive Bundi Sets', 'Girls Flared Gowns', 'Teens Festive']
    },
    { 
      name: 'GENTS WEAR', 
      action: () => openCategoryShop('Gents Wear'),
      dropdown: ['Silk Kurta Sets', 'Jacquard Sherwanis', 'Nehru Jackets', 'Pathani Suits']
    },
    { 
      name: 'WEDDING', 
      action: () => openCategoryShop('Wedding'),
      badge: 'Royal Edit'
    },
    { 
      name: 'FESTIVE', 
      action: () => openOccasionShop('Festive')
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#651F29] text-[#F8F4EC] text-xs py-2 px-4 border-b border-[#8B0000]/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="hidden md:flex items-center gap-4 text-[11px] tracking-wider text-[#E9DED0]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#B59658]" />
              Store: Saurabh Vihar, Jaitpur, New Delhi
            </span>
            <span className="text-[#8B2D38]">|</span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-[#B59658]" />
              Help: 9899025177
            </span>
          </div>

          <div className="flex-1 text-center flex items-center justify-center gap-2 tracking-widest text-[11px] uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#B59658] animate-pulse" />
            <span>FREE SHIPPING ON ORDERS ABOVE ₹1999</span>
            <span className="hidden sm:inline text-[#B59658]">•</span>
            <span className="hidden sm:inline text-[#E9DED0]">USE CODE: FESTIVE10 FOR 10% OFF</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#E9DED0]">
            <button 
              id="track-order-btn"
              onClick={() => setIsOrderLookupOpen(true)} 
              className="hover:text-[#B59658] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3 h-3" /> Track Order
            </button>
            <span className="text-[#8B2D38]">|</span>
            <button 
              id="header-contact-btn"
              onClick={() => setIsContactOpen(true)} 
              className="hover:text-[#B59658] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F8F4EC]/95 backdrop-blur-md shadow-sm border-b border-[#E9DED0]' 
            : 'bg-[#F8F4EC] border-b border-[#E9DED0]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Mobile Menu Button (Left on Mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-[#171414] hover:text-[#651F29] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo / Wordmark */}
            <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start">
              <button 
                id="brand-logo-btn"
                onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group text-left cursor-pointer focus:outline-none flex flex-col items-center lg:items-start"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#651F29] rounded-sm flex items-center justify-center text-[#F8F4EC] font-serif text-sm font-bold shadow-xs border border-[#B59658]/40">
                    M
                  </div>
                  <span className="font-brand text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#651F29] group-hover:text-[#8B0000] transition-colors">
                    MANISHA
                  </span>
                  <span className="font-brand text-lg sm:text-xl font-normal tracking-[0.2em] text-[#171414]">
                    GARMENTS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-[1px] w-4 bg-[#B59658]/60"></span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#6F6660] font-medium">
                    The Art of Indian Elegance
                  </span>
                  <span className="h-[1px] w-4 bg-[#B59658]/60"></span>
                </div>
              </button>
            </div>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative group py-6"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}-btn`}
                    onClick={item.action}
                    className={`flex items-center gap-1 text-[13px] font-semibold tracking-wider transition-colors cursor-pointer ${
                      activeView === 'shop' && item.name === 'SAREES'
                        ? 'text-[#651F29]'
                        : 'text-[#171414] hover:text-[#651F29]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="bg-[#B59658] text-white text-[9px] px-1.5 py-0.5 rounded-xs tracking-wider uppercase font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.dropdown && (
                      <ChevronDown className="w-3 h-3 text-[#6F6660] group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Active Underline Indicator */}
                  <span className="absolute bottom-4 left-0 w-0 h-[2px] bg-[#651F29] group-hover:w-full transition-all duration-300" />

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-52 bg-[#FFFFFF] shadow-xl border border-[#E9DED0] py-3 rounded-xs z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem}
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-[#171414] hover:bg-[#F8F4EC] hover:text-[#651F29] font-medium transition-colors flex items-center justify-between"
                        >
                          <span>{subItem}</span>
                          <span className="text-[10px] text-[#B59658]">→</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Icon */}
              <button
                id="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#171414] hover:text-[#651F29] transition-colors rounded-full hover:bg-[#E9DED0]/40 cursor-pointer"
                title="Search collection"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                id="header-wishlist-btn"
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-[#171414] hover:text-[#651F29] transition-colors rounded-full hover:bg-[#E9DED0]/40 relative cursor-pointer"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#651F29] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItemCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon */}
              <button
                id="header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#171414] hover:text-[#651F29] transition-colors rounded-full hover:bg-[#E9DED0]/40 relative cursor-pointer flex items-center gap-1.5"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#651F29] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Quick Order button */}
              <button
                id="header-whatsapp-order-btn"
                onClick={() => openWhatsApp()}
                className="hidden xl:inline-flex items-center gap-1.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border border-[#25D366]/30 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F8F4EC] border-b border-[#E9DED0] shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              <div className="grid grid-cols-1 divide-y divide-[#E9DED0]">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3.5 flex items-center justify-between text-sm font-semibold tracking-wider text-[#171414] hover:text-[#651F29]"
                  >
                    <span>{item.name}</span>
                    {item.badge ? (
                      <span className="bg-[#B59658] text-white text-[9px] px-2 py-0.5 rounded-xs uppercase">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-[#B59658] text-xs">→</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E9DED0] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6F6660]">
                  <span>Customer Support:</span>
                  <a href="tel:9899025177" className="font-semibold text-[#651F29]">9899025177</a>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6F6660]">
                  <span>Store Hours:</span>
                  <span className="font-medium">10:30 AM – 9:00 PM (Daily)</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsOrderLookupOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold bg-[#E9DED0] text-[#171414] rounded-xs"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => {
                      setIsContactOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold bg-[#651F29] text-white rounded-xs"
                  >
                    Store Location
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
