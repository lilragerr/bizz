"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Activity, Users, Settings, LineChart, Globe, X, Sparkles, CheckCircle2 } from "lucide-react";

interface Service {
  title: string;
  icon: React.ReactNode;
  desc: string;
  details: string[];
}

const iconAnimations: Record<string, string> = {
  "Business Consulting": "animate-float",
  "Brand Strategy": "animate-icon-spin",
  "HR Consulting": "animate-icon-pulse",
  "Business Process Support": "animate-icon-spin",
  "Sales & Growth Support": "animate-icon-bounce",
  "Digital Presence Support": "animate-icon-pulse",
};

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    { 
      title: "Business Consulting", 
      icon: <Briefcase size={32} />, 
      desc: "High-level strategic planning to align operations with realistic growth plans.",
      details: [
        "Collaborative strategic planning sessions.",
        "Short-term and long-term milestone planning.",
        "Targeted market alignment and business audits.",
        "Resource allocation and budgeting support."
      ]
    },
    { 
      title: "Brand Strategy", 
      icon: <Globe size={32} />, 
      desc: "Creating consistent, authentic brand messaging that resonates with your market.",
      details: [
        "Authentic positioning and messaging matrix.",
        "Brand style guide and visual guidelines.",
        "Competitive analysis and customer persona creation.",
        "Communication strategy for multi-channel presence."
      ]
    },
    { 
      title: "HR Consulting", 
      icon: <Users size={32} />, 
      desc: "Developing clear organizational structures and high-performance team frameworks.",
      details: [
        "Clean operational role definition.",
        "Straightforward organizational structure setup.",
        "Team onboarding and retention practices.",
        "Support for building a collaborative workplace culture."
      ]
    },
    { 
      title: "Business Process Support", 
      icon: <Settings size={32} />, 
      desc: "Assessing day-to-day operations to simplify processes and resolve bottlenecks.",
      details: [
        "Process audits to identify bottlenecks.",
        "Simplifying workflows and process maps.",
        "Team operational alignment guidelines.",
        "Standard Operating Procedures (SOP) documentation."
      ]
    },
    { 
      title: "Sales & Growth Support", 
      icon: <LineChart size={32} />, 
      desc: "Practical guidance on improving customer acquisition and sales pipelines.",
      details: [
        "Evaluation of existing sales pipelines.",
        "Identifying practical client acquisition channels.",
        "Actionable growth campaigns and outreach strategies.",
        "Strategic support for partnerships and sales alignment."
      ]
    },
    { 
      title: "Digital Presence Support", 
      icon: <Activity size={32} />, 
      desc: "Establishing a clean, functional digital footprint through modern interfaces.",
      details: [
        "Strategic advice on modern web presence.",
        "Creating authentic digital brand profiles.",
        "Simplifying digital touchpoints for client interaction.",
        "Advisory on online visibility and audience reach."
      ]
    },
  ];

  return (
    <section ref={containerRef} id="services" className="relative w-full py-32 bg-[#000000] overflow-hidden">
      {/* Monochrome background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none animate-morph"
        style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)" }}
      />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none animate-morph"
        style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 70%)", animationDelay: "4s" }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Our <span className="text-gradient-animated text-glow">Services.</span>
          </h2>
          <p className="text-bizz-text-muted max-w-2xl mx-auto text-lg font-light">
            We offer practical, strategic solutions across every core operational layer of your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedService(service)}
              className="glass-card glass-card-hover p-8 rounded-3xl group relative overflow-hidden transition-all duration-500 hover-trigger cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Background gradient reveal on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              
              {/* Shimmer border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-shimmer" />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-all duration-300 ${iconAnimations[service.title]}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <div className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-bizz-text-muted leading-relaxed mb-6 font-light">
                  {service.desc}
                </p>
                <span className="text-sm font-semibold tracking-wider text-white group-hover:underline flex items-center gap-1.5">
                  Learn More <Sparkles size={14} className="animate-icon-pulse" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassmorphic Modal Detail Panel */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="w-full max-w-lg glass-card p-8 md:p-10 rounded-3xl relative z-10 overflow-hidden border-shimmer"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              {/* Silver ambient glow */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 text-bizz-text-muted hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full hover-trigger"
                onClick={() => setSelectedService(null)}
              >
                <X size={20} />
              </button>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    {selectedService.icon}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/50 font-bold">Service Details</span>
                    <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                  </div>
                </div>

                <p className="text-bizz-text-muted leading-relaxed text-lg font-light">
                  {selectedService.desc}
                </p>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">What we cover:</h4>
                  <ul className="space-y-3">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-bizz-text-muted font-light">
                        <CheckCircle2 size={18} className="text-white mt-0.5 shrink-0 opacity-80" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 hover-trigger transition-all duration-300 text-center block text-sm"
                  >
                    Discuss this service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
