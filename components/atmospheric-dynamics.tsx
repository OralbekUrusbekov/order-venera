"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Wind, Thermometer, Droplets, Gauge, Play, Pause, RotateCcw, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const translations = {
  kk: {
    title: "Атмосфералық динамика",
    subtitle: "Жер астындағы су айналымының симуляциясы",
    windSpeed: "Жел жылдамдығы",
    temperature: "Температура",
    humidity: "Ылғалдылық",
    pressure: "Қысым",
    depth: "Тереңдік",
    convection: "Конвекция",
    waterFlow: "Су ағыны",
    play: "Ойнату",
    pause: "Кідірту",
    reset: "Қайта бастау",
    layers: "Қабаттар",
    surface: "Беткі қабат",
    underground: "Жер асты",
    deep: "Терең қабат",
    speed: "Жылдамдық",
  },
  ru: {
    title: "Атмосферная динамика",
    subtitle: "Симуляция подземной циркуляции воды",
    windSpeed: "Скорость ветра",
    temperature: "Температура",
    humidity: "Влажность",
    pressure: "Давление",
    depth: "Глубина",
    convection: "Конвекция",
    waterFlow: "Поток воды",
    play: "Воспроизвести",
    pause: "Пауза",
    reset: "Сброс",
    layers: "Слои",
    surface: "Поверхность",
    underground: "Подземный",
    deep: "Глубокий слой",
    speed: "Скорость",
  },
  en: {
    title: "Atmospheric Dynamics",
    subtitle: "Underground water circulation simulation",
    windSpeed: "Wind Speed",
    temperature: "Temperature",
    humidity: "Humidity",
    pressure: "Pressure",
    depth: "Depth",
    convection: "Convection",
    waterFlow: "Water Flow",
    play: "Play",
    pause: "Pause",
    reset: "Reset",
    layers: "Layers",
    surface: "Surface",
    underground: "Underground",
    deep: "Deep Layer",
    speed: "Speed",
  },
}

// Particle system for water flow
function WaterParticle({ delay, path }: { delay: number; path: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-[1px]"
      style={{ offsetPath: `path('${path}')` }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: "100%",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  )
}

// Heat wave effect
function HeatWave({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-8 h-8 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)",
      }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.3, 0.6, 0.3],
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export function AtmosphericDynamics() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState([1])
  const [depth, setDepth] = useState([30])

  // Dynamic values
  const [windSpeed, setWindSpeed] = useState(12)
  const [temperature, setTemperature] = useState(35)
  const [humidity, setHumidity] = useState(45)
  const [pressure, setPressure] = useState(1013)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setWindSpeed((prev) => Math.max(0, Math.min(50, prev + (Math.random() - 0.5) * 5)))
      setTemperature((prev) => Math.max(20, Math.min(50, prev + (Math.random() - 0.5) * 2)))
      setHumidity((prev) => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 5)))
      setPressure((prev) => Math.max(980, Math.min(1040, prev + (Math.random() - 0.5) * 3)))
    }, 1000 / speed[0])
    return () => clearInterval(interval)
  }, [isPlaying, speed])

  // Water flow paths (SVG path data)
  const flowPaths = [
    "M 50 0 Q 100 50 50 100 Q 0 150 50 200",
    "M 150 0 Q 200 80 150 160 Q 100 200 150 250",
    "M 250 0 Q 300 60 250 120 Q 200 180 250 240",
    "M 350 0 Q 400 70 350 140 Q 300 200 350 260",
  ]

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
            <Wind className="w-4 h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300 uppercase tracking-wide font-semibold">
              {t.convection}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-200 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <Card className="border-blue-500/20 bg-card/30 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="w-5 h-5 text-blue-400" />
                    {t.layers}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500/30 bg-transparent"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500/30 bg-transparent"
                      onClick={() => {
                        setWindSpeed(12)
                        setTemperature(35)
                        setHumidity(45)
                        setPressure(1013)
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Visualization area */}
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-gradient-to-b from-amber-900/20 via-blue-900/30 to-blue-950/50 border border-blue-500/10">
                  {/* Layer indicators */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-between py-4 px-2 text-xs text-foreground/50 font-mono">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      {t.surface}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {t.underground}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      {t.deep}
                    </span>
                  </div>

                  {/* Heat waves on surface */}
                  {isPlaying && (
                    <>
                      <HeatWave x={30} y={10} delay={0} />
                      <HeatWave x={50} y={5} delay={1} />
                      <HeatWave x={70} y={12} delay={2} />
                      <HeatWave x={85} y={8} delay={1.5} />
                    </>
                  )}

                  {/* Water flow particles */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    {/* Underground water channels */}
                    <motion.path
                      d="M 0 150 Q 100 100 200 150 Q 300 200 400 150"
                      stroke="rgba(34, 211, 238, 0.3)"
                      strokeWidth="20"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isPlaying ? 1 : 0.5 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                    <motion.path
                      d="M 0 220 Q 150 180 250 220 Q 350 260 400 220"
                      stroke="rgba(34, 211, 238, 0.2)"
                      strokeWidth="30"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isPlaying ? 1 : 0.5 }}
                      transition={{ duration: 3, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                  </svg>

                  // Замените блок с частицами (строки ~272-315) на этот детерминированный вариант:

{isPlaying &&
  Array.from({ length: 20 }, (_, i) => {
    // Детерминированный псевдослучайный генератор на основе LCG
    const lcg = (seed: number) => {
      // Линейный конгруэнтный генератор с фиксированными параметрами
      const m = 2147483647
      const a = 1103515245
      const c = 12345
      return (a * seed + c) % m
    }
    
    const getDeterministicValue = (index: number, multiplier: number) => {
      let value = lcg(index * multiplier)
      // Нормализуем к диапазону 0-1
      value = (value % 1000000) / 1000000
      return value
    }
    
    const left = 20 + getDeterministicValue(i, 2) * 60
    const top = 30 + getDeterministicValue(i, 3) * 40
    const offset1 = getDeterministicValue(i, 4) * 30 - 15
    const offset2 = getDeterministicValue(i, 5) * 50 - 25
    const duration = 2 + getDeterministicValue(i, 6) * 2
    
    return (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
        style={{
          left: `${left.toFixed(4)}%`,
          top: `${top.toFixed(4)}%`,
        }}
        animate={{
          y: [0, 50, 100],
          x: [0, offset1, offset2],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: duration,
          delay: i * 0.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeIn",
        }}
      />
    )
  })}

                  {/* Depth indicator */}
                  <div className="absolute right-4 top-4 bottom-4 w-8 flex flex-col items-center">
                    <div className="flex-1 w-2 rounded-full bg-gradient-to-b from-amber-500 via-blue-500 to-cyan-500 opacity-50" />
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/50"
                      style={{ top: `${depth[0]}%` }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span className="mt-2 text-xs text-foreground/50">{depth[0]}m</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="text-xs text-foreground/50 mb-2 block">{t.depth}</label>
                    <Slider value={depth} onValueChange={setDepth} max={50} min={5} step={1} className="w-full" />
                  </div>
                  <div>
                    <label className="text-xs text-foreground/50 mb-2 block">{t.speed}</label>
                    <Slider value={speed} onValueChange={setSpeed} max={3} min={0.5} step={0.5} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Wind Speed */}
            <Card className="border-teal-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 2 / speed[0], repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Wind className="w-8 h-8 text-teal-400" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-teal-400">{windSpeed.toFixed(1)} m/s</div>
                    <div className="text-xs text-foreground/50">{t.windSpeed}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temperature */}
            <Card className="border-orange-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-8 h-8 text-orange-400" />
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{temperature.toFixed(1)}°C</div>
                    <div className="text-xs text-foreground/50">{t.temperature}</div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-orange-900/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500"
                    style={{ width: `${((temperature - 20) / 30) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="border-blue-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Droplets className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{humidity.toFixed(0)}%</div>
                    <div className="text-xs text-foreground/50">{t.humidity}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pressure */}
            <Card className="border-purple-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Gauge className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{pressure.toFixed(0)} hPa</div>
                    <div className="text-xs text-foreground/50">{t.pressure}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
