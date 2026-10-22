// src/components/modules/cart/CartDrawer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Store,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    grandTotal, 
    totalCount,
    deliveryLocation,
    setDeliveryLocation,
    deliveryFee
  } = useCart();

  if (!isCartOpen) return null;

  // ভেন্ডর অনুযায়ী গ্রুপিং
  const groupedItems = items.reduce((acc: Record<string, typeof items>, item) => {
    const storeName = item.store?.name || 'ShopNest Verified Store';
    if (!acc[storeName]) acc[storeName] = [];
    acc[storeName].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* ব্যাকড্রপ ওভারলে (ক্লিক করলে বন্ধ হবে) */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* স্লাইড-ইন প্যানেল (মোবাইলে ১০০% ফুল-উইডথ, ডেক্সটপে ৪৫০px) */}
      <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* ড্রয়ার হেডার */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Shopping Cart
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ড্রয়ার বডি / আইটেম লিস্ট */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Your cart is empty</h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-[240px]">
                  Explore our verified stores and add products to your cart.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="bg-slate-900 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded-xl transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            Object.entries(groupedItems).map(([storeName, storeItems]) => (
              <div key={storeName} className="space-y-3 bg-slate-50/60 p-3.5 rounded-2xl border border-slate-200/80">
                {/* ভেন্ডর হেডার */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pb-2 border-b border-slate-200/60">
                  <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{storeName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>

                {/* এই ভেন্ডরের প্রডাক্টগুলো */}
                <div className="space-y-3">
                  {storeItems.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                      {/* থাম্বনেইল ছবি */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-18 sm:h-18 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 shrink-0"
                      />

                      {/* তথ্য ও অ্যাকশনস */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                              className="text-slate-400 hover:text-red-500 transition p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* সাইজ ও কালার ট্যাগ */}
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                            {item.selectedColor && <span>{item.selectedColor}</span>}
                            {item.selectedColor && item.selectedSize && <span>•</span>}
                            {item.selectedSize && <span>{item.selectedSize}</span>}
                          </div>
                        </div>

                        {/* প্রাইস ও কোয়ান্টিটি কাউন্টার */}
                        <div className="flex items-center justify-between gap-2 pt-2">
                          <span className="text-sm sm:text-base font-black text-slate-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-lg transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-xs text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-lg transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ড্রয়ার ফুটার / টোটাল ও চেকআউট */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5">
            {/* কুরিয়ার লোকেশন সিলেক্টর */}
            <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Steadfast Delivery:</span>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <button
                  onClick={() => setDeliveryLocation('inside')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    deliveryLocation === 'inside'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Dhaka (৳60)
                </button>
                <button
                  onClick={() => setDeliveryLocation('outside')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    deliveryLocation === 'outside'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Outside (৳120)
                </button>
              </div>
            </div>

            {/* হিসাব ব্রেকডাউন */}
            <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-slate-900 font-bold">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="text-slate-900 font-bold">৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Estimated Total:</span>
                <span className="text-emerald-700">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* ২টি বাটন: View Full Cart এবং Checkout */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm py-3 px-3 rounded-xl flex items-center justify-center transition text-center"
              >
                View Full Cart
              </Link>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}