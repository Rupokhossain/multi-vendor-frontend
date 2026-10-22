import { ofetch } from 'ofetch';

// বেস এপিআই ইউআরএল
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// কাস্টম ofetch ইনস্ট্যান্স
export const api = ofetch.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  
  // প্রতিটা রিকোয়েস্ট পাঠানোর ঠিক আগে এটি রান হবে (Bearer Token অ্যাটাচ করতে)
  onRequest({ options }) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // নেটিভ Headers ইনস্ট্যান্স তৈরি করে নিরাপদে Authorization সেট করা
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${token}`);
        options.headers = headers;
      }
    }
  },

  // ব্যাকএন্ড থেকে কোনো এরর আসলে (যেমন: 400, 401, 500)
  onResponseError({ response }) {
    const errorData = response._data;
    const errorMessage = errorData?.message || 'Something went wrong. Please try again.';
    
    // কনসোলে এরর প্রিন্ট
    console.error(`[API Error ${response.status}]:`, errorMessage);
  },
});