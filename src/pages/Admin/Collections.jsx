import React, { useState, useEffect } from 'react';
import { collection, addDoc, setDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Trash2, Edit, AlertCircle } from 'lucide-react';

const defaultCollections = [
  { id: 'bridal-heritage', name: 'Bridal Heritage', desc: 'Heavy gold border silk sarees for brides' },
  { id: 'festive-elegance', name: 'Festive Elegance', desc: 'Lightweight rich tissue and organza sarees' },
  { id: 'modern-drapes', name: 'Modern Drapes', desc: 'Contemporary thread and Georgette drapes' }
];

export default function Collections() {
  const [collectionsList, setCollectionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    if (isPlaceholder) {
      const stored = localStorage.getItem('mock_admin_collections');
      if (stored) {
        setCollectionsList(JSON.parse(stored));
      } else {
        setCollectionsList(defaultCollections);
        localStorage.setItem('mock_admin_collections', JSON.stringify(defaultCollections));
      }
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'collections'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCollectionsList(items.length > 0 ? items : defaultCollections);
      setLoading(false);
    }, (err) => {
      console.warn("Firestore collection listeners failed. Fallback to local storage.", err);
      const stored = localStorage.getItem('mock_admin_collections');
      setCollectionsList(stored ? JSON.parse(stored) : defaultCollections);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName) return setError('Category name cannot be empty.');
    setError('');

    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    const payload = {
      name: newName,
      description: newDesc
    };

    try {
      if (isPlaceholder) {
        const stored = localStorage.getItem('mock_admin_collections');
        let list = stored ? JSON.parse(stored) : defaultCollections;
        
        if (editingId) {
          list = list.map(c => c.id === editingId ? { ...c, ...payload } : c);
        } else {
          list.push({ ...payload, id: `col_${Date.now()}` });
        }
        
        localStorage.setItem('mock_admin_collections', JSON.stringify(list));
        setCollectionsList(list);
      } else {
        if (editingId) {
          const docRef = doc(db, 'collections', editingId);
          await setDoc(docRef, payload, { merge: true });
        } else {
          const colRef = collection(db, 'collections');
          await addDoc(colRef, payload);
        }
      }
      
      setNewName('');
      setNewDesc('');
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError('Failed to save category. Please try again.');
    }
  };

  const handleEdit = (col) => {
    setEditingId(col.id);
    setNewName(col.name);
    setNewDesc(col.description || '');
  };

  const handleDelete = async (colId) => {
    if (!window.confirm("Are you sure you want to delete this collection category?")) return;
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    try {
      if (isPlaceholder) {
        const stored = localStorage.getItem('mock_admin_collections');
        if (stored) {
          let list = JSON.parse(stored);
          list = list.filter(c => c.id !== colId);
          localStorage.setItem('mock_admin_collections', JSON.stringify(list));
          setCollectionsList(list);
        }
      } else {
        const docRef = doc(db, 'collections', colId);
        await deleteDoc(docRef);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white border border-neutral-200 shadow-premium p-6 rounded h-fit">
        <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-4 mb-6">
          {editingId ? 'Edit Collection' : 'Create New Collection'}
        </h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm flex gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Collection Name *</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Bridal Heritage"
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Short Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe this category context..."
              rows={3}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-4">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-grow border border-neutral-300 py-2 rounded text-xs text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-grow bg-primary hover:bg-primary-hover text-[#FAF6E6] py-2.5 rounded text-xs uppercase tracking-wider font-semibold shadow"
            >
              {editingId ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white border border-neutral-200 shadow-premium rounded overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-serif text-primary font-semibold">Active Saree Collections</h3>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : collectionsList.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {collectionsList.map((col) => (
              <div key={col.id} className="p-6 flex justify-between items-center hover:bg-neutral-50/50">
                <div>
                  <h4 className="font-semibold text-neutral-900">{col.name}</h4>
                  <p className="text-neutral-500 text-xs mt-1 leading-relaxed">{col.description || col.desc || 'No description provided.'}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(col)}
                    className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-50 rounded"
                    title="Edit Collection"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(col.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete Collection"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-400">
            No collection categories defined.
          </div>
        )}
      </div>
    </div>
  );
}
