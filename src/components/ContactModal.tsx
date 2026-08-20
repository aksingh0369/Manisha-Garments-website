import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, openWhatsApp, showToast } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry sent successfully! Our styling team will contact you shortly.', 'success');
  };

  if (!isContactOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          onClick={() => setIsContactOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-[#F8F4EC] border-b border-[#E9DED0] flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B59658] block">
                Get in Touch
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-[#171414]">
                Contact & Store Location
              </h3>
            </div>

            <button
              onClick={() => setIsContactOpen(false)}
              className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#171414]">
            
            {/* Left: Store Information */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-serif-luxury text-base font-bold text-[#171414]">
                  Manisha Garments Flagship Showroom
                </h4>
                <p className="text-[#6F6660] font-light leading-relaxed">
                  Visit us in New Delhi for bridal trousseau consultations, custom measurements, and festive family shopping.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#651F29] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171414]">Address</strong>
                    <p className="text-[#6F6660] leading-relaxed">
                      B-8, Gali No. 4, Near Chockan Mandir,<br />
                      Saurabh Vihar, Jaitpur, Badarpur,<br />
                      New Delhi – 110044
                    </p>
                    <a
                      href="https://maps.google.com/?q=Saurabh+Vihar+Jaitpur+Badarpur+New+Delhi+110044"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#651F29] font-bold inline-flex items-center gap-1 mt-1 hover:underline text-[11px]"
                    >
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#651F29] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171414]">Phone & WhatsApp Orders</strong>
                    <p className="text-[#6F6660]">
                      <a href="tel:9899025177" className="hover:text-[#651F29] font-medium">+91 9899025177</a>
                      <br />
                      <a href="tel:9899025137" className="hover:text-[#651F29] font-medium">+91 9899025137</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#651F29] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171414]">Store Timings</strong>
                    <p className="text-[#6F6660]">
                      Monday – Sunday: 10:00 AM – 9:00 PM<br />
                      (Open all 7 days during wedding and festive season)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <button
                onClick={() => openWhatsApp()}
                className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Video Consultation</span>
              </button>
            </div>

            {/* Right: Send Message Form */}
            <div className="bg-[#F8F4EC] p-5 rounded-xs border border-[#E9DED0] space-y-4">
              <h4 className="font-serif-luxury text-base font-bold text-[#171414]">
                Book Styling / Custom Stitching
              </h4>

              {submitted ? (
                <div className="p-6 text-center space-y-3 bg-white border border-[#E9DED0] rounded-xs">
                  <CheckCircle className="w-8 h-8 text-[#128C7E] mx-auto" />
                  <h5 className="font-serif-luxury font-bold text-[#171414] text-sm">Message Sent!</h5>
                  <p className="text-xs text-[#6F6660]">
                    Thank you, {name}. Our stylist will reach out on {phone} within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#651F29] underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Verma"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                      Outfit of Interest / Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Interested in custom bridal lehenga fitting for upcoming November wedding."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B59658]" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
