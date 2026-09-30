import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";

import Services from "@/components/sections/Services";
import CinematicScroll from "@/components/sections/CinematicScroll";
import Stats from "@/components/sections/Stats";
import CaseStudies from "@/components/sections/CaseStudies";

import Testimonials from "@/components/sections/Testimonials";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      
      <main className="flex min-h-screen flex-col items-center justify-between w-full">
        <Hero />
        <TrustStrip />
        <About />

        <Services />
        <CinematicScroll />
        <Stats />
        <CaseStudies />

        <Testimonials />
        <BehindTheScenes />
        <Contact />
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}
