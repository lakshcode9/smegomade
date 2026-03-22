"use client";

import { useEffect, useRef, useState } from "react";
import { ModulesGrid } from "@/components/ui/modules-grid";
import { motion, useScroll, useTransform } from "motion/react";

// ─── Work gallery data ────────────────────────────────────
const galleryItems = [
  {
    src: "/images/futuree 1.png",
    label: "FUTURE / PLUTO",
    type: "Concept Poster",
  },
  {
    src: "/images/destroylonelyEXPERIMENTAL3 1.png",
    label: "DESTROY LONELY",
    type: "Concept Poster",
  },
  {
    src: "/images/gunnawunna 2.png",
    label: "GUNNA — WUNNA",
    type: "Concept Poster",
  },
  {
    src: "/images/kendrickPINTEREST 1.png",
    label: "KENDRICK LAMAR",
    type: "Concept Poster",
  },
  {
    src: "/images/image 56.png",
    label: "DON TOLIVER — TIRAMISU",
    type: "Typography",
  },
  {
    src: "/images/image 69.png",
    label: "SLIMAU",
    type: "Typography",
  },
  {
    src: "/images/image 55.png",
    label: "FIGHT",
    type: "Typography",
  },
  {
    src: "/images/camilapinterest1 1.png",
    label: "CAMILA CABELLO",
    type: "Concept Poster",
  },
  {
    src: "/images/otisredding 1.png",
    label: "OTIS REDDING",
    type: "Concept Poster",
  },
];

const clothingItems = [
  { src: "/images/Rectangle 2011.png" },
  { src: "/images/Rectangle 2012.png" },
  { src: "/images/Rectangle 2013.png" },
  { src: "/images/Rectangle 2014.png" },
  { src: "/images/Rectangle 2015.png" },
  { src: "/images/Rectangle 2016.png" },
];

// ─── Ticker component ─────────────────────────────────────
const credits = [
  "FUTURE", "GUNNA", "KENDRICK LAMAR", "DESTROY LONELY",
  "DON TOLIVER", "JAY BRIDE", "TNG", "BRZO TRČI LJANMI",
  "CAMILA CABELLO", "OTIS REDDING", "MONEKE", "KARMELO",
];

function CredentialsTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-5 bg-black">
      <div className="flex gap-0 animate-scroll-x whitespace-nowrap">
        {[...credits, ...credits, ...credits].map((name, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 font-mono text-xs tracking-[0.2em] uppercase text-white/30">
            {name}
            <span className="text-white/15">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Counter animation ────────────────────────────────────
function AnimatedStat({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-black text-5xl md:text-7xl text-white leading-none tracking-tight">
        {count}{suffix}
      </div>
      <div className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
        {label}
      </div>
    </div>
  );
}

// ─── Gallery card ─────────────────────────────────────────
function GalleryCard({ src, label, type }: { src: string; label: string; type: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-[#0a0a0a] aspect-[3/4]"
    >
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-1">
          {type}
        </div>
        <div className="font-black text-sm uppercase tracking-wide text-white leading-tight">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* GLOBAL AMBIENT BACKGROUND FOR GLASSMORPHISM */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-white/[0.02] blur-[100px]" />
        {/* Subtle grain overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-[0.25]" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
      </div>

      {/* ── NAV ─────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/[0.02] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-black text-base uppercase tracking-widest text-white drop-shadow-md">
            smego<span className="text-white/40">®</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://genius.com/artists/Smegomade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffff64]" />
              Genius Verified
            </a>
            <a
              href="#knowledge"
              className="font-mono text-[0.6rem] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors hidden md:block"
            >
              The Knowledge
            </a>
            <a
              href="#get"
              className="font-mono text-[0.65rem] uppercase tracking-widest border border-white/20 px-4 py-2 text-white/70 hover:border-white/60 hover:text-white transition-all"
            >
              Get Access →
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center pt-24">
        {/* Background work collage — blurred and dark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-[0.06]">
            {[
              "/images/futuree 1.png",
              "/images/gunnawunna 2.png",
              "/images/destroylonelyEXPERIMENTAL3 1.png",
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover scale-110 blur-sm"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Brand mark */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/40 mb-8"
          >
            smegomade®
          </motion.span>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none text-white break-words"
            style={{ fontSize: "clamp(2.5rem, 9vw, 14rem)", letterSpacing: "-0.04em" }}
          >
            KNOWLEDGE<span className="text-white/40">.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-light tracking-[0.4em] uppercase text-white/40 text-sm md:text-base text-center break-words"
          >
            design education
          </motion.p>

          {/* Big white space */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 mb-8 space-y-4 px-4"
          >
            <p className="max-w-md mx-auto text-white/50 text-sm md:text-base leading-relaxed font-light">
            The design knowledge behind cover art for{" "}
            <span className="text-white">Brzo Trči Ljanmi, TNG, Jay Bride</span>{" "}
            and artists across the Balkans — now shared for the first time.
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="#get"
              className="group w-full sm:w-auto text-center bg-white text-black font-mono text-[0.7rem] uppercase tracking-widest px-8 py-4 hover:bg-white/80 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Get the Knowledge →
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto text-center border border-white/10 bg-white/[0.03] backdrop-blur-xl font-mono text-[0.65rem] uppercase tracking-widest px-8 py-4 text-white/50 hover:border-white/30 hover:bg-white/[0.05] hover:text-white transition-all duration-200"
            >
              See the work
            </a>
          </div>

          {/* Scroll hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 flex flex-col items-center gap-2 text-white/20"
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
            <span className="font-mono text-[0.55rem] uppercase tracking-widest">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CREDENTIALS TICKER ─────────────── */}
      <div className="relative z-10">
        <CredentialsTicker />
      </div>

      {/* Proof Strip (Stats) */}
      <section className="py-16 md:py-24 border-t border-white/[0.08] relative overflow-hidden bg-white/[0.01] backdrop-blur-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-8">
            <AnimatedStat end={139} suffix="+" label="Genius Credits" />
            <AnimatedStat end={3} suffix="+" label="Years Active" />
            <AnimatedStat end={4} label="Disciplines" />
            <AnimatedStat end={1} label="Certified Contributor" suffix="×" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <a
              href="https://genius.com/artists/Smegomade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/[0.08] bg-white/[0.03] backdrop-blur-md px-6 py-3 hover:border-white/[0.15] hover:bg-white/[0.06] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffff64] flex-shrink-0" />
              Verified on Genius — @smegomade
              <span className="text-white/20">↗</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WORK GALLERY ───────────────────── */}
      <section id="work" className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end"
          >
            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25 block mb-4">
                01 — Work
              </span>
              <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] text-white tracking-tight">
              The Work<span className="text-white/20">.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed md:max-w-xs md:text-right">
            Client cover art, custom typography, and personal concept posters. Every piece built from scratch.
          </p>
          </motion.div>

          {/* Main gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {galleryItems.map((item) => (
              <GalleryCard key={item.src} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOTHING ───────────────────────── */}
      <section className="py-16 md:py-24 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 pb-12 blur-[100px] opacity-20 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25 block mb-4">
              02 — Merchandise
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 md:items-end gap-6">
              <h2 className="font-black text-5xl md:text-7xl uppercase leading-[0.9] text-white tracking-tight">
                Clothing<span className="text-white/20">.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed md:max-w-xs md:text-right">
                Custom garment design and visual direction — where graphic design becomes wearable.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clothingItems.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                key={i} 
                className="group relative overflow-hidden bg-[#0a0a0a] aspect-square rounded-sm"
              >
                <img
                  src={item.src}
                  alt={`smegomade clothing ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement break */}
      <section className="py-24 md:py-48 border-t border-white/[0.05] relative bg-black/10 backdrop-blur-lg">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl px-6 text-center"
        >
          <p
            className="font-black uppercase leading-[0.95] text-white text-opacity-90 break-words"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.02em" }}
          >
            Client work, concept pieces, clothing —{" "}
            all built on{" "}
            <span className="text-white/25 block md:inline mt-2 md:mt-0">knowledge</span>{" "}
            most designers never get.
          </p>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 justify-center">
            {["Cover Art", "Custom Typography", "Visual Identity", "Music Direction", "Clothing Design"].map(
              (tag, index) => (
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  key={tag} 
                  className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25"
                >
                  {tag}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </section>

      {/* ── THE KNOWLEDGE (modules) ─────────── */}
      <div id="knowledge">
        <ModulesGrid />
      </div>

      {/* ── GET ACCESS (CTA) ───────────────── */}
      <section id="get" className="py-24 md:py-40 relative flex flex-col items-center justify-center border-t border-white/[0.05] border-b border-white/[0.05] overflow-hidden bg-white/[0.01] backdrop-blur-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25 block mb-6">
            Immediate Access
          </span>
          <h2
            className="font-black uppercase leading-none text-white mb-8 break-words"
            style={{ fontSize: "clamp(2.5rem, 9vw, 10rem)", letterSpacing: "-0.04em" }}
          >
            KNOWLEDGE<span className="text-white/20">.</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed mb-10">
            The exact disciplines, systems, and creative process behind
            world-class music visuals — from a Genius verified designer.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-black font-mono text-[0.7rem] uppercase tracking-widest px-8 py-5 hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Get the Knowledge →
          </a>
          <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/15">
            Lifetime access · Instant delivery · No subscriptions
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/[0.05] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-6">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/20">
            smegomade®
          </span>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-[0.55rem] uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              Terms
            </a>
            <a href="https://genius.com/artists/Smegomade" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.55rem] uppercase tracking-widest text-[#ffff64]/60 hover:text-[#ffff64] transition-colors">
              Genius Profile
            </a>
          </div>
          <p className="font-mono text-[0.5rem] uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} All rights reserved. Do not steal.
          </p>
        </div>
      </footer>

    </main>
  );
}
