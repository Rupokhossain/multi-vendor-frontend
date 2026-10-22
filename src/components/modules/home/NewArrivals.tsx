// src/components/modules/home/NewArrivals.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';

const newArrivalProducts = [
  {
    id: 'na-1',
    name: 'Nothing Ear (2) Transparent Wireless Hi-Res Earbuds',
    slug: 'nothing-ear-2-earbuds',
    price: 14500,
    store: 'Gadget Nation BD',
    tag: 'NEW IN',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'na-2',
    name: 'Minimalist Japanese Linen Blend Casual Blazer',
    slug: 'japanese-linen-blazer',
    price: 5200,
    store: 'Urban Sartorial BD',
    tag: 'JUST DROPPED',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'na-3',
    name: 'Keychron K2 Pro QMK Wireless Mechanical Keyboard',
    slug: 'keychron-k2-pro-keyboard',
    price: 9800,
    store: 'TechZone BD',
    tag: 'NEW IN',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'na-4',
    name: 'Handcrafted Vegetable-Tanned Leather Messenger Bag',
    slug: 'leather-messenger-bag',
    price: 4900,
    store: 'Apex Footwear BD',
    tag: '2026 EDITION',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
  },
];

export default function NewArrivals() {
  return (
    <section className="mt-12 sm:mt-16 mb-12">
      {/* ১. হেডার */}
      <div className="flex items-end justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>✨ New Arrivals</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            Freshly dropped products and exclusive seasonal releases
          </p>
        </div>

        <Link
          href="/new-arrivals"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition shrink-0"
        >
          <span>View All New</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ২. গ্রিড (৪টি ফ্রেশ ও এক্সক্লুসিভ প্রডাক্ট) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-6">
        {newArrivalProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              {/* ইমেজ ও NEW IN ব্যাজ */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                {/* 🌟 ক্লিকেবল ইমেজ */}
                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1 pointer-events-none">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{product.tag}</span>
                </span>

                <button
                  aria-label="Wishlist"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-red-500 flex items-center justify-center transition"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* ভেন্ডর নাম */}
              <div className="pt-3 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                <span className="truncate">{product.store}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>

              {/* 🌟 ক্লিকেবল প্রডাক্ট নাম */}
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-2 min-h-[40px] sm:min-h-[48px] leading-snug hover:text-emerald-700 transition">
                  {product.name}
                </h3>
              </Link>

              {/* প্রডাক্ট প্রাইস */}
              <div className="mt-2">
                <span className="text-base sm:text-xl font-black text-slate-900">
                  ৳{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Add to Cart বাটন */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}