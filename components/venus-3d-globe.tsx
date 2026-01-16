"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Globe, Layers, Thermometer, Droplets, MapPin, ZoomIn, ZoomOut, Eye, RotateCw } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"

// 3D Venus Model Component
function Venus3DSphere() {
  const venusRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (venusRef.current) {
      venusRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      <mesh ref={venusRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#FF9966"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Atmospheric layer */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FFCC99"
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
    </>
  )
}

function VenusModel({ zoom = 1, rotation = 0 }: { zoom?: number; rotation?: number }) {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ 
          position: [0, 0, 3 * zoom], 
          fov: 50 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.5} 
          color="#FF9966" 
        />
        
        <Suspense fallback={null}>
          <group rotation={[0, rotation * Math.PI / 180, 0]}>
            <Venus3DSphere />
          </group>
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={1.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  )
}

const translations = {
  kk: {
    title: "Венера 3D Картасы",
    subtitle: "Венераның жер асты суларының интерактивті картасы",
    temperature: "Температура",
    humidity: "Ылғалдылық",
    depth: "Тереңдік",
    waterChannels: "Су каналдары",
    hotspots: "Белсенді аймақтар",
    legend: "Легенда",
    highWater: "Жоғары су мөлшері",
    mediumWater: "Орташа су",
    lowWater: "Төмен су",
    noWater: "Су жоқ",
    zoom: "Масштаб",
    rotate: "Айналдыру",
    layers: "Қабаттар",
    surface: "Беткі қабат",
    underground: "Жер асты",
    deep: "Терең қабат",
    region: "Аймақ",
    clickToExplore: "Зерттеу үшін басыңыз",
    rotateModel: "Модельді айналдыру",
    resetView: "Көріністі қалпына келтіру",
    waterDetection: "Су анықтау",
    activeZones: "Белсенді аймақтар",
  },
  ru: {
    title: "3D Карта Венеры",
    subtitle: "Интерактивная карта подземных вод Венеры",
    temperature: "Температура",
    humidity: "Влажность",
    depth: "Глубина",
    waterChannels: "Водные каналы",
    hotspots: "Активные зоны",
    legend: "Легенда",
    highWater: "Высокий уровень воды",
    mediumWater: "Средний уровень",
    lowWater: "Низкий уровень",
    noWater: "Нет воды",
    zoom: "Масштаб",
    rotate: "Вращение",
    layers: "Слои",
    surface: "Поверхность",
    underground: "Подземный",
    deep: "Глубокий слой",
    region: "Регион",
    clickToExplore: "Нажмите для изучения",
    rotateModel: "Вращать модель",
    resetView: "Сбросить вид",
    waterDetection: "Обнаружение воды",
    activeZones: "Активные зоны",
  },
  en: {
    title: "Venus 3D Map",
    subtitle: "Interactive map of Venus underground water resources",
    temperature: "Temperature",
    humidity: "Humidity",
    depth: "Depth",
    waterChannels: "Water Channels",
    hotspots: "Active Zones",
    legend: "Legend",
    highWater: "High Water Content",
    mediumWater: "Medium Water",
    lowWater: "Low Water",
    noWater: "No Water",
    zoom: "Zoom",
    rotate: "Rotate",
    layers: "Layers",
    surface: "Surface",
    underground: "Underground",
    deep: "Deep Layer",
    region: "Region",
    clickToExplore: "Click to explore",
    rotateModel: "Rotate Model",
    resetView: "Reset View",
    waterDetection: "Water Detection",
    activeZones: "Active Zones",
  },
}

// Water hotspot component
function WaterHotspot({
  x,
  y,
  intensity,
  delay,
  onClick,
}: { x: number; y: number; intensity: "high" | "medium" | "low"; delay: number; onClick: () => void }) {
  const colors = {
    high: "from-cyan-400 to-blue-500",
    medium: "from-blue-400 to-indigo-500",
    low: "from-indigo-400 to-purple-500",
  }

  const sizes = {
    high: "w-6 h-6",
    medium: "w-5 h-5",
    low: "w-4 h-4",
  }

  return (
    <motion.button
      className={`absolute ${sizes[intensity]} rounded-full bg-gradient-to-br ${colors[intensity]} cursor-pointer z-10`}
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
        boxShadow: [
          `0 0 0 0 rgba(34, 211, 238, 0)`,
          `0 0 20px 10px rgba(34, 211, 238, 0.3)`,
          `0 0 0 0 rgba(34, 211, 238, 0)`,
        ],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.5 }}
      onClick={onClick}
    />
  )
}

// Overlay grid for the 3D model
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,200,150,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,200,150,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        zIndex: 1,
      }}
    />
  )
}

// Water channels overlay
function WaterChannelsOverlay({ visible }: { visible: boolean }) {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none z-5"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.6 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <radialGradient id="waterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Water detection zones */}
      <circle cx="100" cy="120" r="40" fill="url(#waterGlow)" />
      <circle cx="250" cy="80" r="35" fill="url(#waterGlow)" />
      <circle cx="180" cy="200" r="30" fill="url(#waterGlow)" />
      <circle cx="320" cy="150" r="25" fill="url(#waterGlow)" />
    </motion.svg>
  )
}

export function Venus3DGlobe() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [zoom, setZoom] = useState(1)
  const [manualRotation, setManualRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showWaterDetection, setShowWaterDetection] = useState(true)
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [activeLayer, setActiveLayer] = useState<"surface" | "underground" | "deep">("underground")

  // Hotspots data
  const hotspots = [
    { 
      x: 20, 
      y: 30, 
      intensity: "high" as const, 
      temp: 465, 
      humidity: 96, 
      depth: 5,
      name: "Maxwell Montes",
      description: "Высокогорный регион с возможными водными резервуарами"
    },
    { 
      x: 60, 
      y: 40, 
      intensity: "high" as const, 
      temp: 462, 
      humidity: 92, 
      depth: 8,
      name: "Ishtar Terra",
      description: "Обширное плато с подземными водными каналами"
    },
    { 
      x: 40, 
      y: 60, 
      intensity: "medium" as const, 
      temp: 467, 
      humidity: 78, 
      depth: 15,
      name: "Aphrodite Terra",
      description: "Экваториальный регион с умеренными водными запасами"
    },
    { 
      x: 75, 
      y: 65, 
      intensity: "medium" as const, 
      temp: 470, 
      humidity: 65, 
      depth: 22,
      name: "Lada Terra",
      description: "Южный регион с подповерхностными водными слоями"
    },
    { 
      x: 30, 
      y: 75, 
      intensity: "low" as const, 
      temp: 475, 
      humidity: 45, 
      depth: 30,
      name: "Beta Regio",
      description: "Вулканический регион с ограниченными водными ресурсами"
    },
    { 
      x: 65, 
      y: 25, 
      intensity: "low" as const, 
      temp: 472, 
      humidity: 52, 
      depth: 28,
      name: "Alpha Regio",
      description: "Древний щитовой вулкан с глубокими водными запасами"
    },
  ]

  // Handle manual rotation
  const handleRotateLeft = () => {
    setManualRotation(prev => prev - 45)
  }

  const handleRotateRight = () => {
    setManualRotation(prev => prev + 45)
  }

  const handleResetView = () => {
    setZoom(1)
    setManualRotation(0)
    setAutoRotate(true)
  }

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-950/5 to-background" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm mb-6">
            <Globe className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-amber-300 uppercase tracking-wide font-semibold">
              {t.waterDetection}: {hotspots.filter((h) => h.intensity === "high").length} {t.activeZones}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-red-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <Card className="border-amber-500/20 bg-card/30 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    Венера
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 bg-transparent"
                      onClick={() => setZoom((prev) => Math.min(2, prev + 0.2))}
                      title={t.zoom}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 bg-transparent"
                      onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.2))}
                      title={t.zoom}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 bg-transparent"
                      onClick={handleRotateLeft}
                      title={t.rotate}
                    >
                      <RotateCw className="w-4 h-4 rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 bg-transparent"
                      onClick={handleRotateRight}
                      title={t.rotate}
                    >
                      <RotateCw className="w-4 h-4 -rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant={showWaterDetection ? "default" : "outline"}
                      className={showWaterDetection ? "bg-cyan-500 hover:bg-cyan-600" : "border-amber-500/30"}
                      onClick={() => setShowWaterDetection(!showWaterDetection)}
                      title={t.waterDetection}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 bg-transparent"
                      onClick={handleResetView}
                      title={t.resetView}
                    >
                      ↺
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Model Container */}
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-amber-500/10 bg-gradient-to-b from-gray-900 to-black">
                  {/* Grid Overlay */}
                  <GridOverlay />
                  
                  {/* Water Detection Overlay */}
                  <WaterChannelsOverlay visible={showWaterDetection && activeLayer !== "surface"} />
                  
                  {/* 3D Venus Model */}
                  <VenusModel zoom={zoom} rotation={manualRotation} />
                  
                  {/* Water Hotspots */}
                  {hotspots.map((hotspot, i) => (
                    <WaterHotspot
                      key={i}
                      x={hotspot.x}
                      y={hotspot.y}
                      intensity={hotspot.intensity}
                      delay={i * 0.3}
                      onClick={() => setSelectedHotspot(selectedHotspot === i ? null : i)}
                    />
                  ))}
                  
                  {/* Selected Hotspot Info */}
                  {selectedHotspot !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bg-background/95 backdrop-blur-xl rounded-lg p-4 border border-cyan-500/30 shadow-xl max-w-xs z-20"
                      style={{
                        left: `${hotspots[selectedHotspot].x > 50 ? hotspots[selectedHotspot].x - 40 : hotspots[selectedHotspot].x + 5}%`,
                        top: `${hotspots[selectedHotspot].y > 60 ? hotspots[selectedHotspot].y - 40 : hotspots[selectedHotspot].y + 5}%`,
                      }}
                    >
                      <div className="space-y-2">
                        <div className="font-semibold text-lg text-cyan-400">
                          {hotspots[selectedHotspot].name}
                        </div>
                        <div className="text-xs text-foreground/70">
                          {hotspots[selectedHotspot].description}
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Thermometer className="w-3 h-3 text-orange-400" />
                            <span>{hotspots[selectedHotspot].temp}°C</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-blue-400" />
                            <span>{hotspots[selectedHotspot].humidity}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-purple-400" />
                            <span>{hotspots[selectedHotspot].depth}km {t.depth}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${
                              hotspots[selectedHotspot].intensity === "high" ? "from-cyan-400 to-blue-500" :
                              hotspots[selectedHotspot].intensity === "medium" ? "from-blue-400 to-indigo-500" :
                              "from-indigo-400 to-purple-500"
                            }`} />
                            <span className="capitalize">{hotspots[selectedHotspot].intensity} {t.waterDetection}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Instructions */}
                  <div className="absolute bottom-4 left-4 text-xs text-foreground/40 bg-black/50 px-2 py-1 rounded">
                    {t.clickToExplore}
                  </div>
                </div>

                {/* Layer Controls */}
                <div className="flex gap-2 mt-4">
                  {(["surface", "underground", "deep"] as const).map((layer) => (
                    <Button
                      key={layer}
                      size="sm"
                      variant={activeLayer === layer ? "default" : "outline"}
                      className={activeLayer === layer ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500/30"}
                      onClick={() => setActiveLayer(layer)}
                    >
                      {t[layer]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legend and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Legend */}
            <Card className="border-amber-500/20 bg-card/30 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t.legend}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                  <div>
                    <div className="text-sm font-medium">{t.highWater}</div>
                    <div className="text-xs text-foreground/50">500+ км³</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                  <div>
                    <div className="text-sm font-medium">{t.mediumWater}</div>
                    <div className="text-xs text-foreground/50">200-500 км³</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                  <div>
                    <div className="text-sm font-medium">{t.lowWater}</div>
                    <div className="text-xs text-foreground/50">50-200 км³</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-800" />
                  <div>
                    <div className="text-sm font-medium">{t.noWater}</div>
                    <div className="text-xs text-foreground/50">&lt;50 км³</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-cyan-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">6</div>
                  <div className="text-xs text-foreground/50">{t.activeZones}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2,500</div>
                  <div className="text-xs text-foreground/50">Км³ {t.waterChannels}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">35км</div>
                  <div className="text-xs text-foreground/50">Max {t.depth}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-card/30 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">465°C</div>
                  <div className="text-xs text-foreground/50">Avg {t.temperature}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}