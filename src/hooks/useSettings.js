import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const initialDefaultSettings = {
  phone: '+91 82976 72855',
  email: 'inquire@bonitaropita.com',
  address: 'Plot 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana, 500033',
  whatsappNumber: '8297672855',
  logoUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200',
  heroSubtitle: 'Handloomed Royalty',
  heroTitle: 'Embody the Grace of Fine Silk Heritage',
  heroDescription: 'Welcome to Bonita Ropita. Explore our hand-woven bridal and festive saree creations directly from master weavers across India, curated exclusively in Hyderabad.',
  heroImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
  storySubtitle: 'Our Heritage',
  storyTitle: 'The Story of Bonita Ropita',
  storyParagraph1: 'Located in the heart of Jubilee Hills, Hyderabad, Bonita Ropita has been sourcing the finest pure silk sarees for generations. Every thread represents the heartbeat of an Indian artisan.',
  storyParagraph2: 'We collaborate directly with master weavers from Kanchipuram, Banaras, and handloom pockets of Telangana. By avoiding intermediary markups, we deliver luxury sarees directly with absolute quality assurance.'
};

export function useSettings() {
  const [settings, setSettings] = useState(initialDefaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    if (isPlaceholder) {
      const stored = localStorage.getItem('mock_admin_settings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSettings(prev => ({ ...prev, ...parsed, whatsappNumber: '8297672855' }));
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      } else {
        localStorage.setItem('mock_admin_settings', JSON.stringify(initialDefaultSettings));
      }
      setLoading(false);
      
      // Sync cross-tab mock changes
      const handleStorageChange = (e) => {
        if (e.key === 'mock_admin_settings' && e.newValue) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(e.newValue) }));
          } catch (err) {}
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }

    const docRef = doc(db, 'settings', 'boutique');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...docSnap.data() }));
      } else {
        setSettings(initialDefaultSettings);
      }
      setLoading(false);
    }, (err) => {
      console.warn("Firestore settings load failed. Loading offline cache.", err);
      const stored = localStorage.getItem('mock_admin_settings');
      if (stored) {
        try {
          setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
        } catch (e) {}
      }
      setError(err);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { settings, loading, error };
}

export default useSettings;
