import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Feather, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { setCategoryFilter, setIsFitAssistantOpen } = useShop();

  const scrollToProducts = () => {
    const gridEl = document.getElementById('product-catalog-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-banner" className="relative bg-[#FAF9F5] pt-6 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#E7E5E0] bg-[#FAF9F5]">
          
          {/* Hero Image Container */}
          <div className="relative h-[480px] sm:h-[560px] lg:h-[620px] w-full">
            <img
              src="/src/assets/images/tan_cross_hbuckle_slide_1786541914164.jpg"
              alt="Osei Handcrafted Leather Footwear"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Soft Warm Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/85 via-[#1C1917]/50 to-transparent flex items-center p-8 sm:p-14 lg:p-20">
              <div className="max-w-xl text-[#FAF9F5] space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5]/10 border border-[#FAF9F5]/20 backdrop-blur-md text-xs font-mono tracking-widest text-amber-100 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-200"></span>
                  Handcrafted Artisan Leather Collection
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-none font-semibold text-white">
                  Handcrafted Leather. <br />
                  <span className="italic font-normal text-amber-100">Uncompromised Luxury.</span>
                </h1>

                <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed max-w-lg">
                  Authentic full-grain calfskin sandals, horsebit slides, and woven leather mules. Individually hand-stitched for supreme arch comfort and timeless elegance.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    id="hero-explore-btn"
                    onClick={() => {
                      setCategoryFilter('All');
                      scrollToProducts();
                    }}
                    className="inline-flex items-center justify-center gap-3 bg-[#FAF9F5] text-[#1C1917] px-8 py-3.5 rounded-full text-xs font-medium tracking-wide uppercase hover:bg-stone-100 transition-all shadow-md group"
                  >
                    <span>Shop Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    id="hero-fit-advisor-btn"
                    onClick={() => setIsFitAssistantOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-[#1C1917]/60 hover:bg-[#1C1917]/90 text-[#FAF9F5] px-6 py-3.5 rounded-full text-xs font-medium border border-white/20 backdrop-blur-md transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Find My Ideal Fit</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Minimalist Key Value Bar Below Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E7E5E0] bg-[#F4F1EA] text-[#2C2723] text-xs font-medium">
            <div className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#8C7A6B]">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1C1917]">Zero-Gravity Cushioning</p>
                <p className="text-stone-500 text-xs mt-0.5">High-density shock absorption for hard timber & tile</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#8C7A6B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1C1917]">Ethically Sourced Wool & Leather</p>
                <p className="text-stone-500 text-xs mt-0.5">100% sustainable materials & hypoallergenic linings</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EAE5DC] flex items-center justify-center text-[#8C7A6B]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1C1917]">30-Day Risk-Free Trial</p>
                <p className="text-stone-500 text-xs mt-0.5">Complimentary shipping & effortless home returns</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
