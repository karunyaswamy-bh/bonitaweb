import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Home, Globe } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin': return 'Dashboard Overview';
      case '/admin/products': return 'Saree Catalogue Management';
      case '/admin/inquiries': return 'Customer Inquiry Logs';
      case '/admin/collections': return 'Collections Management';
      case '/admin/settings': return 'Boutique Settings';
      default: return 'BonitaShop Admin';
    }
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white h-20 border-b border-neutral-200 flex items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-semibold text-neutral-800 font-sans">{getPageTitle()}</h1>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          title="View Live Website"
          className="w-10 h-10 rounded-full border border-neutral-200 hover:border-primary text-neutral-600 hover:text-primary hover:bg-neutral-50 flex items-center justify-center transition-all duration-300 shadow-sm"
        >
          <Home size={18} />
        </Link>

        <div className="flex items-center gap-3 text-neutral-500 text-xs font-medium bg-neutral-50 border border-neutral-200 py-2 px-4 rounded-full">
          <Calendar size={14} className="text-primary" />
          <span>{getTodayDate()}</span>
        </div>
      </div>
    </header>
  );
}
