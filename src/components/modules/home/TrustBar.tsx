// src/components/modules/home/TrustBar.tsx
import { Truck, Headphones, RotateCcw, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'FREE SHIPPING',
    description: 'Free shipping on all Bangladesh',
  },
  {
    icon: Headphones,
    title: 'SUPPORT 24/7',
    description: 'Contact us 24 hours a day 7 days a week',
  },
  {
    icon: RotateCcw,
    title: '2-3 DAYS RETURN',
    description: 'We have a 7-day return policy, terms and condition apply.',
  },
  {
    icon: ShieldCheck,
    title: '100% SECURE PAYMENT',
    description: 'Your payment information is processed securely.',
  },
];

export default function TrustBar() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
              <div className="w-12 h-12 flex items-center justify-center text-slate-400 mb-3 hover:text-emerald-600 hover:scale-110 transition duration-300">
                <Icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base tracking-wide uppercase mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}