import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useSettings } from '../../hooks/useSettings';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-neutral-charcoal text-neutral-cream pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Intro */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-serif tracking-widest text-gold-gradient font-medium block">BONITA ROPITA</span>
              <span className="text-[10px] tracking-[0.3em] text-accent/80 uppercase font-medium mt-2 block">Curated Luxury • Since 2015</span>
            </Link>
            <p className="text-[13px] text-neutral-cream/70 leading-[1.8] font-sans pr-4">
              Discover the unmatched grace of pure handloom sarees. Masterpieces of heritage silk, fine embroidery, and gold zari, woven to celebrate the timeless beauty of Indian traditions.
            </p>
          </div>

          {/* Contact Details */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-accent mb-8 font-semibold">The Boutique</h4>
            <ul className="space-y-5 text-[13px] text-neutral-cream/80">
              <li className="flex items-start gap-4 group cursor-pointer">
                <MapPin size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-0.5 group-hover:text-accent-light transition-colors" />
                <span className="leading-relaxed group-hover:text-neutral-cream transition-colors">{settings.address || "Plot 45, Jubilee Hills, Road No. 10\nHyderabad, Telangana, 500033"}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Phone size={16} strokeWidth={1.5} className="text-accent shrink-0 group-hover:text-accent-light transition-colors" />
                <span className="group-hover:text-neutral-cream transition-colors">{settings.phone || "+91 82976 72855"}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Mail size={16} strokeWidth={1.5} className="text-accent shrink-0 group-hover:text-accent-light transition-colors" />
                <span className="group-hover:text-neutral-cream transition-colors">{settings.email || "inquire@bonitaropita.com"}</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-accent mb-8 font-semibold">Store Hours</h4>
            <div className="flex items-start gap-4 text-[13px] text-neutral-cream/80">
              <Clock size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="mb-2">Monday – Saturday</p>
                <p className="text-neutral-cream">11:00 AM – 8:00 PM</p>
                <p className="text-accent/60 mt-4 text-[12px] uppercase tracking-wider">Sunday: By Appointment</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links & Socials */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-accent mb-8 font-semibold">Discover</h4>
            <div className="flex flex-col gap-4 text-[13px] uppercase tracking-[0.15em] text-neutral-cream/70 mb-10">
              <Link to="/" className="hover:text-accent transition-colors duration-300 w-fit hover-underline-animation">Home</Link>
              <Link to="/catalogue" className="hover:text-accent transition-colors duration-300 w-fit hover-underline-animation">Bespoke Collection</Link>
              <Link to="/contact" className="hover:text-accent transition-colors duration-300 w-fit hover-underline-animation">Contact Us</Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-5">
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-cream/20 flex items-center justify-center text-neutral-cream hover:bg-accent hover:border-accent hover:text-neutral-charcoal transition-all duration-300">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-cream/20 flex items-center justify-center text-neutral-cream hover:bg-accent hover:border-accent hover:text-neutral-charcoal transition-all duration-300">
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Panel */}
        <div className="border-t border-neutral-cream/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-cream/40 font-sans">
            © {new Date().getFullYear()} Bonita Ropita Saree Boutique.
          </p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.15em] text-neutral-cream/40">
            <Link to="/admin" className="hover:text-accent transition-colors duration-300">Admin Login</Link>
            <span className="w-1 h-1 rounded-full bg-neutral-cream/20"></span>
            <span>Designed for Heritage Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
