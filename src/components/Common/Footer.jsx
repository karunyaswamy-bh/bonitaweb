import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-neutral-charcoal text-neutral-cream pt-16 pb-8 relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10">
          {/* Brand Intro */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-3xl font-serif tracking-wide text-gold-gradient font-bold drop-shadow-md">Bonita Ropita</span>
            <p className="mt-5 text-sm text-neutral-cream/80 leading-relaxed font-sans max-w-sm">
              Discover the unmatched grace of pure handloom sarees. Masterpieces of heritage silk, fine embroidery, and gold zari, woven to celebrate the timeless beauty of Indian traditions.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-serif text-accent mb-6">The Boutique</h4>
            <ul className="space-y-4 text-sm text-neutral-cream/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>{settings.address || "Plot 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana, 500033"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>{settings.phone || "+91 82976 72855"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>{settings.email || "inquire@bonitaropita.com"}</span>
              </li>
            </ul>
          </div>

          {/* Working Hours & Quick links */}
          <div>
            <h4 className="text-lg font-serif text-accent mb-6">Store Hours</h4>
            <div className="flex items-start gap-3 text-sm text-neutral-cream/80 mb-6">
              <Clock size={18} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p>Monday – Saturday: 11:00 AM – 8:00 PM</p>
                <p className="text-accent/60 mt-1">Sunday: Closed</p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex gap-6 text-xs uppercase tracking-widest text-neutral-cream/60 items-center flex-wrap">
              <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
              <Link to="/catalogue" className="hover:text-accent transition-colors duration-300">Catalogue</Link>
              <Link to="/contact" className="hover:text-accent transition-colors duration-300">Contact</Link>
              <Link to="/admin" className="hover:text-accent text-accent-light transition-colors duration-300">
                Admin Login <span className="text-[10px] text-neutral-cream/40 lowercase normal-case ml-1 font-sans font-normal">(admin@bonitashop.com or admin@bonitaropita.com / password123)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Panel */}
        <div className="border-t border-neutral-cream/10 pt-8 mt-8 text-center text-xs text-neutral-cream/40 font-sans flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Bonita Ropita Saree Boutique. All Rights Reserved.</p>
          <p className="tracking-wide">Designed for Visual Excellence & Heritage Craft</p>
        </div>
      </div>
    </footer>
  );
}
