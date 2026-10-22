// src/app/(storefront)/page.tsx
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Welcome to Shop<span className="text-emerald-600">Nest</span> Marketplace
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Our Global Header, Dynamic Category Menu, and Footer are now fully live and connected with our Express backend!
        </p>
      </div>
    </div>
  );
}