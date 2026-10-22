// src/app/(storefront)/layout.tsx
import React, { Suspense } from 'react';
import Topbar from '@/components/shared/Topbar';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      {/* ১. টপবার */}
      <Topbar />

      {/* ২. নেভবার: Next.js 15 usePathname Suspense বাউন্ডারি */}
      <Suspense fallback={<div className="h-16 lg:h-20 bg-white border-b border-slate-200" />}>
        <Navbar />
      </Suspense>

      {/* ৩. মূল পেজ কন্টেন্ট */}
      <main className="flex-1">{children}</main>

      {/* ৪. ফুটার */}
      <Footer />
    </div>
  );
}