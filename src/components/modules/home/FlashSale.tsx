/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/modules/home/FlashSale.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ArrowRight, 
  Star, 
  Heart, 
  ShoppingCart, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';
import { useFlashSale } from '@/hooks/useCatalog';

// ফলব্যাক ফ্ল্যাশ সেল প্রোডাক্টস (রিয়েলিস্টিক ডাটা)
const fallbackFlashProducts = [
  {
    id: 'fs-1',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    price: 38500,
    originalPrice: 45000,
    discount: '15% OFF',
    sold: 34,
    totalStock: 50,
    rating: 4.9,
    reviews: 142,
    store: { name: 'TechZone BD', verified: true },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fs-2',
    name: 'Nike Air Max 270 Premium Running Shoes',
    slug: 'nike-air-max-270-shoes',
    price: 8900,
    originalPrice: 12500,
    discount: '28% OFF',
    sold: 42,
    totalStock: 45,
    rating: 4.8,
    reviews: 98,
    store: { name: 'Apex Footwear BD', verified: true },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fs-3',
    name: 'Fossil Gen 6 Smartwatch Leather Strap',
    slug: 'fossil-gen-6-smartwatch',
    price: 18200,
    originalPrice: 24000,
    discount: '24% OFF',
    sold: 19,
    totalStock: 30,
    rating: 4.7,
    reviews: 64,
    store: { name: 'WatchGallery BD', verified: true },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fs-4',
    name: 'Wild Stone Edge Eau De Parfum 100ml',
    slug: 'wild-stone-edge-perfume',
    price: 1850,
    originalPrice: 2600,
    discount: '29% OFF',
    sold: 68,
    totalStock: 80,
    rating: 4.6,
    reviews: 210,
    store: { name: 'Aroma Luxury BD', verified: true },
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fs-5',
    name: 'Classic Vintage Leather Laptop Messenger Bag',
    slug: 'classic-leather-laptop-bag',
    price: 4200,
    originalPrice: 6500,
    discount: '35% OFF',
    sold: 25,
    totalStock: 35,
    rating: 4.9,
    reviews: 82,
    store: { name: 'Fashion Hub Lifestyle', verified: true },
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
  },
];

export default function FlashSale() {
  const { data: serverProducts } = useFlashSale();

  // লাইভ কাউন্টডাউন টাইমার স্টেট (ঘন্টা, মিনিট, সেকেন্ড)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 }; // রিসেট
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = (serverProducts && serverProducts.length > 0) ? serverProducts : fallbackFlashProducts;

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="mt-10 sm:mt-12 rounded-3xl p-5 sm:p-8">
      {/* ১. হেডার ও কাউন্টডাউন টাইমার বার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6  border-slate-100">
    
        {/* বাঁ পাশ: টাইটেল ও সাবটাইটেল */}
        <div className="space-y-1">
          {/* <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Limited Time Deal</span>
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 hidden sm:inline-flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>Up to 50% Off</span>
            </span>
          </div> */}

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚡ Flash Sale Deals</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Massive discounts on top verified store products. Grab yours before stock runs out!
          </p>
        </div>

        {/* ডান পাশ: লাইভ টাইমার এবং "View All" বাটন */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          {/* কাউন্টডাউন টাইমার */}
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-xs">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-black">
              <span className="bg-slate-800 px-2 py-1 rounded-lg text-amber-400">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-2 py-1 rounded-lg text-amber-400">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-2 py-1 rounded-lg text-rose-400">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* View All লিংক */}
          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ২. প্রোডাক্ট গ্রিড (৫ কলাম রেসপন্সিভ) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-6">
        {products.map((item: any) => {
          const percentSold = Math.min(Math.round((item.sold / item.totalStock) * 100), 100);

          return (
            <div
              key={item.id}
              className="group bg-slate-50/50 rounded-2xl sm:rounded-3xl border border-slate-200/80  p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* ইমেজ কন্টেইনার + ডিসকাউন্ট ব্যাজ + উইশলিস্ট বাটন */}
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* ডিসকাউন্ট ব্যাজ */}
                  <span className="absolute top-2 left-2 bg-rose-600 text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-lg shadow-sm">
                    {item.discount}
                  </span>

                  {/* উইশলিস্ট বাটন */}
                  <button
                    aria-label="Add to Wishlist"
                    className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600 flex items-center justify-center shadow-sm transition hover:scale-110"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* ভেন্ডর ও স্টোর নাম */}
                <div className="pt-3 flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                  <span className="truncate">{item.store?.name || 'Verified Seller'}</span>
                  {item.store?.verified && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  )}
                </div>

                {/* প্রোডাক্ট টাইটেল */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2 group-hover:text-emerald-700 transition leading-snug">
                  {item.name}
                </h3>

                {/* রেটিং */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-400 font-medium">({item.reviews})</span>
                </div>

                {/* প্রাইসিং রো */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm sm:text-base font-black text-slate-900">
                    ৳{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      ৳{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* বটম সেকশন: স্টক প্রগ্রেস বার এবং Add to Cart বাটন */}
              <div className="pt-3 mt-3 border-t border-slate-100/90 space-y-2.5">
                {/* স্টক প্রগ্রেস বার */}
                <div>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500 mb-1">
                    <span>Sold: {item.sold}/{item.totalStock}</span>
                    <span className="text-rose-600">{percentSold}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                </div>

                {/* Add to Cart বাটন */}
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs hover:shadow-md">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}