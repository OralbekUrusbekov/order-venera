"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowDown, Zap } from "lucide-react"
import { CosmicWaterBackground } from "./cosmic-water-background"

const translations = {
  kk: {
    title: "V-Insight AI",
    subtitle: "Венера атмосферасын және қоршаған ортасын зерттеу",
    description:
      "Венера жағдайындағы температура, қысым және басқа экологиялық көрсеткіштерді талдайтын жасанды интеллект жүйесі. Деректер автоматты түрде өңделеді, атмосфералық динамика мен қоршаған орта параметрлері көрсетіледі.",
    discover: "Зерттеуді бастау",
    challenge: "VENUS ENVIRONMENTAL AI MISSION",
    stats: "Автоматтандырылған талдау нәтижелері",
  },
  ru: {
    title: "V-Insight AI",
    subtitle: "Изучение атмосферы и окружающей среды Венеры",
    description:
      "Система искусственного интеллекта анализирует температуру, давление и другие экологические показатели Венеры. Данные обрабатываются автоматически, отображаются параметры атмосферной динамики и окружающей среды.",
    discover: "Начать исследование",
    challenge: "VENUS ENVIRONMENTAL AI MISSION",
    stats: "Результаты автоматизированного анализа",
  },
  en: {
    title: "V-Insight AI",
    subtitle: "Exploring Venus' atmosphere and environment",
    description:
      "An AI-powered system that analyzes temperature, pressure, and other environmental parameters on Venus. Data is processed automatically, visualizing atmospheric dynamics and environmental metrics.",
    discover: "Start Exploration",
    challenge: "VENUS ENVIRONMENTAL AI MISSION",
    stats: "Automated analysis results",
  },
}


export function AquateraHero() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="home"
      className="relative min-h-[120svh] pt-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cosmic water background */}
      <CosmicWaterBackground />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Challenge banner */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm text-cyan-300 uppercase tracking-wide font-semibold">{t.challenge}</span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            {t.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl md:text-3xl text-cyan-200/80 mb-6 font-light tracking-wide">{t.subtitle}</p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          {t.description}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white gap-2 mb-12 shadow-lg shadow-cyan-500/50 text-base"
        >
          {t.discover}
          <ArrowDown className="w-4 h-4" />
        </Button>

        {/* Stats */}
        <div className="text-xs sm:text-sm text-foreground/40 uppercase tracking-widest font-bold opacity-70">
          {t.stats}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
