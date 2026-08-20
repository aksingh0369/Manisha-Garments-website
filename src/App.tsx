import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { FeaturedCollection } from './components/FeaturedCollection';
import { ShopByOccasion } from './components/ShopByOccasion';
import { NewArrivals } from './components/NewArrivals';
import { BestSellers } from './components/BestSellers';
import { WhyShopWithUs } from './components/WhyShopWithUs';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramFeed } from './components/InstagramFeed';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ShopPage } from './components/ShopPage';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`p-3.5 rounded-xs shadow-lg border text-xs flex items-center gap-2.5 pointer-events-auto ${
              t.type === 'success'
                ? 'bg-[#171414] text-white border-[#B59658]'
                : t.type === 'error'
                ? 'bg-[#651F29] text-white border-white/20'
                : 'bg-white text-[#171414] border-[#E9DED0]'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#B59658] shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-white shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-[#651F29] shrink-0" />}
            <span className="flex-1 font-medium leading-snug">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeView, selectedProduct } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#171414] font-sans antialiased selection:bg-[#651F29] selection:text-white">
      {/* Top Notification Promo Strip */}
      <PromoBanner />

      {/* Main Sticky Luxury Header */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <ShopByCategory />
            <FeaturedCollection />
            <ShopByOccasion />
            <NewArrivals />
            <BestSellers />
            <WhyShopWithUs />
            <CustomerReviews />
            <InstagramFeed />
            <Newsletter />
          </>
        )}

        {activeView === 'shop' && <ShopPage />}

        {activeView === 'product-detail' && selectedProduct && (
          <ProductDetail product={selectedProduct} />
        )}
      </main>

      {/* Master 5-Column Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <SizeGuideModal />
      <CheckoutModal />
      <AboutModal />
      <ContactModal />
      <OrderLookupModal />
      <FloatingWhatsApp />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
