import React from 'react';
import { testimonials } from '../data/testimonials';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#E9DED0]/30 border-t border-[#E9DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
            Real Stories, Real Celebrations
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="w-12 h-[1px] bg-[#651F29] mx-auto my-2"></div>
          <p className="text-xs sm:text-sm text-[#6F6660] font-light">
            Over 10,000+ happy families dressed for weddings, Diwali, and festive milestones.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#FFFFFF] p-6 rounded-xs border border-[#E9DED0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              {/* Top Quote Icon */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B59658] text-[#B59658]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#E9DED0]" />
                </div>

                <h4 className="font-serif-luxury text-base font-bold text-[#171414] leading-snug">
                  “{item.title}”
                </h4>

                <p className="text-xs text-[#6F6660] font-light leading-relaxed">
                  {item.comment}
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="pt-4 mt-4 border-t border-[#E9DED0]/60 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#171414]">{item.author}</span>
                  {item.verified && (
                    <span className="flex items-center gap-0.5 text-[10px] text-[#128C7E] font-medium" title="Verified Customer">
                      <CheckCircle className="w-3 h-3 fill-[#128C7E] text-white" />
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-[11px] text-[#6F6660]">{item.location}</p>
                <p className="text-[10px] text-[#B59658] font-medium truncate">
                  Purchased: {item.outfitPurchased}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
