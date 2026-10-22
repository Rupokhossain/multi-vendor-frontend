// src/components/modules/home/CategorySidebar.tsx
'use client';

import Link from 'next/link';
import { 
  Smartphone, 
  Shirt, 
  Home as HomeIcon, 
  Sparkles, 
  Dumbbell, 
  Gamepad2, 
  BookOpen, 
  Car, 
  Apple, 
  HeartPulse,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: Smartphone },
  { name: 'Fashion', slug: 'fashion', icon: Shirt },
  { name: 'Home & Living', slug: 'home-living', icon: HomeIcon },
  { name: 'Beauty & Personal Care', slug: 'beauty', icon: Sparkles },
  { name: 'Sports & Outdoor', slug: 'sports', icon: Dumbbell },
  { name: 'Toys & Games', slug: 'toys', icon: Gamepad2 },
  { name: 'Books & Stationery', slug: 'books', icon: BookOpen },
  { name: 'Automotive', slug: 'automotive', icon: Car },
  { name: 'Groceries & Food', slug: 'groceries', icon: Apple },
  { name: 'Health & Wellness', slug: 'health', icon: HeartPulse },
];

export default function CategorySidebar() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 h-full flex flex-col justify-between">
      <div className="space-y-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition group"
            >
              <div className="flex items-center gap-3.5">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                <span>{cat.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100">
        <Link
          href="/products"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-emerald-600 transition"
        >
          <div className="flex items-center gap-3.5">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
            <span>More Categories</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </Link>
      </div>
    </div>
  );
}