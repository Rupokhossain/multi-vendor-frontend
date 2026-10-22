// src/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string; // unique entry: productId-color-size
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  sku?: string;
  store: {
    name: string;
    slug: string;
    verified?: boolean;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // ডেলিভারি ও কুপন ক্যালকুলেশন
  deliveryLocation: 'inside' | 'outside';
  setDeliveryLocation: (loc: 'inside' | 'outside') => void;
  deliveryFee: number;
  couponCode: string;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  grandTotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// তাৎক্ষণিক টেস্ট করার জন্য ২টি ডেমো আইটেম ইন-মেমোরিতে রাখা হলো (কোনো LocalStorage নেই)
const initialDemoItems: CartItem[] = [
  {
    id: 'demo-cart-1',
    productId: 'fs-1',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    price: 38500,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    quantity: 1,
    selectedColor: 'Midnight Pitch Black',
    selectedSize: 'Standard Fit',
    sku: 'SKU-SONY-WH1000XM5-BLK',
    store: {
      name: 'TechZone BD',
      slug: 'techzone',
      verified: true,
    },
  },
  {
    id: 'demo-cart-2',
    productId: 'fs-2',
    name: 'Nike Air Max 270 Premium Athletic Running Shoes',
    slug: 'nike-air-max-270-shoes',
    price: 8900,
    originalPrice: 12500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    quantity: 1,
    selectedColor: 'Fire Flame Red',
    selectedSize: '42 EUR',
    sku: 'SKU-NIKE-AM270-RED',
    store: {
      name: 'Apex Footwear BD',
      slug: 'apex-footwear',
      verified: true,
    },
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialDemoItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState<'inside' | 'outside'>('inside');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const entryId = `${newItem.productId}-${newItem.selectedColor || 'def'}-${newItem.selectedSize || 'def'}`;
    
    setItems((prev) => {
      const existing = prev.find((i) => i.id === entryId);
      if (existing) {
        return prev.map((i) =>
          i.id === entryId ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem, id: entryId }];
    });

    setIsCartOpen(true); // পণ্য অ্যাড করলেই স্বয়ংক্রিয়ভাবে স্লাইড-ওভার ড্রয়ার খুলবে
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    setCouponCode('');
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'Please enter a coupon code' };
    }
    if (trimmed === 'WELCOME200' || trimmed === 'NEXUS200') {
      setCouponCode(trimmed);
      setDiscount(200);
      return { success: true, message: '৳200 discount applied successfully!' };
    }
    if (trimmed === 'SAVE10') {
      const tenPercent = Math.round(subtotal * 0.1);
      setCouponCode(trimmed);
      setDiscount(tenPercent);
      return { success: true, message: `10% discount (৳${tenPercent.toLocaleString()}) applied!` };
    }
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = items.length === 0 ? 0 : deliveryLocation === 'inside' ? 60 : 120;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        deliveryLocation,
        setDeliveryLocation,
        deliveryFee,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
        subtotal,
        grandTotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}