import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const mockInquiriesList = [
  { id: 'inq-1', productName: 'Kanjeevaram Bridal Silk', productId: '1', timestamp: { seconds: Math.floor(Date.now() / 1000) - 1800 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' },
  { id: 'inq-2', productName: 'Emerald Green Chiffon', productId: '2', timestamp: { seconds: Math.floor(Date.now() / 1000) - 7200 }, userAgent: 'Mozilla/5.0 (Linux; Android 13; K)' },
  { id: 'inq-3', productName: 'Banarasi Ivory Gold', productId: '3', timestamp: { seconds: Math.floor(Date.now() / 1000) - 18000 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1)' },
  { id: 'inq-4', productName: 'Kanjeevaram Bridal Silk', productId: '1', timestamp: { seconds: Math.floor(Date.now() / 1000) - 86400 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  { id: 'inq-5', productName: 'Sage Pastel Organza Zardosi Saree', productId: '6', timestamp: { seconds: Math.floor(Date.now() / 1000) - 172800 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)' }
];

export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    if (isPlaceholder) {
      const loadLocal = () => {
        const stored = localStorage.getItem('mock_admin_inquiries');
        if (stored) {
          setInquiries(JSON.parse(stored));
        } else {
          setInquiries(mockInquiriesList);
          localStorage.setItem('mock_admin_inquiries', JSON.stringify(mockInquiriesList));
        }
      };
      loadLocal();
      setLoading(false);
      
      const handleLocalUpdate = () => loadLocal();
      window.addEventListener('local-inquiries-update', handleLocalUpdate);
      window.addEventListener('storage', handleLocalUpdate);
      
      return () => {
        window.removeEventListener('local-inquiries-update', handleLocalUpdate);
        window.removeEventListener('storage', handleLocalUpdate);
      };
    }

    const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(items);
      setLoading(false);
    }, (err) => {
      console.warn("Firestore inquiry onSnapshot failed. Loading offline logs.", err);
      const stored = localStorage.getItem('mock_admin_inquiries');
      setInquiries(stored ? JSON.parse(stored) : mockInquiriesList);
      setError(err);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const deleteInquiry = async (inquiryId) => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    if (isPlaceholder) {
      const stored = localStorage.getItem('mock_admin_inquiries');
      if (stored) {
        let list = JSON.parse(stored);
        list = list.filter(item => item.id !== inquiryId);
        localStorage.setItem('mock_admin_inquiries', JSON.stringify(list));
        setInquiries(list);
        window.dispatchEvent(new Event('local-inquiries-update'));
      }
      return;
    }

    const docRef = doc(db, 'inquiries', inquiryId);
    await deleteDoc(docRef);
  };

  return { inquiries, loading, error, deleteInquiry };
}
export default useInquiries;
