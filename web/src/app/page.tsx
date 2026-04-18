import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBlock from "@/components/TrustBlock";
import PabloSection from "@/components/PabloSection";
import FeaturedTrips from "@/components/FeaturedTrips";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBlock />
        <PabloSection />
        <FeaturedTrips />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
