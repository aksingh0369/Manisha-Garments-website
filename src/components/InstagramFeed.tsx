import React, { useState } from 'react';
import { Instagram, Eye, Heart, ExternalLink, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

export const InstagramFeed: React.FC = () => {
  const { openProductDetail } = useShop();
  const [selectedLook, setSelectedLook] = useState<{
    image: string;
    caption: string;
    likes: number;
    productId: string;
    productName: string;
  } | null>(null);

  const posts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      caption: 'Pure Katan Silk draped to royal perfection for Delhi wedding season ✨ #ManishaGarments #SareeLove',
      likes: 1420,
      productId: 'prod-1',
      productName: 'Maroon Embroidered Silk Saree'
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      caption: 'Royal blue festive flair with intricate mirror work & hand cutdana. #LehengaGoals #FestiveWear',
      likes: 1890,
      productId: 'prod-2',
      productName: 'Royal Blue Festive Lehenga'
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80',
      caption: 'The bride of our dreams in handcrafted heritage zardozi velvet. #BridalTrousseau #IndianBride',
      likes: 3120,
      productId: 'prod-7',
      productName: 'Royal Heritage Bridal Red Lehenga'
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      caption: 'Elegance for the modern groom & wedding guests in silk kurta sets. #GentsEthnic #ManishaGarments',
      likes: 980,
      productId: 'prod-4',
      productName: 'Cream Printed Kurta Set'
    },
    {
      id: 'ig-5',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      caption: 'Pastel festive dream for young bridesmaids and girls. #GirlsEthnic #FestiveLook',
      likes: 1240,
      productId: 'prod-3',
      productName: 'Pastel Pink Girls Lehenga'
    },
    {
      id: 'ig-6',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      caption: 'Golden Chanderi warmth for Haldi and festive celebrations. #ChanderiSilk #IndianFashion',
      likes: 1560,
      productId: 'prod-10',
      productName: 'Golden Mustard Chanderi Silk Saree'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#651F29] flex items-center justify-center gap-1.5">
            <Instagram className="w-3.5 h-3.5 text-[#B59658]" />
            @manishagarments
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
            FOLLOW OUR STYLE
          </h2>
          <div className="w-12 h-[1px] bg-[#B59658] mx-auto my-2"></div>
          <p className="text-xs sm:text-sm text-[#6F6660] font-light">
            Tag us in your festive celebration stories to be featured on our official gallery.
          </p>
        </div>

        {/* 6-Image Editorial Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedLook(post)}
              className="group relative aspect-square overflow-hidden bg-[#E9DED0] cursor-pointer rounded-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#171414]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram className="w-6 h-6 text-[#B59658] mb-2" />
                <span className="text-[11px] font-bold tracking-wider uppercase bg-[#651F29] px-3 py-1 text-[#F8F4EC]">
                  VIEW LOOK
                </span>
                <span className="text-[10px] text-[#E9DED0] mt-2 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#B59658] text-[#B59658]" /> {post.likes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Look Modal */}
      <AnimatePresence>
        {selectedLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative max-w-2xl w-full bg-[#F8F4EC] shadow-2xl rounded-xs overflow-hidden border border-[#E9DED0]"
            >
              <button
                onClick={() => setSelectedLook(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-[#171414] flex items-center justify-center hover:bg-[#651F29] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="aspect-[4/5] bg-black">
                  <img
                    src={selectedLook.image}
                    alt={selectedLook.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#651F29] text-white flex items-center justify-center text-[10px] font-bold">
                        M
                      </div>
                      <span className="text-xs font-bold text-[#171414]">@manishagarments</span>
                    </div>

                    <p className="text-xs text-[#6F6660] leading-relaxed">
                      {selectedLook.caption}
                    </p>

                    <div className="pt-3 border-t border-[#E9DED0]">
                      <span className="text-[10px] uppercase tracking-wider text-[#B59658] font-bold block">
                        Featured Outfit
                      </span>
                      <h4 className="font-serif-luxury text-base font-semibold text-[#171414] mt-0.5">
                        {selectedLook.productName}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const prod = products.find((p) => p.id === selectedLook.productId);
                        if (prod) openProductDetail(prod);
                        setSelectedLook(null);
                      }}
                      className="w-full py-3 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>SHOP THIS OUTFIT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={() => setSelectedLook(null)}
                      className="w-full py-2 bg-transparent text-xs text-[#6F6660] hover:text-[#171414] cursor-pointer"
                    >
                      Close Look
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
