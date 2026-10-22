"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

/* ── Word-by-word text reveal ── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Scroll reveal wrapper with presets ── */
export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.65,
  once = true,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "flip";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants: Record<string, any> = {
    "fade-up":    { hidden: { opacity: 0, y: 50 },       visible: { opacity: 1, y: 0 } },
    "fade-down":  { hidden: { opacity: 0, y: -40 },      visible: { opacity: 1, y: 0 } },
    "fade-left":  { hidden: { opacity: 0, x: -60 },      visible: { opacity: 1, x: 0 } },
    "fade-right": { hidden: { opacity: 0, x: 60 },       visible: { opacity: 1, x: 0 } },
    "zoom":       { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } },
    "flip":       { hidden: { opacity: 0, rotateX: 20, y: 30 }, visible: { opacity: 1, rotateX: 0, y: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container — children animate in sequence ── */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Animated counter ── */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(val) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(val).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <span ref={nodeRef}>0</span>
      </motion.span>
      {suffix}
    </span>
  );
}

/* ── Line reveal — horizontal line that draws left to right ── */
export function LineReveal({
  className = "",
  delay = 0,
  color = "rgba(74,222,128,0.4)",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-px"
        style={{ background: color }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
