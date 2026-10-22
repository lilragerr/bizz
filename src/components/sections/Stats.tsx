"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, GitBranch, Play, HeartHandshake, ArrowUpRight } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChild,
  TextReveal,
  LineReveal,
  AnimatedCounter,
} from "@/components/ui/ScrollAnimations";

// ── STATS COUNTERS DATA ──
const STATS = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 3, suffix: "×", label: "Avg. Growth" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 5, suffix: "+", label: "Years of Impact" },
];

// ── Card 1: Strategic Design Animated Graphic ──
function StrategicDesignGraphic() {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden flex items-center justify-center bg-[#051107]/80 border border-[#4ade80]/15 group-hover:border-[#4ade80]/40 transition-colors duration-500">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Glow Center */}
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-28 h-28 rounded-full bg-[#4ade80]/20 blur-xl"
      />

      <svg className="w-32 h-32 relative z-10" viewBox="0 0 140 140">
        {/* Outer Rotating Blueprint Ring */}
        <motion.circle
          cx="70"
          cy="70"
          r="56"
          fill="none"
          stroke="rgba(74, 222, 128, 0.3)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 70px" }}
        />

        {/* Counter Rotating Ring */}
        <motion.circle
          cx="70"
          cy="70"
          r="42"
          fill="none"
          stroke="rgba(74, 222, 128, 0.4)"
          strokeWidth="1"
          strokeDasharray="12 4 4 4"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 70px" }}
        />

        {/* Dynamic Blueprint Guides */}
        <line
          x1="20" y1="70" x2="120" y2="70"
          stroke="rgba(74, 222, 128, 0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <line
          x1="70" y1="20" x2="70" y2="120"
          stroke="rgba(74, 222, 128, 0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Morphing Diamond Center */}
        <motion.rect
          x="53"
          y="53"
          width="34"
          height="34"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          rx="4"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "70px 70px" }}
        />

        {/* Core Icon Pulse */}
        <motion.circle
          cx="70"
          cy="70"
          r="6"
          fill="#4ade80"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "70px 70px" }}
        />
      </svg>
    </div>
  );
}

// ── Card 2: System Integration Animated Graphic ──
function SystemIntegrationGraphic() {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden flex items-center justify-center bg-[#051107]/80 border border-[#4ade80]/15 group-hover:border-[#4ade80]/40 transition-colors duration-500">
      {/* Grid line backdrop */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] [background-size:20px_20px]" />

      <svg className="w-52 h-32 relative z-10" viewBox="0 0 220 140">
        {/* Connection Paths */}
        <path d="M 40 70 L 110 70 L 180 70" stroke="rgba(74, 222, 128, 0.25)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 110 30 L 110 110" stroke="rgba(74, 222, 128, 0.25)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Data Energy Pulses */}
        <motion.circle
          r="4"
          fill="#86efac"
          animate={{
            cx: [40, 110, 180],
            cy: [70, 70, 70],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          r="4"
          fill="#4ade80"
          animate={{
            cx: [180, 110, 40],
            cy: [70, 70, 70],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <motion.circle
          r="4"
          fill="#22c55e"
          animate={{
            cx: [110, 110],
            cy: [30, 110],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {/* Outer Nodes */}
        <circle cx="40" cy="70" r="9" fill="#091d0c" stroke="#4ade80" strokeWidth="2" />
        <circle cx="180" cy="70" r="9" fill="#091d0c" stroke="#4ade80" strokeWidth="2" />
        <circle cx="110" cy="30" r="9" fill="#091d0c" stroke="#4ade80" strokeWidth="2" />
        <circle cx="110" cy="110" r="9" fill="#091d0c" stroke="#4ade80" strokeWidth="2" />

        {/* Central Core Pulse */}
        <motion.circle
          cx="110"
          cy="70"
          r="20"
          fill="rgba(74, 222, 128, 0.15)"
          stroke="#4ade80"
          strokeWidth="2"
          animate={{
            scale: [1, 1.25, 1],
            strokeWidth: [2, 3, 2],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "110px 70px" }}
        />
        <circle cx="110" cy="70" r="7" fill="#4ade80" />
      </svg>
    </div>
  );
}

// ── Card 3: Focused Execution Animated Graphic ──
function FocusedExecutionGraphic() {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden flex items-center justify-center bg-[#051107]/80 border border-[#4ade80]/15 group-hover:border-[#4ade80]/40 transition-colors duration-500">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,222,128,0.12)_0%,transparent_70%)]" />

      {/* Laser Scan Line Sweep */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4ade80]/60 to-transparent shadow-[0_0_15px_#4ade80]"
      />

      <svg className="w-32 h-32 relative z-10" viewBox="0 0 140 140">
        {/* Outer Target Scope Ring */}
        <circle cx="70" cy="70" r="50" fill="none" stroke="rgba(74, 222, 128, 0.25)" strokeWidth="1.5" />

        {/* Sweeping Radar Beam */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "70px 70px" }}
        >
          <line x1="70" y1="70" x2="116" y2="70" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          <path d="M 70 70 L 116 70 A 46 46 0 0 0 70 24 Z" fill="rgba(74, 222, 128, 0.15)" />
        </motion.g>

        {/* Crosshair lines */}
        <line x1="12" y1="70" x2="45" y2="70" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="95" y1="70" x2="128" y2="70" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="70" y1="12" x2="70" y2="45" stroke="#4ade80" strokeWidth="1.5" />
        <line x1="70" y1="95" x2="70" y2="128" stroke="#4ade80" strokeWidth="1.5" />

        {/* Target Reticle Lock */}
        <motion.rect
          x="57"
          y="57"
          width="26"
          height="26"
          fill="none"
          stroke="#86efac"
          strokeWidth="2"
          animate={{
            scale: [1, 0.85, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "70px 70px" }}
        />

        <circle cx="70" cy="70" r="3" fill="#4ade80" />
      </svg>

      {/* Telemetry Equalizer Bars */}
      <div className="absolute bottom-3 right-4 flex items-end gap-1 h-5">
        {[0.4, 0.9, 0.6, 1, 0.5].map((_, idx) => (
          <motion.div
            key={idx}
            className="w-1 bg-[#4ade80] rounded-full"
            animate={{ height: ["20%", "100%", "30%"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: idx * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Card 4: Collaborative Partnership Animated Graphic ──
function CollaborativePartnershipGraphic() {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden flex items-center justify-center bg-[#051107]/80 border border-[#4ade80]/15 group-hover:border-[#4ade80]/40 transition-colors duration-500">
      {/* Background Soft Wave Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.1),transparent_75%)]" />

      <svg className="w-48 h-32 relative z-10" viewBox="0 0 200 140">
        {/* Left Ring */}
        <motion.ellipse
          cx="75"
          cy="70"
          rx="36"
          ry="36"
          fill="none"
          stroke="rgba(74, 222, 128, 0.35)"
          strokeWidth="2"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "75px 70px" }}
        />

        {/* Right Ring */}
        <motion.ellipse
          cx="125"
          cy="70"
          rx="36"
          ry="36"
          fill="none"
          stroke="rgba(74, 222, 128, 0.35)"
          strokeWidth="2"
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "125px 70px" }}
        />

        {/* Core Fusion Point */}
        <motion.circle
          cx="100"
          cy="70"
          r="15"
          fill="rgba(74, 222, 128, 0.2)"
          stroke="#4ade80"
          strokeWidth="2"
          animate={{
            scale: [1, 1.25, 1],
            fillOpacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 70px" }}
        />

        {/* Orbiting Sparks */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "75px 70px" }}
        >
          <circle cx="111" cy="70" r="4.5" fill="#86efac" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "125px 70px" }}
        >
          <circle cx="89" cy="70" r="4.5" fill="#4ade80" />
        </motion.g>
      </svg>
    </div>
  );
}

// ── PILLARS DATA ──
const PILLARS = [
  {
    num: "01",
    title: "Strategic Design",
    desc: "Deep analysis of operations and structure to design clear, executable plans.",
    icon: Eye,
    graphic: StrategicDesignGraphic,
  },
  {
    num: "02",
    title: "System Integration",
    desc: "Building simpler, more structured processes that keep teams aligned.",
    icon: GitBranch,
    graphic: SystemIntegrationGraphic,
  },
  {
    num: "03",
    title: "Focused Execution",
    desc: "Moving from theory to practice with hands-on implementation support.",
    icon: Play,
    graphic: FocusedExecutionGraphic,
  },
  {
    num: "04",
    title: "Collaborative Partnership",
    desc: "Working closely with founders to solve practical business challenges.",
    icon: HeartHandshake,
    graphic: CollaborativePartnershipGraphic,
  },
];

export default function Stats() {
  return (
    <section id="why-bizzbuild" className="relative w-full py-28 md:py-36 bg-[#060d06] overflow-hidden">
      {/* Green ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }}
      />

      {/* Hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* ── Header ── */}
        <div className="mb-6 text-center">
          <ScrollReveal variant="fade-down" delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/60 mb-4">
              Why BizzBuild
            </p>
          </ScrollReveal>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05]">
            <TextReveal text="Why" delay={0.05} />{" "}
            <TextReveal text="BizzBuild." delay={0.1} className="text-gradient-animated text-glow" />
          </h2>
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="mt-4 text-white/40 text-base font-light max-w-2xl mx-auto">
              We focus on structure, efficiency, and clarity — building trust through practical solutions and thoughtful execution.
            </p>
          </ScrollReveal>
        </div>

        <LineReveal className="mb-16 max-w-[120px] mx-auto" delay={0.5} />

        {/* ── Animated Counters ── */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" staggerDelay={0.12}>
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerChild}
              className="text-center p-6 rounded-2xl border border-[#4ade80]/10 group transition-all duration-300 hover:border-[#4ade80]/30"
              style={{ background: "rgba(74,222,128,0.03)" }}
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#4ade80] transition-colors duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.2} />
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* ── 4 Animated Pillar Cards (Why BizzBuild) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PILLARS.map((pillar, i) => {
            const GraphicComponent = pillar.graphic;
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group relative rounded-3xl p-7 md:p-8 overflow-hidden cursor-default flex flex-col justify-between transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(74,222,128,0.05) 0%, rgba(6,13,6,0.6) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(74,222,128,0.15)",
                }}
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(74,222,128,0.12) 0%, transparent 65%)",
                  }}
                />

                <div>
                  {/* Top Bar: Icon + Pillar Number + Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#4ade80]
                                   group-hover:shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-300"
                        style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.18)" }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#4ade80]/60 tracking-widest uppercase">
                        {pillar.num} // PILLAR
                      </span>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-white/30 group-hover:text-[#4ade80] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </div>

                  {/* Looping Custom SVG Graphic */}
                  <div className="mb-6">
                    <GraphicComponent />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/45 text-sm font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
