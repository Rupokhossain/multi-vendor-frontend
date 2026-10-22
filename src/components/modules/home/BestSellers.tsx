// src/components/modules/home/BestSellers.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, CheckCircle2 } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion & Bags' },
  { id: 'footwear', name: 'Footwear' },
];

const bestSellingProducts = [
  {
    id: 'bs-1',
    name: 'Apple AirPods Pro (2nd Gen) with MagSafe Case',
    slug: 'apple-airpods-pro-2',
    category: 'electronics',
    price: 26500,
    originalPrice: 29500,
    rating: 4.9,
    reviews: 184,
    soldCount: '1.2k+ Sold',
    store: 'iCenter Bangladesh',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-2',
    name: 'Nike Air Jordan 1 Retro High OG Chicago',
    slug: 'nike-air-jordan-1-chicago',
    category: 'footwear',
    price: 14200,
    originalPrice: 16500,
    rating: 4.8,
    reviews: 95,
    soldCount: '850+ Sold',
    store: 'Apex Footwear BD',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-3',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    slug: 'logitech-mx-master-3s',
    category: 'electronics',
    price: 11800,
    originalPrice: 13500,
    rating: 4.9,
    reviews: 72,
    soldCount: '620+ Sold',
    store: 'TechZone BD',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-4',
    name: 'Handcrafted Vintage Canvas Travel Duffel Bag',
    slug: 'vintage-canvas-travel-duffel',
    category: 'fashion',
    price: 3800,
    originalPrice: 4800,
    rating: 4.7,
    reviews: 48,
    soldCount: '490+ Sold',
    store: 'Fashion Hub Lifestyle',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-5',
    name: 'Samsung Galaxy Watch 6 Classic 47mm LTE',
    slug: 'samsung-galaxy-watch-6',
    category: 'electronics',
    price: 28900,
    originalPrice: 32000,
    rating: 4.8,
    reviews: 64,
    soldCount: '380+ Sold',
    store: 'Gadget Planet BD',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-6',
    name: 'Premium Slim-Fit Formal Oxford Cotton Shirt',
    slug: 'slim-fit-oxford-cotton-shirt',
    category: 'fashion',
    price: 2450,
    originalPrice: 3200,
    rating: 4.6,
    reviews: 112,
    soldCount: '940+ Sold',
    store: 'Gentleman Wear BD',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-7',
    name: 'Sony SRS-XB100 Compact Wireless Bluetooth Speaker',
    slug: 'sony-srs-xb100-speaker',
    category: 'electronics',
    price: 6400,
    originalPrice: 7500,
    rating: 4.8,
    reviews: 86,
    soldCount: '520+ Sold',
    store: 'AudioCraft BD',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bs-8',
    name: 'Handmade Genuine Leather Bifold RFID Wallet',
    slug: 'leather-bifold-rfid-wallet',
    category: 'fashion',
    price: 1650,
    originalPrice: 2200,
    rating: 4.9,
    reviews: 134,
    soldCount: '1.5k+ Sold',
    store: 'Apex Footwear BD',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
  },
];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all' 
    ? bestSellingProducts 
    : bestSellingProducts.filter((p) => p.category === activeTab);

  return (
    <section className="mt-12 sm:mt-16">
      {/* ১. হেডার ও ক্যাটাগরি ট্যাব */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🏆 Best Sellers</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            Most popular and trusted products based on authentic customer orders
          </p>
        </div>

        {/* ফিল্টার ট্যাব: মোবাইলে স্মুথ স্ক্রলিং */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ২. প্রোডাক্ট গ্রিড (৪ কলাম ডেক্সটপ, ২ কলাম মোবাইল) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              {/* ইমেজ ও ব্যাজ */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                {/* 🌟 ক্লিকেবল ইমেজ */}
                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* টপ সেলার ব্যাজ */}
                <span className="absolute top-2 left-2 bg-amber-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs pointer-events-none">
                  {product.soldCount}
                </span>

                {/* উইশলিস্ট বাটন */}
                <button
                  aria-label="Wishlist"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-red-500 flex items-center justify-center transition"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* স্টোরের নাম */}
              <div className="pt-3 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                <span className="truncate">{product.store}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>

              {/* 🌟 ক্লিকেবল প্রোডাক্ট টাইটেল: বড় ফন্ট ও সমান হাইট */}
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-2 min-h-[40px] sm:min-h-[48px] leading-snug hover:text-emerald-700 transition">
                  {product.name}
                </h3>
              </Link>

              {/* রেটিং */}
              <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400 font-medium">({product.reviews} reviews)</span>
              </div>

              {/* প্রাইস: বড় ও বোল্ড */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-base sm:text-xl font-black text-slate-900">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* বাটন */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition">
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