"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues if we used complex GSAP
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
      })
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5")
      .to(lineRef.current, {
        opacity: 0,
        duration: 0.5,
      }, "+=0.5");
    });
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000]"
        >
          {/* Background gradient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
              style={{ background: "rgba(255, 255, 255, 0.03)" }}
            />
          </div>

          <div className="relative overflow-hidden mb-8">
            <img
              ref={logoRef}
              src="/bizzbuildlogo.png"
              alt="BizzBuild Logo"
              className="h-20 md:h-32 w-auto opacity-0 translate-y-full invert brightness-200"
              style={{ filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))" }}
            />
          </div>
          {/* Grayscale loading bar */}
          <div className="w-48 h-[2px] rounded-full relative overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              ref={lineRef}
              className="absolute inset-0 origin-left scale-x-0 rounded-full"
              style={{ 
                background: "linear-gradient(90deg, #ffffff, #a3a3a3, #ffffff)",
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
