// src/components/modules/home/FeaturedVendors.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { useFeaturedStores } from '@/hooks/useCatalog';

const defaultVendors = [
  { id: '1', name: 'Apex Footwear BD', tag: 'Official Store', rating: 4.9, products: '350+ Products', initials: 'AF', color: 'bg-indigo-600' },
  { id: '2', name: 'TechZone Electronics', tag: 'Top Rated Seller', rating: 4.8, products: '280+ Products', initials: 'TZ', color: 'bg-blue-600' },
  { id: '3', name: 'Fashion Hub Lifestyle', tag: 'Verified Seller', rating: 4.7, products: '190+ Products', initials: 'FH', color: 'bg-rose-600' },
  { id: '4', name: 'FreshMart Super Store', tag: 'Verified Seller', rating: 4.6, products: '500+ Products', initials: 'FM', color: 'bg-emerald-600' },
  { id: '5', name: 'HomeStyle Decor BD', tag: 'Top Rated Seller', rating: 4.7, products: '220+ Products', initials: 'HS', color: 'bg-amber-600' },
];

export default function FeaturedVendors() {
  const { data: stores } = useFeaturedStores();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-6 h-full min-h-[460px] sm:min-h-[480px] lg:h-[490px] flex flex-col justify-between">
      <div>
        {/* হেডার */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3.5">
          <div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">Featured Vendors</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">Top trusted marketplace stores</p>
          </div>
          <Link 
            href="/vendors" 
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ভেন্ডর তালিকা: স্পেস ও টাইপোগ্রাফি ব্যালান্সড, কোনো বিশ্রী কাট-অফ নেই */}
        <div className="space-y-2.5">
          {defaultVendors.map((vendor) => (
            <div 
              key={vendor.id} 
              className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group"
            >
              {/* অ্যাভাটার ও স্টোর ইনফো */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-2xl ${vendor.color} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition`}>
                  {vendor.initials}
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{vendor.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {vendor.rating}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">{vendor.products}</span>
                  </div>
                </div>
              </div>

              {/* ফলো বাটন */}
              <Link
                href="/vendors"
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-600 bg-slate-50 hover:bg-emerald-50 text-xs font-bold text-slate-700 hover:text-emerald-700 transition shrink-0 shadow-xs"
              >
                Follow
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* সেলার অনবোর্ডিং ফুটার কলআউট */}
      {/* <div className="pt-3 border-t border-slate-100 mt-2 text-center">
        <Link 
          href="/vendor/register" 
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 transition"
        >
          <span>Become a Seller & Grow Your Business 🚀</span>
        </Link>
      </div> */}
    </div>
  );
}
