import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Scissors, MessageSquare, Layers, Settings, LogOut, Home } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { logout, currentUser } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Saree Catalogue', path: '/admin/products', icon: Scissors },
    { name: 'Inquiries Logs', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Collections', path: '/admin/collections', icon: Layers },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-neutral-charcoal text-[#FAF6E6]/80 flex flex-col shrink-0 min-h-screen border-r border-accent/15">
      <div className="p-6 border-b border-neutral-cream/10">
        <span className="text-xl font-serif tracking-wide text-accent font-bold block">Bonita Ropita</span>
        <span className="text-[10px] tracking-widest text-neutral-cream/50 uppercase font-semibold block -mt-1">Manager Workspace</span>
      </div>

      <nav className="flex-grow p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-primary text-white font-medium border-l-4 border-accent shadow-md'
                  : 'hover:bg-neutral-cream/5 hover:text-[#FAF6E6]'
              }`}
            >
              <Icon size={18} className={isActive(item.path) ? 'text-accent' : 'text-neutral-cream/40'} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-2 mt-2 border-t border-neutral-cream/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded text-sm text-neutral-cream/65 hover:bg-neutral-cream/5 hover:text-[#FAF6E6] transition-all duration-200"
          >
            <Home size={18} className="text-neutral-cream/40" />
            <span>Go to Website</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-neutral-cream/10">
        <div className="px-4 py-3 bg-neutral-cream/5 rounded mb-3 flex flex-col overflow-hidden">
          <span className="text-[10px] uppercase font-semibold text-neutral-cream/40">Logged In As</span>
          <span className="text-xs text-neutral-cream/70 truncate mt-0.5" title={currentUser?.email}>{currentUser?.email}</span>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 border border-primary/20 hover:border-primary bg-primary/10 hover:bg-primary text-[#FAF6E6] hover:text-white py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}
