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
      backgroundColor: "rgba(74, 222, 128, 0)",
      border: "1.5px solid rgba(74, 222, 128, 0.6)",
      boxShadow: "0 0 10px rgba(74, 222, 128, 0.2)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "rgba(74, 222, 128, 0.12)",
      border: "1.5px solid rgba(74, 222, 128, 0.9)",
      boxShadow: "0 0 20px rgba(74, 222, 128, 0.35)",
    },
    clicking: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
      backgroundColor: "rgba(74, 222, 128, 0.25)",
      border: "1.5px solid #4ade80",
      boxShadow: "0 0 25px rgba(74, 222, 128, 0.5)",
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999999]"
        variants={variants}
        animate={isClicking ? "clicking" : isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {/* Inner dot — green */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[999999]"
        style={{
          background: "#4ade80",
          boxShadow: "0 0 8px rgba(74, 222, 128, 0.9)",
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
