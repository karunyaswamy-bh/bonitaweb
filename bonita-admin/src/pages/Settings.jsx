import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import { uploadProductImage } from '../firebase/storage';
import { Save, Lock, Image, Check, AlertCircle, Loader } from 'lucide-react';

const initialDefaultSettings = {
  phone: '+91 98765 43210',
  email: 'inquire@bonitaropita.com',
  address: 'Plot 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana, 500033',
  whatsappNumber: '919876543210',
  logoUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200'
};

export default function Settings() {
  const [settings, setSettings] = useState({
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    logoUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Image states
  const [logoUploading, setLogoUploading] = useState(false);
  
  // Password states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

      if (isPlaceholder) {
        const stored = localStorage.getItem('mock_admin_settings');
        setSettings(stored ? JSON.parse(stored) : initialDefaultSettings);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'settings', 'boutique');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSettings(snap.data());
        } else {
          setSettings(initialDefaultSettings);
        }
      } catch (err) {
        console.warn("Firestore settings load failed. Loading offline cache.", err);
        const stored = localStorage.getItem('mock_admin_settings');
        setSettings(stored ? JSON.parse(stored) : initialDefaultSettings);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setError('');
    setSaveSuccess(false);

    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    try {
      if (isPlaceholder) {
        localStorage.setItem('mock_admin_settings', JSON.stringify(settings));
      } else {
        const docRef = doc(db, 'settings', 'boutique');
        await setDoc(docRef, {
          ...settings,
          updatedAt: new Date()
        }, { merge: true });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to save settings. Please try again.');
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoUploading(true);
    setError('');

    try {
      // Re-use image uploader helper
      const downloadUrl = await uploadProductImage('settings_logo', file);
      setSettings(prev => ({ ...prev, logoUrl: downloadUrl }));
    } catch (err) {
      console.error(err);
      setError('Logo upload failed. Please try again.');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess(false);

    if (newPassword.length < 6) {
      return setPassError('Password must be at least 6 characters long.');
    }
    if (newPassword !== confirmPassword) {
      return setPassError('Passwords do not match.');
    }

    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    try {
      setPassLoading(true);
      if (isPlaceholder) {
        // Offline preview simulation
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log("Mock password updated: ", newPassword);
      } else {
        if (auth.currentUser) {
          await updatePassword(auth.currentUser, newPassword);
        } else {
          throw new Error("No active user session detected.");
        }
      }
      setPassSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setPassLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Saree Boutique Details panel */}
      <div className="lg:col-span-2 bg-white border border-neutral-200 shadow-premium p-6 rounded">
        <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-4 mb-6">Boutique Contact Information</h3>
        
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm flex items-center gap-2">
            <Check size={18} />
            <span>Settings saved successfully! Details synchronized with customer app.</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm flex gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
            {/* Logo display */}
            <div className="w-20 aspect-square rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden shrink-0 flex items-center justify-center">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Store Logo" className="w-full h-full object-cover" />
              ) : (
                <Image size={24} className="text-neutral-300" />
              )}
            </div>
            {/* Upload triggers */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Boutique Logo</label>
              <div className="relative mt-2">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={logoUploading}
                />
                <button
                  type="button"
                  disabled={logoUploading}
                  className="border border-neutral-300 hover:border-primary text-neutral-600 hover:text-primary px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  {logoUploading ? <Loader className="animate-spin text-primary" size={12} /> : null}
                  {logoUploading ? 'Uploading Logo...' : 'Upload Logo'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Display Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Inquiry WhatsApp Number (wa.me link prefix)</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                placeholder="e.g. 919876543210"
                className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                required
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">Include country code (91 for India), exclude space, plus symbols, and dashes.</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Contact Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              placeholder="inquire@bonitaropita.com"
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Physical Store Address</label>
            <textarea
              value={settings.address}
              onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              placeholder="e.g. Plot 45, Jubilee Hills, Hyderabad"
              rows={3}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-100">
            <button
              type="submit"
              disabled={logoUploading}
              className="bg-primary hover:bg-primary-hover text-[#FAF6E6] px-8 py-2.5 rounded text-sm uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Save size={16} />
              Save Settings
            </button>
          </div>
        </form>
      </div>

      {/* Security Credential Editor panel */}
      <div className="bg-white border border-neutral-200 shadow-premium p-6 rounded h-fit">
        <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-4 mb-6">Security Settings</h3>
        
        {passSuccess && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm flex items-center gap-2">
            <Check size={16} />
            <span>Password updated!</span>
          </div>
        )}

        {passError && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm flex gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={passLoading}
            className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-colors"
          >
            {passLoading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
