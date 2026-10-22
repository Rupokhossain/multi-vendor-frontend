// src/components/modules/home/HeroSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useHeroBanners } from '@/hooks/useCatalog';

const fallbackSlides = [
  {
    badge: 'MULTI-VENDOR MARKETPLACE',
    title: 'Everything You Need In One Place',
    subtitle: 'Shop from trusted sellers, get the best deals and enjoy a seamless shopping experience across Bangladesh.',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    bgGradient: 'from-emerald-50/90 via-teal-50/70 to-emerald-100/60',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
  },
  {
    badge: 'WINTER MEGA SALE 2026',
    title: 'Upgrade Your Lifestyle with Top Brands',
    subtitle: 'Explore premium footwear, smart electronics, and trendy fashion with up to 50% discount.',
    ctaText: 'Explore Deals',
    ctaLink: '/deals',
    bgGradient: 'from-blue-50/90 via-indigo-50/70 to-sky-100/60',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
  },
];

export default function HeroSlider() {
  const { data: banners } = useHeroBanners();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % fallbackSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = fallbackSlides[currentSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm h-full min-h-[420px] flex flex-col justify-between p-8 sm:p-12 bg-gradient-to-br transition-all duration-700">
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} -z-10`} />

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center flex-1">
        {/* টেক্সট পার্ট (ফন্ট সাইজ বড় করা হয়েছে) */}
        <div className="sm:col-span-7 space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600/10 text-emerald-800 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {slide.badge}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-medium">
            {slide.subtitle}
          </p>

          <div className="pt-2">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition transform hover:-translate-y-0.5"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* ডানপাশের প্রোডাক্ট ছবি */}
        <div className="sm:col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition duration-500 border-4 border-white">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* স্লাইডার ডটস */}
      <div className="flex items-center justify-center gap-2.5 pt-6">
        {fallbackSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-10 bg-emerald-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}