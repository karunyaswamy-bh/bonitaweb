import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/products': return 'Saree Catalogue Management';
      case '/inquiries': return 'Customer Inquiry Logs';
      case '/settings': return 'Boutique Settings';
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
      
      <div className="flex items-center gap-3 text-neutral-500 text-xs font-medium bg-neutral-50 border border-neutral-200 py-2 px-4 rounded-full">
        <Calendar size={14} className="text-primary" />
        <span>{getTodayDate()}</span>
      </div>
    </header>
  );
}
