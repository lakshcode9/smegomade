"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "motion/react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { RevealWaveImage } from "@/components/ui/reveal-wave-image"

export interface StackImage {
  id: string | number;
  src: string;
  alt: string;
  label?: string;
  type?: string;
}

interface VerticalImageStackProps {
  images: StackImage[];
}

export function VerticalImageStack({ images }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const [revealedCards, setRevealedCards] = useState<Set<string | number>>(new Set())
  const toggleCardReveal = (id: string | number, e: React.MouseEvent) => {
    // Prevent toggle if it's a significant drag
    if (e.defaultPrevented) return
    setRevealedCards(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-transparent rounded-3xl">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[500px] w-full max-w-[320px] items-center justify-center" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={(e) => isCurrent && toggleCardReveal(image.id, e)}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="group relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-black/40 backdrop-blur-2xl ring-1 ring-white/10 transition-all duration-700 hover:ring-white/25"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(255,255,255, 0.12), 0 0 0 1px rgba(255,255,255, 0.05), inset 0 0 40px rgba(255,255,255,0.02)"
                    : "0 10px 30px -10px rgba(0,0,0, 0.5)",
                }}
              >
                {/* Milky glass reflection overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -inset-[100%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 -translate-y-[10%] group-hover:translate-y-[0%] transition-transform duration-1000 ease-out" />
                </div>

                {/* Card edge highlight (milky) */}
                <div className="absolute inset-0 z-10 rounded-3xl bg-[linear-gradient(110deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.08)_100%)] pointer-events-none" />

                <div className="absolute inset-0 w-full h-full scale-[1.01] group-hover:scale-105 transition-transform duration-1000">
                  <RevealWaveImage
                    src={image.src || "/placeholder.svg"}
                    waveSpeed={0.4}
                    waveFrequency={1.5}
                    waveAmplitude={0.3}
                    revealRadius={0.35}
                    revealSoftness={0.7}
                    pixelSize={2.2}
                    mouseRadius={0.25}
                    toggleColor={revealedCards.has(image.id)}
                    className="h-full w-full"
                  />
                </div>

                {/* Info Overlay for the image */}
                <div className="absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                
                {isCurrent && image.label && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-8 left-8 right-8 z-30 pointer-events-none"
                  >
                    {image.type && (
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/30 mb-2 block">
                        {image.type}
                      </span>
                    )}
                    <h3 className="font-black text-lg md:text-xl uppercase tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                      {image.label}
                    </h3>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-4 md:right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3 z-40">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-6 bg-white" : "bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction hint */}
      <motion.div
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.div>
          <span className="font-mono text-[0.55rem] tracking-widest uppercase">Scroll or drag</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* Counter */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-light text-white tabular-nums drop-shadow-md">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-2 h-px w-6 md:w-8 bg-white/20" />
          <span className="text-xs md:text-sm text-white/40 tabular-nums">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
