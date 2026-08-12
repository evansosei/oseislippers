import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  Gift,
  ArrowRight,
  Truck,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    promoCode,
    applyPromoCode,
    removePromoCode,
    discountPercentage,
    isGiftWrapped,
    setIsGiftWrapped,
    setActiveTab
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success?: boolean; text?: string } | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = (subtotal * discountPercentage) / 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 8.00;
  const giftWrapCost = isGiftWrapped ? 5.00 : 0;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const grandTotal = subtotal - discountAmount + shippingCost + giftWrapCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark Overlay Background */}
      <div
        className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E7E5E0] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-[#F4F1EA] border-b border-[#E7E5E0] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#1C1917] text-[#FAF9F5] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-serif font-semibold text-[#1C1917]">Your Shopping Bag</h3>
                <p className="text-xs text-stone-500 font-mono">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Selected
                </p>
              </div>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#E2DDD5] text-[#6B645C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FAF9F5] border-b border-[#E7E5E0] p-4 text-xs">
            <div className="flex items-center justify-between font-medium text-[#2C2723] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8C7A6B]" />
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} more for FREE Express Shipping`
                  : 'Congratulations! You unlocked FREE Express Shipping'}
              </span>
              <span className="font-mono text-[11px] text-stone-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E8E3DA] overflow-hidden">
              <div
                className="h-full bg-[#8C7A6B] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-semibold text-[#1C1917]">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our luxury footwear line and discover pure indoor comfort.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1C1917] text-[#FAF9F5] px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#38332E]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-4 rounded-2xl bg-[#F4F1EA] border border-[#E7E5E0] relative group"
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-stone-200 border border-stone-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between pr-6">
                      <h5 className="text-sm font-serif font-semibold text-[#1C1917]">
                        {item.name}
                      </h5>
                      <span className="text-sm font-mono font-bold text-[#1C1917]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-stone-500 font-mono">
                      <span>Size: <strong>US {item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center bg-[#FAF9F5] border border-[#E2DDD5] rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#E2DDD5] rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="px-2.5 py-0.5 text-xs font-bold hover:bg-[#E2DDD5] rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F4F1EA] border-t border-[#E7E5E0] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. OSEI10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#E7E5E0] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1C1917] uppercase focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#38332E]"
                  >
                    Apply
                  </button>
                </form>

                {promoCode && (
                  <div className="mt-2 flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Code <strong>{promoCode}</strong> ({discountPercentage}% Off)
                    </span>
                    <button onClick={removePromoCode} className="underline text-stone-500 hover:text-stone-900">
                      Remove
                    </button>
                  </div>
                )}

                {promoMessage && !promoCode && (
                  <p className={`text-xs mt-1 ${promoMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Eco Gift Wrapping Toggle */}
              <label className="flex items-center justify-between bg-[#FAF9F5] p-3 rounded-xl border border-[#E7E5E0] cursor-pointer text-xs">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#8C7A6B]" />
                  <span>Add Eco-Friendly Linen Gift Wrapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-stone-500">+ {formatPrice(5)}</span>
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="w-4 h-4 accent-[#1C1917] rounded"
                  />
                </div>
              </label>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B645C] border-t border-[#E2DDD5] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1C1917]">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercentage}%)</span>
                    <span className="font-mono">- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                {isGiftWrapped && (
                  <div className="flex justify-between">
                    <span>Linen Gift Packaging</span>
                    <span className="font-mono">+ {formatPrice(5)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-[#1C1917]">
                    {shippingCost === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-serif font-semibold text-[#1C1917] border-t border-[#E2DDD5]">
                  <span>Total Due</span>
                  <span className="font-mono text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                id="drawer-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full bg-[#1C1917] text-[#FAF9F5] py-4 rounded-2xl text-xs font-medium uppercase tracking-widest hover:bg-[#38332E] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL Checkout • Free 30-Day Returns</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
