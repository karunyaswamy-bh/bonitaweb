import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { id, name, fabric, price, images, availability, collection } = product;
  const coverImage = images && images.length > 0 ? images[0] : '/images/hero_saree.png';

  return (
    <div className="group flex flex-col bg-white border border-neutral-charcoal/5 shadow-premium hover:shadow-premium-hover transition-all duration-500 rounded-sm overflow-hidden hover:-translate-y-1">
      {/* Saree Cover Photo */}
      <Link to={`/product/${id}`} className="relative block aspect-[2/3] w-full bg-neutral-100 overflow-hidden">
        <img 
          src={coverImage} 
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Dark overlay that fades in on hover */}
        <div className="absolute inset-0 bg-neutral-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Quick View indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
          <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-widest py-2 px-4 shadow-xl flex items-center gap-2">
             <Sparkles size={12} /> Discover
          </span>
        </div>
        
        {/* Collection Badge */}
        <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur text-white text-[9px] font-semibold uppercase tracking-wider py-1 px-2.5 shadow-sm">
          {collection}
        </span>

        {/* Availability Badge */}
        {!availability && (
          <span className="absolute bottom-3 left-3 bg-neutral-charcoal/90 backdrop-blur text-[#FAF6E6] text-[9px] font-semibold uppercase tracking-wider py-1 px-2.5 shadow-sm">
            Made to Order
          </span>
        )}
      </Link>

      {/* Copy Details */}
      <div className="p-5 flex-grow flex flex-col justify-between relative bg-white">
        {/* Subtle decorative line */}
        <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        
        <div>
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase block mb-1.5">{fabric}</span>
          <h3 className="text-lg font-serif text-neutral-charcoal line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm font-semibold text-neutral-charcoal/80 mt-2">
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Detail CTA Button */}
        <Link 
          to={`/product/${id}`}
          className="mt-5 w-full flex items-center justify-center gap-1.5 border border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
