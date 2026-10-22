'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Menu, 
  ChevronDown, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCategories } from '@/hooks/useCatalog';

export default function Navbar() {
  const pathname = usePathname();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { data: categories } = useCategories();

  // মেনু লিংকস
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Deals', href: '/deals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Flash Sale', href: '/flash-sale' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* ১. মাঝের সার্চ ও লোগো বার */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* লোগো */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                Shop<span className="text-emerald-600">Nest</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                Better Choices, Bigger Smiles
              </p>
            </div>
          </Link>

          {/* বড় সার্চ বার (ক্যাটাগরি ড্রপডাউন সহ) */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center border-2 border-emerald-600 rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <div className="border-l border-slate-200 px-3 py-2 bg-slate-50 text-xs text-slate-600 flex items-center gap-1 shrink-0 cursor-pointer hover:bg-slate-100">
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 transition flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* উইশলিস্ট ও কার্ট বাটন */}
          <div className="flex items-center gap-5">
            <Link 
              href="/wishlist" 
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition"
            >
              <div className="relative">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </div>
              <span className="text-xs font-semibold hidden lg:inline">Wishlist</span>
            </Link>

            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </div>
              <span className="text-xs font-semibold hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ২. নিচের নেভিগেশন বার ও ক্যাটাগরি বাটন */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* বড় সবুজ ক্যাটাগরি টগল বাটন */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 font-semibold text-sm flex items-center gap-3 transition rounded-t-md"
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* ড্রপডাউন মেনু (আমাদের useCategories হুকের ডাটা) */}
              {isCategoryOpen && (
                <div className="absolute left-0 top-full w-64 bg-white border border-slate-200 shadow-xl rounded-b-lg py-2 z-50">
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400">›</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-400">
                      Loading categories...
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* হরিজন্টাল লিংকস (Home, Deals, Flash Sale ইত্যাদি) */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition py-3 relative ${
                      isActive 
                        ? 'text-emerald-600 border-b-2 border-emerald-600' 
                        : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}