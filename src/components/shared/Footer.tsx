"use client"

// src/components/shared/Footer.tsx
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, Headphones, ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* ১. ট্রাস্ট বেনিফিটস বার */}
      <div className="border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Shipping</h4>
              <p className="text-xs text-slate-400">On orders over ৳ 999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Easy Returns</h4>
              <p className="text-xs text-slate-400">7 days return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-400">100% secure with SSLCommerz</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
              <p className="text-xs text-slate-400">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* ২. মূল ফুটার মেনু */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white">
              Shop<span className="text-emerald-500">Nest</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
            ShopNest is a multi-vendor marketplace bringing you the best products from trusted sellers across Bangladesh with live courier tracking.
          </p>
<p className="text-xs text-slate-500">
  © 2026 ShopNest Marketplace Ltd. All rights reserved.
</p>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/about" className="hover:text-emerald-400 transition">About Us</Link></li>
            <li><Link href="/deals" className="hover:text-emerald-400 transition">Deals & Offers</Link></li>
            <li><Link href="/vendors" className="hover:text-emerald-400 transition">All Vendors</Link></li>
            <li><Link href="/flash-sale" className="hover:text-emerald-400 transition">Flash Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/help" className="hover:text-emerald-400 transition">Help Center</Link></li>
            <li><Link href="/track-order" className="hover:text-emerald-400 transition">Track Your Order</Link></li>
            <li><Link href="/returns" className="hover:text-emerald-400 transition">Returns & Refunds</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Sell on ShopNest</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/vendor/register" className="hover:text-emerald-400 transition">Become a Seller</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition">Seller Login</Link></li>
            <li><Link href="/seller-policy" className="hover:text-emerald-400 transition">Seller Policies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}