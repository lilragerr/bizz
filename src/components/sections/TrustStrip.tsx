"use client";
import { motion } from "framer-motion";

export default function TrustStrip() {
  const items = [
    "ScaleTech Co",
    "Nexa Logistics",
    "Apex Group",
    "Orbital Solutions",
    "Vanguard Brand Co",
    "Vertex Operations",
    "Core Strategy Partners",
  ];

  return (
    <section className="w-full py-16 bg-[#000000] overflow-hidden relative flex flex-col items-center justify-center gap-6">
      {/* Gradient top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }} />
      
      {/* Subtle glass background */}
      <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-sm" />

      {/* Section Title */}
      <div className="relative z-10 text-center">
        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
          Businesses &amp; Collaborations
        </h4>
      </div>

      <div className="w-full relative flex items-center overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex gap-16 shrink-0 items-center animate-marquee pr-16">
            {items.map((item, index) => (
              <motion.div
                key={`1-${index}`}
                className="text-neutral-700 font-bold text-xl md:text-2xl uppercase tracking-widest hover-trigger transition-all duration-500"
                whileHover={{
                  color: "#ffffff",
                  scale: 1.05,
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div aria-hidden className="flex gap-16 shrink-0 items-center animate-marquee pr-16">
            {items.map((item, index) => (
              <motion.div
                key={`2-${index}`}
                className="text-neutral-700 font-bold text-xl md:text-2xl uppercase tracking-widest hover-trigger transition-all duration-500"
                whileHover={{
                  color: "#ffffff",
                  scale: 1.05,
                  textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
