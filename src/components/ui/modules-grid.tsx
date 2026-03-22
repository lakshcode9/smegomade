"use client";

import { Box, Palette, BookOpen, Music, Settings } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function ModulesGrid() {
  return (
    <section className="py-24 border-t border-white/[0.05] border-b border-white/[0.05] relative bg-black/5 backdrop-blur-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end"
        >
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/25 block mb-4">
              03 — The Knowledge
            </span>
            <h2 className="font-black text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              Five disciplines.<br />
              <span className="text-white/25">One level up.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed md:text-right">
            Not a course. Not a template pack. The actual knowledge behind the
            work — direct from a Genius certified designer who has built visuals
            for some of music&apos;s biggest names.
          </p>
        </motion.div>

        {/* Glowing grid - exact implementation of demo.tsx */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            delay={0.1}
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4" />}
            title="Visual Identity & Cover Art"
            description="How to build a complete visual world for an artist from nothing. Concept, direction, and execution."
          />
          <GridItem
            delay={0.2}
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Palette className="h-4 w-4" />}
            title="Custom Typography"
            description="From blood-metal lettering to luxury gold scripts — how to design type that feels like no font ever could."
          />
          <GridItem
            delay={0.3}
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<BookOpen className="h-4 w-4" />}
            title="Poster & Editorial"
            description="Composition theory, color psychology, image layering, and the editorial sensibility that stops scrolling."
          />
          <GridItem
            delay={0.4}
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Music className="h-4 w-4" />}
            title="Music-Linked Creativity"
            description="How to translate a song, an artist's energy, and a sonic identity into a visual language."
          />
          <GridItem
            delay={0.5}
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Settings className="h-4 w-4" />}
            title="Process & Presence"
            description="The real workflow. How to iterate fast, and position yourself so serious artists come to you."
          />
        </ul>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  delay?: number;
}

const GridItem = ({ area, icon, title, description, delay = 0 }: GridItemProps) => {
  return (
    <motion.li 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("min-h-[14rem] list-none", area)}
    >
      <div className="relative h-full rounded-[1.25rem] md:rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-2 md:p-3 overflow-hidden">
        <GlowingEffect
          blur={20}
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/[0.05] bg-black/40 backdrop-blur-md p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] md:p-6 z-10">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="text-white drop-shadow-md">{icon}</div>
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white drop-shadow-md">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-white/60">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};
