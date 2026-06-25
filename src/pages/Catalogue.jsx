import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/Catalogue/ProductCard';
import FilterSidebar from '../components/Catalogue/FilterSidebar';
import SkeletonCard from '../components/UI/SkeletonCard';
import { SlidersHorizontal, Home } from 'lucide-react';
import localProducts from '../data/products.json';
import { Link } from 'react-router-dom';

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  // Available Filter Options
  const fabrics = ['Kanchipuram Silk', 'Organza', 'Banarasi Silk', 'Georgette'];
  const collections = ['Bridal Heritage', 'Festive Elegance'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Verify if Firebase configuration is using local placeholders
        const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
        
        if (isPlaceholder) {
          console.info("Using local fallback products data.");
          setProducts(localProducts);
          return;
        }

        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If Firestore is empty, fall back to local mock data
        setProducts(items.length > 0 ? items : localProducts);
      } catch (error) {
        console.warn("Firestore access failed. Falling back to local offline dataset.", error);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter and Sort implementation
  const filteredProducts = products
    .filter(product => {
      const matchFabric = !selectedFabric || product.fabric === selectedFabric;
      const matchCollection = !selectedCollection || product.collection === selectedCollection;
      return matchFabric && matchCollection;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      // Default: newest first
      const secondsA = a.createdAt?.seconds || 0;
      const secondsB = b.createdAt?.seconds || 0;
      return secondsB - secondsA;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 mb-6 text-sm font-medium">
        <Link to="/" className="inline-flex items-center gap-1.5 text-neutral-muted hover:text-primary transition-colors duration-300">
          <Home size={16} /> Home
        </Link>
        <span className="text-neutral-muted/50">/</span>
        <span className="text-primary">Catalogue</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-primary/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary">The Heritage Catalogue</h1>
          <p className="text-neutral-muted mt-2">Browse our handpicked curated pure thread handloom sarees.</p>
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto">
          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center justify-center gap-2 border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white transition-colors duration-300 w-full md:w-auto"
          >
            <SlidersHorizontal size={18} />
            Filters { (selectedFabric || selectedCollection) && '(Active)' }
          </button>
          
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-primary/20 px-4 py-2 bg-neutral-cream text-neutral-charcoal focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar 
            fabrics={fabrics} 
            collections={collections}
            selectedFabric={selectedFabric}
            setSelectedFabric={setSelectedFabric}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            onClear={() => { setSelectedFabric(''); setSelectedCollection(''); }}
          />
        </aside>

        {/* Mobile Filter Drawer Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <div className="relative w-80 max-w-xs bg-neutral-cream p-6 flex flex-col h-full overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-primary">Refine</h3>
                <button onClick={() => setShowFilters(false)} className="text-neutral-charcoal text-lg font-bold">×</button>
              </div>
              <FilterSidebar 
                fabrics={fabrics} 
                collections={collections}
                selectedFabric={selectedFabric}
                setSelectedFabric={setSelectedFabric}
                selectedCollection={selectedCollection}
                setSelectedCollection={setSelectedCollection}
                onClear={() => { setSelectedFabric(''); setSelectedCollection(''); }}
              />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-neutral-muted">No sarees match your filter selection.</p>
              <button 
                onClick={() => { setSelectedFabric(''); setSelectedCollection(''); }}
                className="mt-4 text-primary font-semibold underline decoration-accent animate-pulse"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
