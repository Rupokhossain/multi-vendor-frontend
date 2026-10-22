// src/app/(storefront)/page.tsx
import HeroSlider from '@/components/modules/home/HeroSlider';
import FeaturedVendors from '@/components/modules/home/FeaturedVendors';
import TrustBar from '@/components/modules/home/TrustBar';
import FeaturedCategories from '@/components/modules/home/FeaturedCategories';
import FlashSale from '@/components/modules/home/FlashSale';
import PromoBanners from '@/components/modules/home/PromoBanners';
import BestSellers from '@/components/modules/home/BestSellers';
import NewArrivals from '@/components/modules/home/NewArrivals';

export default function HomePage() {
  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-6">
      {/* ১. হিরো ব্যানার (৮ কলাম) + ভেন্ডর কার্ড (৪ কলাম) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <HeroSlider />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <FeaturedVendors />
        </div>
      </div>

      {/* ২. Trust Benefits Bar */}
      <TrustBar />

      {/* ৩. Featured Categories Slider */}
      <FeaturedCategories />

      {/* ৪. ⚡ Flash Sale Deals (Limited Time Deals) */}
      <FlashSale />

      {/* ৫. 🎯 Dual Promotional Banners */}
      <PromoBanners />

      {/* ৬. 🏆 Best Sellers (Social Proof & Top Rated) */}
      <BestSellers />

      {/* ৭. ✨ New Arrivals (Fresh Drops) */}
      <NewArrivals />
    </div>
  );
}