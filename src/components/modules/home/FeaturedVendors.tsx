// src/components/modules/home/FeaturedVendors.tsx
'use client';

import Link from 'next/link';
import { Star, ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';
import { useFeaturedStores } from '@/hooks/useCatalog';

// ডিফল্ট ডামি ডাটা যদি ব্যাকএন্ডের স্টোর লিস্ট এখনো ফেচ না হয়
const defaultVendors = [
  { id: '1', name: 'Apex Footwear', tag: 'Official Store', rating: 4.9, reviews: '14.2k', initials: 'AF', color: 'bg-indigo-600' },
  { id: '2', name: 'TechZone BD', tag: 'Top Rated Seller', rating: 4.8, reviews: '12.4k', initials: 'TZ', color: 'bg-blue-600' },
  { id: '3', name: 'Fashion Hub', tag: 'Verified Seller', rating: 4.7, reviews: '8.1k', initials: 'FH', color: 'bg-rose-600' },
  { id: '4', name: 'FreshMart', tag: 'Verified Seller', rating: 4.6, reviews: '5.1k', initials: 'FM', color: 'bg-emerald-600' },
];

export default function FeaturedVendors() {
  const { data: stores } = useFeaturedStores();

  return (
    <div className="space-y-4">
      {/* ১. ভেন্ডার লিস্ট কার্ড */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h3 className="font-extrabold text-slate-900 text-sm">Featured Vendors</h3>
          <Link href="/vendors" className="text-xs font-bold text-emerald-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {defaultVendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-xl ${vendor.color} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                  {vendor.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{vendor.name}</h4>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-2.5 h-2.5 fill-amber-500" /> {vendor.rating}
                    </span>
                    <span>({vendor.reviews})</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/vendors`}
                className="px-3 py-1 rounded-lg border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-[11px] font-bold text-slate-600 hover:text-emerald-700 transition shrink-0"
              >
                Follow
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ২. ছোট ট্রাস্ট ব্যাজ বক্স */}
      <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-4 space-y-2.5">
        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Secure Payment with SSLCommerz</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Steadfast Fast & Reliable Delivery</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
          <Headphones className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>24/7 Dedicated Customer Support</span>
        </div>
      </div>
    </div>
  );
}