// src/components/shared/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X,
  ChevronDown, 
  ShoppingBag,
  Store,
  MapPin,
  User
} from 'lucide-react';
import { useCategories } from '@/hooks/useCatalog';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const pathname = usePathname();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: categories } = useCategories();

  // 🌟 Hydration mismatch ১০০% দূর করার জন্য মাউন্ট চেক
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Deals', href: '/deals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Flash Sale', href: '/flash-sale' },
  ];

  // কার্ট ক্লিক হ্যান্ডলার (ড্রয়ার খুলবে এবং লিঙ্ক বাইপাস করবে)
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* ১. মেইন নেভিগেশন বার */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
          
          {/* বাঁ পাশ: মোবাইল মেনু বাটন এবং লোগো */}
          <div className="flex items-center justify-between md:justify-start gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center">
                    Shop<span className="text-emerald-600">Nest</span>
                  </span>
                  <p className="text-[9px] text-slate-400 font-bold -mt-1 tracking-wider uppercase hidden sm:block">
                    Better Choices, Bigger Smiles
                  </p>
                </div>
              </Link>
            </div>

            {/* 📱 শুধুমাত্র মোবাইলে: টপ রো-এর ডানপাশে উইশলিস্ট ও কার্ট */}
            <div className="flex items-center gap-4 md:hidden shrink-0">
              <Link href="/wishlist" className="relative p-1 text-slate-700 hover:text-emerald-600 transition">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* 🌟 মোবাইলে কার্ট লিংক: সার্ভার ও ক্লায়েন্ট উভয়েই <a> ট্যাগ থাকায় কোনো এরর হবে না */}
              <Link 
                href="/cart" 
                onClick={handleCartClick}
                aria-label="Shopping Cart"
                className="relative p-1 text-slate-700 hover:text-emerald-600 transition cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* মাঝখানের সার্চবার */}
          <div className="w-full md:flex-1 max-w-2xl mx-auto">
            <div className="flex items-center w-full bg-slate-50 hover:bg-slate-100/70 focus-within:bg-white border-2 border-emerald-600 rounded-full overflow-hidden shadow-xs transition">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search for products, brands, stores and categories..."
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
              />
              <button className="self-stretch bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 flex items-center justify-center transition shrink-0">
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* ডেক্সটপ ডান পাশ: উইশলিস্ট, কার্ট এবং অ্যাকাউন্ট */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Link href="/wishlist" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition group">
              <div className="relative">
                <Heart className="w-6 h-6 group-hover:scale-110 transition" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                  0
                </span>
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-600">Wishlist</span>
            </Link>

            {/* 🌟 ডেক্সটপ কার্ট লিংক */}
            <Link 
              href="/cart" 
              onClick={handleCartClick}
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition group cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition" />
                {mounted && totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-600">Cart</span>
            </Link>

            <Link 
              href="/login" 
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-emerald-600 pl-2 border-l border-slate-200"
            >
              <User className="w-5 h-5 text-slate-500" />
              <span>Sign In</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ২. ডেক্সটপ নেভিগেশন সাব-বার */}
      <div className="border-t border-slate-100 bg-white hidden md:block">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 font-bold text-sm flex items-center gap-3 transition rounded-t-md"
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full w-72 bg-white border border-slate-200 shadow-2xl rounded-b-2xl py-2 z-50 animate-in fade-in duration-200">
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400">›</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-4 text-xs text-slate-400">Loading categories...</div>
                  )}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-bold transition py-3.5 relative ${
                      isActive ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold text-slate-500">
            <Link href="/vendor/register" className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold">
              <Store className="w-4 h-4" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ৩. মোবাইল ড্রয়ার মেনু */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-4 shadow-xl">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/vendor/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-600"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Become a Seller</span>
            </Link>
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-600"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Track Order</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Login / Register Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}