import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, CheckCircle, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, openWhatsApp } = useShop();
  const [activeTab, setActiveTab] = useState<'sarees' | 'lehengas' | 'gents' | 'kids'>('sarees');

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          onClick={() => setIsSizeGuideOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8"
        >
          {/* Header */}
          <div className="p-6 bg-[#F8F4EC] border-b border-[#E9DED0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xs bg-[#651F29] text-white flex items-center justify-center">
                <Ruler className="w-4 h-4 text-[#B59658]" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#171414]">
                  Ethnic Sizing & Measurement Guide
                </h3>
                <p className="text-xs text-[#6F6660]">
                  Find your flawless bespoke fit for all festive and wedding wear.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E9DED0] bg-[#FFFFFF] px-6">
            <button
              onClick={() => setActiveTab('sarees')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'sarees'
                  ? 'border-[#651F29] text-[#651F29]'
                  : 'border-transparent text-[#6F6660] hover:text-[#171414]'
              }`}
            >
              Sarees & Blouses
            </button>
            <button
              onClick={() => setActiveTab('lehengas')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'lehengas'
                  ? 'border-[#651F29] text-[#651F29]'
                  : 'border-transparent text-[#6F6660] hover:text-[#171414]'
              }`}
            >
              Lehengas
            </button>
            <button
              onClick={() => setActiveTab('gents')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'gents'
                  ? 'border-[#651F29] text-[#651F29]'
                  : 'border-transparent text-[#6F6660] hover:text-[#171414]'
              }`}
            >
              Gents Kurta / Sherwani
            </button>
            <button
              onClick={() => setActiveTab('kids')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === 'kids'
                  ? 'border-[#651F29] text-[#651F29]'
                  : 'border-transparent text-[#6F6660] hover:text-[#171414]'
              }`}
            >
              Kids & Girls
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-xs text-[#171414]">
            
            {activeTab === 'sarees' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#F8F4EC] rounded-xs border border-[#E9DED0] space-y-1">
                  <span className="font-bold text-[#651F29] block">Standard Saree Dimensions</span>
                  <p className="text-[#6F6660]">
                    All authentic handloom & silk sarees at Manisha Garments are <strong>5.5 Meters</strong> in length, paired with an unstitched <strong>0.8 Meter</strong> matching blouse piece with detailed border work.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[#171414] mb-2">
                    Blouse Ready-to-Wear Size Chart (Inches)
                  </h4>
                  <div className="border border-[#E9DED0] rounded-xs overflow-hidden">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-[#E9DED0]/50 font-bold text-[#171414]">
                          <th className="p-2.5 border-b border-[#E9DED0]">Size</th>
                          <th className="p-2.5 border-b border-[#E9DED0]">Bust (in)</th>
                          <th className="p-2.5 border-b border-[#E9DED0]">Underbust / Waist</th>
                          <th className="p-2.5 border-b border-[#E9DED0]">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9DED0]">
                        <tr><td className="p-2.5 font-bold">S (34-36)</td><td className="p-2.5">34" - 36"</td><td className="p-2.5">28" - 30"</td><td className="p-2.5">14.0"</td></tr>
                        <tr><td className="p-2.5 font-bold">M (38)</td><td className="p-2.5">38"</td><td className="p-2.5">32"</td><td className="p-2.5">14.5"</td></tr>
                        <tr><td className="p-2.5 font-bold">L (40)</td><td className="p-2.5">40"</td><td className="p-2.5">34"</td><td className="p-2.5">15.0"</td></tr>
                        <tr><td className="p-2.5 font-bold">XL (42)</td><td className="p-2.5">42"</td><td className="p-2.5">36"</td><td className="p-2.5">15.5"</td></tr>
                        <tr><td className="p-2.5 font-bold">XXL (44)</td><td className="p-2.5">44"</td><td className="p-2.5">38"</td><td className="p-2.5">16.0"</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lehengas' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#F8F4EC] rounded-xs border border-[#E9DED0] space-y-1">
                  <span className="font-bold text-[#651F29] block">Semi-Stitched & Custom Lehengas</span>
                  <p className="text-[#6F6660]">
                    Our lehengas feature an adjustable waist tie (Dori & Latkan) accommodating waists from 28" up to 42". Length is standard 42"–44" with double can-can flares.
                  </p>
                </div>

                <div className="border border-[#E9DED0] rounded-xs overflow-hidden">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-[#E9DED0]/50 font-bold text-[#171414]">
                        <th className="p-2.5 border-b border-[#E9DED0]">Lehenga Size</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Waist</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Length</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Flare (Gher)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DED0]">
                      <tr><td className="p-2.5 font-bold">Standard Semi-Stitched</td><td className="p-2.5">Up to 42"</td><td className="p-2.5">42" - 44"</td><td className="p-2.5">3.5m - 4.5m</td></tr>
                      <tr><td className="p-2.5 font-bold">Custom Tailored</td><td className="p-2.5">Any measurement</td><td className="p-2.5">Custom to height</td><td className="p-2.5">4.0m+ Double Can-Can</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gents' && (
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-[#171414]">
                  Men’s Kurta & Indo-Western Sizing (Inches)
                </h4>
                <div className="border border-[#E9DED0] rounded-xs overflow-hidden">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-[#E9DED0]/50 font-bold text-[#171414]">
                        <th className="p-2.5 border-b border-[#E9DED0]">Size</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Chest (in)</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Kurta Length</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DED0]">
                      <tr><td className="p-2.5 font-bold">S (36)</td><td className="p-2.5">36"</td><td className="p-2.5">38"</td><td className="p-2.5">17.0"</td></tr>
                      <tr><td className="p-2.5 font-bold">M (38)</td><td className="p-2.5">38"</td><td className="p-2.5">40"</td><td className="p-2.5">17.5"</td></tr>
                      <tr><td className="p-2.5 font-bold">L (40)</td><td className="p-2.5">40"</td><td className="p-2.5">42"</td><td className="p-2.5">18.0"</td></tr>
                      <tr><td className="p-2.5 font-bold">XL (42)</td><td className="p-2.5">42"</td><td className="p-2.5">43"</td><td className="p-2.5">18.5"</td></tr>
                      <tr><td className="p-2.5 font-bold">XXL (44)</td><td className="p-2.5">44"</td><td className="p-2.5">44"</td><td className="p-2.5">19.0"</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'kids' && (
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-[#171414]">
                  Kids & Girls Ethnic Wear by Age Group
                </h4>
                <div className="border border-[#E9DED0] rounded-xs overflow-hidden">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-[#E9DED0]/50 font-bold text-[#171414]">
                        <th className="p-2.5 border-b border-[#E9DED0]">Age Group</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Chest</th>
                        <th className="p-2.5 border-b border-[#E9DED0]">Height Approx</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DED0]">
                      <tr><td className="p-2.5 font-bold">3 - 4 Years</td><td className="p-2.5">22" - 24"</td><td className="p-2.5">98 - 104 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">5 - 6 Years</td><td className="p-2.5">24" - 26"</td><td className="p-2.5">110 - 116 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">7 - 8 Years</td><td className="p-2.5">26" - 28"</td><td className="p-2.5">122 - 128 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">9 - 10 Years</td><td className="p-2.5">28" - 30"</td><td className="p-2.5">134 - 140 cm</td></tr>
                      <tr><td className="p-2.5 font-bold">11 - 12 Years</td><td className="p-2.5">30" - 32"</td><td className="p-2.5">146 - 152 cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Custom Tailoring CTA */}
            <div className="bg-[#F8F4EC] p-4 border border-[#B59658]/40 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="font-bold text-[#651F29] block">Need Custom Tailoring or Bridal Fitting?</span>
                <p className="text-[11px] text-[#6F6660]">
                  Our master karigars provide bespoke stitching via WhatsApp video call.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSizeGuideOpen(false);
                  openWhatsApp();
                }}
                className="px-4 py-2 bg-[#128C7E] text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#075E54] flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Talk to Tailor</span>
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-[#E9DED0] flex justify-end">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-6 py-2 bg-[#171414] text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#651F29] transition-colors cursor-pointer"
            >
              Got it, Close Guide
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
