import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function saveProduct(productData, productId = null) {
  const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

  const payload = {
    name: productData.name,
    fabric: productData.fabric,
    collection: productData.collection,
    price: Number(productData.price),
    availability: Boolean(productData.availability),
    featured: Boolean(productData.featured),
    weave: productData.weave || '',
    colour: productData.colour || '',
    careInstructions: productData.careInstructions || '',
    description: productData.description || '',
    images: productData.images || [],
    updatedAt: new Date()
  };

  if (isPlaceholder) {
    const stored = localStorage.getItem('mock_admin_products');
    let productsList = stored ? JSON.parse(stored) : [];
    
    if (productId) {
      productsList = productsList.map(p => p.id === productId ? { ...p, ...payload, id: productId } : p);
    } else {
      const newId = (Date.now()).toString();
      productsList.unshift({ 
        ...payload, 
        id: newId, 
        createdAt: { seconds: Math.floor(Date.now() / 1000) } 
      });
    }
    localStorage.setItem('mock_admin_products', JSON.stringify(productsList));
    window.dispatchEvent(new Event('local-products-update'));
    return productId || 'new-mock-id';
  }

  if (productId) {
    const docRef = doc(db, 'products', productId);
    await setDoc(docRef, payload, { merge: true });
    return productId;
  } else {
    payload.createdAt = serverTimestamp();
    const colRef = collection(db, 'products');
    const docRef = await addDoc(colRef, payload);
    return docRef.id;
  }
}

export async function deleteProductRecord(product) {
  const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

  if (isPlaceholder) {
    const stored = localStorage.getItem('mock_admin_products');
    if (stored) {
      let productsList = JSON.parse(stored);
      productsList = productsList.filter(p => p.id !== product.id);
      localStorage.setItem('mock_admin_products', JSON.stringify(productsList));
      window.dispatchEvent(new Event('local-products-update'));
    }
    return;
  }

  const docRef = doc(db, 'products', product.id);
  await deleteDoc(docRef);
}
