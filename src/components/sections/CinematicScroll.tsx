"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Only animate opacity + scale (GPU-composited, no CSS filter repaint)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.28], [0, 1, 0]);
  const text1Scale   = useTransform(scrollYProgress, [0, 0.28], [0.88, 1.1]);

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.58], [0, 1, 0]);
  const text2Scale   = useTransform(scrollYProgress, [0.3, 0.58], [0.88, 1.1]);

  const text3Opacity = useTransform(scrollYProgress, [0.62, 0.78, 1], [0, 1, 1]);
  const text3Scale   = useTransform(scrollYProgress, [0.62, 1], [0.88, 1]);

  const backgroundY  = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const gridOpacity  = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0.4]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#000000]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Parallax background grid */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{ y: backgroundY }}
        >
          <div className="w-[200vw] h-[200vh] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(60deg)] origin-bottom" />
        </motion.div>

        <motion.div 
          className="absolute inset-0 z-0 mix-blend-overlay"
          style={{ 
            opacity: gridOpacity,
            background: "linear-gradient(to top, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(circle, transparent 30%, #000000 70%)", opacity: 0.9 }}
        />

        {/* Text layers — opacity + scale only (no filter, cheap to composite) */}
        <div className="relative z-10 w-full px-6 flex items-center justify-center text-center">
          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter w-full"
            style={{ opacity: text1Opacity, scale: text1Scale }}
          >
            Every business has <span className="text-gradient">potential.</span>
          </motion.h2>

          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter w-full"
            style={{ opacity: text2Opacity, scale: text2Scale }}
          >
            Few have <span className="text-gradient">systems.</span>
          </motion.h2>

          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter w-full"
            style={{ opacity: text3Opacity, scale: text3Scale }}
          >
            We build <span className="text-gradient-animated text-glow">both.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
