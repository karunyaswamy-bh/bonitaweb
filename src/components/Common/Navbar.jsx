import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/catalogue' },
    { name: 'Heritage', path: '/#heritage' }, 
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === '/';
  
  // If we're on the home page and haven't scrolled, the background is the dark hero image.
  // Otherwise, the background is the cream navbar (or cream page background).
  const isDarkBg = isHome && !scrolled;

  const getLinkClass = (path, isMobile = false) => {
    const base = isMobile ? "text-sm tracking-[0.25em] uppercase font-medium transition-colors" : "text-[13px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 hover-underline-animation";
    
    // Mobile menu is always on a cream background
    if (isMobile) {
      return `${base} ${isActive(path) ? 'text-primary' : 'text-neutral-charcoal/70 hover:text-primary'}`;
    }
    
    // Desktop menu depends on background
    if (isActive(path)) {
      return `${base} ${isDarkBg ? 'text-white' : 'text-primary'}`;
    }
    return `${base} ${isDarkBg ? 'text-neutral-cream/80 hover:text-white' : 'text-neutral-charcoal/70 hover:text-primary'}`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-neutral-cream shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent ${isDarkBg ? 'opacity-30' : 'opacity-100'}`}></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-10 w-1/3">
            {navLinks.slice(0, 2).map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  className={getLinkClass(link.path)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={getLinkClass(link.path)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex flex-col items-center justify-center group w-1/3">
            <span className={`text-3xl md:text-4xl font-serif tracking-widest font-medium transition-all duration-500 group-hover:text-gold-gradient ${isDarkBg ? 'text-white' : 'text-primary'}`}>
              BONITA ROPITA
            </span>
            <span className={`text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium mt-1 transition-all duration-500 ${isDarkBg ? 'text-neutral-cream/70 group-hover:text-white' : 'text-accent opacity-80 group-hover:opacity-100'}`}>
              Curated Luxury • Since 2015
            </span>
          </Link>

          {/* Right Navigation & CTA (Desktop) */}
          <div className="hidden md:flex items-center justify-end space-x-10 w-1/3">
            {navLinks.slice(2).map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.path}
                  href={link.path}
                  className={getLinkClass(link.path)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={getLinkClass(link.path)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              to="/catalogue"
              className={`text-[11px] font-semibold uppercase tracking-[0.15em] py-3.5 px-7 transition-colors duration-500 ${isDarkBg ? 'bg-white text-primary hover:bg-neutral-cream' : 'bg-primary text-neutral-cream hover:bg-primary-hover'}`}
            >
              Collection
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end w-1/3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none transition-colors ${isDarkBg ? 'text-white hover:text-neutral-cream' : 'text-neutral-charcoal hover:text-primary'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-neutral-cream border-t border-primary/5 shadow-2xl transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 py-8 space-y-6 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm tracking-[0.25em] uppercase font-medium transition-colors ${
                isActive(link.path) 
                  ? 'text-primary' 
                  : 'text-neutral-charcoal/70 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 w-full">
            <Link
              to="/catalogue"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center bg-primary text-neutral-cream text-xs font-semibold uppercase tracking-[0.2em] py-4 px-6 hover:bg-primary-hover transition-colors duration-500"
            >
              Collection
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
