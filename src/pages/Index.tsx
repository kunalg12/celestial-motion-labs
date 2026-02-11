import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ContactModal from '@/components/ContactModal';
import CursorTrail from '@/components/CursorTrail';
import ScrollProgress from '@/components/ScrollProgress';
import StatsSection from '@/components/StatsSection';
import FloatingElements from '@/components/FloatingElements';
import LoadingScreen from '@/components/LoadingScreen';

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
      {/* Loading Screen Overlay */}
      <LoadingScreen />

      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Cursor Trail Effect */}
      <CursorTrail />
      
      {/* Star Field Background - Lifted for continuity */}
      <StarField mouseX={mouseX} mouseY={mouseY} />
      
      {/* Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      {/* Hero Section - Accepts motion values for synchronized parallax */}
      <HeroSection mouseX={mouseX} mouseY={mouseY} onOpenContact={() => setIsContactOpen(true)} />
      
      {/* Services Section */}
      <ServicesSection />

      {/* Process Section */}
      <ProcessSection />
      
      {/* Stats Section */}
      <StatsSection />
      
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
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default Index;
