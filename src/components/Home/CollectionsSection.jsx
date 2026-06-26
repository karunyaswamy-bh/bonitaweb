import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CollectionsSection() {
  const collections = [
    {
      id: 'bridal-heritage',
      name: 'Bridal Heritage',
      desc: 'Heavy gold border silk sarees handcrafted for brides.',
      image: '/images/bridal_collection.png',
      count: '42 Styles'
    },
    {
      id: 'festive-elegance',
      name: 'Festive Elegance',
      desc: 'Breathable tissue, organza, and fine handloom georgette.',
      image: '/images/festive_collection.png',
      count: '56 Styles'
    }
  ];

  return (
    <section className="py-32 bg-primary relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-silk-pattern opacity-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-in-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-accent"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">Curated Closets</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-cream leading-[1.1]">
              The Signature Collections
            </h2>
          </div>
          
          <Link 
            to="/catalogue"
            className="hidden md:flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-neutral-cream hover:text-accent transition-colors duration-300 group mt-8 md:mt-0"
          >
            View All Collections
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {collections.map((col, index) => (
            <div 
              key={col.id}
              className="group relative h-[600px] overflow-hidden animate-fade-in-up shadow-premium"
              style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
            >
              {/* Image */}
              <img 
                src={col.image} 
                alt={col.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal via-neutral-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform group-hover:-translate-y-4 transition-transform duration-500">
                <div className="overflow-hidden mb-2">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-accent font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {col.count}
                  </span>
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-serif text-neutral-cream mb-4">{col.name}</h3>
                
                <div className="w-0 h-[1px] bg-accent mb-6 group-hover:w-16 transition-all duration-500 delay-200"></div>
                
                <p className="text-[14px] text-neutral-cream/80 mb-8 max-w-sm font-light leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                  {col.desc}
                </p>
                
                <Link 
                  to="/catalogue"
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-neutral-cream w-fit group/btn transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-400"
                >
                  <span className="hover-underline-animation">Explore Details</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 md:hidden">
          <Link 
            to="/catalogue"
            className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] text-neutral-cream hover:text-accent transition-colors duration-300 group border border-neutral-cream/20 py-4"
          >
            View All Collections
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
