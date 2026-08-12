import React from 'react';
import { X, Printer, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const InvoiceModal: React.FC = () => {
  const { activeInvoiceOrder, setActiveInvoiceOrder, formatPrice } = useShop();

  if (!activeInvoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="invoice-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] shadow-2xl p-6 sm:p-10 space-y-6 my-8 print:p-0 print:border-0 print:shadow-none">
        
        {/* Modal Controls (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#8C7A6B]" />
            <h3 className="font-serif font-semibold text-base text-[#1C1917]">
              Official Tax Receipt & Order Summary
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-[#38332E]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={() => setActiveInvoiceOrder(null)}
              className="p-2 rounded-full hover:bg-[#E2DDD5] text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Canvas */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5E0] space-y-6 text-xs text-[#1C1917] font-sans">
          
          {/* Receipt Top Header */}
          <div className="flex justify-between items-start border-b border-stone-200 pb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-widest text-[#1C1917] uppercase">OSEI SLIPPERS</h1>
              <p className="text-[11px] text-stone-500 font-mono mt-0.5">Osei Luxury Living LLC • Old Suame, Kumasi</p>
              <p className="text-[11px] text-stone-500 font-mono">evansoseikwaku@gmail.com</p>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded font-bold uppercase mb-1">
                PAID IN FULL
              </span>
              <p className="font-bold text-[#1C1917]">INVOICE: #{activeInvoiceOrder.orderNumber}</p>
              <p className="text-stone-500">{activeInvoiceOrder.date}</p>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <p className="font-mono text-stone-400 uppercase text-[10px] mb-1">Billed & Shipped To:</p>
              <p className="font-bold text-[#1C1917]">{activeInvoiceOrder.shippingAddress.fullName}</p>
              <p className="text-stone-600">{activeInvoiceOrder.shippingAddress.addressLine1} {activeInvoiceOrder.shippingAddress.addressLine2}</p>
              <p className="text-stone-600">{activeInvoiceOrder.shippingAddress.city}, {activeInvoiceOrder.shippingAddress.state} {activeInvoiceOrder.shippingAddress.zipCode}</p>
              <p className="text-stone-600">{activeInvoiceOrder.shippingAddress.email}</p>
            </div>

            <div className="text-right font-mono text-stone-600">
              <p className="text-stone-400 uppercase text-[10px] mb-1">Fulfillment Details:</p>
              <p>Carrier: <strong>{activeInvoiceOrder.carrier}</strong></p>
              <p>Tracking #: <strong>{activeInvoiceOrder.trackingNumber}</strong></p>
              <p>Payment: <strong>{activeInvoiceOrder.paymentMethod.brand} (•••• {activeInvoiceOrder.paymentMethod.last4 || '4242'})</strong></p>
            </div>
          </div>

          {/* Line items table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-stone-100 text-stone-600 font-mono text-[10px] uppercase border-b border-stone-200">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Size / Color</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-xs text-[#1C1917]">
                {activeInvoiceOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-sans font-medium">{item.name}</td>
                    <td className="p-3 text-center text-stone-500">US {item.selectedSize} / {item.selectedColor.name}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">{formatPrice(item.price)}</td>
                    <td className="p-3 text-right font-bold">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 font-mono text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-[#1C1917]">{formatPrice(activeInvoiceOrder.subtotal)}</span>
              </div>
              {activeInvoiceOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span>- {formatPrice(activeInvoiceOrder.discount)}</span>
                </div>
              )}
              {activeInvoiceOrder.giftWrapCost > 0 && (
                <div className="flex justify-between">
                  <span>Linen Gift Packaging:</span>
                  <span>+ {formatPrice(activeInvoiceOrder.giftWrapCost)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({activeInvoiceOrder.shippingMethod}):</span>
                <span>{activeInvoiceOrder.shippingCost === 0 ? 'FREE' : formatPrice(activeInvoiceOrder.shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>{formatPrice(activeInvoiceOrder.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1C1917] pt-2 border-t border-stone-300">
                <span>Total Paid:</span>
                <span>{formatPrice(activeInvoiceOrder.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 text-center text-[10px] text-stone-400 font-mono">
            Thank you for choosing Osei Slippers. Guaranteed under our 30-Day Risk-Free Home Trial Policy.
          </div>

        </div>

      </div>
    </div>
  );
};
