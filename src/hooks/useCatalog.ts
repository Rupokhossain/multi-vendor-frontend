/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useCatalog.ts
import { useQuery } from '@tanstack/react-query'; 
import { catalogService } from '@/services/catalog.service';

// হিরো ব্যানার ক্যাশ হুক
export const useHeroBanners = () => {
  return useQuery({
    queryKey: ['hero-banners'], // queryKey হলো: "ডাটা কোথায় কোন নামে জমা থাকবে?" (আইডি বা ক্যাশ অ্যাড্রেস)।

    queryFn: catalogService.getHeroBanners,  // queryFn হলো: "ডাটা কোথা থেকে এবং কীভাবে আসবে?" (ব্যাকএন্ড এপিআই কল করার ফাংশন)।

    staleTime: 1000 * 60 * 5, // ৫ মিনিট ক্যাশ থাকবে
  });
};

// ক্যাটাগরি ক্যাশ হুক
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: catalogService.getCategories,
    staleTime: 1000 * 60 * 10, // ক্যাটাগরি সহজে পরিবর্তন হয় না, তাই ১০ মিনিট ক্যাশ
  });
};

// ফিচার্ড ভেন্ডার ক্যাশ হুক
export const useFeaturedStores = () => {
  return useQuery({
    queryKey: ['featured-stores'],
    queryFn: catalogService.getFeaturedStores,
  });
};

// প্রোডাক্ট লিস্ট ফেচ হুক (প্যারামিটার অনুযায়ী ক্যাশ হবে)
export const useProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => catalogService.getProducts(params),
  });
};

// ফ্ল্যাশ সেল প্রোডাক্ট হুক
export const useFlashSale = () => {
  return useQuery({
    queryKey: ['flash-sale-products'],
    queryFn: catalogService.getFlashSaleProducts,
  });
};