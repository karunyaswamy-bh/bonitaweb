import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import localProducts from '../data/products.json';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isPlaceholder) {
      const stored = localStorage.getItem('mock_admin_products');
      let parsed = [];
      try {
        parsed = stored ? JSON.parse(stored) : [];
      } catch (e) {
        parsed = [];
      }

      if (parsed.length > 0) {
        let migrated = false;
        const updatedParsed = parsed.map(item => {
          const defaultItem = localProducts.find(p => p.id === item.id);
          if (defaultItem) {
            const hasUnsplash = item.images && item.images.some(img => img.includes('unsplash.com'));
            if (hasUnsplash || !item.images || item.images.length === 0) {
              migrated = true;
              return { ...item, images: defaultItem.images };
            }
          }
          return item;
        });

        const existingIds = new Set(updatedParsed.map(p => p.id));
        const newDefaults = localProducts.filter(p => !existingIds.has(p.id));
        if (newDefaults.length > 0 || migrated) {
          const merged = [...updatedParsed, ...newDefaults];
          setProducts(merged);
          localStorage.setItem('mock_admin_products', JSON.stringify(merged));
        } else {
          setProducts(updatedParsed);
        }
      } else {
        setProducts(localProducts);
        localStorage.setItem('mock_admin_products', JSON.stringify(localProducts));
      }
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(items);
      setLoading(false);
    }, (err) => {
      console.warn("Firestore query failed. Loading offline localStorage cache.", err);
      const stored = localStorage.getItem('mock_admin_products');
      setProducts(stored ? JSON.parse(stored) : localProducts);
      setError(err);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { products, loading, error };
}
export default useProducts;
