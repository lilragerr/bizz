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
    <section className="w-full py-12 overflow-hidden relative flex flex-col items-center justify-center gap-5"
      style={{ background: "#060d06" }}>

      {/* Top / bottom hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />

      {/* Label */}
      <div className="relative z-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#4ade80]/40">
          Trusted by Amazing Brands
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="w-full relative flex items-center overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #060d06 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #060d06 0%, transparent 100%)" }} />

        <div className="flex whitespace-nowrap overflow-hidden">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} aria-hidden={ri === 1}
              className="flex gap-16 shrink-0 items-center animate-marquee pr-16">
              {items.map((item, idx) => (
                <motion.div
                  key={`${ri}-${idx}`}
                  className="text-white/20 font-bold text-xl md:text-2xl uppercase tracking-widest transition-all duration-500"
                  whileHover={{ color: "#4ade80", scale: 1.05, textShadow: "0 0 16px rgba(74,222,128,0.5)" }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
