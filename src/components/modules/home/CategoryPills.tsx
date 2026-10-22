// src/components/modules/home/CategoryPills.tsx
import Link from 'next/link';

const categoriesWithImages = [
  { 
    name: 'Electronics', 
    slug: 'electronics', 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Fashion', 
    slug: 'fashion', 
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Home & Living', 
    slug: 'home-living', 
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Beauty', 
    slug: 'beauty', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Sports', 
    slug: 'sports', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Toys', 
    slug: 'toys', 
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Books', 
    slug: 'books', 
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80' 
  },
  { 
    name: 'Groceries', 
    slug: 'groceries', 
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80' 
  },
];

export default function CategoryPills() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {categoriesWithImages.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* আসল ছবির গোল সার্কেল */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden p-1 border-2 border-slate-100 group-hover:border-emerald-500 transition-all duration-300 shadow-inner bg-slate-50">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-300"
              />
            </div>
            
            {/* ক্যাটাগরি নাম (ফন্ট বড় করা হয়েছে) */}
            <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition text-center truncate max-w-full">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}