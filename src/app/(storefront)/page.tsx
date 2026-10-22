// src/app/(storefront)/page.tsx
import HeroSlider from '@/components/modules/home/HeroSlider';
import FeaturedVendors from '@/components/modules/home/FeaturedVendors';
import TrustBar from '@/components/modules/home/TrustBar';
import FeaturedCategories from '@/components/modules/home/FeaturedCategories';
import FlashSale from '@/components/modules/home/FlashSale';

export default function HomePage() {
  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-6">
      {/* ১. ব্যালান্সড ১২-কলাম গ্রিড: ৮ কলাম হিরো ব্যানার + ৪ কলাম ভেরিফায়েড ভেন্ডর কার্ড */}
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

      <FlashSale />
    </div>
  );
}