import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getFootwearRecommendation } from '../services/aiAdvisor';

export const FitAssistantModal: React.FC = () => {
  const {
    isFitAssistantOpen,
    setIsFitAssistantOpen,
    products,
    setQuickViewProductId,
    setSelectedProductId,
    addToCart,
    formatPrice
  } = useShop();

  const [floorType, setFloorType] = useState('Hardwood Timber');
  const [warmthPreference, setWarmthPreference] = useState('Cozy All-Season');
  const [supportNeeds, setSupportNeeds] = useState('Medium Ergonomic Arch Support');
  const [lifestyle, setLifestyle] = useState('Working From Home & Lounging');
  
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);

  if (!isFitAssistantOpen) return null;

  const handleConsultAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await getFootwearRecommendation({
        floorType,
        warmthPreference,
        supportNeeds,
        lifestyle,
      });
      setRecommendation(data);
    } catch (err) {
      console.warn('Fallback to default recommendation', err);
      setRecommendation({
        recommendationTitle: "The Artisan Braided Toe-Ring Sandal",
        recommendedProductId: "ryte-braided-toering-01",
        keyBenefit: "Moisture-wicking vegetable-tanned leather footbed with ergonomic toe-ring stability",
        detailedReasoning: "Based on your floor preference and desired comfort, white calfskin leather regulates foot temperature seamlessly while the contoured tan leather sole dampens joint pressure.",
        sizingAdvice: "True to size. Choose one size up if you prefer extra heel clearance."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const matchedProduct = recommendation
    ? products.find(p => p.id === recommendation.recommendedProductId) || products[1]
    : null;

  return (
    <div id="fit-assistant-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsFitAssistantOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E2DDD5] text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1C1917] text-amber-200 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#1C1917]">Osei AI Fit & Ergonomics Advisor</h3>
            <p className="text-xs text-stone-500 font-mono">Personalized footwear recommendation based on your home floor type & arch needs.</p>
          </div>
        </div>

        {!recommendation ? (
          <form onSubmit={handleConsultAI} className="space-y-4 text-xs">
            
            <div>
              <label className="block text-[#6B645C] font-mono mb-1.5">Primary Home Floor Surface:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Hardwood Timber', 'Ceramic / Marble Tile', 'Carpet & Rugs', 'Patio & Outdoor Deck'].map(surface => (
                  <button
                    key={surface}
                    type="button"
                    onClick={() => setFloorType(surface)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                      floorType === surface
                        ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                        : 'bg-[#F2EFE9] text-[#2C2723] border-[#E2DDD5] hover:border-stone-400'
                    }`}
                  >
                    {surface}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#6B645C] font-mono mb-1.5">Desired Warmth Rating:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Breathable Lightweight', 'Cozy All-Season', 'Maximum Thermal'].map(w => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWarmthPreference(w)}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      warmthPreference === w
                        ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                        : 'bg-[#F2EFE9] text-[#2C2723] border-[#E2DDD5] hover:border-stone-400'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#6B645C] font-mono mb-1.5">Foot Arch & Joint Support Need:</label>
              <div className="grid grid-cols-3 gap-2">
                {['Standard Cushioning', 'Medium Ergonomic Arch Support', 'High Orthopedic Arch Support'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSupportNeeds(s)}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                      supportNeeds === s
                        ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]'
                        : 'bg-[#F2EFE9] text-[#2C2723] border-[#E2DDD5] hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1C1917] text-[#FAF9F5] py-3.5 rounded-2xl text-xs font-medium uppercase tracking-wider hover:bg-[#38332E] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Footwear Ergonomics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Get AI Slipper Match</span>
                </>
              )}
            </button>

          </form>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 rounded-3xl bg-[#F4F1EA] border border-[#E7E5E0] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A6B] font-semibold">
                Your Ideal Ergonomic Match
              </span>
              <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                {recommendation.recommendationTitle || matchedProduct?.name}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {recommendation.detailedReasoning}
              </p>
              <div className="text-xs font-mono text-[#8C7A6B] pt-1">
                <strong>Sizing Tip:</strong> {recommendation.sizingAdvice || 'True to standard US footwear sizing.'}
              </div>
            </div>

            {matchedProduct && (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E5E0]">
                <img src={matchedProduct.images[0]} alt={matchedProduct.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 text-xs space-y-1">
                  <p className="font-serif font-semibold text-base text-[#1C1917]">{matchedProduct.name}</p>
                  <p className="text-stone-500">{matchedProduct.tagline}</p>
                  <p className="font-mono font-bold text-[#1C1917]">{formatPrice(matchedProduct.price)}</p>
                </div>
                <button
                  onClick={() => {
                    setIsFitAssistantOpen(false);
                    setSelectedProductId(matchedProduct.id);
                  }}
                  className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#38332E]"
                >
                  View Product
                </button>
              </div>
            )}

            <button
              onClick={() => setRecommendation(null)}
              className="w-full text-center text-xs text-stone-500 underline hover:text-stone-900"
            >
              Start Over with Different Specs
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
