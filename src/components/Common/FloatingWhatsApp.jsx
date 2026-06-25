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
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center animate-bounce hover:animate-none"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
    </button>
  );
}
