import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-primary/10 transition-all duration-300 shadow-sm">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex flex-col group">
            <span className="text-2xl font-serif tracking-wide text-primary font-bold group-hover:text-gold-gradient transition-all duration-300">Bonita Ropita</span>
            <span className="text-[10px] tracking-widest text-accent uppercase font-medium -mt-1 opacity-80 group-hover:opacity-100 transition-opacity">Saree Boutique • Hyderabad</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-neutral-charcoal/80 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                )}
              </Link>
            ))}
            <Link
              to="/catalogue"
              className="bg-primary text-white text-xs font-semibold uppercase tracking-wider py-3 px-6 hover:bg-primary-hover transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-charcoal hover:text-primary p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-t border-primary/5 bg-neutral-cream absolute top-20 left-0 w-full shadow-lg transition-transform duration-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 text-base font-medium tracking-wide uppercase border-b border-neutral-charcoal/5 last:border-none ${
                  isActive(link.path) 
                    ? 'text-primary font-semibold' 
                    : 'text-neutral-charcoal/85'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-3 space-y-3">
              <Link
                to="/catalogue"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block bg-primary text-white text-sm font-semibold uppercase tracking-wider py-3 px-6 hover:bg-primary-hover transition-colors duration-300"
              >
                Explore Collection
              </Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
