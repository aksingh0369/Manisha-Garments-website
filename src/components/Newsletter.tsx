import React, { useState } from 'react';
import { Mail, Check, Sparkles, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion } from 'motion/react';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing! Your welcome coupon: FESTIVE10', 'success');
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FFFFFF] border border-[#E9DED0] p-8 sm:p-12 text-center rounded-xs shadow-sm space-y-6 relative overflow-hidden"
        >
          {/* Subtle Corner Accents */}
          <div className="w-8 h-8 border-t-2 border-l-2 border-[#B59658] absolute top-3 left-3 pointer-events-none opacity-40"></div>
          <div className="w-8 h-8 border-b-2 border-r-2 border-[#B59658] absolute bottom-3 right-3 pointer-events-none opacity-40"></div>

          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#651F29]" />
              Join the Manisha Garments Circle
            </span>
            
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
              STAY IN STYLE
            </h2>
            
            <div className="w-12 h-[1px] bg-[#651F29] mx-auto"></div>
            
            <p className="text-xs sm:text-sm text-[#6F6660] font-light leading-relaxed">
              Be the first to discover new arrivals, festive collections and exclusive offers directly in your inbox.
            </p>
          </div>

          {isSubscribed ? (
            <div className="p-4 bg-[#F8F4EC] border border-[#B59658]/40 rounded-xs max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#651F29] font-bold text-sm">
                <Check className="w-4 h-4 text-[#B59658]" />
                <span>You're officially on the list!</span>
              </div>
              <p className="text-xs text-[#6F6660]">
                Use code <span className="font-mono font-bold text-[#651F29]">FESTIVE10</span> at checkout for 10% off your first order.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-4 pr-4 py-3 bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none text-xs text-[#171414] placeholder-[#6F6660]/70 rounded-xs"
                  required
                />
              </div>

              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-7 py-3 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-[0.18em] uppercase transition-colors rounded-xs shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3 h-3 text-[#B59658]" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#6F6660]/80">
            We respect your privacy. No spam, only handpicked ethnic couture drops.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
