"use client";
import { motion } from "framer-motion";

const teamColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];

export default function Team() {
  const team = [
    {
      name: "Gaurav Kulkarni",
      role: "Founder & Principal Consultant",
      image: "/gaurav_kulkarni.png",
    },
    {
      name: "Elena Rostova",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Julian Cross",
      role: "Business Strategist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Sarah Chen",
      role: "HR Executive",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "Marcus Vane",
      role: "Operations Support",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <section className="w-full py-32 bg-[#000000] relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
              Our <span className="text-gradient-animated text-glow">Team.</span>
            </h2>
            <p className="text-bizz-text-muted max-w-xl text-lg font-light">
              Collaborative consultants and growth partners focused on structuring and scaling your business.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <a href="#contact" className="text-white hover:text-gradient transition-all border-b border-white/50 pb-1 uppercase tracking-wider text-sm font-bold hover-trigger group">
              Work with us
              <span className="block h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-white to-white/50 transition-all duration-300" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group relative hover-trigger"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 glass-card border-shimmer">
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 ${member.name === "Gaurav Kulkarni" ? "" : "grayscale group-hover:grayscale-0"}`}
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                {/* Gradient glass overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${teamColors[index]}20, transparent)` }}
                />
                {/* Animated border glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    boxShadow: `inset 0 0 40px ${teamColors[index]}15, 0 0 20px ${teamColors[index]}10`,
                  }}
                />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-300">
                {member.name}
              </h3>
              <p className="text-bizz-text-muted text-xs uppercase tracking-wider font-light">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
