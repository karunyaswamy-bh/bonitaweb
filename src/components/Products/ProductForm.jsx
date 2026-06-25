import React, { useState, useEffect } from 'react';
import { saveProduct } from '../../firebase/firestore';
import { uploadProductImage, deleteStorageImages } from '../../firebase/storage';
import { X, Upload, Loader } from 'lucide-react';

export default function ProductForm({ product, onClose, onSaveSuccess }) {
  const isEdit = !!product;
  const [name, setName] = useState('');
  const [fabric, setFabric] = useState('Kanchipuram Silk');
  const [collection, setCollection] = useState('Bridal Heritage');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [weave, setWeave] = useState('');
  const [colour, setColour] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fabrics = ['Kanchipuram Silk', 'Organza', 'Banarasi Silk', 'Georgette', 'Cotton', 'Chiffon', 'Linen', 'Other'];
  const collections = ['Bridal Heritage', 'Festive Elegance', 'Modern Drapes'];

  useEffect(() => {
    if (isEdit && product) {
      setName(product.name || '');
      setFabric(product.fabric || 'Kanchipuram Silk');
      setCollection(product.collection || 'Bridal Heritage');
      setPrice(product.price || '');
      setAvailability(product.availability !== undefined ? product.availability : true);
      setFeatured(product.featured || false);
      setWeave(product.weave || '');
      setColour(product.colour || '');
      setCareInstructions(product.careInstructions || '');
      setDescription(product.description || '');
      setImages(product.images || []);
    }
  }, [product, isEdit]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    if (images.length + files.length > 5) {
      return setError('You can upload a maximum of 5 images per saree product.');
    }

    setUploading(true);
    setError('');
    const tempId = product?.id || `temp_${Date.now()}`;

    try {
      const uploadPromises = files.map(file => 
        uploadProductImage(tempId, file, (progress) => {
          setUploadProgress(Math.round(progress));
        })
      );
      
      const newUrls = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...newUrls]);
    } catch (err) {
      console.error(err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = async (urlToRemove, index) => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
    try {
      await deleteStorageImages([urlToRemove]);
    } catch (err) {
      console.warn("Storage image deletion skipped: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      return setError('Please enter name and price.');
    }
    try {
      setError('');
      setSaving(true);
      
      const productPayload = {
        name,
        fabric,
        collection,
        price: Number(price),
        availability,
        featured,
        weave,
        colour,
        careInstructions,
        description,
        images
      };

      await saveProduct(productPayload, product?.id);
      onSaveSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to save product details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-3xl rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-primary text-[#FAF6E6] p-6 flex justify-between items-center border-b border-accent/20">
          <h3 className="text-xl font-serif">{isEdit ? 'Edit Saree Listing' : 'Add New Saree to Catalogue'}</h3>
          <button onClick={onClose} className="text-[#FAF6E6]/80 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Saree Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Gold Kanchipuram Saree"
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Fabric Type</label>
                  <select 
                    value={fabric} 
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary bg-white focus:outline-none"
                  >
                    {fabrics.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Collection</label>
                  <select 
                    value={collection} 
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary bg-white focus:outline-none"
                  >
                    {collections.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Price (INR) *</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 18500"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Weave Style</label>
                  <input 
                    type="text" 
                    value={weave} 
                    onChange={(e) => setWeave(e.target.value)}
                    placeholder="e.g. Handloom Zari Weave"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Colour Tone</label>
                  <input 
                    type="text" 
                    value={colour} 
                    onChange={(e) => setColour(e.target.value)}
                    placeholder="e.g. Crimson & Antique Gold"
                    className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col justify-around py-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={availability} 
                      onChange={(e) => setAvailability(e.target.checked)}
                      className="rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input 
                      type="checkbox" 
                      checked={featured} 
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded border-neutral-300 text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Featured Saree</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">Product Images (Max 5)</label>
                
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-[2/3] border rounded bg-neutral-100 overflow-hidden">
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgUrl, idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 shadow"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {[...Array(Math.max(0, 5 - images.length))].map((_, i) => (
                    <div key={i} className="aspect-[2/3] border-2 border-dashed border-neutral-200 rounded flex items-center justify-center text-neutral-300">
                      <span className="text-[10px]">Empty</span>
                    </div>
                  ))}
                </div>

                {images.length < 5 && (
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    <button
                      type="button"
                      disabled={uploading}
                      className="w-full flex items-center justify-center gap-2 border border-neutral-300 hover:border-primary border-dashed py-3 px-4 rounded text-sm text-neutral-500 hover:text-primary transition-colors"
                    >
                      {uploading ? (
                        <>
                          <Loader className="animate-spin text-primary" size={16} />
                          <span>Uploading ({uploadProgress}%)</span>
                        </>
                      ) : (
                        <>
                          <Upload size={16} />
                          <span>Choose Saree Images</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Care & Storage Instructions</label>
                <textarea 
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  placeholder="e.g. Dry Clean Only. Avoid direct storage next to plastic."
                  rows={2}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-1">Detailed Saree Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a compelling story of the weave, border, and gold zari count details."
              rows={4}
              className="w-full border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="border border-neutral-300 px-6 py-2.5 rounded text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-primary hover:bg-primary-hover text-[#FAF6E6] px-8 py-2.5 rounded text-sm uppercase tracking-wider font-semibold shadow hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
