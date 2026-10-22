// src/app/(storefront)/layout.tsx
import React, { Suspense } from 'react';
import Topbar from '@/components/shared/Topbar';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/modules/cart/CartDrawer';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
        {/* ১. টপবার */}
        <Topbar />

        {/* ২. নেভবার (Suspense বাউন্ডারি সহ) */}
        <Suspense fallback={<div className="h-16 lg:h-20 bg-white border-b border-slate-200" />}>
          <Navbar />
        </Suspense>

        {/* ৩. মূল পেজ */}
        <main className="flex-1">{children}</main>

        {/* ৪. স্লাইড-ওভার কার্ট ড্রয়ার */}
        <CartDrawer />

        {/* ৫. ফুটার */}
        <Footer />
      </div>
    </CartProvider>
  );
}