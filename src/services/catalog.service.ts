/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/catalog.service.ts
import { api } from '@/lib/ofetch';
import { ApiResponse, IBanner, ICategory, IProduct, IStore } from '@/types';


export const catalogService = {
  // হিরো স্লাইডার ব্যানার আনা
  getHeroBanners: async (): Promise<IBanner[]> => {
    const res = await api<ApiResponse<IBanner[]>>('/banners?position=HERO_SLIDER');
    return res.data;
  },

  // সমস্ত ক্যাটাগরি আনা
  getCategories: async (): Promise<ICategory[]> => {
    const res = await api<ApiResponse<ICategory[]>>('/categories');
    return res.data;
  },

  // ফিচার্ড ভেন্ডারদের লিস্ট আনা
  getFeaturedStores: async (): Promise<IStore[]> => {
    const res = await api<ApiResponse<IStore[]>>('/stores?limit=5');
    return res.data;
  },

  // প্রোডাক্টস আনা (সার্চ, ক্যাটাগরি বা ট্যাগ ফিল্টার সহ)
  getProducts: async (params?: Record<string, any>): Promise<ApiResponse<IProduct[]>> => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : '/products';
    return await api<ApiResponse<IProduct[]>>(endpoint);
  },

  // ফ্ল্যাশ সেলের প্রোডাক্ট আনা
  getFlashSaleProducts: async (): Promise<IProduct[]> => {
    const res = await api<ApiResponse<IProduct[]>>('/products?tags=flash_sale&limit=10');
    return res.data;
  },
};