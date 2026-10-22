"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  staggerChild,
  TextReveal,
  LineReveal,
  AnimatedCounter,
} from "@/components/ui/ScrollAnimations";

// ── STATS ──
const STATS = [
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 3,   suffix: "×", label: "Avg. Growth" },
  { value: 98,  suffix: "%", label: "Satisfaction Rate" },
  { value: 5,   suffix: "+", label: "Years of Impact" },
];

// ── PILLARS ──
const PILLARS = [
  {
    num: "01",
    title: "Strategic Design",
    desc: "Deep analysis of operations and structure to design clear, executable plans.",
    image: "/services/brand-strategy.png",
    tag: "Brand & Clarity",
  },
  {
    num: "02",
    title: "System Integration",
    desc: "Building simpler, more structured processes that keep teams aligned.",
    image: "/services/business-process.png",
    tag: "Process & Flow",
  },
  {
    num: "03",
    title: "Focused Execution",
    desc: "Moving from theory to practice with hands-on implementation support.",
    image: "/services/business-consulting.png",
    tag: "Speed & Precision",
  },
  {
    num: "04",
    title: "Collaborative Partnership",
    desc: "Working closely with founders to solve practical business challenges.",
    image: "/services/hr-consulting.png",
    tag: "People & Growth",
  },
];

// ── Interactive 3D Tilt + Spotlight Card ──
function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position relative to card center (normalised -0.5 → 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring physics for tilt
  const springCfg = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), springCfg);

  // Spotlight position (follows cursor)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
    setSpotlight({ x: 50, y: 50 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-pointer h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.25 } }}
      >
        {/* ── Animated glowing border ── */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          animate={hovered ? {
            boxShadow: [
              "0 0 0 1px rgba(74,222,128,0.25), 0 0 20px rgba(74,222,128,0.12)",
              "0 0 0 1px rgba(74,222,128,0.55), 0 0 35px rgba(74,222,128,0.22)",
              "0 0 0 1px rgba(74,222,128,0.25), 0 0 20px rgba(74,222,128,0.12)",
            ],
          } : { boxShadow: "0 0 0 1px rgba(74,222,128,0.12)" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Background Image ── */}
        <div className="relative w-full h-44 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { scale: 1.12 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={pillar.image}
              alt={pillar.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          {/* Persistent dark gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,13,6,0.95) 0%, rgba(6,13,6,0.4) 60%, rgba(6,13,6,0.05) 100%)",
            }}
          />

          {/* Mouse-following spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, rgba(74,222,128,0.28) 0%, transparent 70%)`,
            }}
          />

          {/* Pillar number badge */}
          <motion.span
            className="absolute top-4 left-4 text-[10px] font-mono font-bold tracking-[0.3em] uppercase z-10"
            animate={{ color: hovered ? "#4ade80" : "rgba(74,222,128,0.5)" }}
            transition={{ duration: 0.3 }}
          >
            {pillar.num}
          </motion.span>

          {/* Tag pill — slides down on hover */}
          <motion.span
            className="absolute top-4 right-4 z-10 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md"
            initial={{ opacity: 0, y: -8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(74,222,128,0.15)",
              border: "1px solid rgba(74,222,128,0.4)",
              color: "#4ade80",
            }}
          >
            {pillar.tag}
          </motion.span>
        </div>

        {/* ── Content panel ── */}
        <div
          className="relative p-5 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(14,30,14,0.95) 0%, rgba(6,13,6,1) 100%)",
          }}
        >
          {/* Animated underline bar */}
          <motion.div
            className="h-[2px] rounded-full mb-4 bg-[#4ade80]"
            animate={{ width: hovered ? "100%" : "28px" }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.h3
            className="text-base font-bold text-white mb-2 leading-snug"
            animate={{ color: hovered ? "#4ade80" : "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            {pillar.title}
          </motion.h3>

          {/* Description — slides up and fades in on hover */}
          <motion.p
            className="text-white/50 text-xs font-light leading-relaxed"
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 4 }}
            transition={{ duration: 0.35 }}
          >
            {pillar.desc}
          </motion.p>

          {/* CTA arrow row — only visible on hover */}
          <motion.div
            className="flex items-center gap-1.5 mt-3 text-[#4ade80] text-xs font-bold uppercase tracking-widest"
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
          >
            <span>Explore</span>
            <motion.div
              animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={13} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="why-bizzbuild" className="relative w-full py-28 md:py-36 bg-[#060d06] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full blur-[160px] opacity-[0.07] pointer-events-none"
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

        {/* ── 4 Interactive Pillar Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
