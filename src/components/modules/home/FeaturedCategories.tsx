// src/components/modules/home/FeaturedCategories.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const featuredCategories = [
  {
    name: 'Bags & Wallets',
    count: '1 Product',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
    slug: 'bags-wallets'
  },
  {
    name: 'Perfume & Fragrance',
    count: '2 Products',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80',
    slug: 'perfume-fragrance'
  },
  {
    name: 'Jewellery & Rings',
    count: '1 Product',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
    slug: 'jewellery'
  },
  {
    name: "Men's Jackets",
    count: '2 Products',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80',
    slug: 'mens-clothing'
  },
  {
    name: 'Luxury Watches',
    count: '2 Products',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
    slug: 'watches'
  },
  {
    name: "Fashion Accessories",
    count: '4 Products',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=400&q=80',
    slug: 'fashion-accessories'
  },
  {
    name: 'Smart Gadgets',
    count: '5 Products',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    slug: 'gadgets'
  },
  {
    name: 'Footwear & Shoes',
    count: '3 Products',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    slug: 'footwear'
  },
];

const infiniteCategories = [...featuredCategories, ...featuredCategories];

export default function FeaturedCategories() {
  return (
    <div className="my-12">
      {/* ১. হেডার বার */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Featured Categories
          </h2>
        </div>

        <Link
          href="/categories"
          className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ২. অবিরাম চলমান মারকুই স্লাইডার (দুই পাশের শ্যাডো তুলে দেওয়া হয়েছে) */}
      <div className="w-full overflow-hidden py-2">
        {/* কার্ড ট্র্যাক (হোভার করলে স্ক্রলিং পজ হবে) */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {infiniteCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${cat.slug}`}
              // 🌟 group ক্লাসটি প্রতিটি আলাদা লিংকে দেওয়া হয়েছে
              className="group w-52 sm:w-60 shrink-0 bg-white rounded-3xl border border-slate-200 p-5 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              {/* প্রোডাক্ট ছবি (বাজে ড্রপ-শ্যাডো মুছে দেওয়া হয়েছে, শুধুমাত্র এই ছবির কার্ড হোভার করলেই জুম হবে) */}
              <div className="w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center p-2 mb-3 group-hover:scale-108 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              </div>

              {/* ক্যাটাগরি নাম */}
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition truncate max-w-full">
                {cat.name}
              </h3>

              {/* প্রোডাক্ট সংখ্যা */}
              <p className="text-xs text-slate-400 font-medium mt-1">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* মাখনের মতো মসৃণ ও স্লো সিএসএস মারকুই অ্যানিমেশন */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}