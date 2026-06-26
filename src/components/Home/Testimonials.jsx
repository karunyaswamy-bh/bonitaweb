import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "The Kanchipuram silk I purchased for my wedding was beyond my wildest dreams. The craftsmanship and heavy zari work left everyone speechless.",
      author: "Ananya R.",
      location: "Hyderabad"
    },
    {
      text: "Bonita Ropita offers an unparalleled curation. Their Banarasi tissues are authentic, feather-light, and carry the true essence of Indian heritage.",
      author: "Priya S.",
      location: "Mumbai"
    },
    {
      text: "Shopping here is a bespoke experience. The team guided me through video calls to select the perfect organza saree for my reception.",
      author: "Meera V.",
      location: "Bangalore"
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-neutral-cream relative">
      <div className="absolute inset-0 bg-primary/5 opacity-50 mix-blend-multiply"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-6 block">
            Voices of Elegance
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary">
            Client Testimonials
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((test, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center animate-fade-in-up group"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="text-4xl text-accent/30 font-serif mb-6 group-hover:text-accent transition-colors duration-500">"</div>
              <p className="text-[15px] text-neutral-charcoal/80 italic font-serif leading-[2] mb-8 flex-grow">
                {test.text}
              </p>
              <div className="w-12 h-[1px] bg-accent/30 mb-6"></div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-1">
                {test.author}
              </h4>
              <span className="text-[10px] uppercase tracking-[0.1em] text-neutral-muted">
                {test.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
