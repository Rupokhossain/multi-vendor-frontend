// src/types/index.ts

// ১. জেনেরিক এপিআই রেসপন্স
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

// ২. ব্যানার টাইপ (আমাদের ব্যাকএন্ডের Banner মডেল)
export interface IBanner {
  id: string;
  title: string;
  image: string;
  link?: string | null;
  position: 'HERO_SLIDER' | 'PROMO_BANNER' | 'POPUP';
  isActive: boolean;
  order: number;
}

// ৩. ক্যাটাগরি টাইপ
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  image?: string | null;
  parentId?: string | null;
  children?: ICategory[];
}

// ৪. ভেন্ডার স্টোর টাইপ
export interface IStore {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  banner?: string | null;
  description?: string | null;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  walletBalance: number;
  createdAt: string;
}

// ৫. প্রোডাক্ট ভ্যারিয়েন্ট টাইপ
export interface IProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // e.g., { color: "Black", size: "42" }
  images: string[];
}

// ৬. প্রোডাক্ট টাইপ
export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  discountPrice?: number | null;
  images: string[];
  stock: number;
  ratingAverage: number;
  reviewCount: number;
  tags: string[];
  isFeatured: boolean;
  store: {
    id: string;
    name: string;
    slug: string;
    logo?: string | null;
  };
  category: {
    id: string;
    name: string;
  };
  variants?: IProductVariant[];
}