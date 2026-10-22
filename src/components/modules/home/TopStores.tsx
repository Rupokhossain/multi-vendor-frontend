// src/components/modules/home/TopStores.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ArrowRight, Package, Store } from 'lucide-react';

const topStores = [
  {
    id: 'store-1',
    name: 'Apex Footwear BD',
    slug: 'apex-footwear',
    badge: 'Official Brand Store',
    rating: 4.9,
    reviews: '1.4k',
    totalProducts: '350+ Products',
    location: 'Dhaka, Bangladesh',
    banner: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'store-2',
    name: 'TechZone Electronics',
    slug: 'techzone-electronics',
    badge: 'Top Rated Tech Seller',
    rating: 4.8,
    reviews: '980',
    totalProducts: '280+ Products',
    location: 'Chattogram, Bangladesh',
    banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'store-3',
    name: 'Fashion Hub Lifestyle',
    slug: 'fashion-hub',
    badge: 'Verified Fashion Partner',
    rating: 4.7,
    reviews: '720',
    totalProducts: '190+ Products',
    location: 'Sylhet, Bangladesh',
    banner: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    logo: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=150&q=80',
  },
];

export default function TopStores() {
  return (
    <section className="mt-12 sm:mt-16 mb-8">
      {/* ১. ক্লিন হেডার */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Top Verified Stores
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            Shop directly from trusted official brand stores and top-rated merchants
          </p>
        </div>

        <Link
          href="/vendors"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition shrink-0"
        >
          <span>All Stores</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ২. স্টোর কার্ড গ্রিড (ডেক্সটপে ৩ কলাম, মোবাইলে ১ কলাম পরিষ্কার ভিউ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {topStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              {/* স্টোর কভার ব্যানার */}
              <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
                <img
                  src={store.banner}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  {store.badge}
                </span>
              </div>

              {/* স্টোর ইনফো */}
              <div className="px-5 pt-0 pb-4 relative">
                {/* স্টোর লোগো */}
                <div className="relative -mt-8 w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white mb-3">
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* স্টোরের নাম ও ভেরিফায়েড টিক */}
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {store.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  {store.location}
                </p>

                {/* রেটিং ও প্রডাক্ট সংখ্যা */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{store.rating}</span>
                    <span className="text-slate-400 font-medium">({store.reviews})</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Package className="w-4 h-4 text-slate-400" />
                    <span>{store.totalProducts}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Store বাটন */}
            <div className="px-5 pb-5 pt-2">
              <Link
                href={`/vendors/${store.slug}`}
                className="w-full bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Store className="w-4 h-4" />
                <span>Visit Store</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}