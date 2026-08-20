import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OrderLookupModal: React.FC = () => {
  const { isOrderLookupOpen, setIsOrderLookupOpen, lastCompletedOrder, showToast } = useShop();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      showToast('Please enter an Order ID or Mobile Number', 'error');
      return;
    }

    setSearched(true);
    if (
      lastCompletedOrder &&
      (lastCompletedOrder.orderId.toLowerCase().includes(query.trim().toLowerCase()) ||
        lastCompletedOrder.customer.phone.includes(query.trim()))
    ) {
      setFoundOrder(lastCompletedOrder);
    } else {
      // Demo order fallback for demonstration
      setFoundOrder({
        orderId: query.startsWith('MG') ? query : `MG-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'In Transit / Out for Delivery',
        courier: 'Blue Dart Express (AWB #8928392182)',
        orderDate: 'Aug 18, 2026',
        estimatedDelivery: 'Tomorrow by 4:00 PM',
        destination: 'Greater Kailash, New Delhi',
        itemsSummary: '1x Kanjivaram Pure Silk Zari Saree',
        stages: [
          { title: 'Order Confirmed & Weaving QC', time: 'Aug 18, 11:30 AM', done: true },
          { title: 'Artisanal Finishing & Custom Steam Press', time: 'Aug 19, 02:15 PM', done: true },
          { title: 'Dispatched via Express Courier', time: 'Aug 19, 06:40 PM', done: true },
          { title: 'Out for Doorstep Delivery', time: 'Expected Tomorrow', done: false }
        ]
      });
    }
  };

  if (!isOrderLookupOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          onClick={() => setIsOrderLookupOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8"
        >
          {/* Header */}
          <div className="p-5 bg-[#F8F4EC] border-b border-[#E9DED0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#651F29]" />
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#171414]">
                Track Your Shipment & Order
              </h3>
            </div>
            <button
              onClick={() => setIsOrderLookupOpen(false)}
              className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 text-xs text-[#171414]">
            {/* Search Input Form */}
            <form onSubmit={handleSearch} className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block">
                Enter Order ID (e.g. MG-2026-8823) or 10-Digit Mobile Number:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MG-2026-8823 or 9876543210"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#651F29] hover:bg-[#8B0000] text-white font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  Track
                </button>
              </div>
            </form>

            {/* Results / Status Display */}
            {searched && foundOrder && (
              <div className="p-5 bg-[#F8F4EC] border border-[#E9DED0] rounded-xs space-y-4">
                <div className="flex items-start justify-between border-b border-[#E9DED0] pb-3">
                  <div>
                    <span className="text-[10px] text-[#6F6660] uppercase block">Order Identifier</span>
                    <strong className="font-mono text-sm text-[#651F29]">{foundOrder.orderId}</strong>
                  </div>
                  <span className="px-2.5 py-1 bg-[#128C7E]/10 text-[#128C7E] border border-[#128C7E]/30 rounded-xs font-bold text-[11px]">
                    ● Active Shipment
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-[#6F6660] block">Estimated Delivery:</span>
                    <strong className="text-[#171414]">{foundOrder.estimatedDelivery || 'In 2-3 Days'}</strong>
                  </div>
                  <div>
                    <span className="text-[#6F6660] block">Carrier / Courier:</span>
                    <strong className="text-[#171414]">{foundOrder.courier || 'Express Handloom Dispatch'}</strong>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-2 space-y-3">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[#6F6660] block">
                    Shipment Progress
                  </span>

                  <div className="space-y-3 pl-2 border-l-2 border-[#651F29]/30">
                    {(foundOrder.stages || [
                      { title: 'Order Confirmed', time: 'Completed', done: true },
                      { title: 'Quality Inspection & Ironing', time: 'Completed', done: true },
                      { title: 'Dispatched from Delhi Hub', time: 'In Progress', done: true },
                      { title: 'Delivered', time: 'Pending', done: false }
                    ]).map((st: any, idx: number) => (
                      <div key={idx} className="relative pl-4">
                        <div
                          className={`w-2.5 h-2.5 rounded-full absolute -left-[17px] top-1 ${
                            st.done ? 'bg-[#651F29]' : 'bg-[#E9DED0] border border-[#6F6660]'
                          }`}
                        />
                        <div className="flex items-baseline justify-between">
                          <strong className={`block ${st.done ? 'text-[#171414]' : 'text-[#6F6660]'}`}>
                            {st.title}
                          </strong>
                          <span className="text-[10px] text-[#6F6660]">{st.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
