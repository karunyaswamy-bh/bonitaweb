import React from 'react';
import { Link } from 'react-router-dom';

export default function BridalShowcase() {
  return (
    <section className="py-24 md:py-40 bg-neutral-cream relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-6 block">
                The Royal Trousseau
              </span>
              <h2 className="text-5xl lg:text-7xl font-serif text-primary mb-8 leading-[1.05]">
                Bridal <br /> 
                <span className="italic font-light text-neutral-muted">Masterpieces</span>
              </h2>
              <p className="text-[15px] text-neutral-muted leading-[1.8] font-light mb-12 max-w-md">
                For the most important day of your life, wear a saree that takes months to weave. Our bridal collection features heirloom-quality Kanchipuram and Banarasi silks with pure gold zari, designed to make you look ethereal.
              </p>
              
              <Link 
                to="/catalogue?category=bridal"
                className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors duration-300"
              >
                <span className="w-12 h-[1px] bg-primary group-hover:bg-accent transition-colors duration-300"></span>
                Explore Bridal Wear
              </Link>
            </div>
          </div>
          
          {/* Right Images (Magazine Layout) */}
          <div className="w-full lg:w-7/12 order-1 lg:order-2 relative h-[500px] md:h-[700px]">
            <div className="absolute top-0 right-0 w-[70%] h-[90%] z-10 animate-fade-in-up shadow-premium">
              <div className="image-zoom-container w-full h-full">
                <img 
                  src="/images/bridal_collection.png" 
                  alt="Bridal Saree" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-[10%] w-[45%] h-[60%] z-20 shadow-premium animate-fade-in-up border-8 border-neutral-cream" style={{ animationDelay: '0.4s' }}>
              <div className="image-zoom-container w-full h-full bg-primary/10">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-silk-pattern opacity-30 mix-blend-multiply"></div>
                <img 
                  src="/images/festive_collection.png" 
                  alt="Bridal Detail" 
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
