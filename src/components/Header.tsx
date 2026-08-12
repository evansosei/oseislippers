import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  Search,
  X,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryType, Currency } from '../types';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    user,
    activeTab,
    setActiveTab,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    formatPrice,
    setIsFitAssistantOpen,
    setSelectedProductId
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories: CategoryType[] = ['All', 'Toe-Ring Sandals', 'Criss-Cross Mules', 'Luxury Slides', 'Slingback Sandals'];

  const handleNavCategoryClick = (cat: CategoryType) => {
    setCategoryFilter(cat);
    setSelectedProductId(null);
    if (activeTab !== 'shop') {
      setActiveTab('shop');
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E5E0] transition-all">
      {/* Announcement Bar */}
      <div id="announcement-bar" className="bg-[#1C1917] text-[#FAF9F5] text-xs font-medium py-2 px-4 text-center tracking-wide flex items-center justify-center space-x-2">
        <span>Complimentary Express Shipping on Orders over {formatPrice(75)}</span>
        <span className="hidden sm:inline text-stone-500">•</span>
        <span className="hidden sm:inline">30-Day Risk-Free Home Trial</span>
        <span className="bg-[#38332E] px-2 py-0.5 rounded text-[11px] text-amber-200 font-mono ml-2">Code: OSEI10</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveTab('shop');
                setSelectedProductId(null);
                setCategoryFilter('All');
              }}
              className="text-2xl font-serif tracking-widest text-[#1C1917] uppercase font-semibold hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#8C7A6B]"></span>
              OSEI <span className="font-sans font-light text-sm tracking-normal text-[#6B645C] hidden sm:inline">SLIPPERS</span>
            </button>

            {/* Desktop Category Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              {categories.map(cat => (
                <button
                  key={cat}
                  id={`nav-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavCategoryClick(cat)}
                  className={`transition-colors py-1 ${
                    activeTab === 'shop' && categoryFilter === cat
                      ? 'text-[#1C1917] font-semibold border-b-2 border-[#1C1917]'
                      : 'text-[#6B645C] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            
            {/* AI Fit Assistant Pill */}
            <button
              id="ai-fit-assistant-btn"
              onClick={() => setIsFitAssistantOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#F2EFE9] border border-[#E2DDD5] text-xs font-medium text-[#2C2723] hover:bg-[#E8E3DA] transition-all"
              title="Fit & Size Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <span className="hidden sm:inline">Fit Advisor</span>
            </button>

            {/* Live Search Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#F2EFE9] rounded-full px-2.5 py-1 border border-[#E2DDD5]">
                  <Search className="w-3.5 h-3.5 text-[#8C7A6B] mr-1.5 flex-shrink-0" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search slippers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-[#1C1917] focus:outline-none w-28 sm:w-48 lg:w-56"
                    autoFocus
                  />
                  <button
                    id="close-search-btn"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 hover:text-[#1C1917] text-[#6B645C]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="open-search-btn"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#6B645C] hover:text-[#1C1917] transition-colors"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1 text-xs font-mono font-medium text-[#6B645C] hover:text-[#1C1917] px-2 py-1 rounded bg-[#F2EFE9]"
              >
                <span>{currency === 'GHS' ? 'GH₵' : currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isCurrencyDropdownOpen && (
                <div id="currency-dropdown" className="absolute right-0 mt-2 w-24 bg-[#FAF9F5] border border-[#E7E5E0] rounded-lg shadow-lg py-1 z-50 text-xs">
                  {(['USD', 'EUR', 'GBP', 'CAD', 'GHS'] as Currency[]).map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 hover:bg-[#F2EFE9] ${
                        currency === curr ? 'font-bold text-[#1C1917]' : 'text-[#6B645C]'
                      }`}
                    >
                      {curr === 'GHS' ? 'GH₵' : curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              id="header-wishlist-btn"
              onClick={() => {
                setActiveTab('dashboard');
              }}
              className="p-2 text-[#6B645C] hover:text-[#1C1917] transition-colors relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {user.wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8C7A6B]"></span>
              )}
            </button>

            {/* User Dashboard Account Button */}
            <button
              id="header-account-btn"
              onClick={() => setActiveTab('dashboard')}
              className={`p-2 transition-colors flex items-center space-x-2 ${
                activeTab === 'dashboard' ? 'text-[#1C1917]' : 'text-[#6B645C] hover:text-[#1C1917]'
              }`}
              title="User Account & Orders"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-medium">Dashboard</span>
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-[#1C1917] text-[#FAF9F5] px-4 py-2 rounded-full text-xs font-medium hover:bg-[#38332E] transition-all shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#FAF9F5] text-[#1C1917] w-5 h-5 rounded-full flex items-center justify-center font-semibold text-[11px] ml-1">
                {totalCartCount}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Category Navigation Scrollable Bar */}
      <div className="lg:hidden bg-[#F2EFE9]/80 border-t border-[#E7E5E0] px-4 py-2 overflow-x-auto flex space-x-4 text-xs font-medium no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleNavCategoryClick(cat)}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeTab === 'shop' && categoryFilter === cat
                ? 'bg-[#1C1917] text-[#FAF9F5]'
                : 'text-[#6B645C] hover:text-[#1C1917]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};
