"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    title: "FinTech Scaling",
    category: "Strategy & Systems",
    metrics: "+400% ARR",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI Automation",
    category: "BPR",
    metrics: "2.5x Efficiency",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Global Rebrand",
    category: "Brand Strategy",
    metrics: "12 New Markets",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Enterprise Sales",
    category: "Channel Sales",
    metrics: "$50M Pipeline",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section id="work" ref={targetRef} className="relative h-[300vh] bg-[#060d06]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-24 left-6 md:left-12 z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Featured <span className="text-gradient-animated text-glow">Work.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 mt-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] rounded-3xl overflow-hidden hover-trigger shrink-0 border border-white/5"
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Grayscale Glass Overlay */}
              <div 
                className="absolute inset-0 transition-all duration-500"
                style={{ 
                  background: "linear-gradient(to top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 60%)",
                  opacity: 0.7,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
