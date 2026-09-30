"use client";
import { motion } from "framer-motion";
import { Eye, GitBranch, Play, HeartHandshake } from "lucide-react";

export default function Stats() {
  const pillars = [
    {
      title: "Strategic Design",
      desc: "Deep analysis of operations and structure to design clear, executable plans.",
      icon: <Eye size={24} />,
    },
    {
      title: "System Integration",
      desc: "Building simpler, more structured processes that keep teams aligned.",
      icon: <GitBranch size={24} />,
    },
    {
      title: "Focused Execution",
      desc: "Moving from theory to practice with hands-on implementation support.",
      icon: <Play size={24} />,
    },
    {
      title: "Collaborative Partnership",
      desc: "Working closely with founders to solve practical business challenges.",
      icon: <HeartHandshake size={24} />,
    },
  ];

  return (
    <section id="why-bizzbuild" className="relative w-full py-32 bg-[#000000] overflow-hidden">
      {/* Animated background rings */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-ripple" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-ripple" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Gradient mesh background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 50%)" }}
        />
      </div>

      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Why <span className="text-gradient-animated text-glow">BizzBuild.</span>
          </h2>
          <p className="text-bizz-text-muted max-w-2xl mx-auto text-lg font-light">
            We focus on structure, efficiency, and clarity, building trust through practical solutions and thoughtful execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="glass-card glass-card-hover p-8 rounded-3xl group transition-all duration-500 hover:-translate-y-3 hover-trigger relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)" }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative text-white"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div className="group-hover:animate-icon-pulse">
                      {pillar.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-bizz-text-muted text-sm leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
