import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Check,
  Sparkles,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';

export const CheckoutSection: React.FC = () => {
  const {
    cart,
    formatPrice,
    discountPercentage,
    isGiftWrapped,
    user,
    placeOrder,
    setActiveTab,
    setIsCartOpen
  } = useShop();

  // Contact & Address
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user.savedAddresses[0]?.fullName || 'Evans Osei Kwaku',
    addressLine1: user.savedAddresses[0]?.addressLine1 || 'Old Suame',
    addressLine2: user.savedAddresses[0]?.addressLine2 || '',
    city: user.savedAddresses[0]?.city || 'Kumasi',
    state: user.savedAddresses[0]?.state || 'Ashanti',
    zipCode: user.savedAddresses[0]?.zipCode || '00233',
    country: 'Ghana',
    phone: user.savedAddresses[0]?.phone || '0545419320',
    email: user.email || 'evansoseikwaku@gmail.com'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'Standard' | 'Express Air' | 'Carbon Neutral'>('Standard');

  // Payment Option: credit_card | apple_pay | google_pay | klarna | momo
  const [paymentType, setPaymentType] = useState<'credit_card' | 'apple_pay' | 'google_pay' | 'klarna' | 'momo'>('momo');
  const [momoProvider, setMomoProvider] = useState<'MTN' | 'Telecel'>('MTN');
  const [momoNumber, setMomoNumber] = useState('0545419320');
  const [momoTxId, setMomoTxId] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardHolder, setCardHolder] = useState('ALEXANDER WRIGHT');
  const [expDate, setExpDate] = useState('08/28');
  const [cvv, setCvv] = useState('123');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessAnimation, setIsSuccessAnimation] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  
  let shippingCost = 0;
  if (shippingMethod === 'Standard') shippingCost = subtotal >= 75 ? 0 : 8.00;
  if (shippingMethod === 'Express Air') shippingCost = 14.00;
  if (shippingMethod === 'Carbon Neutral') shippingCost = 4.00;

  const giftWrapCost = isGiftWrapped ? 5.00 : 0;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = subtotal - discountAmount + shippingCost + giftWrapCost + tax;

  const autoFillSample = () => {
    setAddress({
      fullName: 'Alexander Wright',
      addressLine1: '742 Evergreen Terrace',
      addressLine2: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'United States',
      phone: '+1 (503) 555-0182',
      email: 'a.wright@oseiliving.com'
    });
    setCardNumber('4242 4242 4242 4242');
    setCardHolder('ALEXANDER WRIGHT');
    setExpDate('08/28');
    setCvv('123');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 1.5s secure payment gateway handshake
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessAnimation(true);

      setTimeout(() => {
        placeOrder({
          shippingAddress: address,
          shippingMethod,
          shippingCost,
          tax,
          giftWrapCost,
          total: grandTotal,
          paymentMethod: {
            type: paymentType,
            brand: paymentType === 'momo' ? `${momoProvider} MoMo (${momoNumber})` : paymentType === 'credit_card' ? 'Visa' : paymentType === 'apple_pay' ? 'Apple Pay' : paymentType === 'google_pay' ? 'Google Pay' : 'Klarna',
            last4: paymentType === 'momo' ? (momoNumber.slice(-4) || '9320') : paymentType === 'credit_card' ? cardNumber.slice(-4) : '4242'
          }
        });
      }, 1000);
    }, 1500);
  };

  if (cart.length === 0 && !isSuccessAnimation) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-semibold text-[#1C1917]">Your bag is currently empty</h2>
        <p className="text-xs text-stone-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="bg-[#1C1917] text-[#FAF9F5] px-6 py-2.5 rounded-full text-xs font-medium uppercase hover:bg-[#38332E]"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-section-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E0]">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 text-xs font-medium text-[#6B645C] hover:text-[#1C1917]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Quick Auto-Fill Banner */}
          <div className="p-4 rounded-2xl bg-[#F2EFE9] border border-[#E2DDD5] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#2C2723]">
              <Sparkles className="w-4 h-4 text-[#8C7A6B]" />
              <span>Testing checkout? Click to auto-fill sample info:</span>
            </div>
            <button
              type="button"
              onClick={autoFillSample}
              className="px-3 py-1 bg-[#1C1917] text-[#FAF9F5] text-xs font-medium rounded-lg hover:bg-[#38332E]"
            >
              Auto-Fill Sample
            </button>
          </div>

          <form onSubmit={handleSubmitCheckout} className="space-y-8">
            
            {/* Step 1: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-[#1C1917] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#FAF9F5] text-xs font-mono flex items-center justify-center">1</span>
                <span>Contact & Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">Email Address</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#6B645C] font-mono mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">Apartment / Suite (Optional)</label>
                  <input
                    type="text"
                    value={address.addressLine2 || ''}
                    onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">State / Province</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B645C] font-mono mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    required
                    className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E0]">
              <h3 className="text-lg font-serif font-semibold text-[#1C1917] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#FAF9F5] text-xs font-mono flex items-center justify-center">2</span>
                <span>Select Delivery Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'Standard'
                    ? 'border-[#1C1917] bg-[#F2EFE9] ring-1 ring-[#1C1917]'
                    : 'border-[#E7E5E0] hover:border-stone-400'
                }`}>
                  <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#8C7A6B]" />
                      Standard
                    </span>
                    <span className="font-mono">{subtotal >= 75 ? 'FREE' : formatPrice(8)}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] mt-1">3-5 Business Days</p>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'Standard'}
                    onChange={() => setShippingMethod('Standard')}
                    className="hidden"
                  />
                </label>

                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'Express Air'
                    ? 'border-[#1C1917] bg-[#F2EFE9] ring-1 ring-[#1C1917]'
                    : 'border-[#E7E5E0] hover:border-stone-400'
                }`}>
                  <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Express Air
                    </span>
                    <span className="font-mono">{formatPrice(14)}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] mt-1">1-2 Business Days</p>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'Express Air'}
                    onChange={() => setShippingMethod('Express Air')}
                    className="hidden"
                  />
                </label>

                <label className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'Carbon Neutral'
                    ? 'border-[#1C1917] bg-[#F2EFE9] ring-1 ring-[#1C1917]'
                    : 'border-[#E7E5E0] hover:border-stone-400'
                }`}>
                  <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      Eco Carbon Free
                    </span>
                    <span className="font-mono">{formatPrice(4)}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] mt-1">3-4 Days (Offset)</p>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'Carbon Neutral'}
                    onChange={() => setShippingMethod('Carbon Neutral')}
                    className="hidden"
                  />
                </label>

              </div>
            </div>

            {/* Step 3: Secure Payment Options */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E0]">
              <h3 className="text-lg font-serif font-semibold text-[#1C1917] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#FAF9F5] text-xs font-mono flex items-center justify-center">3</span>
                <span>Secure Payment Gateway</span>
              </h3>

              {/* Payment Type Selection Tabs */}
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentType('momo')}
                  className={`py-2.5 px-2 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentType === 'momo'
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-600 shadow-sm'
                      : 'bg-[#FAF9F5] text-[#2C2723] border-[#E7E5E0] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>MoMo Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('credit_card')}
                  className={`py-2.5 px-2 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentType === 'credit_card'
                      ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                      : 'bg-[#FAF9F5] text-[#2C2723] border-[#E7E5E0] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('apple_pay')}
                  className={`py-2.5 px-2 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentType === 'apple_pay'
                      ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                      : 'bg-[#FAF9F5] text-[#2C2723] border-[#E7E5E0] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <span className="font-bold tracking-tighter text-sm"> Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('google_pay')}
                  className={`py-2.5 px-2 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentType === 'google_pay'
                      ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                      : 'bg-[#FAF9F5] text-[#2C2723] border-[#E7E5E0] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <span className="font-bold text-sm">G Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('klarna')}
                  className={`py-2.5 px-2 rounded-xl border font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentType === 'klarna'
                      ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                      : 'bg-[#FAF9F5] text-[#2C2723] border-[#E7E5E0] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <span className="font-bold text-xs bg-pink-100 text-pink-900 px-1.5 py-0.5 rounded">Klarna</span>
                </button>
              </div>

              {/* MoMo Mobile Money Details */}
              {paymentType === 'momo' && (
                <div className="p-5 bg-gradient-to-br from-[#2C2723] to-[#1C1917] text-[#FAF9F5] rounded-2xl border border-amber-900/40 space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-serif font-bold text-amber-200">Mobile Money (MoMo) Payment</h4>
                        <p className="text-[11px] text-stone-400 font-mono">Instant Mobile Transfer</p>
                      </div>
                    </div>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                      Official Account
                    </span>
                  </div>

                  {/* Merchant Details Box */}
                  <div className="bg-[#1C1917] p-4 rounded-xl border border-stone-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-stone-300">
                      <span className="text-stone-500 uppercase text-[10px]">Account Name:</span>
                      <span className="font-bold text-amber-200 text-sm">Evans Osei Kwaku</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-800/80">
                      <div className="p-3 bg-[#24201C] rounded-lg border border-amber-500/40">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase text-amber-400">MTN Mobile Money</span>
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        </div>
                        <p className="text-base font-bold text-white tracking-widest">0545419320</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">Name: Evans Osei Kwaku</p>
                      </div>

                      <div className="p-3 bg-[#24201C] rounded-lg border border-rose-500/40">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase text-rose-400">TELECEL CASH</span>
                          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                        </div>
                        <p className="text-base font-bold text-white tracking-widest">0505374443</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">Name: Evans Osei Kwaku</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions and Verification Inputs */}
                  <div className="space-y-3 pt-1 text-xs">
                    <p className="text-[11px] text-amber-100/90 leading-relaxed">
                      Please send <strong className="text-amber-300 font-mono text-xs">{formatPrice(grandTotal)}</strong> to either account above, then enter your sender phone number below for verification:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-400 font-mono text-[10px] uppercase mb-1">Network Selected</label>
                        <select
                          value={momoProvider}
                          onChange={(e) => setMomoProvider(e.target.value as 'MTN' | 'Telecel')}
                          className="w-full bg-[#1C1917] border border-stone-700 rounded-xl px-3 py-2 text-amber-200 font-mono focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="MTN">MTN Mobile Money (0545419320)</option>
                          <option value="Telecel">Telecel Cash (0505374443)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-400 font-mono text-[10px] uppercase mb-1">Your Sender MoMo Number</label>
                        <input
                          type="tel"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder="e.g. 0545419320"
                          required={paymentType === 'momo'}
                          className="w-full bg-[#1C1917] border border-stone-700 rounded-xl px-3.5 py-2 text-stone-200 font-mono focus:outline-none focus:border-amber-400 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-400 font-mono text-[10px] uppercase mb-1">MoMo Transaction ID / Ref (Optional)</label>
                      <input
                        type="text"
                        value={momoTxId}
                        onChange={(e) => setMomoTxId(e.target.value)}
                        placeholder="e.g. 28491823901 or Osei Order"
                        className="w-full bg-[#1C1917] border border-stone-700 rounded-xl px-3.5 py-2 text-stone-200 font-mono focus:outline-none focus:border-amber-400 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Card Form & Card Visualizer */}
              {paymentType === 'credit_card' && (
                <div className="space-y-4 pt-2">
                  
                  {/* Simulated Chip Card Preview */}
                  <div className="w-full sm:w-80 h-44 rounded-2xl bg-gradient-to-tr from-[#1C1917] via-[#38332E] to-[#61564C] text-[#FAF9F5] p-5 shadow-xl flex flex-col justify-between font-mono relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-widest text-amber-200">OSEI SECURE</span>
                      <span className="text-sm font-bold tracking-widest uppercase">VISA</span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-8 h-6 rounded bg-amber-300/80 mb-2"></div>
                      <p className="text-sm tracking-widest font-semibold">{cardNumber || '•••• •••• •••• ••••'}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-300">
                      <span>{cardHolder || 'YOUR NAME'}</span>
                      <span>EXP: {expDate || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-[#6B645C] font-mono mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4242 4242 4242 4242"
                        required
                        className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] font-mono focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B645C] font-mono mb-1">Expiration Date</label>
                      <input
                        type="text"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] font-mono focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#6B645C] font-mono mb-1">CVV / Security Code</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.substring(0, 4))}
                        placeholder="123"
                        required
                        className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl px-3.5 py-2.5 text-[#1C1917] font-mono focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'apple_pay' && (
                <div className="p-6 bg-[#F4F1EA] rounded-2xl border border-[#E2DDD5] text-center space-y-2">
                  <p className="text-xs font-medium text-[#1C1917]">Double click side button to complete with Apple Pay.</p>
                  <p className="text-[11px] text-stone-500">Connected to your Apple Wallet default card.</p>
                </div>
              )}

              {paymentType === 'google_pay' && (
                <div className="p-6 bg-[#F4F1EA] rounded-2xl border border-[#E2DDD5] text-center space-y-2">
                  <p className="text-xs font-medium text-[#1C1917]">Pay instantly with your Google Account saved credentials.</p>
                  <p className="text-[11px] text-stone-500">Verified via Google Pay Security Shield.</p>
                </div>
              )}

              {paymentType === 'klarna' && (
                <div className="p-6 bg-pink-50 rounded-2xl border border-pink-200 text-center space-y-2">
                  <p className="text-xs font-semibold text-pink-900">
                    Pay in 4 interest-free payments of {formatPrice(grandTotal / 4)}
                  </p>
                  <p className="text-[11px] text-pink-700">No interest, no impact on credit score when paid on time.</p>
                </div>
              )}

            </div>

            {/* Place Order Submit Button */}
            <div className="pt-4">
              <button
                id="place-secure-order-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#1C1917] text-[#FAF9F5] py-4 rounded-2xl text-xs font-medium uppercase tracking-widest hover:bg-[#38332E] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authorizing Payment Handshake...</span>
                  </>
                ) : isSuccessAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Payment Verified! Generating Invoice...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Authorize & Place Order • {formatPrice(grandTotal)}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Order Summary Sticky Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#F4F1EA] rounded-3xl border border-[#E7E5E0] p-6 space-y-6">
            <h3 className="text-base font-serif font-semibold text-[#1C1917]">
              Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h3>

            {/* Item List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex gap-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-stone-200" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#1C1917]">{item.name}</p>
                    <p className="text-stone-500 text-[11px] font-mono">
                      US {item.selectedSize} • {item.selectedColor.name} • Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-[#1C1917]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#6B645C] border-t border-[#E2DDD5] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1C1917]">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              {isGiftWrapped && (
                <div className="flex justify-between">
                  <span>Linen Gift Wrapping</span>
                  <span className="font-mono">+ {formatPrice(5)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod})</span>
                <span className="font-mono text-[#1C1917]">
                  {shippingCost === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono text-[#1C1917]">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#1C1917] pt-3 border-t border-[#E2DDD5]">
                <span>Total Due</span>
                <span className="font-mono text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#E7E5E0] text-[11px] text-stone-500 space-y-1">
              <p className="font-medium text-[#1C1917]">30-Day Risk-Free Home Trial Guarantee</p>
              <p>Wear your Osei Slippers indoors for 30 days. If you don’t feel 100% satisfied, return them for a full refund.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
