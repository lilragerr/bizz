"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home",     href: "#" },
    { name: "Services", href: "#services" },
    { name: "About",    href: "#about" },
    { name: "Insights", href: "#our-works" },
    { name: "Contact",  href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div
            className="flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
            style={{
              background: scrolled
                ? "rgba(6, 13, 6, 0.45)"
                : "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
                : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Logo — forced white */}
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="/bizzbuildlogo.png"
                alt="BizzBuild Consulting Logo"
                className="h-14 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-white/60 hover:text-white transition-colors group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#4ade80] group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5
                           border border-[#4ade80] text-[#4ade80] text-sm font-bold
                           uppercase tracking-widest rounded-full
                           hover:bg-[#4ade80] hover:text-[#060d06]
                           transition-all duration-300 hover-trigger"
              >
                Let&apos;s Build
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-full border border-white/20 text-white/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "#060d06" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-black text-white uppercase tracking-widest hover:text-[#4ade80] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-8 py-4 bg-[#4ade80] text-[#060d06] text-sm font-bold uppercase tracking-widest rounded-full"
            >
              Let&apos;s Build
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
