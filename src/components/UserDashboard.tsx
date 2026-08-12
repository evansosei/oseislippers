import React, { useState } from 'react';
import {
  Package,
  Heart,
  User,
  MapPin,
  CreditCard,
  Award,
  RotateCcw,
  Printer,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, CartItem } from '../types';

export const UserDashboard: React.FC = () => {
  const {
    user,
    orders,
    products,
    formatPrice,
    reorderItems,
    toggleWishlist,
    addToCart,
    setActiveInvoiceOrder,
    setActiveTab
  } = useShop();

  const [activeDashTab, setActiveDashTab] = useState<'orders' | 'wishlist' | 'loyalty' | 'addresses' | 'returns'>('orders');
  const [selectedOrderTracking, setSelectedOrderTracking] = useState<Order | null>(null);

  const wishlistedProducts = products.filter(p => user.wishlistIds.includes(p.id));

  return (
    <div id="user-dashboard-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Dashboard Top User Profile Banner */}
      <div className="bg-[#F4F1EA] rounded-3xl border border-[#E7E5E0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#1C1917]"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-semibold text-[#1C1917]">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-amber-200 text-[11px] font-mono font-medium">
                {user.memberTier} Member
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Loyalty Points Pill */}
        <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2DDD5] flex items-center gap-4 text-xs">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-stone-500 font-mono">Osei Rewards Points</p>
            <p className="text-base font-serif font-bold text-[#1C1917]">{user.points} Points ({formatPrice(21)} Value)</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E7E5E0] space-x-2 sm:space-x-8 text-xs font-medium overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveDashTab('orders')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all whitespace-nowrap ${
            activeDashTab === 'orders' ? 'border-[#1C1917] text-[#1C1917] font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveDashTab('wishlist')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all whitespace-nowrap ${
            activeDashTab === 'wishlist' ? 'border-[#1C1917] text-[#1C1917] font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({user.wishlistIds.length})</span>
        </button>

        <button
          onClick={() => setActiveDashTab('loyalty')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all whitespace-nowrap ${
            activeDashTab === 'loyalty' ? 'border-[#1C1917] text-[#1C1917] font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Osei Circle Loyalty</span>
        </button>

        <button
          onClick={() => setActiveDashTab('addresses')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all whitespace-nowrap ${
            activeDashTab === 'addresses' ? 'border-[#1C1917] text-[#1C1917] font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses & Cards</span>
        </button>

        <button
          onClick={() => setActiveDashTab('returns')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-all whitespace-nowrap ${
            activeDashTab === 'returns' ? 'border-[#1C1917] text-[#1C1917] font-bold' : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Self-Service Returns</span>
        </button>
      </div>

      {/* Tab 1: Order History */}
      {activeDashTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#F4F1EA] rounded-3xl border border-[#E7E5E0] space-y-3">
              <Package className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-lg font-serif font-semibold text-[#1C1917]">No previous orders</h3>
              <p className="text-xs text-stone-500">Your future order history will appear here with live tracking updates.</p>
              <button onClick={() => setActiveTab('shop')} className="bg-[#1C1917] text-[#FAF9F5] px-6 py-2 rounded-full text-xs">
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] overflow-hidden shadow-xs hover:border-stone-400 transition-all space-y-4 p-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E0]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1C1917]">
                        Order #{order.orderNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status === 'delivered' ? 'Delivered' : 'In Transit / Processing'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">
                      Placed on {order.date} • Paid via {order.paymentMethod.brand}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActiveInvoiceOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2EFE9] border border-[#E2DDD5] text-xs text-[#1C1917] hover:bg-[#E2DDD5]"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#8C7A6B]" />
                      <span>View Invoice</span>
                    </button>

                    <button
                      onClick={() => reorderItems(order.items)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C1917] text-[#FAF9F5] text-xs font-medium hover:bg-[#38332E]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Reorder 1-Click</span>
                    </button>
                  </div>
                </div>

                {/* Items Thumbs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.map(item => (
                    <div key={item.cartItemId} className="flex gap-3 bg-[#F4F1EA] p-3 rounded-2xl border border-[#E2DDD5]">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl bg-stone-200" referrerPolicy="no-referrer" />
                      <div className="text-xs space-y-0.5">
                        <p className="font-semibold text-[#1C1917]">{item.name}</p>
                        <p className="text-stone-500 font-mono">
                          US {item.selectedSize} • {item.selectedColor.name}
                        </p>
                        <p className="font-mono font-bold text-[#1C1917]">
                          {formatPrice(item.price)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Progress Bar Tracker */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B645C] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8C7A6B]" />
                      Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
                    </span>
                    <span>Carrier: <strong>{order.carrier}</strong> ({order.trackingNumber})</span>
                  </div>

                  {/* Step Indicators */}
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                    {order.timeline.map((step, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className={`h-1.5 rounded-full transition-all ${
                          step.completed ? 'bg-emerald-600' : 'bg-stone-200'
                        }`} />
                        <p className={`font-semibold ${step.completed ? 'text-emerald-900' : 'text-stone-400'}`}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeDashTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#F4F1EA] rounded-3xl border border-[#E7E5E0] space-y-3">
              <Heart className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-lg font-serif font-semibold text-[#1C1917]">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500">Save your favorite slippers while browsing for easy access later.</p>
              <button onClick={() => setActiveTab('shop')} className="bg-[#1C1917] text-[#FAF9F5] px-6 py-2 rounded-full text-xs">
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map(p => (
                <div key={p.id} className="bg-[#FAF9F5] rounded-2xl border border-[#E7E5E0] p-4 flex flex-col justify-between space-y-3">
                  <div className="flex gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-20 h-20 rounded-xl object-cover bg-stone-200" referrerPolicy="no-referrer" />
                    <div className="space-y-1 text-xs">
                      <h4 className="font-serif font-semibold text-[#1C1917]">{p.name}</h4>
                      <p className="text-stone-500 font-mono">{formatPrice(p.price)}</p>
                      <p className="text-[11px] text-stone-400">{p.material}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#E7E5E0]">
                    <button
                      onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1)}
                      className="flex-1 bg-[#1C1917] text-[#FAF9F5] py-2 rounded-xl text-xs font-medium hover:bg-[#38332E]"
                    >
                      Move to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 border border-[#E7E5E0] rounded-xl text-stone-400 hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Loyalty Rewards */}
      {activeDashTab === 'loyalty' && (
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-8 space-y-6">
          <div className="border-b border-[#E7E5E0] pb-4">
            <h3 className="text-xl font-serif font-semibold text-[#1C1917]">Osei Circle Loyalty Lounge</h3>
            <p className="text-xs text-stone-500 mt-1">Earn 1 Point for every GH₵ spend on Osei footwear and indoor living accessories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E2DDD5] space-y-2">
              <span className="font-mono text-stone-500">Tier Status</span>
              <p className="text-xl font-serif font-bold text-[#1C1917]">Gold Velvet Member</p>
              <p className="text-stone-600">Enjoy early access to seasonal releases and complimentary express shipping worldwide.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E2DDD5] space-y-2">
              <span className="font-mono text-stone-500">Available Reward</span>
              <p className="text-xl font-serif font-bold text-emerald-800">{formatPrice(20)} Off Reward Code</p>
              <p className="text-stone-600">Redeem 400 points for an instant {formatPrice(20)} promo code applied at checkout.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F1EA] border border-[#E2DDD5] space-y-2">
              <span className="font-mono text-stone-500">Next Upgrade</span>
              <p className="text-xl font-serif font-bold text-[#8C7A6B]">Platinum Cashmere</p>
              <p className="text-stone-600">80 points remaining to unlock personal home fitting consultations & gift box styling.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Addresses & Payments */}
      {activeDashTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3">
              <h4 className="font-serif font-semibold text-[#1C1917] text-sm">Default Shipping Address</h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded">Default</span>
            </div>
            <p className="font-semibold text-[#1C1917]">{user.savedAddresses[0].fullName}</p>
            <p className="text-stone-600">{user.savedAddresses[0].addressLine1}, {user.savedAddresses[0].addressLine2}</p>
            <p className="text-stone-600">{user.savedAddresses[0].city}, {user.savedAddresses[0].state} {user.savedAddresses[0].zipCode}</p>
            <p className="text-stone-400 font-mono">{user.savedAddresses[0].phone}</p>
          </div>

          <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3">
              <h4 className="font-serif font-semibold text-[#1C1917] text-sm">Saved Payment Method</h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded">Verified</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[#1C1917]" />
              <div>
                <p className="font-semibold text-[#1C1917]">Visa ending in 4242</p>
                <p className="text-stone-500 font-mono">Expires 08/28</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Returns */}
      {activeDashTab === 'returns' && (
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#E7E5E0] p-8 space-y-4 text-xs">
          <h3 className="text-xl font-serif font-semibold text-[#1C1917]">30-Day Self-Service Return Center</h3>
          <p className="text-stone-600 max-w-lg">
            We want you to love your Osei Slippers. You can initiate a prepaid return label within 30 days of receiving your order.
          </p>
          <div className="p-4 bg-[#F4F1EA] rounded-2xl border border-[#E2DDD5] max-w-md space-y-2">
            <p className="font-semibold text-[#1C1917]">Eligible Order for Instant Return:</p>
            <p className="font-mono text-stone-500">Order #OSEI-88912 • Delivered Aug 13</p>
            <button className="bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#38332E]">
              Generate Prepaid Shipping Label
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
