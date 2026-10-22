// src/app/(storefront)/order-success/page.tsx
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Truck, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-948210';
  const amount = searchParams.get('amount') || '47,460';
  const payment = searchParams.get('payment') || 'cod';

  const handleDownloadInvoice = () => {
    toast.success('Downloading Official PDF Invoice...');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center space-y-8">
      
      {/* ১. সাকসেস ব্যাজ ও হেডার */}
      <div className="space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Thank You! Your Order is Confirmed
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-medium">
          We have received your order and notified the verified merchant stores to prepare your package for dispatch.
        </p>
      </div>

      {/* ২. অর্ডার সামারি কার্ড */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs text-left space-y-6">
        
        {/* অর্ডার নম্বর ও মেথড */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs sm:text-sm">
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Order Number</p>
            <p className="text-slate-900 font-black text-base sm:text-lg mt-0.5">#{orderId}</p>
          </div>

          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Total Paid</p>
            <p className="text-emerald-700 font-black text-base sm:text-lg mt-0.5">৳{Number(amount).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Payment Mode</p>
            <p className="text-slate-900 font-bold mt-0.5">
              {payment === 'cod' ? 'Cash on Delivery' : 'Online Paid (SSL)'}
            </p>
          </div>

          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Courier Partner</p>
            <p className="text-slate-900 font-bold mt-0.5 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Steadfast Express</span>
            </p>
          </div>
        </div>

        {/* টাইমলাইন ট্র্যাকিং প্রিভিউ */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Fulfillment Timeline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="font-bold text-emerald-900 block">1. Order Placed</span>
              <span className="text-emerald-700">Verified & Approved</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block">2. Packaging & QC</span>
              <span className="text-slate-500">Merchant Handover</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block">3. Steadfast Delivery</span>
              <span className="text-slate-500">24-48 Hours</span>
            </div>
          </div>
        </div>

        {/* ইনভয়েস ডাউনলোড বাটন */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>SMS confirmation has been dispatched to your mobile number</span>
          </div>

          <button
            onClick={handleDownloadInvoice}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
        </div>

      </div>

      {/* ৩. বাটনস: শপিং চালিয়ে যাওয়া বা হোমপেজ */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <Link
          href="/track-order"
          className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Track Delivery Status</span>
        </Link>
      </div>

    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-bold">Loading confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}