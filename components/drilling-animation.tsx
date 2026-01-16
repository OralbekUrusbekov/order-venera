"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useRef, useState } from "react"

 const translations = {
  kk: {
    phase: "КЕЗЕҢ",
    detecting: "АНЫҚТАУ",
    drilling: "БҰРҒЫЛАУ",
    breakthrough: "ӨТУ",
    pumping: "СОРҒЫЛАУ",
    temp: "Температура",
    humidity: "ЫЛҒАЛДЫЛЫҚ",
    depth: "ТЕРЕҢДІК",
    meters: "м",
    celsius: "°C",
    percent: "%",
    waterFound: "СУ ТАБЫЛДЫ!",
    underground: "Жерасты су арналары",
  },
  ru: {
    phase: "ЭТАП",
    detecting: "ОБНАРУЖЕНИЕ",
    drilling: "БУРЕНИЕ",
    breakthrough: "ПРОРЫВ",
    pumping: "ОТКАЧКА",
    temp: "Температура",
    humidity: "Влажность",
    depth: "Глубина",
    meters: "м",
    celsius: "°C",
    percent: "%",
    waterFound: "ВОДА НАЙДЕНА!",
    underground: "Подземные водные пути",
  },
  en: {
    phase: "PHASE",
    detecting: "DETECTING",
    drilling: "DRILLING",
    breakthrough: "BREAKTHROUGH",
    pumping: "PUMPING",
    temp: "Temperature",
    humidity: "Humidity",
    depth: "Depth",
    meters: "м",
    celsius: "°C",
    percent: "%",
    waterFound: "WATER FOUND!",
    underground: "Underground water channels",
  },
}

// SVG бурау қондырғысының моделі - фотого сәйкес
const DrillingDeviceSVG = ({ phase, progress }: { phase: number; progress: number }) => {
  const rotation = (phase + progress) * 360
  const drillY = 70 + progress * 200
  
  return (
    <svg 
      viewBox="0 0 400 400" 
      className="w-full h-auto"
      style={{ maxHeight: "300px" }}
    >
      {/* Аспан фон */}
      <rect x="0" y="0" width="400" height="100" fill="url(#skyGradient)" />
      
      {/* Жер беті - фотоға сәйкес */}
      <rect x="0" y="95" width="400" height="10" fill="#8B4513" />
      <rect x="0" y="100" width="400" height="5" fill="#654321" />
      
      {/* Топырақ қабаттары */}
      <g>
        {/* Жоғарғы қабат */}
        <rect x="0" y="105" width="400" height="60" fill="#D2B48C" />
        
        {/* Орта қабат */}
        <rect x="0" y="165" width="400" height="70" fill="#A0522D" />
        
        {/* Төменгі қабат */}
        <rect x="0" y="235" width="400" height="80" fill="#8B4513" />
        
        {/* Тау жынысы */}
        <rect x="0" y="315" width="400" height="90" fill="#696969" />
        
        {/* Су қабаты */}
        <rect x="0" y="405" width="400" height="60" fill="rgba(30, 144, 255, 0.15)" />
        
        {/* Қабат сызықтары */}
        <line x1="0" y1="165" x2="400" y2="165" stroke="rgba(139,69,19,0.5)" strokeWidth="1" />
        <line x1="0" y1="235" x2="400" y2="235" stroke="rgba(160,82,45,0.5)" strokeWidth="1" />
        <line x1="0" y1="315" x2="400" y2="315" stroke="rgba(105,105,105,0.6)" strokeWidth="1" />
        <line x1="0" y1="405" x2="400" y2="405" stroke="rgba(30,144,255,0.5)" strokeWidth="2" strokeDasharray="8 4" />
      </g>
      
      {/* Су каналдары */}
      <path 
        d="M50,390 Q200,410 350,380" 
        stroke="rgba(30, 144, 255, 0.6)" 
        strokeWidth="5" 
        fill="none"
        strokeDasharray="15 8"
      />
      <path 
        d="M100,430 Q250,420 300,440" 
        stroke="rgba(30, 144, 255, 0.4)" 
        strokeWidth="4" 
        fill="none"
        strokeDasharray="12 6"
      />
      
      {/* БАСТАПҚЫ ҚҰРЫЛҒЫ - ФОТОҒА СӘЙКЕС */}
      <g transform="translate(200, 20)">
        
        {/* 1. НЕГІЗГІ МАШИНА БЛОКИ */}
        <rect x="-40" y="0" width="80" height="60" rx="8" fill="#2F4F4F" />
        <rect x="-38" y="2" width="76" height="56" rx="6" fill="#36454F" />
        
        {/* 2. СОЛАР ПАНЕЛЬДЕРІ (үстіңгі жағында) */}
        <g transform="translate(0, 5)">
          {/* Солар панель корпусы */}
          <rect x="-35" y="0" width="70" height="15" rx="3" fill="#1C1C1C" />
          
          {/* Солар элементтері - фотоға сәйкес */}
          <g>
            {/* Бірінші қатар */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect
                key={`top-${i}`}
                x={-32 + i * 11}
                y="2"
                width="8"
                height="5"
                fill="#FFA500"
                rx="1"
              />
            ))}
            
            {/* Екінші қатар */}
            {Array.from({ length: 6 }).map((_, i) => (
              <rect
                key={`bottom-${i}`}
                x={-32 + i * 11}
                y="8"
                width="8"
                height="5"
                fill="#FF8C00"
                rx="1"
              />
            ))}
          </g>
          
          {/* Солар панель аяқтары */}
          <rect x="-35" y="15" width="70" height="3" fill="#696969" />
        </g>
        
        {/* 3. КАМЕРА БЛОКИ (ортасында) - ФОТОДАҒЫДАЙ */}
        <g transform="translate(0, 25)">
          {/* Камера корпусы */}
          <rect x="-15" y="0" width="30" height="25" rx="4" fill="#4A4A4A" />
          <rect x="-13" y="2" width="26" height="21" rx="2" fill="#2C2C2C" />
          
          {/* Камера линзасы - үлкен және айқын */}
          <circle cx="0" cy="10" r="8" fill="url(#lensGradient)" />
          <circle cx="0" cy="10" r="6" fill="rgba(0, 0, 0, 0.3)" />
          
          {/* Камера жарық индикаторлары */}
          <circle cx="-10" cy="20" r="2" fill="#00FF00" />
          <circle cx="10" cy="20" r="2" fill="#FF0000" />
          
          {/* Камера астындағы панель */}
          <rect x="-10" y="25" width="20" height="3" fill="#696969" />
        </g>
        
        {/* 4. МОТОР БЛОКИ (астында) */}
        <g transform="translate(0, 50)">
          <rect x="-25" y="0" width="50" height="15" rx="4" fill="#708090" />
          <rect x="-23" y="2" width="46" height="11" rx="2" fill="#778899" />
          
          {/* Мотор құрылғысы */}
          <circle cx="0" cy="7.5" r="10" fill="#2F4F4F" />
          <circle cx="0" cy="7.5" r="6" fill="#36454F" />
          
          {/* Айналмалы бөлік */}
          <g transform={`rotate(${rotation}, 0, 7.5)`}>
            <line x1="0" y1="7.5" x2="0" y2="-5" stroke="#FFD700" strokeWidth="2" />
            <line x1="0" y1="7.5" x2="10" y2="15" stroke="#FFD700" strokeWidth="2" />
            <line x1="0" y1="7.5" x2="-10" y2="15" stroke="#FFD700" strokeWidth="2" />
          </g>
        </g>
        
        {/* 5. БҰРҒЫ ТҮТІГІ */}
        <g>
          {/* Сыртқы түтік */}
          <line 
            x1="0" 
            y1="65" 
            x2="0" 
            y2={drillY} 
            stroke="#A9A9A9" 
            strokeWidth="10" 
          />
          
          {/* Ішкі түтік */}
          <line 
            x1="0" 
            y1="65" 
            x2="0" 
            y2={drillY} 
            stroke="#696969" 
            strokeWidth="6" 
          />
          
          {/* Бұрғы сымы */}
          <line 
            x1="0" 
            y1="65" 
            x2="0" 
            y2={drillY} 
            stroke="#FF4500" 
            strokeWidth="2" 
            strokeDasharray="15 8"
          />
          
          {/* БҰРҒЫ БАСЫ - ФОТОДАҒЫДАЙ */}
          <g transform={`rotate(${rotation * 2}, 0, ${drillY})`}>
            {/* Бұрғының негізгі бөлігі */}
            <circle cx="0" cy={drillY} r="12" fill="#4A4A4A" />
            <circle cx="0" cy={drillY} r="8" fill="#2C2C2C" />
            
            {/* Бұрғы тістері */}
            <polygon 
              points="-15,0 -8,-15 8,-15 15,0 8,15 -8,15" 
              transform={`translate(0, ${drillY})`}
              fill="#B22222" 
              stroke="#8B0000" 
              strokeWidth="1.5" 
            />
            
            {/* Орталық бөлік */}
            <circle cx="0" cy={drillY} r="5" fill="#FFD700" />
          </g>
        </g>
        
        {/* 6. СУ ЭФФЕКТТЕРІ */}
        {phase >= 2 && (
          <g>
            {/* Су бөлшектері */}
            {Array.from({ length: Math.floor(progress * 20) }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2
              const distance = 20 + Math.random() * 50 * progress
              return (
                <circle
                  key={i}
                  cx={Math.cos(angle) * distance}
                  cy={drillY + Math.sin(angle) * distance + i}
                  r={1 + Math.random() * 2}
                  fill="rgba(30, 144, 255, 0.7)"
                />
              )
            })}
            
            {/* Су атылуы */}
            {phase === 2 && progress > 0.4 && (
              <g>
                <circle
                  cx="0"
                  cy={drillY}
                  r={70 * Math.min((progress - 0.4) / 0.6, 1)}
                  fill="url(#waterSpray)"
                />
                
                {/* Су толқындары */}
                <circle
                  cx="0"
                  cy={drillY}
                  r={90 * Math.min((progress - 0.4) / 0.6, 1)}
                  fill="none"
                  stroke="rgba(30, 144, 255, 0.3)"
                  strokeWidth="3"
                  strokeDasharray="10 5"
                />
              </g>
            )}
          </g>
        )}
        
        {/* 7. АҚПАРАТ ПАНЕЛІ */}
        <rect x="-25" y="55" width="50" height="8" fill="#1C1C1C" rx="2" />
        <text 
          x="0" 
          y="60" 
          textAnchor="middle" 
          fontSize="4" 
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
        >
          PHASE {phase + 1}
        </text>
        
      </g>
      
      {/* ФОН ЭЛЕМЕНТТЕРІ */}
      {/* Қосымша солар панельдер */}
      <g transform="translate(80, 60)">
        <rect x="0" y="0" width="40" height="12" fill="#1C1C1C" rx="2" />
        <rect x="3" y="2" width="34" height="8" fill="#FF8C00" />
      </g>
      
      <g transform="translate(280, 65)">
        <rect x="0" y="0" width="35" height="10" fill="#1C1C1C" rx="2" />
        <rect x="3" y="2" width="29" height="6" fill="#FF8C00" />
      </g>
      
      {/* Градиенттер */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0e27" />
          <stop offset="70%" stopColor="#1a2a4a" />
          <stop offset="100%" stopColor="#2c3e50" />
        </linearGradient>
        
        <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="30%" stopColor="#1E90FF" />
          <stop offset="70%" stopColor="#0000CD" />
          <stop offset="100%" stopColor="#000080" />
        </radialGradient>
        
        <radialGradient id="waterSpray" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(30, 144, 255, 0.4)" />
          <stop offset="50%" stopColor="rgba(30, 144, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(30, 144, 255, 0.1)" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function DrillingAnimation() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  const timerRef = useRef<number>(0)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const totalDuration = 16000 // Барлық 4 фазаның жалпы уақыты (4 * 4000)
    const phaseDuration = 4000 // Әр фазаның ұзақтығы

    const updateAnimation = () => {
      const currentTime = Date.now()
      const elapsedTime = currentTime - startTimeRef.current
      
      // Циклдік уақыт (0-ден totalDuration-ге дейін)
      const cycleTime = elapsedTime % totalDuration
      
      // Ағымдағы фазаны есептеу
      const newPhase = Math.floor(cycleTime / phaseDuration)
      setCurrentPhase(newPhase)
      
      // Ағымдағы фаза ішіндегі прогресті есептеу (0-ден 1-ге дейін)
      const phaseTime = cycleTime % phaseDuration
      const newProgress = phaseTime / phaseDuration
      setAnimationProgress(newProgress)

      animationRef.current = requestAnimationFrame(updateAnimation)
    }

    animationRef.current = requestAnimationFrame(updateAnimation)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const phases = [
    { title: t.detecting, color: "from-yellow-500 to-orange-500" },
    { title: t.drilling, color: "from-red-500 to-orange-500" },
    { title: t.breakthrough, color: "from-cyan-500 to-blue-500" },
    { title: t.pumping, color: "from-blue-500 to-indigo-500" },
  ]

  const sensorData = [
    { label: t.temp, value: "24", unit: t.celsius, color: "text-orange-400" },
    { label: t.humidity, value: "65", unit: t.percent, color: "text-cyan-400" },
    { label: t.depth, value: String(150 + currentPhase * 50), unit: t.meters, color: "text-blue-400" },
  ]

  return (
    <section id="drilling" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          {t.phase} {currentPhase + 1}/4
        </h2>

        {currentPhase === 2 && (
          <div className="text-center mb-8 animate-pulse">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full text-lg">
              {t.waterFound}
            </span>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-background/50 border border-blue-900/30 rounded-lg p-6 backdrop-blur-sm">
              {/* SVG модельді мұнда қолданыңыз */}
              <DrillingDeviceSVG phase={currentPhase} progress={animationProgress} />
            </div>

            <div className="mt-4 p-4 bg-background/30 border border-cyan-900/30 rounded-lg">
              <p className="text-sm text-cyan-300 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-cyan-400/50 rounded-full"></span>
                {t.underground}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-300 mb-6">{phases[currentPhase].title}</h3>

            <div className="space-y-2 mb-8">
              {phases.map((phase, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded text-sm font-semibold transition-all ${
                    idx === currentPhase
                      ? `bg-gradient-to-r ${phase.color} text-white`
                      : "bg-background/30 text-foreground/50"
                  }`}
                >
                  {idx + 1}. {phase.title}
                </div>
              ))}
            </div>

            <div className="bg-background/50 border border-blue-900/30 rounded-lg p-4 space-y-3">
              {sensorData.map((sensor, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">{sensor.label}</span>
                  <span className={`font-bold ${sensor.color}`}>
                    {sensor.value}
                    {sensor.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
