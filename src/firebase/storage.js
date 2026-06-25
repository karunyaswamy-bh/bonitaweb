import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export function uploadProductImage(productId, file, onProgress) {
  const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

  if (isPlaceholder) {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        if (onProgress) onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          const mockImages = [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200"
          ];
          const chosen = mockImages[Math.floor(Math.random() * mockImages.length)];
          resolve(chosen);
        }
      }, 200);
    });
  }

  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const storageRef = ref(storage, `products/${productId}/${uniqueFilename}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      }, 
      (error) => {
        reject(error);
      }, 
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

export async function deleteStorageImages(images) {
  const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
  if (isPlaceholder) return;

  if (images && images.length > 0) {
    const deletePromises = images.map(async (imageUrl) => {
      try {
        const decodedUrl = decodeURIComponent(imageUrl);
        const pathStart = decodedUrl.indexOf('/o/') + 3;
        const pathEnd = decodedUrl.indexOf('?alt=media');
        const storagePath = decodedUrl.substring(pathStart, pathEnd);
        
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);
      } catch (err) {
        console.warn("Storage deletion error: ", err);
      }
    });
    await Promise.all(deletePromises);
  }
}
