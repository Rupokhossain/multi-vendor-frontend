// src/app/(storefront)/layout.tsx
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Topbar from '@/components/shared/Topbar';
import React from 'react';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* গ্লোবাল টপবার */}
      <Topbar />
      
      {/* গ্লোবাল নাবার ও ক্যাটাগরি মেনু */}
      <Navbar />
      
      {/* মূল পেইজের কনটেন্ট */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* গ্লোবাল ফুটার */}
      <Footer />
    </div>
  );
}