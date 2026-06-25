import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { uploadProductImage } from '../../firebase/storage';
import { Save, Lock, Image, Check, AlertCircle, Loader, Home, Settings as SettingsIcon } from 'lucide-react';

const initialDefaultSettings = {
  phone: '+91 82976 72855',
  email: 'inquire@bonitaropita.com',
  address: 'Plot 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana, 500033',
  whatsappNumber: '8297672855',
  logoUrl: '/images/about_saree_detail.png',
  heroSubtitle: 'Handloomed Royalty',
  heroTitle: 'Embody the Grace of Fine Silk Heritage',
  heroDescription: 'Welcome to Bonita Ropita. Explore our hand-woven bridal and festive saree creations directly from master weavers across India, curated exclusively in Hyderabad.',
  heroImageUrl: '/images/banarasi_ivory_gold.png',
  storySubtitle: 'Our Heritage',
  storyTitle: 'The Story of Bonita Ropita',
  storyParagraph1: 'Located in the heart of Jubilee Hills, Hyderabad, Bonita Ropita has been sourcing the finest pure silk sarees for generations. Every thread represents the heartbeat of an Indian artisan.',
  storyParagraph2: 'We collaborate directly with master weavers from Kanchipuram, Banaras, and handloom pockets of Telangana. By avoiding intermediary markups, we deliver luxury sarees directly with absolute quality assurance.'
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [settings, setSettings] = useState({
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    logoUrl: '',
    heroSubtitle: '',
    heroTitle: '',
    heroDescription: '',
    heroImageUrl: '',
    storySubtitle: '',
    storyTitle: '',
    storyParagraph1: '',
    storyParagraph2: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  
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
        setSettings(stored ? { ...initialDefaultSettings, ...JSON.parse(stored) } : initialDefaultSettings);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'settings', 'boutique');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSettings({ ...initialDefaultSettings, ...snap.data() });
        } else {
          setSettings(initialDefaultSettings);
        }
      } catch (err) {
        console.warn("Firestore settings load failed. Loading offline cache.", err);
        const stored = localStorage.getItem('mock_admin_settings');
        setSettings(stored ? { ...initialDefaultSettings, ...JSON.parse(stored) } : initialDefaultSettings);
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
      const downloadUrl = await uploadProductImage('settings_logo', file);
      setSettings(prev => {
        const updated = { ...prev, logoUrl: downloadUrl };
        const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;
        if (isPlaceholder) {
          localStorage.setItem('mock_admin_settings', JSON.stringify(updated));
        }
        return updated;
      });
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
        await new Promise(resolve => setTimeout(resolve, 800));
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

  const tabs = [
    { id: 'contacts', name: 'Boutique Contacts', icon: SettingsIcon },
    { id: 'homepage', name: 'Homepage Content', icon: Home },
    { id: 'security', name: 'Security & Admin', icon: Lock }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Navigation Header */}
      <div className="flex border-b border-neutral-200 bg-white p-2 rounded shadow-sm gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800'
              }`}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Main Settings Form Container */}
      <div className="bg-white border border-neutral-200 shadow-premium p-6 rounded">
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

        {activeTab === 'contacts' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-3 mb-6">Boutique Contact Information</h3>
            
            <div className="flex items-center gap-6 pb-6 border-b border-neutral-100">
              <div className="w-20 aspect-square rounded-full border border-neutral-200 bg-neutral-50 overflow-hidden shrink-0 flex items-center justify-center">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Store Logo" className="w-full h-full object-cover" />
                ) : (
                  <Image size={24} className="text-neutral-300" />
                )}
              </div>
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
                  placeholder="+91 82976 72855"
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
                  placeholder="e.g. 8297672855"
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
        )}

        {activeTab === 'homepage' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-3 mb-6">Homepage Section Content</h3>
            
            {/* Hero Section Grid */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-accent border-b border-neutral-100 pb-1">Hero Banner Section</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Hero Subtitle</label>
                  <input
                    type="text"
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    placeholder="e.g. Handloomed Royalty"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Hero Banner Background Image URL</label>
                  <input
                    type="text"
                    value={settings.heroImageUrl}
                    onChange={(e) => setSettings(prev => ({ ...prev, heroImageUrl: e.target.value }))}
                    placeholder="Image URL"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Hero Title</label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroTitle: e.target.value }))}
                  placeholder="e.g. Embody the Grace of Fine Silk Heritage"
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Hero Description Paragraph</label>
                <textarea
                  value={settings.heroDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, heroDescription: e.target.value }))}
                  placeholder="Welcome details..."
                  rows={2}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Brand Story Section Grid */}
            <div className="space-y-4 pt-4">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-accent border-b border-neutral-100 pb-1">Brand Story "About" Section</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Story Subtitle</label>
                  <input
                    type="text"
                    value={settings.storySubtitle}
                    onChange={(e) => setSettings(prev => ({ ...prev, storySubtitle: e.target.value }))}
                    placeholder="e.g. Our Heritage"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Story Title</label>
                  <input
                    type="text"
                    value={settings.storyTitle}
                    onChange={(e) => setSettings(prev => ({ ...prev, storyTitle: e.target.value }))}
                    placeholder="e.g. The Story of Bonita Ropita"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Story Paragraph 1</label>
                <textarea
                  value={settings.storyParagraph1}
                  onChange={(e) => setSettings(prev => ({ ...prev, storyParagraph1: e.target.value }))}
                  placeholder="Paragraph 1..."
                  rows={3}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Story Paragraph 2</label>
                <textarea
                  value={settings.storyParagraph2}
                  onChange={(e) => setSettings(prev => ({ ...prev, storyParagraph2: e.target.value }))}
                  placeholder="Paragraph 2..."
                  rows={3}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-100">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-[#FAF6E6] px-8 py-2.5 rounded text-sm uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Save size={16} />
                Save Homepage Content
              </button>
            </div>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-3 mb-6">Security Settings</h3>
            
            {passSuccess && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-sm flex items-center gap-2">
                <Check size={16} />
                <span>Password updated successfully!</span>
              </div>
            )}

            {passError && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm flex gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{passError}</span>
              </div>
            )}

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

            <div className="pt-2">
              <button
                type="submit"
                disabled={passLoading}
                className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-colors disabled:opacity-50"
              >
                {passLoading ? <Loader className="animate-spin text-white" size={12} /> : null}
                {passLoading ? 'Updating Password...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
