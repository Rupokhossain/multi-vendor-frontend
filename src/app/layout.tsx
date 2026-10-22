import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nexus-Market — Multi-Vendor E-Commerce Marketplace',
  description: 'Enterprise multi-vendor e-commerce platform with live tracking, multi-variant products, and verified reviews.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          {/* গ্লোবাল টোস্ট নোটিফিকেশন */}
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}