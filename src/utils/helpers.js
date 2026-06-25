import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function logWhatsAppInquiry(product) {
  const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

  if (isPlaceholder) {
    try {
      const stored = localStorage.getItem('mock_admin_inquiries');
      if (stored) {
        let list = JSON.parse(stored);
        const newLog = {
          id: 'inq-' + Date.now(),
          productId: product.id,
          productName: product.name,
          timestamp: { seconds: Math.floor(Date.now() / 1000) },
          userAgent: navigator.userAgent,
          sourcePage: 'Detail'
        };
        list.unshift(newLog); // add to beginning
        localStorage.setItem('mock_admin_inquiries', JSON.stringify(list));
        window.dispatchEvent(new Event('local-inquiries-update'));
      }
    } catch (err) {
      console.error("Local analytical log failed: ", err);
    }
    return;
  }

  try {
    await addDoc(collection(db, 'inquiries'), {
      productId: product.id,
      productName: product.name,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      sourcePage: 'Detail'
    });
  } catch (error) {
    console.error("Analytical log failed: ", error);
  }
}

export function generateWhatsAppLink(productName) {
  const phone = "8297672855"; // Client store WhatsApp phone number
  const message = `Hi Bonita Ropita, I am interested in viewing details and ordering the saree: "${productName}". Could you please share more details?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
