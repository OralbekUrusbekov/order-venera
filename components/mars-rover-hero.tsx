"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RoverScene } from "@/components/rover-scene"
import { ChevronDown } from "lucide-react"

const translations = {
  kk: {
    title: "Марс зерттеушісі",
    subtitle: "Arduino негізіндегі робот",
    description: "Білім беру мақсатындағы Марс бетін зерттеуге арналған автономды робот",
    cta: "Жобаны көру",
    learn: "Толығырақ",
  },
  ru: {
    title: "Марсоход",
    subtitle: "Робот на базе Arduino",
    description: "Автономный робот для исследования поверхности Марса в образовательных целях",
    cta: "Смотреть проект",
    learn: "Узнать больше",
  },
  en: {
    title: "Mars Rover",
    subtitle: "Arduino-based Robot",
    description: "Autonomous robot designed for Mars surface exploration in educational purposes",
    cta: "View Project",
    learn: "Learn More",
  },
}

export function MarsRoverHero() {
  const [lang] = useState<"kk" | "ru" | "en">("kk")
  const t = translations[lang]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 z-0">
        <RoverScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary text-sm font-mono">{t.subtitle}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">{t.title}</h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">{t.description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="min-w-[200px]">
              {t.cta}
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent">
              {t.learn}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
