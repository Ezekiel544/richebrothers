import Header from '@/components/header';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import AboutSection from '@/components/sections/about-section';
import ReviewsSection from '@/components/sections/reviews-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import CTASection from '@/components/sections/cta-section';
import FloatingWhatsApp from '@/components/floating-whatsapp';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      
      {/* Add padding to prevent content hiding under fixed header */}
      <div >
        <HeroSection />
      </div>
         <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <CTASection />
      <ReviewsSection />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}
