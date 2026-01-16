"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

/* ---------------- TRANSLATIONS ---------------- */

const translations = {
  kk: {
    title: "V-Insight AI",
    subtitle: "Жасанды интеллект арқылы Венера атмосферасын зерттеу",
    neuralNetwork: "Нейросеть белсенділігі",
    dataProcessing: "Деректерді өңдеу",
    predictions: "Болжамдар",
    accuracy: "Дәлдік",
    processing: "Өңдеу",
    learning: "Үйрену",
    anomalies: "Аномалиялар анықталды",
    atmosphericLayers: "Атмосфералық қабаттар",
    confidence: "Сенімділік",
    realtime: "Нақты уақыт",
    aiStatus: "AI Жүйесі",
    active: "Белсенді",
    analyzing: "Талдауда...",
  },
  ru: {
    title: "V-Insight AI",
    subtitle: "Изучение атмосферы Венеры с помощью ИИ",
    neuralNetwork: "Активность нейросети",
    dataProcessing: "Обработка данных",
    predictions: "Прогнозы",
    accuracy: "Точность",
    processing: "Обработка",
    learning: "Обучение",
    anomalies: "Обнаружено аномалий",
    atmosphericLayers: "Атмосферные слои",
    confidence: "Уверенность",
    realtime: "Реальное время",
    aiStatus: "AI Система",
    active: "Активна",
    analyzing: "Анализ...",
  },
  en: {
    title: "V-Insight AI",
    subtitle: "AI-powered Venus atmosphere analysis",
    neuralNetwork: "Neural Network Activity",
    dataProcessing: "Data Processing",
    predictions: "Predictions",
    accuracy: "Accuracy",
    processing: "Processing",
    learning: "Learning",
    anomalies: "Anomalies Detected",
    atmosphericLayers: "Atmospheric Layers",
    confidence: "Confidence",
    realtime: "Real-time",
    aiStatus: "AI System",
    active: "Active",
    analyzing: "Analyzing...",
  },
}


/* ---------------- TYPES ---------------- */

type Particle = {
  left: string
  top: string
}

/* ---------------- HELPERS ---------------- */

function NeuralNode({
  x,
  y,
  delay,
}: {
  x: number
  y: number
  delay: number
}) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-cyan-400"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  )
}

function ConnectionLine({
  from,
  to,
  delay,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
}) {
  const length = Math.hypot(to.x - from.x, to.y - from.y)
  const angle =
    (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI

  return (
    <motion.div
      className="absolute h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0"
      style={{
        left: `${from.x}%`,
        top: `${from.y}%`,
        width: `${length}%`,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
      }}
      animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  )
}

/* ---------------- MAIN COMPONENT ---------------- */

export function VenusAIInsights() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [isPlaying, setIsPlaying] = useState(true) 
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [accuracy, setAccuracy] = useState(94.2)
  const [processing, setProcessing] = useState(78)
  const [anomalies, setAnomalies] = useState(3)
  const [channels, setChannels] = useState(12)

  // Генерация стабильных частиц при монтировании
  useEffect(() => {
    setMounted(true)
    
    // Генерируем детерминированные частицы на основе seed
    const seedParticles = Array.from({ length: 20 }, (_, i) => {
      // Используем простой детерминированный алгоритм на основе индекса
      const pseudoRandom = (index: number, max: number) => {
        return ((index * 9301 + 49297) % 233280) / 233280 * max
      }
      
      return {
        left: `${pseudoRandom(i * 2, 100)}%`,
        top: `${pseudoRandom(i * 2 + 1, 100)}%`,
      }
    })
    
    setParticles(seedParticles)
  }, [])

  /* ✅ LIVE METRICS */
  useEffect(() => {
    if (!mounted) return

    const i = setInterval(() => {
      setAccuracy((v) => Math.min(99.9, v + (Math.random() - 0.3)))
      setProcessing((v) =>
        Math.max(50, Math.min(100, v + (Math.random() - 0.5) * 5))
      )
    }, 2000)

    return () => clearInterval(i)
  }, [mounted])

  const nodes = [
    { x: 10, y: 20 },
    { x: 25, y: 50 },
    { x: 15, y: 80 },
    { x: 40, y: 20 },
    { x: 45, y: 50 },
    { x: 42, y: 80 },
    { x: 70, y: 30 },
    { x: 75, y: 60 },
    { x: 70, y: 90 },
  ]

  const connections = [
    { from: nodes[0], to: nodes[3] },
    { from: nodes[1], to: nodes[4] },
    { from: nodes[2], to: nodes[5] },
    { from: nodes[3], to: nodes[6] },
    { from: nodes[4], to: nodes[7] },
    { from: nodes[5], to: nodes[8] },
  ]

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/10 to-background" />

      {/* ✅ PARTICLES — РЕНДЕРИМ ТОЛЬКО НА КЛИЕНТЕ ПОСЛЕ МОНТИРОВАНИЯ */}
      {mounted && isPlaying && particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-4xl font-black mb-4 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-center text-foreground/60 mb-12">
          {t.subtitle}
        </p>

        <Card className="bg-card/30 backdrop-blur-xl border-cyan-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              {t.neuralNetwork}
              <Badge className="ml-auto bg-cyan-500/20 text-cyan-400">
                {t.realtime}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-72 border border-cyan-500/10 rounded-lg">
              {connections.map((c, i) => (
                <ConnectionLine
                  key={i}
                  from={c.from}
                  to={c.to}
                  delay={i * 0.2}
                />
              ))}
              {nodes.map((n, i) => (
                <NeuralNode
                  key={i}
                  x={n.x}
                  y={n.y}
                  delay={i * 0.2}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">
                  {accuracy.toFixed(1)}%
                </div>
                <div className="text-xs text-foreground/50">
                  {t.accuracy}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">
                  {processing}%
                </div>
                <div className="text-xs text-foreground/50">
                  {t.processing}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 flex items-center justify-center gap-1">
                  <TrendingUp className="w-5 h-5" /> +12%
                </div>
                <div className="text-xs text-foreground/50">
                  {t.learning}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Добавьте отсутствующие импорты иконок
import {
  Brain,
  Activity,
  Cpu,
  Network,
  TrendingUp,
  Eye,
  Sparkles,
} from "lucide-react"