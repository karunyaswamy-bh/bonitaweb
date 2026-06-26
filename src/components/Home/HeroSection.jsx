import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection({ settings }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-neutral-charcoal">
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 z-0 w-full h-full scale-105"
        style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.05)` }}
      >
        <img 
          src={settings?.heroImageUrl || "/images/banarasi_ivory_gold.png"} 
          alt="Premium Silk Saree" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Luxury Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-charcoal/80 via-transparent to-neutral-charcoal"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal/90 via-transparent to-transparent"></div>
        
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-20">
        <div className="max-w-3xl animate-slow-reveal">
          
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-accent"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
              Since 2015 • Curated Luxury Sarees
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-cream leading-[1.1] mb-8 drop-shadow-2xl">
            {settings?.heroTitle || "Embody the Grace of Fine Silk Heritage."}
          </h1>
          
          <p className="text-base md:text-lg text-neutral-cream/80 mb-12 leading-[1.8] font-sans max-w-xl font-light">
            {settings?.heroDescription || "Welcome to Bonita Ropita. Explore our hand-woven bridal and festive saree creations directly from master weavers across India, curated exclusively in Hyderabad."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/catalogue"
              className="group relative inline-flex items-center justify-center bg-transparent border border-accent/50 text-accent hover:text-neutral-charcoal overflow-hidden px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-500"
            >
              <span className="absolute inset-0 bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></span>
              <span className="relative z-10">Discover The Collection</span>
            </Link>
            
            <a 
              href="#heritage"
              className="inline-flex items-center justify-center text-neutral-cream text-[11px] font-semibold uppercase tracking-[0.2em] hover:text-accent transition-colors duration-500 px-6 py-5 group"
            >
              Our Heritage
              <span className="ml-3 w-8 h-[1px] bg-neutral-cream/30 group-hover:bg-accent group-hover:w-12 transition-all duration-500"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-cream/50 mb-3">Scroll</span>
        <div className="w-[1px] h-12 bg-neutral-cream/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[float_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
