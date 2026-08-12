import React from 'react';
import {
  CheckCircle,
  Package,
  Printer,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const {
    activeOrder,
    formatPrice,
    setActiveTab,
    setActiveInvoiceOrder
  } = useShop();

  if (!activeOrder) return null;

  return (
    <div id="order-confirmation-screen" className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      
      {/* Celebration Header */}
      <div className="text-center bg-[#F4F1EA] p-8 sm:p-12 rounded-3xl border border-[#E7E5E0] space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-medium border border-emerald-200">
          Order Confirmed & Payment Cleared
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1C1917]">
          Thank You, {activeOrder.shippingAddress.fullName.split(' ')[0]}!
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          We’re hand-inspecting and packing your Osei Slippers. Order reference: <strong className="font-mono text-[#1C1917]">{activeOrder.orderNumber}</strong>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="print-invoice-btn"
            onClick={() => setActiveInvoiceOrder(activeOrder)}
            className="flex items-center gap-2 bg-[#FAF9F5] border border-[#E2DDD5] text-[#1C1917] px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#E2DDD5] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#8C7A6B]" />
            <span>Download PDF Receipt</span>
          </button>

          <button
            id="go-to-dashboard-btn"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 bg-[#1C1917] text-[#FAF9F5] px-6 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider hover:bg-[#38332E] transition-colors shadow-md"
          >
            <span>View Order History Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Package Tracking Timeline Preview */}
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#8C7A6B]" />
            <h3 className="font-serif font-semibold text-base text-[#1C1917]">
              Fulfillment & Tracking Timeline
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Tracking #: {activeOrder.trackingNumber}
          </span>
        </div>

        {/* Horizontal Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          {activeOrder.timeline.map((step, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border transition-all ${
                step.completed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-[#F4F1EA] border-[#E7E5E0] text-stone-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-1.5 text-xs font-mono font-bold ${
                step.completed ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
              }`}>
                {i + 1}
              </div>
              <p className="font-semibold">{step.label}</p>
              <p className="text-[10px] font-mono mt-0.5 opacity-80">{step.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Shipping Address */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-serif font-semibold text-[#1C1917] text-sm">
            <MapPin className="w-4 h-4 text-[#8C7A6B]" />
            <span>Delivery Destination</span>
          </div>
          <div className="text-stone-600 leading-relaxed font-light">
            <p className="font-semibold text-[#1C1917]">{activeOrder.shippingAddress.fullName}</p>
            <p>{activeOrder.shippingAddress.addressLine1} {activeOrder.shippingAddress.addressLine2}</p>
            <p>{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} {activeOrder.shippingAddress.zipCode}</p>
            <p>{activeOrder.shippingAddress.country}</p>
            <p className="font-mono text-stone-400 mt-1">{activeOrder.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-6 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-serif font-semibold text-[#1C1917] text-sm">
            <ShieldCheck className="w-4 h-4 text-[#8C7A6B]" />
            <span>Payment Summary</span>
          </div>
          <div className="space-y-1.5 text-stone-600">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-mono text-[#1C1917]">{formatPrice(activeOrder.subtotal)}</span>
            </div>
            {activeOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span className="font-mono">- {formatPrice(activeOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({activeOrder.shippingMethod})</span>
              <span className="font-mono text-[#1C1917]">
                {activeOrder.shippingCost === 0 ? 'FREE' : formatPrice(activeOrder.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between font-serif font-bold text-sm text-[#1C1917] pt-2 border-t border-[#E7E5E0]">
              <span>Grand Total</span>
              <span className="font-mono">{formatPrice(activeOrder.total)}</span>
            </div>
            <p className="text-[11px] text-stone-400 font-mono pt-1">
              Paid via {activeOrder.paymentMethod.brand} (ending in {activeOrder.paymentMethod.last4 || '4242'})
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
