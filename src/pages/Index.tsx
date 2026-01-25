import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Star Field Background */}
      <StarField />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Cosmic Divider */}
      <div className="container mx-auto px-6">
        <div className="cosmic-divider" />
      </div>
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Cosmic Divider */}
      <div className="container mx-auto px-6">
        <div className="cosmic-divider" />
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
