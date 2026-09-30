"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Compass,
  Cpu,
  Headphones,
  Palette,
  Users,
  TrendingUp,
  ArrowRight,
  Zap,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const PHASES = [
  {
    phase: "01",
    label: "Discovery",
    title: "Strategy & Vision",
    icon: Compass,
    color: "rgba(255,255,255,0.9)",
    accentBg: "rgba(255,255,255,0.06)",
    tagline: "Where clarity begins",
    desc: "We map your current reality against your true growth ambition. This isn't a template exercise — it's a deep strategic audit that surfaces your real leverage points.",
    outcomes: [
      "Full business landscape audit",
      "Goal-to-gap analysis",
      "30-60-90 day strategic roadmap",
      "Priority scoring matrix",
    ],
    stat: { val: "100%", label: "strategic alignment" },
  },
  {
    phase: "02",
    label: "Architecture",
    title: "Systems Design",
    icon: Cpu,
    color: "rgba(210,210,210,0.9)",
    accentBg: "rgba(255,255,255,0.04)",
    tagline: "Built for scale",
    desc: "Great businesses run on invisible infrastructure. We design the internal systems, processes, and operating models that let your team execute with zero ambiguity.",
    outcomes: [
      "Org structure design",
      "Process mapping & SOPs",
      "Workflow automation planning",
      "KPI dashboard architecture",
    ],
    stat: { val: "3×", label: "avg. ops efficiency gain" },
  },
  {
    phase: "03",
    label: "Enablement",
    title: "Operational Support",
    icon: Headphones,
    color: "rgba(185,185,185,0.9)",
    accentBg: "rgba(255,255,255,0.03)",
    tagline: "Day-to-day mastery",
    desc: "Strategy is worthless without execution. We embed alongside your team to ensure operational rhythm is maintained, blockers are resolved fast, and nothing falls through the cracks.",
    outcomes: [
      "Weekly ops check-ins",
      "Bottleneck resolution",
      "Team alignment protocols",
      "Real-time decision support",
    ],
    stat: { val: "48hr", label: "avg. issue resolution" },
  },
  {
    phase: "04",
    label: "Identity",
    title: "Branding Solutions",
    icon: Palette,
    color: "rgba(160,160,160,0.9)",
    accentBg: "rgba(255,255,255,0.03)",
    tagline: "Your market signal",
    desc: "Brand isn't a logo — it's the sum of every perception your market holds about you. We build brands that command attention, build trust, and convert at scale.",
    outcomes: [
      "Brand positioning matrix",
      "Messaging & tone playbook",
      "Visual identity system",
      "Multi-channel brand guidelines",
    ],
    stat: { val: "12×", label: "brand recall improvement" },
  },
  {
    phase: "05",
    label: "Culture",
    title: "HR Guidance",
    icon: Users,
    color: "rgba(135,135,135,0.9)",
    accentBg: "rgba(255,255,255,0.025)",
    tagline: "People-first architecture",
    desc: "High-growth companies are built by high-performance teams. We design the cultural infrastructure, hiring frameworks, and retention systems that attract and keep top talent.",
    outcomes: [
      "Org culture diagnostics",
      "Hiring & interview frameworks",
      "Onboarding systems",
      "Performance review structures",
    ],
    stat: { val: "85%", label: "avg. retention rate" },
  },
  {
    phase: "06",
    label: "Scale",
    title: "Growth Execution",
    icon: TrendingUp,
    color: "rgba(110,110,110,0.9)",
    accentBg: "rgba(255,255,255,0.02)",
    tagline: "Revenue acceleration",
    desc: "All the strategy in the world means nothing without relentless execution. We build your sales engine, growth loops, and market expansion plans and then hold you accountable to shipping them.",
    outcomes: [
      "Sales pipeline architecture",
      "Channel acquisition strategy",
      "Partnership & GTM planning",
      "Revenue forecasting models",
    ],
    stat: { val: "400%", label: "avg. ARR growth" },
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressLine = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#000000] py-32 overflow-hidden"
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[15%] right-[5%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.035]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] left-[0%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.025]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-[11px] uppercase tracking-widest font-bold mb-6 backdrop-blur-md"
          >
            <Zap size={12} className="text-white animate-pulse" />
            Our Six-Phase Framework
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-[1.05]"
          >
            From vision to{" "}
            <span className="text-gradient-animated text-glow">velocity.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl font-light mt-5 leading-relaxed max-w-2xl"
          >
            BizzBuild uses a precision six-phase operating system to take modern
            businesses from strategic ambiguity to structured, scalable performance.
          </motion.p>
        </div>

        {/* ── Roadmap Layout ── */}
        <div className="relative">

          {/* Central animated progress spine */}
          <div className="absolute left-[22px] md:left-[36px] top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full hidden sm:block">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: progressLine,
                background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)",
                boxShadow: "0 0 12px rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* Phase items */}
          <div className="flex flex-col gap-6 sm:gap-5">
            {PHASES.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhase === index;

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.07 }}
                  className="relative pl-0 sm:pl-20 md:pl-24"
                >
                  {/* Phase dot on spine */}
                  <div className="hidden sm:flex absolute left-0 top-6 items-center justify-center w-11 md:w-[72px] z-10">
                    <motion.div
                      className="w-[46px] h-[46px] rounded-full border border-white/20 bg-black flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,1)",
                        boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.25)" : "none",
                      }}
                      onClick={() => setActivePhase(isActive ? null : index)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} style={{ color: phase.color }} />
                    </motion.div>
                  </div>

                  {/* Phase card */}
                  <motion.div
                    layout
                    onClick={() => setActivePhase(isActive ? null : index)}
                    className={`relative rounded-2xl md:rounded-3xl border cursor-pointer overflow-hidden transition-all duration-500 group ${
                      isActive
                        ? "border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
                        : "border-white/[0.07] hover:border-white/15"
                    }`}
                    style={{ background: isActive ? phase.accentBg : "rgba(255,255,255,0.012)" }}
                    whileHover={{ y: isActive ? 0 : -2 }}
                  >
                    {/* Card inner ambient on active */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at top left, ${phase.accentBg} 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    {/* Collapsed header (always visible) */}
                    <div className="relative z-10 flex items-center gap-5 px-6 py-5 md:px-8 md:py-6">
                      {/* Mobile icon */}
                      <div
                        className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <Icon size={16} style={{ color: phase.color }} />
                      </div>

                      {/* Phase number + label */}
                      <div className="flex flex-col shrink-0 w-28 hidden md:flex">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                          Phase {phase.phase}
                        </span>
                        <span className="text-xs font-bold text-white/50 mt-0.5 uppercase tracking-wider">
                          {phase.label}
                        </span>
                      </div>

                      {/* Title block */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold md:hidden">
                            {phase.phase}
                          </span>
                          <h3
                            className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-gradient transition-all duration-300"
                          >
                            {phase.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold border border-white/10 text-white/50 bg-white/[0.03] hidden sm:inline-flex">
                            {phase.tagline}
                          </span>
                        </div>
                        {!isActive && (
                          <p className="text-white/40 text-sm font-light mt-1 line-clamp-1 hidden md:block">
                            {phase.desc}
                          </p>
                        )}
                      </div>

                      {/* Stat badge — visible only when collapsed */}
                      {!isActive && (
                        <div className="text-right shrink-0 hidden lg:block">
                          <div className="text-xl font-black text-white">{phase.stat.val}</div>
                          <div className="text-[9px] uppercase tracking-widest text-white/35 font-semibold">
                            {phase.stat.label}
                          </div>
                        </div>
                      )}

                      {/* Expand chevron */}
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 ml-2"
                      >
                        <ChevronDown size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-7 pt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 border-t border-white/[0.06]">

                            {/* Description */}
                            <div className="lg:col-span-2">
                              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed">
                                {phase.desc}
                              </p>

                              {/* Outcome list */}
                              <ul className="mt-6 space-y-3">
                                {phase.outcomes.map((outcome, oi) => (
                                  <motion.li
                                    key={oi}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: oi * 0.07 }}
                                    className="flex items-center gap-3 text-white/80 text-sm font-medium"
                                  >
                                    <CheckCircle size={15} className="text-white/60 shrink-0" />
                                    {outcome}
                                  </motion.li>
                                ))}
                              </ul>

                              <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 mt-7 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 hover-trigger"
                              >
                                Start This Phase
                                <ArrowRight size={13} />
                              </motion.a>
                            </div>

                            {/* Stat card */}
                            <div className="flex flex-col justify-center">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15, duration: 0.5 }}
                                className="rounded-2xl border border-white/10 p-6 flex flex-col items-start gap-3 backdrop-blur-sm"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                              >
                                {/* Icon large */}
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                                  style={{ background: "rgba(255,255,255,0.05)" }}
                                >
                                  <Icon size={22} style={{ color: phase.color }} />
                                </div>
                                <div>
                                  <div className="text-4xl font-black text-white tracking-tight">
                                    {phase.stat.val}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-1">
                                    {phase.stat.label}
                                  </div>
                                </div>
                                <div
                                  className="w-full h-[2px] rounded-full mt-2"
                                  style={{
                                    background: `linear-gradient(90deg, ${phase.color}, transparent)`,
                                    opacity: 0.4,
                                  }}
                                />
                                <p className="text-white/40 text-xs font-light">
                                  Measured across client engagements in this phase.
                                </p>
                              </motion.div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-2xl md:rounded-3xl border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready to build your roadmap?
            </h3>
            <p className="text-white/50 text-base font-light mt-2 max-w-lg">
              Every BizzBuild engagement begins with a free strategic audit. No templates, no fluff — just a clear picture of where you stand and exactly what to do next.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors duration-300 hover-trigger"
            >
              Book Free Audit
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
