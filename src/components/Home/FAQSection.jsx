import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are all your sarees pure silk handloom?",
      answer: "Yes, every saree in our signature collection is 100% pure silk and completely handwoven by master artisans. They come with the official Silk Mark certification to guarantee authenticity."
    },
    {
      question: "Do you offer international shipping?",
      answer: "We curate a bespoke luxury experience globally. International shipping is handled via premium courier services (DHL/FedEx) with full insurance. Delivery typically takes 5-7 business days from dispatch."
    },
    {
      question: "Can I book a virtual viewing appointment?",
      answer: "Absolutely. We offer personalized WhatsApp video appointments where our styling experts will drape the sarees and show you the intricate details, zari quality, and true colors under natural lighting."
    },
    {
      question: "How should I care for my heritage silk saree?",
      answer: "We recommend dry cleaning only for all our pure silk and zari sarees. Store them wrapped in pure cotton or muslin cloth in a cool, dry place. Avoid direct perfumes on the fabric and refold them every few months."
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-neutral-charcoal text-neutral-cream relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] border-[1px] border-accent/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] border-[1px] border-accent/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-6 block">
            Client Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-neutral-cream">
            Frequently Asked
          </h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-neutral-cream/20 pb-6 transition-all duration-500 ${openIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex justify-between items-center text-left py-4 group focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-serif text-neutral-cream group-hover:text-accent transition-colors duration-300 pr-8">
                  {faq.question}
                </h3>
                <span className="text-accent shrink-0">
                  {openIndex === index ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[14px] text-neutral-cream/70 font-light leading-relaxed pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
