import React, { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

// New Luxury Components
import HeroSection from '../components/Home/HeroSection';
import StorySection from '../components/Home/StorySection';
import CollectionsSection from '../components/Home/CollectionsSection';
import BridalShowcase from '../components/Home/BridalShowcase';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import MasterWeavers from '../components/Home/MasterWeavers';

import Testimonials from '../components/Home/Testimonials';
import FAQSection from '../components/Home/FAQSection';

export default function Home() {
  const { settings } = useSettings();

  // Scroll to top on mount for premium feel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-neutral-cream selection:bg-accent selection:text-neutral-charcoal">
      <HeroSection settings={settings} />
      <StorySection settings={settings} />
      <WhyChooseUs />
      <CollectionsSection />

      <BridalShowcase />
      <MasterWeavers />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
