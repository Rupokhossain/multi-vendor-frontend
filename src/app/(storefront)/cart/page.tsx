// src/app/(storefront)/cart/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronRight, 
  Store, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    grandTotal, 
    totalCount,
    deliveryLocation,
    setDeliveryLocation,
    deliveryFee,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applyCoupon(inputCoupon);
    if (result.success) {
      toast.success(result.message);
      setInputCoupon('');
    } else {
      toast.error(result.message);
    }
  };

  // ভেন্ডর অনুযায়ী গ্রুপিং
  const groupedItems = items.reduce((acc: Record<string, typeof items>, item) => {
    const storeName = item.store?.name || 'ShopNest Verified Store';
    if (!acc[storeName]) acc[storeName] = [];
    acc[storeName].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-20">
      
      {/* ১. ব্রেডক্রাম্ব */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-bold">Shopping Cart</span>
      </nav>

      {/* পেজ টাইটেল */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            You have {totalCount} {totalCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => {
              clearCart();
              toast.info('Cart cleared');
            }}
            className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* এম্পটি কার্ট ভিউ */
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-16 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Your Cart is Currently Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Looks like you haven&apos;t added any items to your shopping cart yet.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      ) : (
        /* ২ কলাম গ্রিড: বামে প্রডাক্ট তালিকা (৮ কলাম), ডানে অর্ডার সামারি (৪ কলাম) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* === বাম পাশ: ভেন্ডর অনুযায়ী প্রডাক্ট তালিকা (lg:col-span-8) === */}
          <div className="lg:col-span-8 space-y-6">
            {Object.entries(groupedItems).map(([storeName, storeItems]) => (
              <div 
                key={storeName} 
                className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-2xs space-y-4"
              >
                {/* ভেন্ডর হেডার */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm sm:text-base text-slate-900">{storeName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {storeItems.length} {storeItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* এই ভেন্ডরের প্রডাক্ট তালিকা */}
                <div className="divide-y divide-slate-100">
                  {storeItems.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      
                      {/* ছবি ও নাম */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded-2xl bg-slate-50 border border-slate-200 p-1.5 shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <Link 
                            href={`/products/${item.slug}`}
                            className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition line-clamp-1"
                          >
                            {item.name}
                          </Link>

                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            {item.selectedColor && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                                {item.selectedSize}
                              </span>
                            )}
                            <span className="text-slate-400 font-mono text-[11px]">
                              {item.sku}
                            </span>
                          </div>

                          <div className="sm:hidden text-sm font-black text-slate-900 pt-1">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* কোয়ান্টিটি কাউন্টার ও প্রাইস (ডেক্সটপে ডানে) */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                        {/* কোয়ান্টিটি কন্ট্রোল */}
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-xl transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center font-bold text-xs sm:text-sm text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-xl transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* প্রাইস */}
                        <div className="hidden sm:block text-right min-w-[90px]">
                          <p className="text-base font-black text-slate-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            ৳{item.price.toLocaleString()} each
                          </p>
                        </div>

                        {/* ডিলিট বাটন */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))}

            {/* শপিং চালিয়ে যাওয়ার বাটন */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* === ডান পাশ: অর্ডার সামারি ও চেকআউট কার্ড (lg:col-span-4) === */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5 sticky top-24">
              <h2 className="text-base sm:text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* 🌟 কুরিয়ার ডেলিভারি অপশন: বড়, বোল্ড ও স্পষ্ট ফন্ট সাইজ */}
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Steadfast Delivery Zone:</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('inside')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-center transition ${
                      deliveryLocation === 'inside'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-extrabold block">
                      Inside Dhaka
                    </span>
                    <span className="text-xs sm:text-sm font-bold mt-1 block opacity-90">
                      ৳60 (24-48h)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('outside')}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-center transition ${
                      deliveryLocation === 'outside'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-extrabold block">
                      Outside Dhaka
                    </span>
                    <span className="text-xs sm:text-sm font-bold mt-1 block opacity-90">
                      ৳120 (2-3d)
                    </span>
                  </button>
                </div>
              </div>

              {/* কুপন কোড ইনপুট */}
              <div className="pt-2">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{couponCode} Applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME200)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* টাকার ব্রেকডাউন */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-slate-900 font-bold">৳{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Steadfast Courier Delivery</span>
                  <span className="text-slate-900 font-bold">৳{deliveryFee}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Coupon</span>
                    <span className="font-bold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* চেকআউট বাটন */}
              <Link
                href="/checkout"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* সিকিউরিটি ব্যাজ */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Secure Checkout via SSLCommerz</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 Days Easy Return & Money Back Guarantee</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}