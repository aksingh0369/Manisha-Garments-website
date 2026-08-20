import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ArrowRight, 
  Tag, 
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    coupon, 
    applyCoupon, 
    removeCoupon, 
    clearCart, 
    setLastCompletedOrder,
    showToast,
    openWhatsApp
  } = useShop();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [couponInput, setCouponInput] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    address: 'Flat 402, Royal Palms Residency, Greater Kailash 2',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110048',
    paymentMethod: 'upi' as 'upi' | 'cod' | 'card' | 'netbanking',
    specialNotes: 'Please ensure safe bridal packaging with double cover.'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all mandatory delivery details.', 'error');
      return;
    }

    if (formData.phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    const orderId = `MG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();

    const order: OrderDetails = {
      orderId,
      items: [...cart],
      customer: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      paymentMethod: formData.paymentMethod,
      orderDate: now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: 'Confirmed'
    };

    setCompletedOrder(order);
    setLastCompletedOrder(order);
    clearCart();
    setStep('success');
    showToast(`Order ${orderId} placed successfully!`, 'success');
  };

  const handleCopyOrderId = () => {
    if (completedOrder?.orderId) {
      navigator.clipboard.writeText(completedOrder.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('Order ID copied to clipboard', 'info');
    }
  };

  const handleWhatsAppOrderConfirmation = () => {
    if (!completedOrder) return;
    const phone = '919899025177';
    const text = `Namaste Manisha Garments! I have just placed Order #${completedOrder.orderId} for ₹${completedOrder.total.toLocaleString('en-IN')} (${completedOrder.items.length} items). Please confirm dispatch details for ${completedOrder.customer.fullName}, ${completedOrder.customer.city}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          onClick={() => {
            if (step === 'success') {
              setIsCheckoutOpen(false);
              setStep('form');
            } else {
              setIsCheckoutOpen(false);
            }
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-xs shadow-2xl overflow-hidden z-10 border border-[#E9DED0] my-8 max-h-[90vh] flex flex-col"
        >
          
          {/* Top Bar */}
          <div className="p-5 bg-[#F8F4EC] border-b border-[#E9DED0] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#651F29] rounded-xs flex items-center justify-center text-white font-serif text-sm font-bold">
                M
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#171414]">
                  {step === 'form' ? 'Manisha Garments Express Checkout' : 'Order Confirmed!'}
                </h3>
                <p className="text-[11px] text-[#6F6660]">
                  {step === 'form' ? 'Secure 256-Bit Encrypted Indian Ethnic Couture Order' : 'Thank you for choosing Manisha Garments'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep('form');
              }}
              className="p-1.5 text-[#171414] hover:text-[#651F29] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 'form' ? (
              <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Form: Delivery & Payment Details (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Delivery Address Section */}
                  <div className="space-y-3">
                    <h4 className="font-serif-luxury text-base font-bold text-[#171414] flex items-center gap-2 border-b border-[#E9DED0] pb-2">
                      <Truck className="w-4 h-4 text-[#651F29]" />
                      <span>1. Shipping & Contact Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                          placeholder="e.g. Ananya Sharma"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                          Mobile Number (for SMS & OTP) *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                        Email Address (for invoice copy)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                        placeholder="yourname@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                        Complete Delivery Address (House No, Street, Landmark) *
                      </label>
                      <textarea
                        name="address"
                        required
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                        placeholder="Flat / House No., Apartment name, Street name"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          maxLength={6}
                          required
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                          placeholder="110048"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                          placeholder="New Delhi"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#171414] block mb-1">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs bg-[#F8F4EC] border border-[#E9DED0] focus:border-[#651F29] focus:outline-none rounded-xs"
                        >
                          <option value="Delhi">Delhi</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Other">Other State</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Mode Selection */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-serif-luxury text-base font-bold text-[#171414] flex items-center gap-2 border-b border-[#E9DED0] pb-2">
                      <CreditCard className="w-4 h-4 text-[#651F29]" />
                      <span>2. Select Payment Method</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Option 1: UPI */}
                      <label
                        className={`p-3.5 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'border-[#651F29] bg-[#F8F4EC] shadow-2xs'
                            : 'border-[#E9DED0] hover:border-[#651F29]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                          className="accent-[#651F29] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-[#171414] flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-[#128C7E]" />
                            UPI / Google Pay / PhonePe
                          </span>
                          <p className="text-[10px] text-[#6F6660]">
                            Instant zero-fee payment via any UPI QR code or app.
                          </p>
                        </div>
                      </label>

                      {/* Option 2: Cash on Delivery */}
                      <label
                        className={`p-3.5 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'border-[#651F29] bg-[#F8F4EC] shadow-2xs'
                            : 'border-[#E9DED0] hover:border-[#651F29]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="accent-[#651F29] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-[#171414] flex items-center gap-1.5">
                            <Banknote className="w-3.5 h-3.5 text-[#B59658]" />
                            Cash on Delivery (COD)
                          </span>
                          <p className="text-[10px] text-[#6F6660]">
                            Pay with cash or card upon doorstep delivery.
                          </p>
                        </div>
                      </label>

                      {/* Option 3: Cards */}
                      <label
                        className={`p-3.5 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#651F29] bg-[#F8F4EC] shadow-2xs'
                            : 'border-[#E9DED0] hover:border-[#651F29]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="accent-[#651F29] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-[#171414] flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-[#651F29]" />
                            Credit / Debit Cards
                          </span>
                          <p className="text-[10px] text-[#6F6660]">
                            Visa, Mastercard, RuPay & Amex accepted.
                          </p>
                        </div>
                      </label>

                      {/* Option 4: Net Banking */}
                      <label
                        className={`p-3.5 border rounded-xs flex items-start gap-3 cursor-pointer transition-all ${
                          formData.paymentMethod === 'netbanking'
                            ? 'border-[#651F29] bg-[#F8F4EC] shadow-2xs'
                            : 'border-[#E9DED0] hover:border-[#651F29]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={formData.paymentMethod === 'netbanking'}
                          onChange={handleInputChange}
                          className="accent-[#651F29] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs text-[#171414] flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#651F29]" />
                            Net Banking
                          </span>
                          <p className="text-[10px] text-[#6F6660]">
                            HDFC, ICICI, SBI, Axis and 50+ banks.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Right Summary: Order Items & Pricing Breakdown (5 cols) */}
                <div className="lg:col-span-5 bg-[#F8F4EC] p-5 rounded-xs border border-[#E9DED0] space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury text-base font-bold text-[#171414] border-b border-[#E9DED0] pb-2 flex items-center justify-between">
                      <span>Order Summary</span>
                      <span className="text-xs font-normal text-[#6F6660]">({cart.length} items)</span>
                    </h4>

                    {/* Items miniature list */}
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {cart.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-white p-2 border border-[#E9DED0] rounded-xs">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-12 h-14 object-cover rounded-xs shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-semibold text-[#171414] truncate">{item.product.name}</h5>
                            <p className="text-[10px] text-[#6F6660]">
                              Qty: {item.quantity} | {item.selectedSize}
                            </p>
                            <span className="text-xs font-bold text-[#171414]">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Box */}
                    <div className="pt-2">
                      {coupon ? (
                        <div className="flex items-center justify-between p-2 bg-white border border-[#B59658] rounded-xs text-xs">
                          <span className="text-[#651F29] font-bold">
                            Coupon {coupon.code} (-₹{cartDiscount.toLocaleString('en-IN')})
                          </span>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-xs text-[#6F6660] hover:text-black underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Discount Code"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E9DED0] uppercase rounded-xs"
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="px-3 py-1.5 bg-[#171414] text-white text-xs font-bold uppercase rounded-xs hover:bg-[#651F29]"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-1.5 text-xs text-[#6F6660] pt-2 border-t border-[#E9DED0]">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-semibold text-[#171414]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {cartDiscount > 0 && (
                        <div className="flex justify-between text-[#128C7E] font-medium">
                          <span>Applied Savings</span>
                          <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Doorstep Shipping</span>
                        {cartShipping === 0 ? (
                          <span className="font-bold text-[#128C7E]">FREE</span>
                        ) : (
                          <span className="font-semibold text-[#171414]">₹{cartShipping}</span>
                        )}
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#171414] pt-2 border-t border-[#E9DED0]">
                        <span>Grand Total</span>
                        <span className="text-lg text-[#651F29]">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 space-y-2">
                    <button
                      id="checkout-confirm-place-order-btn"
                      type="submit"
                      className="w-full py-4 bg-[#651F29] hover:bg-[#8B0000] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#B59658]/40"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#B59658]" />
                      <span>PLACE ORDER (₹{cartTotal.toLocaleString('en-IN')})</span>
                    </button>
                    <p className="text-[10px] text-center text-[#6F6660]">
                      🔒 100% Secure Checkout • Authentic Handloom Guarantee
                    </p>
                  </div>

                </div>

              </form>
            ) : (
              /* Success Screen */
              <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-[#128C7E]/10 border border-[#128C7E] text-[#128C7E] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#B59658]">
                    Order Placed Successfully
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171414]">
                    Thank You, {completedOrder?.customer.fullName}!
                  </h3>
                  <p className="text-xs text-[#6F6660] max-w-md mx-auto">
                    Your bespoke ethnic outfits are being prepared with care by the master karigars of Manisha Garments.
                  </p>
                </div>

                {/* Order ID Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#F8F4EC] border border-[#B59658]/40 rounded-xs">
                  <span className="text-xs font-medium text-[#6F6660]">Order ID:</span>
                  <span className="font-mono text-sm font-bold text-[#651F29]">{completedOrder?.orderId}</span>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-1 hover:text-[#651F29] transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#128C7E]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Order Summary Card */}
                <div className="bg-[#F8F4EC] p-6 border border-[#E9DED0] rounded-xs text-left space-y-4 max-w-lg mx-auto text-xs">
                  <div className="grid grid-cols-2 gap-4 border-b border-[#E9DED0] pb-3">
                    <div>
                      <span className="text-[10px] text-[#6F6660] uppercase block">Delivery To:</span>
                      <strong className="text-[#171414] block">{completedOrder?.customer.fullName}</strong>
                      <p className="text-[#6F6660] leading-snug">{completedOrder?.customer.address}, {completedOrder?.customer.city}, {completedOrder?.customer.pincode}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F6660] uppercase block">Contact & Payment:</span>
                      <strong className="text-[#171414] block">+91 {completedOrder?.customer.phone}</strong>
                      <p className="text-[#6F6660] uppercase">{completedOrder?.paymentMethod} • ₹{completedOrder?.total.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Items miniature */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#6F6660] uppercase font-bold block">Ordered Outfits:</span>
                    {completedOrder?.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span>{it.quantity}x {it.product.name} ({it.selectedSize})</span>
                        <span className="font-bold">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Order Confirmation Button */}
                <div className="pt-2 max-w-md mx-auto space-y-3">
                  <button
                    onClick={handleWhatsAppOrderConfirmation}
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order Receipt to WhatsApp (+91 9899025177)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setStep('form');
                    }}
                    className="w-full py-2.5 bg-white border border-[#E9DED0] hover:bg-[#F8F4EC] text-xs font-bold uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
                  >
                    Continue Exploring Collections
                  </button>
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
