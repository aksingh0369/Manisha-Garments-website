import React from 'react';
import { Award, Sparkles, ShoppingBag, Headphones, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyShopWithUs: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'AUTHENTIC QUALITY',
      description: 'Carefully selected fabrics, genuine handlooms and exquisite hand-stitched craftsmanship.'
    },
    {
      icon: Sparkles,
      title: 'AFFORDABLE FASHION',
      description: 'Beautiful royal designer aesthetics crafted directly with master artisans at accessible prices.'
    },
    {
      icon: ShoppingBag,
      title: 'EASY SHOPPING',
      description: 'Simple browsing, secure Indian checkout (UPI / Cards / COD) and prompt door-to-door delivery.'
    },
    {
      icon: Headphones,
      title: 'CUSTOMER SUPPORT',
      description: 'We’re here on phone & WhatsApp to guide size selection, styling tips, and custom alterations.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8F4EC] border-t border-[#E9DED0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
            The Manisha Garments Promise
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171414] tracking-tight">
            WHY SHOP WITH US
          </h2>
          <div className="w-12 h-[1px] bg-[#651F29] mx-auto my-2"></div>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-3 p-6 bg-[#FFFFFF] border border-[#E9DED0]/70 rounded-xs shadow-2xs hover:border-[#651F29]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#F8F4EC] border border-[#B59658]/40 flex items-center justify-center text-[#651F29] shadow-xs">
                  <Icon className="w-5 h-5 text-[#651F29]" />
                </div>
                
                <h3 className="font-serif-luxury text-lg font-bold tracking-wider text-[#171414] pt-1">
                  {feature.title}
                </h3>
                
                <p className="text-xs text-[#6F6660] font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
