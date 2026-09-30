"use client";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";

export default function FoundersVision() {
  return (
    <section id="vision" className="relative w-full py-32 bg-[#000000] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "rgba(255, 255, 255, 0.02)" }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Photo in animated glass frame */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Ambient decorative glowing backplate */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl scale-105 pointer-events-none" />
            
            {/* Glass photo wrapper */}
            <div className="glass-card p-4 rounded-3xl relative z-10 border-shimmer overflow-hidden">
              <img 
                src="/gaurav_kulkarni.png" 
                alt="Gaurav Kulkarni" 
                className="w-full h-auto rounded-2xl object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
              />
              
              {/* Corner accent decorations */}
              <div className="absolute top-6 left-6 text-white opacity-80">
                <Sparkles size={20} className="animate-icon-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Text & Quote */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-white/55">Founder&apos;s Vision</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6 tracking-tighter">
                GAURAV <span className="text-gradient-animated text-glow">KULKARNI</span>
              </h2>
              <div className="w-20 h-[2px] bg-white rounded-full" />
            </div>

            {/* Vision Statement in glass quote box */}
            <div className="glass-card p-8 rounded-2xl relative border-shimmer">
              <Quote className="absolute top-4 right-6 text-white/5 w-16 h-16 pointer-events-none" />
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic relative z-10">
                &ldquo;BizzBuild was founded on a simple belief: strategy is only as good as its execution. Too many businesses get lost in high-level theories without the practical systems to back them up. Our goal is to bridge that gap—helping founders build cleaner systems, clearer brand identities, and sustainable structures so they can scale with absolute clarity.&rdquo;
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white text-lg font-bold">Bridging Strategy &amp; Execution</h4>
              <p className="text-bizz-text-muted leading-relaxed">
                We believe that sustainable growth isn&apos;t built on temporary fixes or generic templates. It requires a dedicated growth partner who understands the challenges of day-to-day operations and aligns them with a clear long-term direction. We focus on building modern business growth ecosystems that deliver real, measurable value.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
