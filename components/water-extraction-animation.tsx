"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const translations = {
  kk: {
    title: "Су Шығару Процесі",
    description: "Қадамдық су шығару анимациясы",
    stage1: "1-қадам: Орын зерттеу",
    stage1desc: "Датчиктер су каналдарын анықтайды",
    stage2: "2-қадам: Ғана сөндіру",
    stage2desc: "Специальный бур құм қатты төңіп өтеді",
    stage3: "3-қадам: Су мен",
    stage3desc: "Су асты су жасын беріп шығады",
    stage4: "4-қадам: Шығару",
    stage4desc: "Насос су жамындағы ағынды білдіреді",
  },
  ru: {
    title: "Процесс извлечения воды",
    description: "Пошаговая анимация добычи подземных вод",
    stage1: "Этап 1: Исследование",
    stage1desc: "Датчики обнаруживают подземные каналы",
    stage2: "Этап 2: Бурение",
    stage2desc: "Специальное сверло пробивает песчаный слой",
    stage3: "Этап 3: Прорыв",
    stage3desc: "Вода начинает подниматься из под земли",
    stage4: "Этап 4: Откачка",
    stage4desc: "Насос поднимает воду на поверхность",
  },
  en: {
    title: "Water Extraction Process",
    description: "Step-by-step groundwater extraction animation",
    stage1: "Step 1: Detection",
    stage1desc: "Sensors locate underground water channels",
    stage2: "Step 2: Drilling",
    stage2desc: "Special drill penetrates the sand layer",
    stage3: "Step 3: Breakthrough",
    stage3desc: "Water begins to rise from underground",
    stage4: "Step 4: Pumping",
    stage4desc: "Pump brings water to the surface",
  },
}

export function WaterExtractionAnimation() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = 500

    const animate = () => {
      ctx.fillStyle = "#0a1428"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw sand layers
      ctx.fillStyle = "#8B7355"
      ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.6)

      // Draw water layer
      ctx.fillStyle = "rgba(100, 200, 255, 0.3)"
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3)

      // Draw drill/equipment based on stage
      if (stage >= 1) {
        // Drill head
        ctx.strokeStyle = "#4db8ff"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, canvas.height * 0.3)
        const drillDepth = Math.min(canvas.height * 0.55, canvas.height * 0.3 + stage * 20)
        ctx.lineTo(centerX, drillDepth)
        ctx.stroke()

        // Drill bit
        ctx.fillStyle = "#ff9500"
        ctx.beginPath()
        ctx.arc(centerX, drillDepth, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw water streams
      if (stage >= 3) {
        ctx.strokeStyle = `rgba(100, 200, 255, ${0.5 + Math.sin(Date.now() / 300) * 0.3})`
        ctx.lineWidth = 2
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(centerX - 20 + i * 20, canvas.height * 0.65)
          ctx.lineTo(centerX - 20 + i * 20, canvas.height * 0.35)
          ctx.stroke()
        }
      }

      // Draw pump
      if (stage >= 4) {
        ctx.strokeStyle = "#4db8ff"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(centerX, canvas.height * 0.2, 15, 0, Math.PI * 2)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    const timer = setInterval(() => {
      setStage((s) => (s + 1) % 5)
    }, 3000)

    animate()

    return () => clearInterval(timer)
  }, [stage])

  return (
    <section
      id="extraction"
      className="py-16 sm:py-20 px-4 scroll-mt-24 bg-gradient-to-b from-blue-950/30 to-background"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Animation */}
          <div className="rounded-lg overflow-hidden border border-border bg-black/20">
            <canvas ref={canvasRef} className="w-full h-[500px]" />
          </div>

          {/* Stages */}
          <div className="space-y-4">
            {[
              { label: t.stage1, desc: t.stage1desc },
              { label: t.stage2, desc: t.stage2desc },
              { label: t.stage3, desc: t.stage3desc },
              { label: t.stage4, desc: t.stage4desc },
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`border-border/50 transition-all cursor-pointer ${
                  stage === idx + 1 ? "ring-2 ring-blue-400 bg-blue-500/10" : ""
                }`}
                onClick={() => setStage(idx + 1)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg">{item.label}</CardTitle>
                    <Badge variant="secondary">{idx + 1}</Badge>
                  </div>
                  <CardDescription className="text-sm">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
