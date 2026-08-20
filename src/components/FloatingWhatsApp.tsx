import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp } = useShop();
  const [isOpenPrompt, setIsOpenPrompt] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Interactive Tooltip Bubble */}
      <AnimatePresence>
        {isOpenPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-white border border-[#E9DED0] p-3 rounded-xs shadow-lg max-w-xs text-xs relative flex items-start gap-2.5"
          >
            <button
              onClick={() => setIsOpenPrompt(false)}
              className="absolute top-1 right-1 text-[#6F6660] hover:text-black p-1"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="w-7 h-7 rounded-full bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4" />
            </div>

            <div className="space-y-1 pr-4">
              <span className="font-bold text-[#171414] block">
                Shopping on WhatsApp?
              </span>
              <p className="text-[11px] text-[#6F6660] leading-tight">
                Connect with our Delhi styling karigars for video showroom tours & live fabric closeups.
              </p>
              <button
                onClick={() => openWhatsApp()}
                className="text-[11px] font-bold text-[#128C7E] hover:underline block pt-0.5"
              >
                Chat Now →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => openWhatsApp()}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-108 cursor-pointer relative group"
        title="Chat on WhatsApp (+91 9899025177)"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B59658] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#B59658]"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-transparent group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
