"use client";
import { motion } from "framer-motion";

const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Facebook = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const socialColors = ["#ffffff", "#ffffff", "#ffffff"];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={24} />, href: "https://instagram.com/bizzbuild", name: "Instagram" },
    { icon: <Facebook size={24} />, href: "https://facebook.com/bizzbuild", name: "Facebook" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com/company/bizzbuild", name: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-[#000000] pt-24 pb-12 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }} />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-100" style={{ background: "rgba(255, 255, 255, 0.01)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(255, 255, 255, 0.01)" }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="inline-block hover-trigger mb-6 relative group">
              <img src="/bizzbuildlogo.png" alt="BizzBuild Logo" className="h-10 w-auto relative z-10 invert brightness-200" />
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
            </a>
            <p className="text-bizz-text-muted max-w-md text-lg font-light leading-relaxed">
              A strategic business growth and consulting partner for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-4">
              {["Services", "About", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-bizz-text-muted hover:text-white transition-colors relative group py-1 hover-trigger text-sm"
                  >
                    {item}
                    {/* Gradient underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center glass-card hover-trigger transition-all duration-300 border-shimmer"
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                    boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
                    borderColor: "#ffffff",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-white">{social.icon}</span>
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated gradient divider */}
        <div 
          className="w-full h-[1px] mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)" }}
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-bizz-text-muted font-light">
          <p>&copy; {currentYear} BizzBuild Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors hover-trigger">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors hover-trigger">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
