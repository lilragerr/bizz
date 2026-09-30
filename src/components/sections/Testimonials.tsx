"use client";
import { motion } from "framer-motion";

const cardColors = ["#ffffff", "#ffffff", "#ffffff"];

export default function Testimonials() {
  const testimonials = [
    {
      quote: "BizzBuild didn't just give us advice; they re-engineered our entire go-to-market engine. We hit 300% growth in 6 months.",
      author: "David Chen",
      company: "Founder, ScaleTech",
    },
    {
      quote: "The strategic clarity and operational systems they put in place transformed us from a chaotic startup to a category leader.",
      author: "Samantha Wright",
      company: "CEO, Nexa Logistics",
    },
    {
      quote: "Unparalleled expertise. Their team operates at an entirely different level of precision and strategic foresight.",
      author: "James Holden",
      company: "VP Sales, Orbital",
    },
  ];

  return (
    <section className="relative w-full py-32 bg-[#000000] overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(255, 255, 255, 0.01)" }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-center text-4xl md:text-6xl font-bold text-white mb-20 tracking-tighter">
          Founder <span className="text-gradient-animated text-glow">Validation.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="glass-card p-10 rounded-3xl relative hover-trigger group overflow-hidden border-shimmer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0], rotate: [0, 0.5, -0.5, 0] }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                y: {
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02), transparent 70%)" }}
              />

              {/* Gradient quote mark */}
              <div 
                className="text-6xl font-serif absolute top-6 left-6 leading-none text-white opacity-20"
              >
                &ldquo;
              </div>
              <p className="text-gray-300 text-lg relative z-10 mb-8 leading-relaxed italic font-light">
                {item.quote}
              </p>
              <div className="relative z-10 flex items-center gap-4 border-t pt-6 border-white/10">
                {/* Animated gradient avatar ring */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white relative bg-white/5 border border-white/10"
                >
                  <span className="relative z-10 text-white">{item.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.author}</h4>
                  <p className="text-bizz-text-muted text-sm font-light">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
