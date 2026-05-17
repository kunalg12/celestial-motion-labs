import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import Marquee from '@/components/Marquee';
import ProjectsSection from '@/components/ProjectsSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ContactModal from '@/components/ContactModal';
import ScrollProgress from '@/components/ScrollProgress';

const Index = () => {
  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen text-foreground overflow-x-hidden"
    >
      <CosmicBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <HeroSection mouseX={mouseX} mouseY={mouseY} onOpenContact={() => setIsContactOpen(true)} />
      <ServicesSection />
      <Marquee />
      <ProjectsSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection onOpenContact={() => setIsContactOpen(true)} />
      <Footer />

      <ScrollToTop />
      <ScrollProgress />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </motion.div>
  );
};

export default Index;
