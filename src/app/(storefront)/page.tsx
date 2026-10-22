// src/app/(storefront)/page.tsx
import CategorySidebar from '@/components/modules/home/CategorySidebar';
import HeroSlider from '@/components/modules/home/HeroSlider';
import FeaturedVendors from '@/components/modules/home/FeaturedVendors';
import CategoryPills from '@/components/modules/home/CategoryPills';

export default function HomePage() {
  return (
    // max-w-[1536px] দিয়ে দুই পাশের অপ্রয়োজনীয় গ্যাপ কমানো হয়েছে
    <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-6">
      {/* ১. হিরো সেকশন গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="hidden lg:block lg:col-span-3">
          <CategorySidebar />
        </div>

        <div className="lg:col-span-6">
          <HeroSlider />
        </div>

        <div className="lg:col-span-3">
          <FeaturedVendors />
        </div>
      </div>

      {/* ২. ক্যাটাগরি ছবি পিলস */}
      <CategoryPills />
    </div>
  );
}