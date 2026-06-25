import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { logWhatsAppInquiry, generateWhatsAppLink } from '../utils/helpers';
import ProductCard from '../components/Catalogue/ProductCard';
import { MessageSquare, Heart, ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import localProducts from '../data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductAndRelated() {
      try {
        setLoading(true);
        const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

        if (isPlaceholder) {
          const item = localProducts.find(p => p.id === id);
          if (item) {
            setProduct(item);
            setActiveImageIdx(0);
            const relatedItems = localProducts
              .filter(p => p.collection === item.collection && p.id !== item.id)
              .slice(0, 3);
            setRelated(relatedItems);
          } else {
            setProduct(null);
          }
          return;
        }

        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
          const item = { id: snapshot.id, ...snapshot.data() };
          setProduct(item);
          setActiveImageIdx(0);
          
          // Fetch up to 3 related products in same collection
          const relatedQuery = query(
            collection(db, 'products'),
            where('collection', '==', item.collection),
            limit(4)
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          const relatedItems = relatedSnapshot.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(d => d.id !== item.id) // Exclude current product
            .slice(0, 3);
          setRelated(relatedItems);
        } else {
          // Check local fallback
          const item = localProducts.find(p => p.id === id);
          if (item) {
            setProduct(item);
            setActiveImageIdx(0);
            const relatedItems = localProducts
              .filter(p => p.collection === item.collection && p.id !== item.id)
              .slice(0, 3);
            setRelated(relatedItems);
          } else {
            setProduct(null);
          }
        }
      } catch (err) {
        console.warn("Firestore details query failed. Falling back to local search.", err);
        const item = localProducts.find(p => p.id === id);
        if (item) {
          setProduct(item);
          setActiveImageIdx(0);
          const relatedItems = localProducts
            .filter(p => p.collection === item.collection && p.id !== item.id)
            .slice(0, 3);
          setRelated(relatedItems);
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProductAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShieldAlert className="mx-auto text-primary" size={48} />
        <h2 className="text-2xl mt-4 font-serif">Saree Not Found</h2>
        <Link to="/catalogue" className="text-primary underline mt-2 block">Return to Catalogue</Link>
      </div>
    );
  }

  const handleInquiry = () => {
    // Attempt to log but swallow errors silently if offline
    logWhatsAppInquiry(product).catch(() => {});
    window.open(generateWhatsAppLink(product.name), '_blank');
  };

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8 text-sm font-medium">
        <Link to="/" className="inline-flex items-center gap-1.5 text-neutral-muted hover:text-primary transition-colors duration-300">
          <Home size={16} /> Home
        </Link>
        <span className="text-neutral-muted/50">/</span>
        <Link to="/catalogue" className="inline-flex items-center gap-1.5 text-neutral-muted hover:text-primary transition-colors duration-300">
          Catalogue
        </Link>
        <span className="text-neutral-muted/50">/</span>
        <span className="text-primary truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery Carousel */}
        <div>
          <div className="aspect-[2/3] w-full rounded bg-white overflow-hidden shadow-premium">
            <img 
              src={imagesList[activeImageIdx]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
            />
          </div>
          {/* Thumbnails grid */}
          {imagesList.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 aspect-[2/3] shrink-0 border-2 rounded overflow-hidden transition-all duration-200 ${
                    activeImageIdx === idx ? 'border-accent scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs tracking-widest text-accent uppercase font-bold">{product.collection}</span>
            <h1 className="text-3xl md:text-4xl font-serif text-primary mt-1.5 mb-3">{product.name}</h1>
            <p className="text-2xl text-neutral-charcoal font-semibold mb-6">₹{product.price.toLocaleString('en-IN')}</p>
            
            {/* Spec Attributes grid */}
            <div className="grid grid-cols-2 gap-6 border-y border-neutral-charcoal/10 py-6 mb-6">
              <div>
                <span className="text-xs text-neutral-muted block uppercase tracking-wider">Fabric</span>
                <span className="font-semibold text-neutral-charcoal">{product.fabric}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-muted block uppercase tracking-wider">Weave Technique</span>
                <span className="font-semibold text-neutral-charcoal">{product.weave || 'Handloom'}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-muted block uppercase tracking-wider">Primary Colour</span>
                <span className="font-semibold text-neutral-charcoal">{product.colour}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-muted block uppercase tracking-wider">Availability</span>
                <span className={`font-semibold ${product.availability ? 'text-green-600' : 'text-primary'}`}>
                  {product.availability ? 'In Stock / Ready to Dispatch' : 'Made to Order'}
                </span>
              </div>
            </div>

            {/* Saree Description copy */}
            <div className="prose text-neutral-charcoal/80 mb-8 leading-relaxed">
              <h4 className="font-serif text-lg text-primary mb-2">Artisan Description</h4>
              <p>{product.description}</p>
            </div>

            {/* Saree Care details */}
            <div className="bg-accent-light/50 p-4 border-l-4 border-accent rounded-r mb-8">
              <h5 className="font-semibold text-xs uppercase text-neutral-charcoal tracking-wide mb-1">Care & Storage</h5>
              <p className="text-sm text-neutral-muted">{product.careInstructions || 'Dry Clean Only. Wrapped in breathable muslin cloths.'}</p>
            </div>
          </div>

          {/* Action CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={handleInquiry}
              className="flex-grow flex items-center justify-center gap-3 bg-primary text-white py-4 px-6 hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 text-sm uppercase tracking-wider font-semibold"
            >
              <MessageSquare size={18} />
              Inquire via WhatsApp
            </button>
            <button className="border border-primary/20 p-4 text-primary hover:bg-primary-light transition-colors duration-300 flex items-center justify-center">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Same Collection Suggestions */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-neutral-charcoal/10 pt-16">
          <h2 className="text-2xl font-serif text-primary text-center mb-10">From The Same Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
