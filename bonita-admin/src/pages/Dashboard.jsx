import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Scissors, MessageSquare, AlertTriangle, Eye, ArrowRight, UserCheck } from 'lucide-react';
import localProducts from '../data/products.json';

const mockInquiries = [
  { id: 'inq-1', productName: 'Kanjeevaram Bridal Silk', productId: '1', timestamp: { seconds: Math.floor(Date.now() / 1000) - 1800 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' },
  { id: 'inq-2', productName: 'Emerald Green Chiffon', productId: '2', timestamp: { seconds: Math.floor(Date.now() / 1000) - 7200 }, userAgent: 'Mozilla/5.0 (Linux; Android 13; K)' },
  { id: 'inq-3', productName: 'Banarasi Ivory Gold', productId: '3', timestamp: { seconds: Math.floor(Date.now() / 1000) - 18000 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1)' },
  { id: 'inq-4', productName: 'Kanjeevaram Bridal Silk', productId: '1', timestamp: { seconds: Math.floor(Date.now() / 1000) - 86400 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  { id: 'inq-5', productName: 'Sage Pastel Organza Zardosi Saree', productId: '6', timestamp: { seconds: Math.floor(Date.now() / 1000) - 172800 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)' }
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    outOfStock: 0,
    mostInquired: { name: 'N/A', count: 0 }
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isPlaceholder = import.meta.env.VITE_FIREBASE_API_KEY === 'placeholder_api_key' || !import.meta.env.VITE_FIREBASE_API_KEY;

    if (isPlaceholder) {
      // Calculate local mock stats
      const oosCount = localProducts.filter(p => !p.availability).length;
      
      // Calculate most inquired
      const counts = {};
      let maxCount = 0;
      let maxName = 'N/A';
      mockInquiries.forEach(inq => {
        counts[inq.productName] = (counts[inq.productName] || 0) + 1;
        if (counts[inq.productName] > maxCount) {
          maxCount = counts[inq.productName];
          maxName = inq.productName;
        }
      });

      setStats({
        totalProducts: localProducts.length,
        totalInquiries: mockInquiries.length,
        outOfStock: oosCount,
        mostInquired: { name: maxName, count: maxCount }
      });
      setRecentInquiries(mockInquiries);
      setLoading(false);
      return;
    }

    // Real Firestore setup
    // Listener 1: Products stats
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map(d => d.data());
      const oos = items.filter(i => !i.availability).length;
      
      setStats(prev => ({
        ...prev,
        totalProducts: items.length,
        outOfStock: oos
      }));
    });

    // Listener 2: Inquiries & aggregations
    const qInq = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
    const unsubscribeInquiries = onSnapshot(qInq, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate most inquired
      const counts = {};
      let maxCount = 0;
      let maxName = 'N/A';
      items.forEach(inq => {
        counts[inq.productName] = (counts[inq.productName] || 0) + 1;
        if (counts[inq.productName] > maxCount) {
          maxCount = counts[inq.productName];
          maxName = inq.productName;
        }
      });

      setStats(prev => ({
        ...prev,
        totalInquiries: items.length,
        mostInquired: { name: maxName, count: maxCount }
      }));
      setRecentInquiries(items.slice(0, 10)); // Show last 10 entries
      setLoading(false);
    }, (err) => {
      console.warn("Firestore listeners failed. Loading local data.", err);
      // Fallback inside error listener
      const oos = localProducts.filter(p => !p.availability).length;
      setStats({
        totalProducts: localProducts.length,
        totalInquiries: mockInquiries.length,
        outOfStock: oos,
        mostInquired: { name: 'Kanjeevaram Bridal Silk', count: 2 }
      });
      setRecentInquiries(mockInquiries);
      setLoading(false);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeInquiries();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Saree Catalogue Size', val: stats.totalProducts, icon: Scissors, color: 'text-primary bg-primary-light border-primary/10' },
    { label: 'Customer Inquiries (WA Clicks)', val: stats.totalInquiries, icon: MessageSquare, color: 'text-teal-700 bg-teal-50 border-teal-100' },
    { label: 'Out of Stock Items', val: stats.outOfStock, icon: AlertTriangle, color: stats.outOfStock > 0 ? 'text-amber-700 bg-amber-50 border-amber-100' : 'text-neutral-500 bg-neutral-50 border-neutral-100' },
    { label: `Most Inquired Saree (${stats.mostInquired.count} clicks)`, val: stats.mostInquired.name, icon: UserCheck, color: 'text-accent hover:text-accent-hover bg-accent-light/50 border-accent/20', isText: true }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Summary row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-6 bg-white border rounded shadow-premium flex items-start gap-4 transition-all duration-300 hover:shadow-premium-hover`}>
              <div className={`p-4 rounded ${card.color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider block">{card.label}</span>
                <span className={`font-semibold block mt-1 ${card.isText ? 'text-base truncate text-neutral-800' : 'text-3xl text-neutral-800'}`}>
                  {card.val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List Table */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 shadow-premium rounded overflow-hidden">
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="text-lg font-serif text-primary">Recent Customer Inquiries</h3>
            <Link to="/inquiries" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 uppercase tracking-wide">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-4">Saree Product</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Browser/Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {recentInquiries.map((inq) => {
                  const dateStr = inq.timestamp?.seconds 
                    ? new Date(inq.timestamp.seconds * 1000).toLocaleString('en-IN')
                    : 'N/A';
                  
                  // Extract platform name from useragent
                  const getPlatform = (ua) => {
                    if (ua.includes('iPhone')) return 'iPhone';
                    if (ua.includes('Android')) return 'Android Phone';
                    if (ua.includes('Windows')) return 'Windows PC';
                    if (ua.includes('Macintosh')) return 'Macbook/Mac';
                    return 'Mobile Web';
                  };

                  return (
                    <tr key={inq.id} className="hover:bg-neutral-50/50">
                      <td className="px-6 py-4 font-medium text-neutral-900">{inq.productName}</td>
                      <td className="px-6 py-4 text-neutral-500 text-xs">{dateStr}</td>
                      <td className="px-6 py-4 text-neutral-500 text-xs">{getPlatform(inq.userAgent)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-neutral-200 shadow-premium rounded p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif text-primary border-b border-neutral-200 pb-4 mb-6">Staff Shortcuts</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/products')}
                className="w-full flex items-center justify-between p-4 bg-primary-light/50 border border-primary/10 rounded hover:bg-primary-light hover:border-primary/20 text-primary font-semibold text-sm transition-all duration-200"
              >
                <span>Add / Manage Sarees</span>
                <Scissors size={18} />
              </button>
              <button
                onClick={() => navigate('/inquiries')}
                className="w-full flex items-center justify-between p-4 bg-teal-50 border border-teal-100 rounded hover:bg-teal-100/50 hover:border-teal-200 text-teal-800 font-semibold text-sm transition-all duration-200"
              >
                <span>Browse Customer Clicks</span>
                <MessageSquare size={18} />
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded hover:bg-neutral-100 hover:border-neutral-300 text-neutral-700 font-semibold text-sm transition-all duration-200"
              >
                <span>Update Contact Details</span>
                <Settings size={18} />
              </button>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-400">
            BonitaShop Admin Dashboard v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
