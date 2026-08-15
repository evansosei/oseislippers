import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCategoryFilter, setActiveTab, setIsFitAssistantOpen, formatPrice } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer id="main-footer" className="bg-[#1C1917] text-[#FAF9F5] pt-16 pb-12 border-t border-[#38332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Banner Box */}
        <div className="bg-[#2C2723] rounded-3xl p-8 sm:p-12 border border-[#38332E] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-200 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Osei VIP Invitation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
              Unlock 15% Off Your First Pair.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Subscribe to the Osei Journal for exclusive seasonal releases, ergonomic health guides, and private member rewards.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1C1917] border border-[#38332E] text-xs text-[#FAF9F5] px-4 py-3.5 rounded-2xl focus:outline-none focus:border-amber-200 w-full sm:w-80"
            />
            <button
              type="submit"
              className="bg-[#FAF9F5] text-[#1C1917] px-6 py-3.5 rounded-2xl text-xs font-medium uppercase tracking-wider hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 font-mono whitespace-nowrap"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Code Sent: WELCOME15</span>
                </>
              ) : (
                <>
                  <span>Claim 15% Discount</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs pt-4 border-t border-[#2C2723]">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="text-xl font-serif font-bold tracking-widest text-white uppercase">OSEI</h4>
            <p className="text-stone-400 leading-relaxed font-light">
              Quiet luxury footwear engineered with ergonomic precision and minimalist aesthetics.
            </p>
            <div className="flex items-center gap-2 text-stone-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day Home Trial Guarantee</span>
            </div>
          </div>

          {/* Shop Collections */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-amber-200 font-semibold">Collections</h5>
            <ul className="space-y-2 text-stone-300 font-light">
              <li><button onClick={() => { setCategoryFilter('Toe-Ring Sandals'); setActiveTab('shop'); }} className="hover:text-white transition-colors">Toe-Ring Sandals</button></li>
              <li><button onClick={() => { setCategoryFilter('Criss-Cross Mules'); setActiveTab('shop'); }} className="hover:text-white transition-colors">Criss-Cross Mules</button></li>
              <li><button onClick={() => { setCategoryFilter('Luxury Slides'); setActiveTab('shop'); }} className="hover:text-white transition-colors">Luxury Horsebit & Monogram Slides</button></li>
              <li><button onClick={() => { setCategoryFilter('Slingback Sandals'); setActiveTab('shop'); }} className="hover:text-white transition-colors">Slingback Gladiator Sandals</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-amber-200 font-semibold">Customer Service</h5>
            <ul className="space-y-2 text-stone-300 font-light">
              <li><button onClick={() => setIsFitAssistantOpen(true)} className="hover:text-white transition-colors flex items-center gap-1"><span>AI Fit & Size Advisor</span> <Sparkles className="w-3 h-3 text-amber-300" /></button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Order History & Live Tracking</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Self-Service Returns & Exchanges</button></li>
              <li><span className="text-stone-400">Complimentary Shipping Over {formatPrice(75)}</span></li>
              <li><span className="text-stone-400">Care & Maintenance Guides</span></li>
            </ul>
          </div>

          {/* Contact & Accepted Payments */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-amber-200 font-semibold">Contact & Studio</h5>
            <p className="text-stone-300 font-light">
              Evans Osei Kwaku<br />
              Old Suame, Kumasi
            </p>
            <p className="text-stone-400 font-mono">evansoseikwaku@gmail.com</p>
            
            <div className="pt-2">
              <p className="text-[10px] font-mono uppercase text-stone-500 mb-1.5">Encrypted Payment Gateways:</p>
              <div className="flex flex-wrap gap-2 text-stone-300 font-mono text-[10px]">
                <span className="bg-[#2C2723] px-2 py-1 rounded border border-[#38332E]">Visa</span>
                <span className="bg-[#2C2723] px-2 py-1 rounded border border-[#38332E]">Mastercard</span>
                <span className="bg-[#2C2723] px-2 py-1 rounded border border-[#38332E]">Apple Pay</span>
                <span className="bg-[#2C2723] px-2 py-1 rounded border border-[#38332E]">Google Pay</span>
                <span className="bg-[#2C2723] px-2 py-1 rounded border border-[#38332E]">Klarna</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2C2723] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Osei Slippers Inc. All rights reserved.</p>
            <span className="hidden sm:inline text-stone-600">•</span>
            <p className="flex items-center justify-center gap-1 text-stone-300 font-medium">
              Made with <img src="/assets/images/red_heart.svg" alt="love" className="w-4 h-4 inline-block mx-0.5" referrerPolicy="no-referrer" /> by Evans Osei Kwaku
            </p>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
