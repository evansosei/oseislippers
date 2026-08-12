import React from 'react';
import { X, Ruler, Footprints } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { us: 6, eu: 38, uk: 5, footLength: '9.25" / 23.5 cm' },
    { us: 7, eu: 39, uk: 6, footLength: '9.50" / 24.1 cm' },
    { us: 8, eu: 40, uk: 7, footLength: '9.80" / 24.9 cm' },
    { us: 9, eu: 41, uk: 8, footLength: '10.1" / 25.7 cm' },
    { us: 10, eu: 42, uk: 9, footLength: '10.4" / 26.5 cm' },
    { us: 11, eu: 43, uk: 10, footLength: '10.7" / 27.2 cm' },
    { us: 12, eu: 44, uk: 11, footLength: '11.0" / 27.9 cm' },
    { us: 13, eu: 45, uk: 12, footLength: '11.3" / 28.7 cm' },
  ];

  return (
    <div id="size-guide-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E2DDD5] text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#1C1917]">Osei Slipper Size Conversion Guide</h3>
            <p className="text-xs text-stone-500 font-mono">Standard Unisex US / EU / UK Sizing Chart</p>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E7E5E0] bg-[#F4F1EA]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#1C1917] text-[#FAF9F5] font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">US Size</th>
                <th className="p-3">EU Size</th>
                <th className="p-3">UK Size</th>
                <th className="p-3">Foot Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD5] font-mono text-[#2C2723]">
              {sizeChart.map(row => (
                <tr key={row.us} className="hover:bg-[#EAE5DC]">
                  <td className="p-3 font-bold">{row.us}</td>
                  <td className="p-3">{row.eu}</td>
                  <td className="p-3">{row.uk}</td>
                  <td className="p-3 text-stone-600">{row.footLength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip Box */}
        <div className="p-4 bg-[#F4F1EA] rounded-2xl border border-[#E2DDD5] flex gap-3 text-xs text-stone-600">
          <Footprints className="w-5 h-5 text-[#8C7A6B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#1C1917]">How to measure your foot length:</p>
            <p className="mt-0.5">Stand on a piece of paper against a wall. Mark the tip of your longest toe and heel edge. Measure the distance with a ruler.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
