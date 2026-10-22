// src/app/(storefront)/products/page.tsx
'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ChevronRight, 
  Filter, 
  X, 
  Star, 
  ShoppingCart, 
  CheckCircle2, 
  Store, 
  SlidersHorizontal,
  RotateCcw,
  Search,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// মাস্টার প্রোডাক্ট ক্যাটালগ ডেটাবেস
const masterCatalog = [
  {
    id: 'p-1',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    price: 38500,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Electronics & Audio',
    brand: 'Sony',
    store: { name: 'TechZone BD', slug: 'techzone', verified: true },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-2',
    name: 'Nike Air Max 270 Premium Athletic Running Shoes',
    slug: 'nike-air-max-270-shoes',
    price: 8900,
    originalPrice: 12500,
    rating: 4.8,
    reviewsCount: 98,
    category: 'Footwear & Sports',
    brand: 'Nike',
    store: { name: 'Apex Footwear BD', slug: 'apex-footwear', verified: true },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-3',
    name: 'Fossil Gen 6 Smartwatch Leather Strap',
    slug: 'fossil-gen-6-smartwatch',
    price: 18200,
    originalPrice: 24000,
    rating: 4.7,
    reviewsCount: 64,
    category: 'Watches & Accessories',
    brand: 'Fossil',
    store: { name: 'WatchGallery BD', slug: 'watchgallery', verified: true },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-4',
    name: 'Wild Stone Edge Eau De Parfum 100ml Long Lasting',
    slug: 'wild-stone-edge-perfume',
    price: 1850,
    originalPrice: 2600,
    rating: 4.6,
    reviewsCount: 210,
    category: 'Beauty & Fragrances',
    brand: 'Wild Stone',
    store: { name: 'Aroma Luxury BD', slug: 'aroma-luxury', verified: true },
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-5',
    name: 'Classic Vintage Leather Laptop Messenger Bag',
    slug: 'classic-leather-laptop-bag',
    price: 4200,
    originalPrice: 6500,
    rating: 4.9,
    reviewsCount: 82,
    category: 'Fashion & Bags',
    brand: 'Vintage Craft',
    store: { name: 'Fashion Hub Lifestyle', slug: 'fashion-hub', verified: true },
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-6',
    name: 'Apple AirPods Pro (2nd Generation) USB-C Active ANC',
    slug: 'apple-airpods-pro-2',
    price: 26500,
    originalPrice: 32000,
    rating: 4.9,
    reviewsCount: 175,
    category: 'Electronics & Audio',
    brand: 'Apple',
    store: { name: 'TechZone BD', slug: 'techzone', verified: true },
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-7',
    name: 'Samsung Galaxy Watch 6 Classic 47mm Bluetooth',
    slug: 'samsung-galaxy-watch-6',
    price: 31000,
    originalPrice: 38000,
    rating: 4.8,
    reviewsCount: 89,
    category: 'Watches & Accessories',
    brand: 'Samsung',
    store: { name: 'WatchGallery BD', slug: 'watchgallery', verified: true },
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-8',
    name: 'Apex Men Formal Handcrafted Leather Oxford Shoes',
    slug: 'apex-formal-oxford-shoes',
    price: 5490,
    originalPrice: 7200,
    rating: 4.7,
    reviewsCount: 114,
    category: 'Footwear & Sports',
    brand: 'Apex',
    store: { name: 'Apex Footwear BD', slug: 'apex-footwear', verified: true },
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
  {
    id: 'p-9',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    slug: 'logitech-mx-master-3s',
    price: 11800,
    originalPrice: 14500,
    rating: 4.9,
    reviewsCount: 320,
    category: 'Electronics & Audio',
    brand: 'Logitech',
    store: { name: 'TechZone BD', slug: 'techzone', verified: true },
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    inStock: true,
  },
];

// ক্যাটাগরি ও ব্র্যান্ড কনস্ট্যান্ট
const allCategories = [
  'All Categories', 
  'Electronics & Audio', 
  'Footwear & Sports', 
  'Watches & Accessories', 
  'Fashion & Bags', 
  'Beauty & Fragrances'
];

const allBrands = [
  'Sony', 
  'Nike', 
  'Apple', 
  'Fossil', 
  'Apex', 
  'Samsung', 
  'Logitech', 
  'Wild Stone', 
  'Vintage Craft'
];

// ফিল্টার সাইডবার প্রপস ইন্টারফেস
interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  handleResetFilters: () => void;
}

// 🌟 ফিল্টার সাইডবার কম্পোনেন্ট: রেন্ডার ফাংশনের বাইরে ডিক্লেয়ার করা হয়েছে (Error Fixed)
function FilterSidebarContent({
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  handleBrandToggle,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  handleResetFilters,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* ফিল্টার হেডার ও রিসেট বাটন */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>Filters</span>
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* ১. ক্যাটাগরি ফিল্টার */}
      <div className="space-y-2.5">
        <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
          Categories
        </label>
        <div className="space-y-1.5">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-between cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* ২. প্রাইস রেঞ্জ স্লাইডার */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-extrabold text-slate-900">
            Price Range
          </label>
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            Up to ৳{maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="45000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-bold text-slate-400">
          <span>৳1,000</span>
          <span>৳45,000</span>
        </div>
      </div>

      {/* ৩. ব্র্যান্ড ফিল্টার */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
          Brands
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {allBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer hover:text-slate-900"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ৪. কাস্টমার রেটিং ফিল্টার */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs sm:text-sm font-extrabold text-slate-900 block">
          Minimum Rating
        </label>
        <div className="space-y-1.5">
          {[4, 3, 0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                minRating === rating
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1">
                {rating > 0 ? (
                  <>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rating} Stars & Above</span>
                  </>
                ) : (
                  <span>All Ratings</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ৫. ইন-স্টক টগল */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs sm:text-sm font-extrabold text-slate-900">In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';
  const initialSearch = searchParams.get('q') || '';

  // ফিল্টার স্টেটসমূহ
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(45000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addToCart } = useCart();

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => 
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedBrands([]);
    setMaxPrice(45000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchQuery('');
  };

  // লাইভ ফিল্টারিং ও সর্টিং লজিক
  const filteredProducts = useMemo(() => {
    return masterCatalog
      .filter((p) => {
        if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) {
          return false;
        }
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        if (inStockOnly && !p.inStock) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchStore = p.store.name.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchStore) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, selectedBrands, maxPrice, minRating, inStockOnly, sortBy, searchQuery]);

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-20">
      
      {/* ১. ব্রেডক্রাম্ব */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-bold">Catalog</span>
        {selectedCategory !== 'All Categories' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-emerald-700 font-bold">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* পেজ টাইটেল ও মোবাইল ফিল্টার বাটন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Explore Catalog</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Showing {filteredProducts.length} authentic products from verified merchant stores
          </p>
        </div>

        {/* সার্চ ইনপুট ও সর্ট ড্রপডাউন */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:border-slate-900 cursor-pointer"
          >
            <option value="popular">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>

          {/* মোবাইলে ফিল্টার বাটন */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden bg-slate-900 text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* ২. মূল গ্রিড: বাঁয়ে সাইডবার (৩ কলাম) এবং ডানে প্রডাক্ট গ্রিড (৯ কলাম) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* === বাঁ পাশ: ডেক্সটপ ফিল্টার সাইডবার === */}
        <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xs sticky top-24">
          <FilterSidebarContent
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            handleResetFilters={handleResetFilters}
          />
        </aside>

        {/* === ডেক্সটপ ডান পাশ: প্রোডাক্ট গ্রিড === */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 text-center max-w-md mx-auto space-y-4 my-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">No Products Found</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  No products matched your active filters or search keyword.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-xl transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
              {filteredProducts.map((product) => {
                const discountPercent = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      {/* প্রডাক্ট ছবি */}
                      <div className="relative aspect-square rounded-xl sm:rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center p-2 border border-slate-100">
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg z-10">
                          -{discountPercent}%
                        </span>

                        <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
                          />
                        </Link>
                      </div>

                      {/* ভেন্ডর নাম ও ব্যাজ */}
                      <div className="pt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{product.store.name}</span>
                        {product.store.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>

                      {/* টাইটেল */}
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-emerald-700 transition min-h-[34px] sm:min-h-[40px]">
                          {product.name}
                        </h3>
                      </Link>

                      {/* রেটিং */}
                      <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-slate-900 font-bold">{product.rating}</span>
                        </div>
                        <span className="text-slate-400">({product.reviewsCount})</span>
                      </div>

                      {/* প্রাইস */}
                      <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm sm:text-lg font-black text-slate-900">
                          ৳{product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart বাটন */}
                    <div className="pt-3 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          addToCart({
                            productId: product.id,
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            quantity: 1,
                            selectedColor: 'Standard',
                            selectedSize: 'Standard',
                            store: product.store,
                          });
                          toast.success(`Added "${product.name}" to cart!`);
                        }}
                        className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>

      </div>

      {/* 📱 মোবাইলে স্লাইড-ওভার ফিল্টার ড্রয়ার */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <span className="font-black text-base text-slate-900">Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* মোবাইল ড্রয়ারেও বাইরে ডিক্লেয়ার করা ফিল্টার কম্পোনেন্ট ব্যবহার করা হয়েছে */}
              <FilterSidebarContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrands={selectedBrands}
                handleBrandToggle={handleBrandToggle}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                minRating={minRating}
                setMinRating={setMinRating}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                handleResetFilters={handleResetFilters}
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition cursor-pointer"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-slate-500 font-bold">Loading product catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}