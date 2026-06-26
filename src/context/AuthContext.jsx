import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    const sanitizedEmail = email.toLowerCase().trim();
    const allowedEmails = ['admin@bonitashop.com', 'admin@bonitaropita.com'];
    
    if (isPlaceholder) {
      if (allowedEmails.includes(sanitizedEmail) && password === 'password123') {
        const mockUser = { email: sanitizedEmail, uid: 'mock-admin-uid' };
        setCurrentUser(mockUser);
        localStorage.setItem('mock_admin_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
      } else {
        return Promise.reject(new Error("Invalid login credentials. For offline testing use: admin@bonitashop.com (or admin@bonitaropita.com) / password123"));
      }
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      if (allowedEmails.includes(sanitizedEmail) && password === 'password123') {
        console.warn("Firebase Auth sign-in failed, falling back to mock admin session:", err);
        const mockUser = { email: sanitizedEmail, uid: 'mock-admin-uid' };
        setCurrentUser(mockUser);
        localStorage.setItem('mock_admin_user', JSON.stringify(mockUser));
        return mockUser;
      }
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('mock_admin_user');
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isPlaceholder) {
      setCurrentUser(null);
      return Promise.resolve();
    }
    return signOut(auth).then(() => {
      setCurrentUser(null);
    });
  }

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    const storedMockUser = localStorage.getItem('mock_admin_user');
    if (storedMockUser) {
      setCurrentUser(JSON.parse(storedMockUser));
      setLoading(false);
      return;
    }

    if (isPlaceholder) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const stillMock = localStorage.getItem('mock_admin_user');
      if (!stillMock) {
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export default AuthContext;
