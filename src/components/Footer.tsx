import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ArrowUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    openCategoryShop, 
    openOccasionShop, 
    setIsSizeGuideOpen, 
    setIsAboutOpen, 
    setIsContactOpen,
    setIsOrderLookupOpen,
    openWhatsApp 
  } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171414] text-[#E9DED0] pt-16 pb-10 border-t-2 border-[#B59658]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Summary Strip */}
        <div className="pb-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#651F29] rounded-xs flex items-center justify-center text-white font-serif text-base font-bold border border-[#B59658]/50">
                M
              </div>
              <span className="font-brand text-2xl font-bold tracking-[0.2em] text-[#FFFFFF]">
                MANISHA
              </span>
              <span className="font-brand text-xl font-normal tracking-[0.22em] text-[#B59658]">
                GARMENTS
              </span>
            </div>
            <p className="text-xs text-[#A89F91] mt-2 font-light max-w-sm">
              The Art of Indian Elegance. Premium ethnic fashion for weddings, festive occasions, and lifelong family celebrations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">100%</span>
              <span className="text-[11px] text-[#A89F91]">Authentic Weaves</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">10,000+</span>
              <span className="text-[11px] text-[#A89F91]">Happy Brides & Families</span>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">Delhi</span>
              <span className="text-[11px] text-[#A89F91]">Flagship Showroom</span>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-[#651F29] text-[#E9DED0] hover:text-white text-xs font-semibold tracking-wider rounded-xs border border-white/10 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Column Navigation Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Col 1: SHOP */}
          <div className="space-y-4">
            <h4 className="font-brand text-xs font-bold tracking-[0.2em] text-[#B59658] uppercase">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => openCategoryShop('Sarees')} className="hover:text-white transition-colors cursor-pointer">
                  Sarees
                </button>
              </li>
              <li>
                <button onClick={() => openCategoryShop('Lehengas')} className="hover:text-white transition-colors cursor-pointer">
                  Lehengas
                </button>
              </li>
              <li>
                <button onClick={() => openCategoryShop('Kids Wear')} className="hover:text-white transition-colors cursor-pointer">
                  Kids Wear
                </button>
              </li>
              <li>
                <button onClick={() => openCategoryShop('Girls Wear')} className="hover:text-white transition-colors cursor-pointer">
                  Girls Wear
                </button>
              </li>
              <li>
                <button onClick={() => openCategoryShop('Gents Wear')} className="hover:text-white transition-colors cursor-pointer">
                  Gents Wear
                </button>
              </li>
              <li>
                <button onClick={() => openCategoryShop('Wedding')} className="hover:text-white transition-colors cursor-pointer">
                  Wedding Wear
                </button>
              </li>
              <li>
                <button onClick={() => openOccasionShop('Festive')} className="hover:text-white transition-colors cursor-pointer">
                  Festive Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: CUSTOMER CARE */}
          <div className="space-y-4">
            <h4 className="font-brand text-xs font-bold tracking-[0.2em] text-[#B59658] uppercase">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setIsOrderLookupOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Size Guide & Measurements
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: ABOUT */}
          <div className="space-y-4">
            <h4 className="font-brand text-xs font-bold tracking-[0.2em] text-[#B59658] uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs text-[#A89F91]">
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  About Manisha Garments
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Our Handloom Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Store Information & Location
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Custom Tailoring Service
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: FOLLOW US */}
          <div className="space-y-4">
            <h4 className="font-brand text-xs font-bold tracking-[0.2em] text-[#B59658] uppercase">
              FOLLOW US
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F91]">
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#B59658]" />
                  <span>Instagram (@manishagarments)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#B59658]" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => openWhatsApp()}
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Shopping</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: STORE CONTACT */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-4">
            <h4 className="font-brand text-xs font-bold tracking-[0.2em] text-[#B59658] uppercase">
              VISIT OUR STORE
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89F91]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B59658] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white block font-medium">Manisha Garments</strong>
                  B-8, Gali No. 4,<br />
                  Near Chockan Mandir,<br />
                  Saurabh Vihar, Jaitpur,<br />
                  Badarpur, New Delhi – 110044
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#B59658] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:9899025177" className="hover:text-white transition-colors font-medium">
                    +91 9899025177
                  </a>
                  <a href="tel:9899025137" className="hover:text-white transition-colors font-medium">
                    +91 9899025137
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A89F91]">
          <p>© 2026 Manisha Garments. All Rights Reserved.</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#A89F91]">Accepted Payments:</span>
            <div className="flex items-center gap-1.5 font-bold text-[10px] text-white">
              <span className="px-2 py-0.5 bg-white/10 rounded-xs">UPI</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-xs">Google Pay</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-xs">PhonePe</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-xs">Cards</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-xs">COD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
