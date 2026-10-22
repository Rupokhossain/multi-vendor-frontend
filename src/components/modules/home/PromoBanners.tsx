// src/components/modules/home/PromoBanners.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, Truck } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="mt-10 sm:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* ব্যানার ১: মেগা ইলেকট্রনিক্স ও গ্যাজেট ফেস্ট (সফট ব্লু ও আইস থিম) */}
        <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-100/60 border border-blue-200/80 p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-xs hover:shadow-md transition select-none">
          
          {/* টপ ব্যাজসমূহ */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200/80 whitespace-nowrap shadow-xs">
              <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
              <span>Tech Mega Deals</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-white text-blue-900 border border-blue-200 whitespace-nowrap shadow-xs">
              <Tag className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Use Code: TECH20</span>
            </span>
          </div>

          {/* কনটেন্ট ও ছবি: মোবাইলে ৮ কলাম টেক্সট + ৪ কলাম ছবি */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center my-auto pt-3 sm:pt-4">
            <div className="col-span-8 space-y-1.5 sm:space-y-2">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-slate-900 line-clamp-2">
                Next-Gen Smart Gadgets & Laptops
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 font-medium line-clamp-2">
                Up to 25% instant discount on verified brand gadgets with authentic warranty.
              </p>
              <div className="pt-1.5 sm:pt-2">
                {/* 🌟 ফিক্সড বাটন: whitespace-nowrap দেওয়া হয়েছে এবং অ্যারো আইকনে স্মুথ স্লাইড এফেক্ট */}
                <Link
                  href="/deals"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition shadow-md shadow-blue-500/20 whitespace-nowrap group/btn"
                >
                  <span>Shop Gadgets</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* প্রোডাক্ট ছবি */}
            <div className="col-span-4 flex justify-end items-center">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden shadow-md border-2 sm:border-4 border-white transform group-hover:scale-105 transition-transform duration-500 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80"
                  alt="Smart Gadgets"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ব্যানার ২: প্রিমিয়াম ফ্যাশন ও হ্যান্ডক্রাফটেড লেদার */}
        <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-amber-100/60 border border-emerald-200/80 p-5 sm:p-7 lg:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] shadow-xs hover:shadow-md transition select-none">
          
          {/* টপ ব্যাজসমূহ */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200/80 whitespace-nowrap shadow-xs">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>New Season Drop</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-white text-emerald-900 border border-emerald-200 whitespace-nowrap shadow-xs">
              <Truck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Free Delivery</span>
            </span>
          </div>

          {/* কনটেন্ট ও ছবি: মোবাইলে ৮ কলাম টেক্সট + ৪ কলাম ছবি */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center my-auto pt-3 sm:pt-4">
            <div className="col-span-8 space-y-1.5 sm:space-y-2">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-slate-900 line-clamp-2">
                Handcrafted Leather & Luxury Bags
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 font-medium line-clamp-2">
                Enjoy fast nationwide Steadfast courier delivery on all orders over ৳1,500.
              </p>
              <div className="pt-1.5 sm:pt-2">
                {/* 🌟 ফিক্সড বাটন: কখনোই লাইন ভাঙবে না, স্মুথ ইন্টারঅ্যাকশন */}
                <Link
                  href="/products?category=bags-wallets"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition shadow-md shadow-emerald-500/20 whitespace-nowrap group/btn"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* প্রোডাক্ট ছবি */}
            <div className="col-span-4 flex justify-end items-center">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden shadow-md border-2 sm:border-4 border-white transform group-hover:scale-105 transition-transform duration-500 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80"
                  alt="Leather Bags"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}