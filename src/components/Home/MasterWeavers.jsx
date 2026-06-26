import React from 'react';

export default function MasterWeavers() {
  return (
    <section className="py-24 md:py-40 bg-neutral-charcoal text-neutral-cream relative">
      {/* Background with texture */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-6 block">
            The Hands Behind The Art
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-neutral-cream mb-8">
            Master Weavers of India
          </h2>
          <p className="text-[15px] text-neutral-cream/70 leading-[1.8] font-light">
            Every saree at Bonita Ropita is a testament to the skill of artisans who have inherited their craft through generations. We work directly with weavers to ensure fair compensation and the preservation of ancient techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-12">
          {/* Weaver Card 1 */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              {/* Real image of weaver */}
              <img src="/images/varanasi.png" alt="Varanasi Loom Weaver" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <h3 className="text-2xl font-serif text-accent mb-2">Varanasi Looms</h3>
            <p className="text-[12px] uppercase tracking-[0.15em] text-neutral-cream/50 mb-4">Uttar Pradesh</p>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              Preserving the intricate Kadwa technique where each motif is woven separately with pure zari.
            </p>
          </div>
          
          {/* Weaver Card 2 */}
          <div className="group animate-fade-in-up md:mt-16" style={{ animationDelay: '0.4s' }}>
            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src="/images/kanchipuram.png" alt="Kanchipuram Silk Weaver" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <h3 className="text-2xl font-serif text-accent mb-2">Kanchipuram Guilds</h3>
            <p className="text-[12px] uppercase tracking-[0.15em] text-neutral-cream/50 mb-4">Tamil Nadu</p>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              Masters of the Korvai technique, seamlessly interlocking heavy silk borders with the main body.
            </p>
          </div>
          
          {/* Weaver Card 3 */}
          <div className="group animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img src="/images/pochampally.png" alt="Pochampally Ikat Weaver" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <h3 className="text-2xl font-serif text-accent mb-2">Pochampally Ikat</h3>
            <p className="text-[12px] uppercase tracking-[0.15em] text-neutral-cream/50 mb-4">Telangana</p>
            <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed">
              Mathematical precision in tie-and-dye yarns before weaving, creating mesmerizing geometric patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
