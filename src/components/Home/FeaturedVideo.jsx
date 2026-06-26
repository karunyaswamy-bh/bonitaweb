import React from 'react';

export default function FeaturedVideo() {
  return (
    <section className="relative h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Fallback image if video is not available */}
      <div className="absolute inset-0 z-0">
        <div className="image-zoom-container w-full h-full">
          {/* We use a solid gradient/pattern here that can be replaced with an actual video later */}
          <div className="w-full h-full bg-primary relative">
            <div className="absolute inset-0 bg-silk-pattern opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal/90 via-neutral-charcoal/40 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">
        {/* Play Button */}
        <button className="w-24 h-24 rounded-full border border-accent/50 flex items-center justify-center text-accent hover:bg-accent hover:text-neutral-charcoal transition-all duration-500 group mb-10 relative">
          <div className="absolute inset-0 rounded-full border border-accent/30 animate-ping opacity-50 duration-[2000ms]"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 group-hover:fill-current">
            <path d="M6 4L20 12L6 20V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-cream/80 mb-4 block">
          The Craft of Royalty
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-accent drop-shadow-2xl">
          Watch The Campaign
        </h2>
      </div>
    </section>
  );
}
