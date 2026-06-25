import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isPlaceholder) {
      if (email === 'admin@bonitashop.com' && password === 'password123') {
        const mockUser = { email: 'admin@bonitashop.com', uid: 'mock-admin-uid' };
        setCurrentUser(mockUser);
        localStorage.setItem('mock_admin_user', JSON.stringify(mockUser));
        return Promise.resolve(mockUser);
      } else {
        return Promise.reject(new Error("Invalid login credentials. For offline testing use: admin@bonitashop.com / password123"));
      }
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isPlaceholder) {
      setCurrentUser(null);
      localStorage.removeItem('mock_admin_user');
      return Promise.resolve();
    }
    return signOut(auth);
  }

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isPlaceholder) {
      const stored = localStorage.getItem('mock_admin_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
