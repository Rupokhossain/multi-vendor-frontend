// src/components/shared/Topbar.tsx
import Link from 'next/link';
import { Truck, Headphones, User, Store, MapPin } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-600 py-2">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* বামপাশে ফ্রি শিপিং মেসেজ */}
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>Free shipping on orders over <strong className="text-slate-900">৳ 999</strong></span>
        </div>

        {/* ডানপাশের কুইক লিংকস */}
        <div className="flex items-center gap-5">
          <Link 
            href="/vendor/register" 
            className="hover:text-emerald-600 transition flex items-center gap-1 font-medium"
          >
            <Store className="w-3.5 h-3.5 text-slate-500" />
            Become a Seller
          </Link>
          
          <span className="text-slate-300">|</span>

          <Link 
            href="/track-order" 
            className="hover:text-emerald-600 transition flex items-center gap-1 font-medium"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            Track Order
          </Link>

          <span className="text-slate-300">|</span>

          <Link 
            href="/support" 
            className="hover:text-emerald-600 transition flex items-center gap-1 font-medium"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-500" />
            Help & Support
          </Link>

          <span className="text-slate-300">|</span>

          <Link 
            href="/login" 
            className="hover:text-emerald-600 transition flex items-center gap-1 font-semibold text-slate-800"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            Login / Register
          </Link>
        </div>
      </div>
    </div>
  );
}