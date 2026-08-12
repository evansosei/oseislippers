import React from 'react';
import { SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';

export const ProductGrid: React.FC = () => {
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    warmthFilter,
    setWarmthFilter,
    archFilter,
    setArchFilter,
    setIsFitAssistantOpen
  } = useShop();

  // Filter pipeline
  let filtered = products.filter(p => {
    // Category check
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    
    // Warmth check
    if (warmthFilter !== 'All' && p.warmthRating !== warmthFilter) return false;

    // Arch support check
    if (archFilter !== 'All' && p.archSupport !== archFilter) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchMat = p.material.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchMat && !matchCat) return false;
    }

    return true;
  });

  // Sort pipeline
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default order
  });

  const categories: CategoryType[] = ['All', 'Toe-Ring Sandals', 'Criss-Cross Mules', 'Luxury Slides', 'Slingback Sandals'];

  const clearAllFilters = () => {
    setCategoryFilter('All');
    setSearchQuery('');
    setWarmthFilter('All');
    setArchFilter('All');
    setSortBy('featured');
  };

  const hasActiveFilters = categoryFilter !== 'All' || searchQuery !== '' || warmthFilter !== 'All' || archFilter !== 'All';

  return (
    <section id="product-catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Catalog Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E5E0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7A6B] mb-1">
            <span>Handcrafted Footwear</span>
            <span>•</span>
            <span>{filtered.length} Models Available</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-semibold">
            {categoryFilter === 'All' ? 'The Osei Collection' : categoryFilter}
          </h2>
        </div>

        {/* Action Controls & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Fit Advisor Quick Trigger */}
          <button
            onClick={() => setIsFitAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F2EFE9] border border-[#E2DDD5] text-xs font-medium text-[#2C2723] hover:bg-[#E8E3DA] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span className="hidden sm:inline">Unsure of size or model?</span>
            <span className="underline font-semibold">Ask Advisor</span>
          </button>

          {/* Warmth Filter Select */}
          <select
            id="warmth-filter-select"
            value={warmthFilter}
            onChange={(e) => setWarmthFilter(e.target.value)}
            className="bg-[#F2EFE9] border border-[#E2DDD5] text-xs text-[#2C2723] rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Warmth Levels</option>
            <option value="Breathable Lightweight">Breathable Lightweight</option>
            <option value="Cozy All-Season">Cozy All-Season</option>
            <option value="Maximum Thermal">Maximum Thermal</option>
          </select>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 bg-[#F2EFE9] border border-[#E2DDD5] rounded-xl px-3 py-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#2C2723] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 border-b border-[#F2EFE9]">
        <div className="flex items-center space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#1C1917] text-[#FAF9F5] shadow-sm'
                  : 'bg-[#F2EFE9] text-[#6B645C] hover:bg-[#E8E3DA] hover:text-[#1C1917]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs text-rose-600 hover:underline ml-4 whitespace-nowrap font-medium"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Badges */}
      {searchQuery && (
        <div className="flex items-center gap-2 bg-[#F2EFE9] p-3 rounded-xl text-xs text-[#2C2723]">
          <Filter className="w-4 h-4 text-[#8C7A6B]" />
          <span>Showing results for search: <strong className="font-semibold">"{searchQuery}"</strong></span>
          <button onClick={() => setSearchQuery('')} className="ml-auto text-stone-500 hover:text-stone-900 underline">
            Clear Search
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#F4F1EA] rounded-3xl border border-[#E7E5E0] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8E3DA] flex items-center justify-center mx-auto text-[#8C7A6B]">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-[#1C1917]">No slippers match your filters</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try resetting your category or search parameters to view our full slippers lineup.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-[#1C1917] text-[#FAF9F5] px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[#38332E] transition-colors"
          >
            View All Slippers
          </button>
        </div>
      )}

    </section>
  );
};
