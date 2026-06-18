import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustBlock from "@/components/sections/TrustBlock";
import PabloSection from "@/components/sections/PabloSection";
import FeaturedTrips from "@/components/sections/FeaturedTrips";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";

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
