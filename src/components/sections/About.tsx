"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Pencil, BarChart3 } from "lucide-react";
import { ScrollReveal, TextReveal, LineReveal } from "@/components/ui/ScrollAnimations";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Understand",
    desc: "We learn your goals, audience and market.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Plan",
    desc: "We build a strategy that fits your brand.",
  },
  {
    num: "03",
    icon: Pencil,
    title: "Create",
    desc: "We design, write and produce.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Grow",
    desc: "We track, optimise and scale.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "#060d06" }}>

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />

      {/* Green ambient */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.06] pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Left: label + headline ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-[38%] shrink-0 lg:sticky lg:top-32"
          >
            <ScrollReveal variant="fade-left" delay={0}>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/60 mb-5">
                Our Approach
              </p>
            </ScrollReveal>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
              <TextReveal text="From ideas to" delay={0.05} />
              {" "}
              <TextReveal text="impact." delay={0.2} className="text-gradient-animated text-glow" />
            </h2>
            <LineReveal delay={0.5} className="mb-6 max-w-[80px]" />
            <ScrollReveal variant="fade-up" delay={0.35}>
              <p className="text-white/45 text-base font-light leading-relaxed max-w-sm">
                A simple, focused process to create real results — no fluff, no wasted steps.
              </p>
            </ScrollReveal>
          </motion.div>

          {/* ── Right: 4-step process ── */}
          <div className="flex-1">
            {/* Desktop: horizontal row with connecting line */}
            <div className="hidden md:block relative">
              {/* Connecting dotted line */}
              <div className="absolute top-10 left-10 right-10 h-[1px] border-t border-dashed border-[#4ade80]/20" />

              <div className="grid grid-cols-4 gap-6">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.1 }}
                      className="flex flex-col items-start"
                    >
                      {/* Step number */}
                      <p className="text-[#4ade80]/40 text-[11px] font-bold tracking-widest mb-3">{step.num}</p>

                      {/* Icon circle */}
                      <div className="w-[46px] h-[46px] rounded-full border-2 border-[#4ade80]/30 flex items-center justify-center mb-6 relative z-10"
                        style={{ background: "#0f2a0f", boxShadow: "0 0 20px rgba(74,222,128,0.12)" }}>
                        <Icon size={18} className="text-[#4ade80]" />
                      </div>

                      {/* Text */}
                      <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical list */}
            <div className="flex md:hidden flex-col gap-8">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex gap-5 items-start"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full border-2 border-[#4ade80]/30 flex items-center justify-center"
                      style={{ background: "#0f2a0f" }}>
                      <Icon size={18} className="text-[#4ade80]" />
                    </div>
                    <div>
                      <p className="text-[#4ade80]/50 text-[10px] font-bold tracking-widest mb-1">{step.num}</p>
                      <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
