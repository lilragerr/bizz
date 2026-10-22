"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

/* ─── All 31 client logos ─── */
const ALL_CLIENTS = [
  { name: "Almari",                    file: "ALMARI.png" },
  { name: "Awaken Circle",             file: "AWAKEN CIRCLE.png" },
  { name: "Azeel",                     file: "AZEEL.png" },
  { name: "Baby Amara",               file: "BABY AMARA.png" },
  { name: "Bhakti Developer",          file: "BHAKTI DEVELOPER.png" },
  { name: "Blossom",                   file: "BLOSSOM.png" },
  { name: "Crush Coffee",              file: "CRUSH COFFEE.png" },
  { name: "DS Clothing",               file: "DS CLOTHING.png" },
  { name: "Fitt By Anmol",            file: "FITT BY ANMOL.png" },
  { name: "Gag Me",                    file: "GAG ME.png" },
  { name: "Greysoul",                  file: "GREYSOUL.png" },
  { name: "Hello Fitness Magazine",    file: "HELLO FITNESS MAGAZINE.png" },
  { name: "HOC Technologies",          file: "HOC TECHNOLOGIES.png" },
  { name: "Kaffyn",                    file: "KAFFYN.png" },
  { name: "Macwin Solar Energy",       file: "MACWIN SOLAR ENERGY.png" },
  { name: "Minicub's",               file: "MINICUB'S.png" },
  { name: "Neeyovan",                  file: "NEEYOVAN.png" },
  { name: "Poperiee",                  file: "POPERIEE.png" },
  { name: "Prabhim",                   file: "PRABHIM.png" },
  { name: "Sajjan",                    file: "SAJJAN.png" },
  { name: "Sajori",                    file: "SAJORI.png" },
  { name: "Sileon",                    file: "SILEON.png" },
  { name: "Sky Pet",                   file: "SKY PET.png" },
  { name: "Statement Spice",           file: "STATEMENT SPICE.png" },
  { name: "Textile Mandee",            file: "TEXTILE MANDEE.png" },
  { name: "The Grind",                 file: "THE GRIND.png" },
  { name: "The MVMT House",            file: "THE MVMT HOUSE.png" },
  { name: "Unfold The Success",        file: "UNFOLD THE SUCCESS.png" },
  { name: "What's For Dinner",        file: "WHAT'S FOR DINNER.png" },
  { name: "Chab Chaba Chab",           file: "chab chaba chab.png" },
  { name: "Pilot Preparation Academy", file: "pilot preparation academy.png" },
];

/* Split into two rows */
const ROW_1 = ALL_CLIENTS.slice(0, 16);
const ROW_2 = ALL_CLIENTS.slice(16);

/* ─── Logo card ─── */
function LogoCard({ name, file }: { name: string; file: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered ? "rgba(74,222,128,0.35)" : "rgba(74,222,128,0.10)",
        boxShadow: hovered
          ? "0 8px 32px rgba(74,222,128,0.15), inset 0 1px 0 rgba(74,222,128,0.1)"
          : "0 2px 12px rgba(0,0,0,0.15)",
        y: hovered ? -5 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative flex-shrink-0 rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        width: "140px",
        height: "140px",
        background: "#ffffff",
      }}
    >
      {/* Logo fills the entire square */}
      <div className="absolute inset-0 p-3">
        <Image
          src={`/CLIENT/${encodeURIComponent(file)}`}
          alt={name}
          fill
          quality={100}
          className="object-contain"
          style={{ padding: "10px" }}
          draggable={false}
          sizes="140px"
        />
      </div>

      {/* Name on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 py-1.5 text-center z-10
                   text-[8px] font-bold uppercase tracking-[0.12em]"
        style={{
          background: "rgba(6,13,6,0.75)",
          color: "#4ade80",
        }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.18 }}
      >
        {name}
      </motion.div>
    </motion.div>
  );
}

/* ─── Infinite marquee row ─── */
function MarqueeRow({
  items,
  reverse = false,
  speed = 70,
}: {
  items: typeof ALL_CLIENTS;
  reverse?: boolean;
  speed?: number;
}) {
  /* Double the array — animation moves -50% = exactly one set, perfect seamless loop */
  const doubled = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-4 items-center w-max"
        style={{
          animation: `marqueeLoop ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {doubled.map((client, i) => (
          <LogoCard key={`${client.file}-${i}`} name={client.name} file={client.file} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ─── */
export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#060d06" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[900px] h-[400px] rounded-full blur-[150px] opacity-[0.03]"
          style={{ background: "rgba(74,222,128,0.025)" }}
        />
      </div>

      {/* Hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative z-10 text-center mb-14 px-6"
      >
        <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white tracking-tighter leading-tight">
          Clients we&apos;ve{" "}
          <span className="text-gradient-animated text-glow">built with</span>
        </h2>
        <p className="mt-4 text-white/40 text-sm md:text-base font-light max-w-xl mx-auto">
          From startups to scaling enterprises — every brand we touch grows with intention.
        </p>
      </motion.div>

      {/* ── Dual moving carousel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        {/* Row 1 → left */}
        <MarqueeRow items={ROW_1} reverse={false} speed={80} />
        {/* Row 2 → right */}
        <MarqueeRow items={ROW_2} reverse={true}  speed={65} />
      </motion.div>
    </section>
  );
}
