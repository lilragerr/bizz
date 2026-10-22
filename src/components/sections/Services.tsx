"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Activity, Users, Settings, LineChart, Globe,
  X, CheckCircle2, ArrowRight,
} from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  image: string;
  details: string[];
}

const services: Service[] = [
  {
    id: "business-consulting",
    number: "01",
    title: "Business Consulting",
    icon: <Briefcase size={22} />,
    desc: "High-level strategic planning to align operations with realistic growth plans.",
    image: "/services/business-consulting.png",
    details: [
      "Collaborative strategic planning sessions.",
      "Short-term and long-term milestone planning.",
      "Targeted market alignment and business audits.",
      "Resource allocation and budgeting support.",
    ],
  },
  {
    id: "brand-strategy",
    number: "02",
    title: "Brand Strategy",
    icon: <Globe size={22} />,
    desc: "Creating consistent, authentic brand messaging that resonates with your market.",
    image: "/services/brand-strategy.png",
    details: [
      "Authentic positioning and messaging matrix.",
      "Brand style guide and visual guidelines.",
      "Competitive analysis and customer persona creation.",
      "Communication strategy for multi-channel presence.",
    ],
  },
  {
    id: "hr-consulting",
    number: "03",
    title: "HR Consulting",
    icon: <Users size={22} />,
    desc: "Developing clear organisational structures and high-performance team frameworks.",
    image: "/services/hr-consulting.png",
    details: [
      "Clean operational role definition.",
      "Straightforward organisational structure setup.",
      "Team onboarding and retention practices.",
      "Support for building a collaborative workplace culture.",
    ],
  },
  {
    id: "business-process-support",
    number: "04",
    title: "Business Process Support",
    icon: <Settings size={22} />,
    desc: "Assessing day-to-day operations to simplify processes and resolve bottlenecks.",
    image: "/services/business-process.png",
    details: [
      "Process audits to identify bottlenecks.",
      "Simplifying workflows and process maps.",
      "Team operational alignment guidelines.",
      "Standard Operating Procedures (SOP) documentation.",
    ],
  },
  {
    id: "sales-growth-support",
    number: "05",
    title: "Sales & Growth Support",
    icon: <LineChart size={22} />,
    desc: "Practical guidance on improving customer acquisition and sales pipelines.",
    image: "/services/sales-growth.png",
    details: [
      "Evaluation of existing sales pipelines.",
      "Identifying practical client acquisition channels.",
      "Actionable growth campaigns and outreach strategies.",
      "Strategic support for partnerships and sales alignment.",
    ],
  },
  {
    id: "digital-presence-support",
    number: "06",
    title: "Digital Presence Support",
    icon: <Activity size={22} />,
    desc: "Establishing a clean, functional digital footprint through modern interfaces.",
    image: "/services/digital-presence.png",
    details: [
      "Strategic advice on modern web presence.",
      "Creating authentic digital brand profiles.",
      "Simplifying digital touchpoints for client interaction.",
      "Advisory on online visibility and audience reach.",
    ],
  },
];

export default function Services() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "#050b06" }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }} />

      {/* Decorative hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.2),transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#4ade80]/40" />
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#4ade80]/80">
              WHAT WE DO
            </p>
            <span className="h-px w-8 bg-[#4ade80]/40" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
            Our{" "}
            <span className="bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#86efac] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(74,222,128,0.3)]">
              Services.
            </span>
          </h2>

          <p className="mt-4 text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Practical, strategic solutions across every core operational layer of your business.
          </p>
        </motion.div>

        {/* 3-column x 2-row card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(service)}
              className="group relative rounded-[24px] p-6 sm:p-7 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[350px] md:min-h-[370px]"
              style={{
                background: "linear-gradient(145deg, rgba(10, 24, 14, 0.90) 0%, rgba(5, 12, 7, 0.95) 100%)",
                border: "1px solid rgba(74, 222, 128, 0.14)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Background Image on Right half blending into card bg */}
              <div className="absolute right-0 top-0 bottom-0 w-[58%] pointer-events-none overflow-hidden rounded-r-[24px]">
                {/* Multi-layered gradient overlay to fade image to dark green on left */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: "linear-gradient(90deg, #071209 0%, rgba(7, 18, 9, 0.82) 35%, rgba(7, 18, 9, 0.25) 100%), linear-gradient(180deg, rgba(7, 18, 9, 0.5) 0%, transparent 50%, rgba(7, 18, 9, 0.7) 100%)",
                  }}
                />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-95"
                />
              </div>

              {/* Top Row: Icon Badge & Number */}
              <div className="relative z-20 flex items-center justify-between mb-6">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#4ade80]
                             transition-all duration-300 group-hover:scale-105 group-hover:border-[#4ade80]/40 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.35)]"
                  style={{
                    background: "rgba(74, 222, 128, 0.12)",
                    border: "1px solid rgba(74, 222, 128, 0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {service.icon}
                </div>

                <span className="text-3xl font-light tracking-tight text-white/20 font-mono select-none group-hover:text-[#4ade80]/40 transition-colors duration-300">
                  {service.number}
                </span>
              </div>

              {/* Middle Section: Title & Description */}
              <div className="relative z-20 max-w-[62%] sm:max-w-[65%] my-auto py-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight leading-snug group-hover:text-[#4ade80] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Row: LEARN MORE + Arrow Circle */}
              <div className="relative z-20 flex items-center gap-3 pt-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-[#4ade80] transition-colors duration-300">
                  Learn More
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#4ade80] flex items-center justify-center text-white/70 group-hover:text-[#060d06] group-hover:bg-[#4ade80] transition-all duration-300 shadow-sm">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>

              {/* Hover card border glow */}
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(74, 222, 128, 0.35), 0 12px 40px rgba(74, 222, 128, 0.15)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Details Modal ── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(4, 9, 5, 0.88)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-lg rounded-3xl p-8 md:p-10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(74,222,128,0.1) 0%, rgba(6,13,6,0.96) 60%)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(74,222,128,0.25)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            >
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%)", filter: "blur(20px)" }} />
              <div className="absolute top-0 left-8 right-8 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)" }} />

              <button
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center
                           text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                onClick={() => setSelected(null)}
              >
                <X size={16} />
              </button>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.28)", color: "#4ade80", boxShadow: "0 0 20px rgba(74,222,128,0.2)" }}>
                    {selected.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#4ade80] font-bold">Service Details</span>
                    <h3 className="text-xl font-bold text-white">{selected.title}</h3>
                  </div>
                </div>

                <p className="text-white/60 leading-relaxed font-light text-sm">{selected.desc}</p>

                <div className="space-y-3">
                  <h4 className="text-[#4ade80] font-bold text-[10px] uppercase tracking-widest">Key Deliverables</h4>
                  <ul className="space-y-2.5">
                    {selected.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-light">
                        <CheckCircle2 size={15} className="text-[#4ade80] mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => { setSelected(null); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs
                             bg-[#4ade80] text-[#060d06] hover:bg-[#22c55e] transition-colors duration-300
                             shadow-[0_0_24px_rgba(74,222,128,0.3)]"
                >
                  Discuss this service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

