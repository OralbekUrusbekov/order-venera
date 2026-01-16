"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

const translations = {
  kk: {
    title: "Су Асты Су",
    subtitle: "Орталық Азияның су тапшылығын шешу",
    description:
      "Arduino Uno негіздеп құрылған ғарыш аппаратының интерактивті платформасы. Мойынқұм шөлінің астындағы су каналдарын анықтап, су шығару системасы.",
    cta: "Жүйені зерттеу",
  },
  ru: {
    title: "Подземные воды",
    subtitle: "Решение проблемы нехватки воды в Центральной Азии",
    description:
      "Интерактивная платформа для обнаружения и извлечения подземных вод под пустыней Moyinqum. Система на базе Arduino для устойчивого решения водного кризиса региона.",
    cta: "Исследовать систему",
  },
  en: {
    title: "Underground Water",
    subtitle: "Solving Central Asia's water crisis",
    description:
      "An interactive platform to detect and extract underground water channels beneath the Moyinqum desert. Arduino-based system for sustainable groundwater solutions in Zhambyl region.",
    cta: "Explore System",
  },
}

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  opacity: number
  fadeDirection: number
}

export function Hero() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 60 : 150

    const particles: Particle[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        particle.opacity += particle.fadeDirection * 0.01
        if (particle.opacity >= 1) {
          particle.opacity = 1
          particle.fadeDirection = -1
        } else if (particle.opacity <= 0.2) {
          particle.opacity = 0.2
          particle.fadeDirection = 1
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity * 0.6})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-[100svh] pt-20 flex items-center justify-center overflow-hidden">
      {/* Background with water-inspired gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950" />

      {/* Flowing water particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
          {t.title}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-cyan-300 mb-5">{t.subtitle}</p>

        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.description}
        </p>

        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          {t.cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}
