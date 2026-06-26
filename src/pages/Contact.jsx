import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function Contact() {
  const { settings } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChat = () => {
    const phone = settings.whatsappNumber || "8297672855";
    window.open(`https://wa.me/${phone}?text=Hello%20Bonita%20Ropita`, '_blank');
  };

  return (
    <div className="bg-neutral-cream min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-6 block">
            Visit Our Store
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-[1.1] mb-6">
            We Would Love To <br />
            <span className="italic font-light text-neutral-muted">Welcome You</span>
          </h1>
          <p className="text-[15px] text-neutral-muted leading-[1.8] font-light max-w-md mx-auto">
            Experience the drape and feel of hand-woven royalty at our exclusive Hyderabad boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch max-w-6xl mx-auto">
          
          {/* Contact Info details */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-panel p-10 md:p-14 shadow-premium relative">
              {/* Decorative Line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
              
              <h2 className="text-3xl font-serif text-primary mb-10 text-center">Boutique Details</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-neutral-cream transition-all duration-500">
                    <MapPin size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-charcoal mb-2">Address</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">
                      {settings.address || "Plot 45, Jubilee Hills, Road No. 10\nHyderabad, Telangana, 500033"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-neutral-cream transition-all duration-500">
                    <Phone size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-charcoal mb-2">Phone & Inquiries</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">
                      {settings.phone || "+91 82976 72855"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-neutral-cream transition-all duration-500">
                    <Mail size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-charcoal mb-2">Email</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">
                      {settings.email || "inquire@bonitaropita.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-neutral-cream transition-all duration-500">
                    <Clock size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-charcoal mb-2">Store Hours</h4>
                    <p className="text-[14px] text-neutral-muted font-light leading-relaxed">Mon – Sat: 11:00 AM – 8:00 PM <br />Sunday: By Appointment</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChat}
                className="mt-12 flex items-center justify-center gap-3 w-full bg-primary text-neutral-cream py-5 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-primary-hover transition-colors duration-500 group"
              >
                <MessageSquare size={16} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                Chat With Personal Stylist
              </button>
            </div>
          </div>

          {/* Google Maps Embed iframe */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-auto min-h-[500px] animate-fade-in-up shadow-premium" style={{ animationDelay: '0.4s' }}>
            {/* Decorative Frame */}
            <div className="absolute -inset-4 border border-accent/20 pointer-events-none hidden md:block"></div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272227181045!2d78.4069353153574!3d17.432098988052157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8f58d5555%3A0xe13554ffdfcb6ef9!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1655812903829!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bonita Ropita Store Location Map"
              className="relative z-10"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
