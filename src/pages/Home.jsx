import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function Home() {
  const { settings } = useSettings();
  
  const collections = [
    {
      id: 'bridal-heritage',
      name: 'Bridal Heritage',
      desc: 'Heavy gold border silk sarees handcrafted for brides.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'
    },
    {
      id: 'festive-elegance',
      name: 'Festive Elegance',
      desc: 'Breathable tissue, organza, and fine handloom georgette.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'
    }
  ];

  const handleWhatsAppChat = () => {
    const phone = settings.whatsappNumber || "8297672855";
    const msg = "Hi Bonita Ropita, I am visiting your store website and would like to inquire about your collections.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative min-h-[80vh] flex items-center bg-neutral-charcoal text-white overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroImageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600"} 
            alt="Premium Saree Silk Weave Texture" 
            className="w-full h-full object-cover opacity-40 scale-105 transform transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal via-neutral-charcoal/80 to-neutral-charcoal/20"></div>
          
          {/* Subtle decorative motif pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* Hero Content text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="text-xs uppercase tracking-widest text-accent font-bold mb-4 block flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent"></span>
              {settings.heroSubtitle || "Handloomed Royalty"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-neutral-cream leading-[1.15] mb-6 drop-shadow-lg">
              {settings.heroTitle || "Embody the Grace of Fine Silk Heritage"}
            </h1>
            <p className="text-base sm:text-lg text-neutral-cream/80 mb-10 leading-relaxed font-sans max-w-xl">
              {settings.heroDescription || "Welcome to Bonita Ropita. Explore our hand-woven bridal and festive saree creations directly from master weavers across India, curated exclusively in Hyderabad."}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/catalogue"
                className="bg-accent hover:bg-accent-hover text-neutral-charcoal font-semibold uppercase tracking-wider text-xs py-4 px-8 text-center transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 rounded-sm"
              >
                Browse Catalogue
              </Link>
              <button 
                onClick={handleWhatsAppChat}
                className="bg-transparent border border-neutral-cream/50 hover:border-neutral-cream hover:bg-neutral-cream/10 text-neutral-cream font-semibold uppercase tracking-wider text-xs py-4 px-8 text-center transition-all duration-300 flex items-center justify-center gap-2 rounded-sm backdrop-blur-sm"
              >
                <MessageSquare size={16} /> Inquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story "About" Section */}
      <section className="py-24 bg-[#FCFBF7] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                <span className="w-6 h-[1px] bg-accent"></span>
                {settings.storySubtitle || "Our Heritage"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary mt-4 mb-6 leading-tight">
                {settings.storyTitle || "The Story of Bonita Ropita"}
              </h2>
              <div className="space-y-4 text-neutral-muted leading-relaxed text-sm sm:text-base font-sans">
                <p>
                  {settings.storyParagraph1 || "Located in the heart of Jubilee Hills, Hyderabad, Bonita Ropita has been sourcing the finest pure silk sarees for generations. Every thread represents the heartbeat of an Indian artisan."}
                </p>
                <p>
                  {settings.storyParagraph2 || "We collaborate directly with master weavers from Kanchipuram, Banaras, and handloom pockets of Telangana. By avoiding intermediary markups, we deliver luxury sarees directly with absolute quality assurance."}
                </p>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-light text-primary rounded">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-charcoal">Pure Silk Certified</h4>
                    <p className="text-xs text-neutral-muted mt-1">100% genuine zari and pure handloom fabrics with silk mark.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-light text-primary rounded">
                    <HeartHandshake size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-charcoal">Bespoke Inquiries</h4>
                    <p className="text-xs text-neutral-muted mt-1">Direct support and live drapery previews over WhatsApp video.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collage Image Panel */}
            <div className="lg:col-span-6 relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="aspect-[4/5] rounded-md overflow-hidden shadow-premium-hover relative">
                <div className="absolute inset-0 border border-black/5 z-10 rounded-md pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800" 
                  alt="Draped Silk Saree Close Up" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-[55%] aspect-square rounded-md overflow-hidden border-8 border-[#FCFBF7] shadow-2xl hidden sm:block animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500" 
                  alt="Fine Embroidered Organza Details" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Category cards */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 animate-fade-in-up">
            <span className="text-xs uppercase tracking-widest text-accent font-bold flex items-center justify-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-accent"></span> Curated Closets <span className="w-4 h-[1px] bg-accent"></span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-primary mt-1 mb-4">Featured Collections</h2>
            <p className="text-sm text-neutral-muted leading-relaxed">Explore categories of fine hand-woven sarees styled for royal events. Each piece tells a timeless story.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {collections.map(col => (
              <div 
                key={col.id}
                className="group relative h-96 rounded overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                {/* Background Image */}
                <img 
                  src={col.image} 
                  alt={col.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-charcoal via-neutral-charcoal/40 to-transparent"></div>
                
                {/* Card copy text details */}
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-serif text-[#FAF6E6] mb-3 drop-shadow-md">{col.name}</h3>
                  <p className="text-sm text-neutral-cream/90 mb-6 line-clamp-2 max-w-sm drop-shadow">{col.desc}</p>
                  <Link 
                    to="/catalogue"
                    className="inline-flex items-center gap-2 bg-[#FAF6E6]/90 backdrop-blur text-neutral-charcoal hover:bg-accent hover:text-[#FAF6E6] text-xs font-bold uppercase tracking-wider py-3.5 px-7 rounded-sm shadow-lg transition-all duration-300"
                  >
                    View Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
