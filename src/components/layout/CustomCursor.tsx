"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports touch or matches coarse pointer media query
    const isTouch = 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0 || 
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    
    if (isTouch) {
      return;
    }

    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-trigger")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1.5px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: "1.5px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
    },
    clicking: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1.5px solid rgba(255, 255, 255, 0.9)",
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        variants={variants}
        animate={isClicking ? "clicking" : isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot — white */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          background: "#ffffff",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1,
        }}
      />
    </>
  );
}
