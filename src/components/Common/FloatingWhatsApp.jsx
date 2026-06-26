import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleGeneralInquiry = () => {
    const phone = "8297672855";
    const msg = "Hi Bonita Ropita, I am visiting your website catalog and would like to ask a question.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <button
      onClick={handleGeneralInquiry}
      className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-14 h-14 bg-neutral-charcoal text-accent border border-accent/30 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:scale-105 active:scale-95"
      aria-label="Contact via WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      <MessageCircle size={26} strokeWidth={1.5} className="group-hover:text-accent-light transition-colors duration-500" />
      
      {/* Pulse effect rings */}
      <span className="absolute -inset-1 rounded-full border border-accent/20 animate-ping opacity-75 duration-[3000ms]"></span>
    </button>
  );
}
