import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function Contact() {
  const { settings } = useSettings();

  const handleChat = () => {
    const phone = settings.whatsappNumber || "8297672855";
    window.open(`https://wa.me/${phone}?text=Hello%20Bonita%20Ropita`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-accent font-bold">Visit Our Store</span>
        <h1 className="text-4xl font-serif text-primary mt-1 mb-4">We Would Love To Welcome You</h1>
        <p className="text-neutral-muted">Experience the drape and feel of hand-woven royalty at our Hyderabad boutique.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
        {/* Contact Info details */}
        <div className="flex flex-col justify-between bg-white p-8 md:p-12 shadow-premium rounded border-t-4 border-primary">
          <div>
            <h2 className="text-2xl font-serif text-primary mb-8">Boutique Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold font-sans text-neutral-charcoal text-sm">Address</h4>
                  <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
                    {settings.address || "Plot 45, Jubilee Hills, Road No. 10, Hyderabad, Telangana, 500033"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-accent mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold font-sans text-neutral-charcoal text-sm">Phone & Inquiries</h4>
                  <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
                    {settings.phone || "+91 82976 72855"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-accent mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold font-sans text-neutral-charcoal text-sm">Email</h4>
                  <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
                    {settings.email || "inquire@bonitaropita.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-accent mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold font-sans text-neutral-charcoal text-sm">Store Hours</h4>
                  <p className="text-neutral-muted text-sm mt-1 leading-relaxed">Mon – Sat: 11:00 AM – 8:00 PM <br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleChat}
            className="mt-8 flex items-center justify-center gap-3 w-full bg-primary text-white py-4 uppercase tracking-wider text-xs font-semibold hover:bg-primary-hover transition-colors duration-300"
          >
            <MessageSquare size={16} />
            Chat With Personal Stylist
          </button>
        </div>

        {/* Google Maps Embed iframe */}
        <div className="h-[400px] lg:h-auto rounded overflow-hidden shadow-premium min-h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272227181045!2d78.4069353153574!3d17.432098988052157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8f58d5555%3A0xe13554ffdfcb6ef9!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1655812903829!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Bonita Ropita Store Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
