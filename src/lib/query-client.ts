import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // ডাটা ২ মিনিট পর্যন্ত তাজা (Fresh) থাকবে, বারবার ফেচ করবে না
      gcTime: 1000 * 60 * 10,    // মেমোরিতে ১০ মিনিট ক্যাশ থাকবে
      refetchOnWindowFocus: true, // অন্য ট্যাব থেকে ফিরে আসলে অটোমেটিক লেটেস্ট ডাটা চেক করবে
      retry: 1,                  // নেটওয়ার্ক ড্রপ করলে একবার রিট্রাই করবে
    },
  },
});