"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextReveal, ScrollReveal, LineReveal } from "@/components/ui/ScrollAnimations";

const WORDS = ["IDEAS", "STRATEGY", "CREATIVE", "CAMPAIGNS", "RESULTS"];

export default function GrowCTA() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "#060d06" }}>

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />

      {/* Big green spiral / glow on right */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
        {/* Outer rings */}
        {[400, 320, 240, 160, 90].map((size, i) => (
          <div key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(74,222,128,${0.04 + i * 0.03})`,
              animation: `spin ${14 + i * 4}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
            }}
          />
        ))}
        {/* Core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-[40px]"
          style={{ background: "rgba(74,222,128,0.3)" }} />
      </div>

      {/* Floating word list — right side */}
      <div className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 hidden lg:flex">
        {WORDS.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-right"
          >
            <span className={`text-xs font-bold uppercase tracking-[0.25em] ${i === WORDS.length - 1 ? "text-[#4ade80]/60 underline underline-offset-4" : "text-white/20"}`}>
              {word}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-2xl">
          <ScrollReveal variant="fade-left" delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/60 mb-5">
              Let&apos;s Build Together
            </p>
          </ScrollReveal>

          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
            <TextReveal text="Ready to grow" delay={0.05} />
            {" "}
            <TextReveal text="smarter?" delay={0.2} className="text-gradient-animated text-glow" />
          </h2>

          <LineReveal delay={0.5} className="mb-6 max-w-[80px]" />

          <ScrollReveal variant="fade-up" delay={0.35}>
            <p className="text-white/45 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Let&apos;s turn your ideas into real business results. No templates — just a clear plan built for your brand.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="zoom" delay={0.5}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              className="btn-glow inline-flex items-center gap-2.5 px-8 py-4
                         bg-[#4ade80] text-[#060d06] font-bold uppercase tracking-widest
                         text-sm rounded-full hover:bg-[#22c55e] transition-colors duration-300 hover-trigger"
            >
              Start the Conversation
              <ArrowRight size={16} />
            </motion.a>
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
