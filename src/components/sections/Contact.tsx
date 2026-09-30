"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "https://instagram.com/bizzbuild", color: "#ffffff", label: "Instagram" },
    { icon: <Facebook size={20} />, href: "https://facebook.com/bizzbuild", color: "#ffffff", label: "Facebook" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/bizzbuild", color: "#ffffff", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="relative w-full py-32 bg-[#000000] overflow-hidden">
      {/* Animated Background Grid — white/grey tint */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                Let&apos;s <span className="text-gradient-animated text-glow">Connect.</span>
              </h2>
              <p className="text-bizz-text-muted text-lg max-w-md font-light leading-relaxed">
                Ready to build stronger systems and scale strategically? Reach out to BizzBuild Consulting today.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">HQ</p>
                <p className="text-white font-medium">Pune, India</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:info@bizzbuildconsulting.com" className="text-white font-medium hover:text-gradient transition-colors">
                  info@bizzbuildconsulting.com
                </a>
              </div>
            </div>

            {/* Social Links inside Contact Section */}
            <div className="space-y-3">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Follow Us</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover-trigger transition-all duration-300"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)", color: social.color }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                      borderColor: "#ffffff",
                    }}
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form — Deep glass card */}
          <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden border-shimmer">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-bizz-text-muted mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 transition-all duration-300 hover-trigger placeholder:text-neutral-700"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-bizz-text-muted mb-2">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 transition-all duration-300 hover-trigger placeholder:text-neutral-700"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-bizz-text-muted mb-2">Project Scope</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="w-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30 transition-all duration-300 resize-none hover-trigger placeholder:text-neutral-700"
                      placeholder="Tell us about your growth goals..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex items-center justify-center gap-2 font-bold uppercase tracking-wider py-4 rounded-xl overflow-hidden hover-trigger disabled:opacity-70 bg-white text-black hover:bg-neutral-200 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                    <CheckCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-bizz-text-muted max-w-sm mx-auto font-light">
                    Thank you. A principal consultant from BizzBuild will review your scope and follow up shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
