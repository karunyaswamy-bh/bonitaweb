import React, { useState, useEffect } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductForm from '../../components/Products/ProductForm';
import { deleteProductRecord } from '../../firebase/firestore';
import { deleteStorageImages } from '../../firebase/storage';
import { Plus, Search, Edit, Trash2, ShieldAlert, Sparkles } from 'lucide-react';

export default function Products() {
  const { products, loading } = useProducts();
  const [localList, setLocalList] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const fabrics = ['Kanchipuram Silk', 'Organza', 'Banarasi Silk', 'Georgette', 'Cotton', 'Chiffon', 'Linen', 'Other'];

  useEffect(() => {
    setLocalList(products);
  }, [products]);

  useEffect(() => {
    const handleLocalUpdate = () => {
      const stored = localStorage.getItem('mock_admin_products');
      if (stored) {
        setLocalList(JSON.parse(stored));
      }
    };
    window.addEventListener('local-products-update', handleLocalUpdate);
    return () => window.removeEventListener('local-products-update', handleLocalUpdate);
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleDeletePrompt = (product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProductRecord(deletingProduct);
      if (deletingProduct.images && deletingProduct.images.length > 0) {
        await deleteStorageImages(deletingProduct.images);
      }
    } catch (err) {
      console.error("Delete failed: ", err);
    } finally {
      setDeletingProduct(null);
    }
  };

  const filteredList = localList.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.fabric.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFabric = !selectedFabric || item.fabric === selectedFabric;
    return matchSearch && matchFabric;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 border border-neutral-200 rounded shadow-premium">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-neutral-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by saree name or fabric..."
              className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
            className="border border-neutral-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary bg-white focus:outline-none min-w-[160px]"
          >
            <option value="">All Fabrics</option>
            {fabrics.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-[#FAF6E6] px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold shadow transition-colors"
        >
          <Plus size={16} />
          Add Saree
        </button>
      </div>

      <div className="bg-white border border-neutral-200 shadow-premium rounded overflow-hidden">
        {loading && localList.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-4 w-20">Cover</th>
                  <th className="px-6 py-4">Saree Product</th>
                  <th className="px-6 py-4">Fabric</th>
                  <th className="px-6 py-4">Collection</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {filteredList.map((product) => {
                  const cover = product.images && product.images.length > 0
                    ? product.images[0]
                    : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100';

                  return (
                    <tr key={product.id} className="hover:bg-neutral-50/40">
                      <td className="px-6 py-3">
                        <div className="w-10 aspect-[2/3] rounded bg-neutral-100 overflow-hidden shadow-sm">
                          <img src={cover} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-900 block">{product.name}</span>
                        {product.featured && (
                          <span className="inline-flex items-center gap-0.5 mt-0.5 text-[9px] font-semibold text-accent uppercase tracking-wider">
                            <Sparkles size={8} className="fill-current" /> Featured Saree
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs">{product.fabric}</td>
                      <td className="px-6 py-4 text-xs">{product.collection}</td>
                      <td className="px-6 py-4 font-semibold text-xs">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                          product.availability 
                            ? 'bg-green-50 text-green-700 border border-green-100' 
                            : 'bg-primary-light text-primary border border-primary/10'
                        }`}>
                          {product.availability ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-50 rounded transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(product)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-400">
            No product sarees match your query search.
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSaveSuccess={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeletingProduct(null)}></div>
          <div className="relative bg-white w-full max-w-md rounded p-6 shadow-2xl space-y-4">
            <div className="flex gap-3 text-red-600 items-start">
              <ShieldAlert size={28} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-serif font-semibold text-neutral-800">Confirm Catalog Deletion</h4>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete **{deletingProduct.name}**? This action deletes the listing and all images from storage folders and cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 border border-neutral-300 rounded text-xs text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs uppercase tracking-wider font-semibold shadow transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
