import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-silk-pattern opacity-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 border border-accent/20 p-8 md:p-16 glass-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-accent/20">
          
          <div className="px-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-[40px] font-serif text-accent block mb-6">01</span>
            <h3 className="text-[13px] uppercase tracking-[0.2em] font-semibold text-neutral-cream mb-4">Direct From Looms</h3>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              We bypass intermediaries, sourcing directly from artisan families in Kanchipuram and Banaras to guarantee absolute authenticity.
            </p>
          </div>
          
          <div className="px-6 pt-12 md:pt-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-[40px] font-serif text-accent block mb-6">02</span>
            <h3 className="text-[13px] uppercase tracking-[0.2em] font-semibold text-neutral-cream mb-4">Silk Mark Certified</h3>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              Every saree in our premium range comes with a 100% pure silk certification, ensuring you invest only in the highest quality heritage textiles.
            </p>
          </div>
          
          <div className="px-6 pt-12 md:pt-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-[40px] font-serif text-accent block mb-6">03</span>
            <h3 className="text-[13px] uppercase tracking-[0.2em] font-semibold text-neutral-cream mb-4">Bespoke Curation</h3>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              Our styling team hand-picks limited edition pieces based on rarity, ensuring your wardrobe features truly unique, one-of-a-kind heirlooms.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
