// src/components/modules/home/HeroSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const fallbackSlides = [
  {
    badge: 'MEGA SALE 2026',
    tag: 'UP TO 50% OFF',
    title: 'Everything You Need In One Single Place',
    subtitle: 'Shop top verified sellers across Bangladesh with fast nationwide Steadfast courier delivery.',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    bgGradient: 'from-emerald-50 via-teal-50/70 to-emerald-100/60',
    accentColor: 'text-emerald-800 bg-emerald-100/90 border border-emerald-200/80',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  },
  {
    badge: 'FLAGSHIP GADGETS',
    tag: 'LIMITED TIME DEAL',
    title: 'Upgrade Your Lifestyle With Smart Electronics',
    subtitle: 'Discover genuine flagship smartphones, ANC headphones, and ultra-slim laptops with authentic brand warranty.',
    ctaText: 'Explore Deals',
    ctaLink: '/deals',
    bgGradient: 'from-blue-50 via-indigo-50/70 to-sky-100/60',
    accentColor: 'text-blue-800 bg-blue-100/90 border border-blue-200/80',
    btnColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    badge: 'LUXURY COLLECTION',
    tag: 'NEW ARRIVALS',
    title: 'Timeless Elegance & Premium Accessories',
    subtitle: 'Handcrafted luxury watches, authentic leather bags, and designer fashion for modern connoisseurs.',
    ctaText: 'Discover Collection',
    ctaLink: '/products?category=watches',
    bgGradient: 'from-amber-50 via-orange-50/70 to-rose-100/60',
    accentColor: 'text-amber-800 bg-amber-100/90 border border-amber-200/80',
    btnColor: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % fallbackSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = fallbackSlides[currentSlide];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xs h-full min-h-[460px] sm:min-h-[480px] lg:h-[490px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between select-none">
      {/* ব্যাকগ্রাউন্ড সফট গার্ডিয়েন্ট */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-all duration-700 -z-10`} />

      {/* ১. টপ স্পেস: ব্যাজসমূহ */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase whitespace-nowrap shadow-xs ${slide.accentColor}`}>
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{slide.badge}</span>
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase bg-red-100/90 text-red-600 border border-red-200/80 whitespace-nowrap shadow-xs">
          <Zap className="w-3 h-3 fill-red-600 shrink-0" />
          <span>{slide.tag}</span>
        </span>
      </div>

      {/* ২. মিডল সেকশন: টেক্সট এবং প্রোডাক্ট ছবি */}
      <div 
        key={currentSlide} 
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto animate-in fade-in duration-500 py-2"
      >
        {/* টেক্সট কলাম (ডেক্সটপে ৭ কলাম) */}
        <div className="md:col-span-7 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.18] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-medium max-w-lg line-clamp-2 sm:line-clamp-3">
            {slide.subtitle}
          </p>

          <div className="pt-2">
            <Link
              href={slide.ctaLink}
              className={`inline-flex items-center gap-2 text-white font-black text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 ${slide.btnColor}`}
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 🌟 প্রোডাক্ট ইমেজ কলাম (মোবাইলে ওয়াইড ফুল-উইডথ, ডেক্সটপে পারফেক্ট সাইড-বাই-সাইড) */}
        <div className="md:col-span-5 flex justify-center md:justify-end items-center w-full pt-2 md:pt-0">
          <div className="relative w-full h-44 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:rotate-1 md:hover:rotate-0 transition duration-500 border-2 sm:border-4 border-white">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ৩. বটম বার: স্লাইডার ইন্ডিকেটর ডটস */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {fallbackSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}