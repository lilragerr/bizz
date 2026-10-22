"use client";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerChild, TextReveal, LineReveal } from "@/components/ui/ScrollAnimations";

const testimonials = [
  {
    quote: "BizzBuild didn't just give us advice; they re-engineered our entire go-to-market engine. We hit 300% growth in 6 months.",
    author: "David Chen",
    company: "Founder, ScaleTech",
    initial: "D",
  },
  {
    quote: "The strategic clarity and operational systems they put in place transformed us from a chaotic startup to a category leader.",
    author: "Samantha Wright",
    company: "CEO, Nexa Logistics",
    initial: "S",
  },
  {
    quote: "Unparalleled expertise. Their team operates at an entirely different level of precision and strategic foresight.",
    author: "James Holden",
    company: "VP Sales, Orbital",
    initial: "J",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-32 bg-[#060d06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }} />

      {/* Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-6">
          <ScrollReveal variant="fade-down">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/60 mb-4">
              Client Stories
            </p>
          </ScrollReveal>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05]">
            <TextReveal text="Founder" delay={0.05} />
            {" "}
            <TextReveal text="Validation." delay={0.15} className="text-gradient-animated text-glow" />
          </h2>
        </div>

        <LineReveal className="mb-16 max-w-[100px] mx-auto" delay={0.4} />

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.14}>
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(74,222,128,0.05) 0%, rgba(6,13,6,0.65) 100%)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(74,222,128,0.10)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              }}
            >
              {/* Corner glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100
                             transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)", filter: "blur(16px)" }} />

              {/* Shimmer top */}
              <div className="absolute top-0 left-6 right-6 h-px opacity-20 group-hover:opacity-80 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.5),transparent)" }} />

              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none text-[#4ade80]/20 mb-4 group-hover:text-[#4ade80]/40 transition-colors duration-400 select-none">
                &ldquo;
              </div>

              <p className="text-white/60 text-base leading-relaxed italic font-light mb-8">
                {item.quote}
              </p>

              <div className="flex items-center gap-3 border-t border-[#4ade80]/10 pt-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#060d06]"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)" }}>
                  {item.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.author}</h4>
                  <p className="text-[#4ade80]/50 text-xs font-medium">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
