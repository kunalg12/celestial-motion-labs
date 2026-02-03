import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ContactModal from '@/components/ContactModal';

const Index = () => {
  // Mouse parallax motion values lifted to top level for continuity
  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Star Field Background - Lifted for continuity */}
      <StarField mouseX={mouseX} mouseY={mouseY} />
      
      {/* Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      {/* Hero Section - Accepts motion values for synchronized parallax */}
      <HeroSection mouseX={mouseX} mouseY={mouseY} />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection onOpenContact={() => setIsContactOpen(true)} />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Navigation */}
      <ScrollToTop />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default Index;
