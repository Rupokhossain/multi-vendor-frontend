// src/app/(storefront)/checkout/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  Truck, 
  CreditCard, 
  Banknote, 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Loader2,
  PackageCheck,
  Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// বাংলাদেশের বিভাগ ও জেলাসমূহের তালিকা
const bdGeoData: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Faridpur', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur', 'Kishoreganj'],
  Chattogram: ['Chattogram', "Cox's Bazar", 'Cumilla', 'Feni', 'Brahmanbaria', 'Noakhali', 'Chandpur', 'Lakshmipur', 'Khagrachhari', 'Rangamati', 'Bandarban'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj', 'Naogaon', 'Natore', 'Chapainawabganj', 'Joypurhat'],
  Khulna: ['Khulna', 'Jashore', 'Kushtia', 'Satkhira', 'Bagerhat', 'Jhenaidah', 'Chuadanga', 'Magura', 'Meherpur', 'Narail'],
  Barishal: ['Barishal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Barguna', 'Jhalokathi'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    items, 
    subtotal, 
    grandTotal, 
    deliveryLocation, 
    setDeliveryLocation, 
    deliveryFee, 
    discount,
    clearCart 
  } = useCart();

  // ২য় ছবি অনুযায়ী সবকটি ফর্ম ফিল্ড
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [postalCode, setPostalCode] = useState('1207');
  const [orderNotes, setOrderNotes] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'sslcommerz'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // বিভাগ বদলালে কুরিয়ার চার্জ অটো-সিলেক্ট
  const handleDivisionChange = (selectedDiv: string) => {
    setDivision(selectedDiv);
    setDistrict('');
    if (selectedDiv === 'Dhaka') {
      setDeliveryLocation('inside');
    } else {
      setDeliveryLocation('outside');
    }
  };

  // ভেন্ডর অনুযায়ী প্রডাক্ট গ্রুপিং
  const groupedItems = items.reduce((acc: Record<string, typeof items>, item) => {
    const storeName = item.store?.name || 'ShopNest Verified Store';
    if (!acc[storeName]) acc[storeName] = [];
    acc[storeName].push(item);
    return acc;
  }, {});

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      toast.error('Please fill in your Name, Phone Number, and Address');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success?orderId=${generatedOrderId}&amount=${grandTotal}&payment=${paymentMethod}`);
    }, 1000);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24">
      
      {/* ১. ব্রেডক্রাম্ব */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/cart" className="hover:text-slate-900 transition">Shopping Cart</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-bold">Checkout</span>
      </nav>

      {/* পেজ হেডার */}
      <div className="mb-6 sm:mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
          Checkout & Delivery
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Please enter your delivery address and choose a payment method
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 text-center max-w-lg mx-auto space-y-4 my-8">
          <PackageCheck className="w-16 h-16 text-slate-400 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">No items available for checkout</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Please add products to your cart before proceeding to checkout.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Home Page</span>
          </Link>
        </div>
      ) : (
        /* ২ কলাম গ্রিড */
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* === বাম পাশ: অ্যাড্রেস, মাল্টি-ভেন্ডর রিভিউ ও পেমেন্ট (lg:col-span-7) === */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 🌟 ২য় ছবি অনুযায়ী অটো-অ্যাকাউন্ট ইনফো ব্যানার */}
            <div className="bg-sky-50/80 border border-sky-200/90 text-sky-900 rounded-2xl p-4 sm:p-4.5 flex items-start sm:items-center gap-3 text-xs sm:text-sm shadow-2xs">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5 sm:mt-0" />
              <div className="flex-1 font-medium leading-relaxed">
                No account needed. We&apos;ll create one automatically — your email will be your login ID. {' '}
                <Link href="/login" className="font-bold text-sky-950 underline hover:text-sky-700">
                  Already have an account?
                </Link>
              </div>
            </div>

            {/* সেকশন ১: ২য় ছবি অনুযায়ী সম্পূর্ণ Shipping Address কার্ড */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Shipping Address
                </h2>
              </div>

              <div className="space-y-4">
                {/* ১. Full Name (Full Row) */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                  />
                </div>

                {/* ২. Email & Phone Number (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Email (login ID)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                {/* ৩. Address (Full Row) */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Address *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House no, road, area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                  />
                </div>

                {/* ৪. Division & District (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900">
                      Division *
                    </label>
                    <select
                      value={division}
                      onChange={(e) => handleDivisionChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-slate-900 focus:bg-white cursor-pointer"
                    >
                      <option value="">Select Division...</option>
                      {Object.keys(bdGeoData).map((div) => (
                        <option key={div} value={div}>{div}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!division}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-slate-900 focus:bg-white cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select District...</option>
                      {division && bdGeoData[division]?.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ৫. Upazila / Area & Postal Code (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900">
                      Upazila / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mirpur, Dhanmondi, Savar"
                      value={upazila}
                      onChange={(e) => setUpazila(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-slate-900">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="1207"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                    />
                  </div>
                </div>

                {/* ৬. Steadfast Delivery Zone (বড় ও বোল্ড বাটন) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Steadfast Delivery Zone *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryLocation('inside')}
                      className={`p-3.5 rounded-2xl border text-center transition ${
                        deliveryLocation === 'inside'
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-extrabold block">Inside Dhaka</span>
                      <span className="text-xs sm:text-sm font-bold mt-0.5 block opacity-90">৳60 (24-48h)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryLocation('outside')}
                      className={`p-3.5 rounded-2xl border text-center transition ${
                        deliveryLocation === 'outside'
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm sm:text-base font-extrabold block">Outside Dhaka</span>
                      <span className="text-xs sm:text-sm font-bold mt-0.5 block opacity-90">৳120 (2-3d)</span>
                    </button>
                  </div>
                </div>

                {/* অপশনাল অর্ডার নোট */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-500">
                    Order Note / Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery or deliver in afternoon"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white"
                  />
                </div>

              </div>
            </div>

            {/* সেকশন ২: মাল্টি-ভেন্ডর অর্ডার স্প্লিটিং প্যাকেজ প্রিভিউ */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Multi-Vendor Split Packages
                  </h2>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {Object.keys(groupedItems).length} Distinct {Object.keys(groupedItems).length === 1 ? 'Package' : 'Packages'}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium -mt-2">
                Products will be safely dispatched directly by verified store merchants via Steadfast Express.
              </p>

              {/* প্যাকেজ তালিকা */}
              <div className="space-y-4">
                {Object.entries(groupedItems).map(([storeName, storeItems], idx) => (
                  <div key={storeName} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                          Package {idx + 1}: {storeName}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        {storeItems.length} {storeItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {storeItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Qty: <span className="font-bold text-slate-800">{item.quantity}</span> {item.selectedColor ? `• ${item.selectedColor}` : ''}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-black text-slate-900 shrink-0">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* সেকশন ৩: পেমেন্ট মেথড সিলেকশন */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* অপশন ১: Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    paymentMethod === 'cod'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Banknote className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm sm:text-base font-extrabold">Cash on Delivery</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      paymentMethod === 'cod' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Popular
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    paymentMethod === 'cod' ? 'text-slate-300' : 'text-slate-500 font-medium'
                  }`}>
                    Pay in cash directly to the Steadfast courier delivery hero upon receiving your package.
                  </p>
                </div>

                {/* অপশন ২: SSLCommerz Online Payment */}
                <div
                  onClick={() => setPaymentMethod('sslcommerz')}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    paymentMethod === 'sslcommerz'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm sm:text-base font-extrabold">SSLCommerz Online</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      paymentMethod === 'sslcommerz' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Instant
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    paymentMethod === 'sslcommerz' ? 'text-slate-300' : 'text-slate-500 font-medium'
                  }`}>
                    Pay securely using bKash, Nagad, Rocket, Visa, Mastercard or DBBL Nexus Cards.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* === ডান পাশ: অর্ডার সামারি ও প্লেস অর্ডার বাটন (lg:col-span-5) === */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5 sticky top-24">
              <h2 className="text-base sm:text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* প্রাইস ক্যালকুলেশন */}
              <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold">৳{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Steadfast Express Delivery:</span>
                  <span className="text-slate-900 font-bold">৳{deliveryFee}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Voucher:</span>
                    <span className="font-bold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg sm:text-xl font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-emerald-700">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* কনফার্ম অর্ডার বাটন */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-bold text-sm sm:text-base py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order (৳{grandTotal.toLocaleString()})</span>
                  </>
                )}
              </button>

              {/* ট্রাস্ট বেনিফিটস */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-bit Encrypted SSLCommerz Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Steadfast Express Courier tracking included</span>
                </div>
              </div>

            </div>
          </div>

        </form>
      )}

    </div>
  );
}