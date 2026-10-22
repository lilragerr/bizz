import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import IntroVideo from "@/components/layout/IntroVideo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import ClientsCarousel from "@/components/sections/ClientsCarousel";
import Services from "@/components/sections/Services";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import About from "@/components/sections/About";
import CinematicScroll from "@/components/sections/CinematicScroll";
import Stats from "@/components/sections/Stats";
import BusinessGame from "@/components/sections/BusinessGame";
import FoundersVision from "@/components/sections/FoundersVision";
import GrowCTA from "@/components/sections/GrowCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <IntroVideo />
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-between w-full"
            style={{ background: "#060d06" }}>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Client logos carousel */}
        <ClientsCarousel />

        {/* 3. What We Do — service cards */}
        <Services />

        {/* 4. Behind the scenes */}
        <BehindTheScenes />

        {/* 5. Our Approach — 4-step process */}
        <About />

        {/* 6. Cinematic scroll / showreel */}
        <CinematicScroll />

        {/* 7. Stats / Why BizzBuild */}
        <Stats />

        {/* 8. Interactive Business Game */}
        <BusinessGame />

        {/* 9. Founder's Vision */}
        <FoundersVision />

        {/* 10. Ready to grow smarter — CTA */}
        <GrowCTA />

        {/* 11. Contact */}
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
