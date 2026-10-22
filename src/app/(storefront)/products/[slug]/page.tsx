/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(storefront)/products/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  CheckCircle2, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Zap,
  Store,
  ChevronRight,
  Share2,
  Check,
  Headphones,
  BatteryCharging,
  Mic,
  Bluetooth,
  ThumbsUp
} from 'lucide-react';
import { toast } from 'sonner';

// ডাইনামিক প্রোডাক্ট ডেটাবেস
const productDatabase: Record<string, any> = {
  'sony-wh-1000xm5-headphones': {
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    sku: 'SKU-SONY-WH1000XM5-BLK',
    brand: 'Sony',
    category: 'Electronics & Audio',
    price: 38500,
    originalPrice: 45000,
    stock: 8,
    soldCount: '850+ Sold',
    rating: 4.9,
    reviewsCount: 142,
    store: { name: 'TechZone BD', slug: 'techzone', verified: true },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ],
    colorFamily: [
      { name: 'Sky Blue & White', colorHex: '#93c5fd' },
      { name: 'Soft Cream Yellow', colorHex: '#fef08a' },
      { name: 'Midnight Pitch Black', colorHex: '#0f172a' },
    ],
    sizes: ['Standard Fit'],
    leadText: 'The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Equipped with two processors and eight microphones, Auto NC Optimizer automatically optimizes noise canceling based on your environment.',
    featureCards: [
      {
        icon: Headphones,
        title: 'Intelligent Noise Canceling',
        desc: 'Dual processors analyze ambient sound 700 times per second to silence traffic, plane engines, and chatter.',
      },
      {
        icon: BatteryCharging,
        title: '30-Hour Marathon Battery',
        desc: 'Listen for over a day on a single charge. Just 3 minutes of USB-C fast charging provides 3 hours of playback.',
      },
      {
        icon: Mic,
        title: 'Studio-Grade Voice Pickup',
        desc: '4 beamforming microphones with AI voice isolation ensure your calls are crystal-clear even in windy conditions.',
      },
      {
        icon: Bluetooth,
        title: 'Multipoint Bluetooth 5.2',
        desc: 'Stays connected to your laptop and smartphone simultaneously. Switches automatically when a call rings in.',
      },
    ],
    specs: [
      { label: 'Brand & Series', value: 'Sony 1000X Series' },
      { label: 'Model Number', value: 'WH-1000XM5 / Black' },
      { label: 'Driver Unit', value: '30mm High-Precision Dome Driver' },
      { label: 'Battery Life', value: 'Up to 30 Hours (ANC On) / 40 Hours (ANC Off)' },
      { label: 'Charging Interface', value: 'USB Type-C Fast Charging Supported' },
      { label: 'Bluetooth Codecs', value: 'LDAC, AAC, SBC (Hi-Res Audio Wireless)' },
      { label: 'Weight', value: 'Approx. 250 grams (Ultra-lightweight)' },
      { label: 'Warranty Policy', value: '1 Year Official Brand Service Warranty' },
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Tanvir Hossain',
        rating: 5,
        date: '14 Oct 2026',
        comment: 'Authentic product from TechZone BD! ANC quality is completely top-tier. Steadfast delivered within 24 hours in Dhaka.',
        verified: true,
      },
      {
        id: 'rev-2',
        name: 'Nusrat Jahan',
        rating: 5,
        date: '02 Oct 2026',
        comment: 'Very comfortable for 6-8 hour work sessions. Microphone quality on Zoom and Teams is exceptionally clear.',
        verified: true,
      },
    ],
  },
  'nike-air-max-270-shoes': {
    name: 'Nike Air Max 270 Premium Running Shoes',
    sku: 'SKU-NIKE-AIR270-RED',
    brand: 'Nike',
    category: 'Footwear & Sports',
    price: 8900,
    originalPrice: 12500,
    stock: 12,
    soldCount: '450+ Sold',
    rating: 4.8,
    reviewsCount: 98,
    store: { name: 'Apex Footwear BD', slug: 'apex-footwear', verified: true },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    ],
    colorFamily: [
      { name: 'University Red & Black', colorHex: '#ef4444' },
      { name: 'Triple Pitch Black', colorHex: '#0f172a' },
      { name: 'Pure White & Silver', colorHex: '#f8fafc' },
    ],
    sizes: ['40 EUR', '41 EUR', '42 EUR', '43 EUR', '44 EUR'],
    leadText: 'The Nike Air Max 270 delivers unrivaled, all-day comfort with a super-sized Max Air 270 heel unit engineered for lightweight bounce.',
    featureCards: [
      {
        icon: Headphones,
        title: 'Max Air 270 Cushioning',
        desc: 'Big heel volume provides bouncy, responsive cushioning with every single stride.',
      },
      {
        icon: BatteryCharging,
        title: 'Engineered Knit Upper',
        desc: 'Ventilated mesh fabric hugs your foot for breathable, lightweight flex.',
      },
    ],
    specs: [
      { label: 'Brand', value: 'Nike' },
      { label: 'Category', value: 'Lifestyle Running Shoes' },
      { label: 'Sole Material', value: 'Dual-Density Foam + Rubber Waffle' },
      { label: 'Warranty', value: '6 Months Brand Warranty' },
    ],
    reviews: [
      {
        id: 'rev-3',
        name: 'Shakil Ahmed',
        rating: 5,
        date: '18 Oct 2026',
        comment: '10/10 fit and authentic comfort. Apex delivered properly boxed.',
        verified: true,
      },
    ],
  },
};

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'sony-wh-1000xm5-headphones';

  const product = productDatabase[slug] || productDatabase['sony-wh-1000xm5-headphones'];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorFamily?.[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountAmount = product.originalPrice - product.price;
  const discountPercent = Math.round((discountAmount / product.originalPrice) * 100);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      try {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Product link copied to clipboard!');
      } catch {
        toast.info('Share URL: ' + window.location.href);
      }
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x "${product.name}" to cart!`);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-4 sm:py-8 pb-28 lg:pb-12">
      
      {/* ১. ব্রেডক্রাম্ব ও শেয়ার রো (হুবহু আপনার আগের স্টাইল) */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/products" className="hover:text-emerald-600 transition">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* শেয়ার ও উইশলিস্ট বাটনস */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-xl transition shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={() => {
              setIsWishlisted(!isWishlisted);
              toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist!');
            }}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition shadow-xs flex items-center gap-1.5 text-xs sm:text-sm font-bold ${
              isWishlisted ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-700 border-slate-200 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
            <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>
      </div>

      {/* ২. মেইন প্রোডাক্ট সেকশন (🌟 দুই পাশ একদম আপনার দেওয়া অরিজিনাল ব্যালান্সড হাইট) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* বাঁ পাশ: ইমেজ গ্যালারি (৭ কলাম, নিচে কোনো অনাকাঙ্ক্ষিত বক্স নেই) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* বড় মেইন ছবি */}
          <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-xs pointer-events-none">
              -{discountPercent}% OFF
            </span>
          </div>

          {/* নিচে ৪টি থাম্বনেইল স্ট্রিপ */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 transition ${
                  activeImage === idx ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ডান পাশ: প্রোডাক্ট ইনফো, ভ্যারিয়েন্ট ও বাটনস (৫ কলাম) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            {/* In Stock ও SKU ট্যাগ */}
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock</span>
              </span>

              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                SKU: {product.sku}
              </span>
            </div>

            {/* ভেন্ডর নাম ও ব্র্যান্ড */}
            <div className="flex items-center justify-between">
              <Link 
                href={`/vendors/${product.store.slug}`}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition"
              >
                <Store className="w-4 h-4 text-emerald-600" />
                <span>{product.store.name}</span>
                {product.store.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </Link>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                Brand: {product.brand}
              </span>
            </div>

            {/* প্রোডাক্ট টাইটেল */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* রেটিং ও বিক্রির সংখ্যা */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium">{product.reviewsCount} Reviews</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
                {product.soldCount}
              </span>
            </div>

            {/* প্রাইসিং কার্ড */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  ৳{product.price.toLocaleString()}
                </span>
                <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">
                  Save ৳{discountAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* কালার ফ্যামিলি সোয়াচ */}
            {product.colorFamily && (
              <div className="space-y-1.5 pt-1">
                <label className="text-sm text-slate-500 font-medium">
                  Color Family: <span className="font-bold text-slate-900">{selectedColor}</span>
                </label>

                <div className="flex items-center gap-3 pt-0.5">
                  {product.colorFamily.map((c: any) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border-2 ${
                          isSelected 
                            ? 'ring-2 ring-emerald-600 ring-offset-2 border-white' 
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: c.colorHex }}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 ${c.colorHex === '#ffffff' || c.colorHex === '#fef08a' || c.colorHex === '#93c5fd' ? 'text-slate-900' : 'text-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* স্কয়ার সাইজ বাটনস */}
            {product.sizes && (
              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-bold text-slate-900">Size</label>
                <div className="flex items-center flex-wrap gap-2.5">
                  {product.sizes.map((s: string) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[48px] h-10 px-3.5 rounded-xl text-sm font-bold border transition ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* কোয়ান্টিটি সিলেক্টর */}
            <div className="space-y-1.5 pt-1">
              <label className="text-sm font-bold text-slate-900">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-slate-100 transition text-slate-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-black text-slate-900 text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-slate-100 transition text-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ({product.stock} items in stock)
                </span>
              </div>
            </div>

            {/* বাটনস: Add to Cart & Buy Now */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* কুরিয়ার ডেলিভারি ও ট্রাস্ট বক্স */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-3 mt-2">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-slate-900">Steadfast Courier Delivery</p>
                <p className="text-slate-500 font-medium mt-0.5">
                  Dhaka: ৳60 (24-48 hrs) | Outside Dhaka: ৳120 (48-72 hrs)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
              <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-slate-900">3 Days Return Guarantee</p>
                <p className="text-slate-500 font-medium mt-0.5">
                  100% money-back if damaged, defective or mismatched.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2.5 border-t border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-slate-900">100% Genuine Brand Product</p>
                <p className="text-slate-500 font-medium mt-0.5">
                  Dispatched directly from verified authorized merchant.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ৩. নিচের সেকশন (Product Overview, Technical Specs, Customer Reviews) */}
      <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200">
        
        {/* সেগমেন্টেড স্লীক ট্যাব বার */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === 'desc'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === 'specs'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === 'reviews'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        {/* কনটেন্ট ডিসপ্লে */}
        <div className="pt-8">
          
          {/* ট্যাব ১: প্রোডাক্ট ওভারভিউ */}
          {activeTab === 'desc' && (
            <div className="space-y-8">
              <div className="border-l-4 border-emerald-600 pl-4 py-1 max-w-4xl">
                <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                  {product.leadText}
                </p>
              </div>

              {product.featureCards && (
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-4">Engineered Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.featureCards.map((feat: any, idx: number) => {
                      const IconComponent = feat.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:border-slate-300 transition">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h4 className="text-base font-bold text-slate-900">{feat.title}</h4>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ট্যাব ২: টেকনিক্যাল স্পেসিফিকেশন */}
          {activeTab === 'specs' && product.specs && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-black text-slate-900 mb-4">Complete Technical Details</h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white divide-y divide-slate-100">
                {product.specs.map((item: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm">
                    <span className="col-span-5 font-bold text-slate-800">{item.label}</span>
                    <span className="col-span-7 text-slate-600 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ট্যাব ৩: কাস্টমার রিভিউ */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* বাঁয়ে রেটিং ওভারভিউ ড্যাশবোর্ড */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Overall Rating</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-slate-900">{product.rating}</span>
                  <span className="text-base font-bold text-slate-400">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium">Based on {product.reviewsCount} verified purchases</p>

                {/* ৫ স্টার ব্রেকডাউন বার */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-12">5 Star</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full w-[90%]" />
                    </div>
                    <span>90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12">4 Star</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full w-[8%]\" />
                    </div>
                    <span>8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12">3 Star</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full w-[2%]\" />
                    </div>
                    <span>2%</span>
                  </div>
                </div>
              </div>

              {/* ডানে কাস্টমার রিভিউ কার্ডস */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-lg font-black text-slate-900">Verified Customer Reviews</h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev: any) => (
                    <div key={rev.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-black text-xs flex items-center justify-center">
                            {rev.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-none">{rev.name}</p>
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Verified Buyer</span>
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        &quot;{rev.comment}&quot;
                      </p>

                      <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
                        <button className="flex items-center gap-1 hover:text-slate-700 transition">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful (12)</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No customer reviews yet.</p>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ৪. মোবাইলে স্টিকি বটম বার */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 px-4 z-40 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-[11px] text-slate-400 font-semibold">Total Price:</p>
          <p className="text-lg font-black text-slate-900 leading-none">
            ৳{(product.price * quantity).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
}