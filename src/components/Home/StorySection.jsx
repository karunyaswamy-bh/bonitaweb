import React from 'react';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export default function StorySection({ settings }) {
  return (
    <section id="heritage" className="py-32 bg-neutral-cream relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Story Text (Left) */}
          <div className="lg:col-span-5 lg:order-1 order-2">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-accent"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">
                  {settings?.storySubtitle || "Our Heritage"}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-8 leading-[1.1]">
                {settings?.storyTitle || "The Story of Bonita Ropita"}
              </h2>
              
              <div className="space-y-6 text-neutral-muted leading-[1.8] text-[15px] font-sans font-light">
                <p>
                  {settings?.storyParagraph1 || "Located in the heart of Jubilee Hills, Hyderabad, Bonita Ropita has been sourcing the finest pure silk sarees for generations. Every thread represents the heartbeat of an Indian artisan, carefully woven over weeks of dedicated craftsmanship."}
                </p>
                <p>
                  {settings?.storyParagraph2 || "We collaborate directly with master weavers from Kanchipuram, Banaras, and handloom pockets of Telangana. By preserving these ancient techniques, we deliver luxury sarees that are true heirlooms."}
                </p>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 gap-8 mt-12 pt-12 border-t border-neutral-charcoal/5">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent">
                    <ShieldCheck size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-sans uppercase tracking-[0.15em] font-semibold text-neutral-charcoal mb-2">Pure Silk Certified</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">100% genuine zari and pure handloom fabrics, carrying the official silk mark of authenticity.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent">
                    <HeartHandshake size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-sans uppercase tracking-[0.15em] font-semibold text-neutral-charcoal mb-2">Bespoke Curation</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">Private viewing experiences and live drapery previews curated by our styling experts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collage Image Panel (Right) */}
          <div className="lg:col-span-7 lg:order-2 order-1 relative h-[600px] lg:h-[800px] w-full">
            <div className="absolute top-0 right-0 w-[80%] h-[90%] z-10 animate-fade-in-up shadow-premium" style={{ animationDelay: '0.4s' }}>
              <div className="image-zoom-container w-full h-full">
                <img 
                  src="/images/about_saree_main.png" 
                  alt="Draped Silk Saree Close Up" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-white/20 pointer-events-none"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-[55%] aspect-[3/4] z-20 shadow-premium bg-neutral-cream p-3 animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="image-zoom-container w-full h-full">
                <img 
                  src="/images/about_saree_detail.png" 
                  alt="Fine Embroidered Details" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Design Element */}
            <div className="absolute top-1/2 left-[10%] w-32 h-[1px] bg-accent z-30"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
