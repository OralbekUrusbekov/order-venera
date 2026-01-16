"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Globe, Layers, Thermometer, Droplets, MapPin, ZoomIn, ZoomOut, Eye, RotateCw, Target, Compass, Waves, Drill } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from 'three'

// 3D Water Detection Points INSIDE the planet
function WaterDetectionPoints() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Positions of water deposits INSIDE Venus (spherical coordinates)
  const waterDeposits = [
    { depth: 0.3, phi: Math.PI/4, theta: 0, intensity: "high" },
    { depth: 0.4, phi: Math.PI/3, theta: Math.PI/2, intensity: "high" },
    { depth: 0.5, phi: Math.PI/6, theta: Math.PI, intensity: "medium" },
    { depth: 0.6, phi: Math.PI/5, theta: 3*Math.PI/2, intensity: "medium" },
    { depth: 0.7, phi: 2*Math.PI/3, theta: Math.PI/4, intensity: "low" },
    { depth: 0.8, phi: 3*Math.PI/4, theta: 5*Math.PI/4, intensity: "low" },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {waterDeposits.map((deposit, i) => {
        // Convert spherical to cartesian coordinates (INSIDE the sphere)
        const radius = 1 - deposit.depth * 0.7 // Points are inside, 0.3-0.8 of radius
        const x = radius * Math.sin(deposit.phi) * Math.cos(deposit.theta)
        const y = radius * Math.sin(deposit.phi) * Math.sin(deposit.theta)
        const z = radius * Math.cos(deposit.phi)
        
        const color = deposit.intensity === "high" ? "#22d3ee" : 
                     deposit.intensity === "medium" ? "#3b82f6" : "#8b5cf6"
        
        return (
          <group key={i}>
            {/* Main water deposit sphere */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.05 + (deposit.depth * 0.02), 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
            
            {/* Glow effect */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.08 + (deposit.depth * 0.03), 8, 8]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.2}
                side={THREE.BackSide}
              />
            </mesh>
            
            {/* Connection line to surface (drilling path visualization) */}
            <mesh>
              <tubeGeometry args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(x * 1.5, y * 1.5, z * 1.5)
                ]),
                64,
                0.01,
                8,
                false
              ]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.3}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        )
      })}
      
      {/* Underground water veins network */}
      <mesh>
        <sphereGeometry args={[0.85, 64, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.05}
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

// Semi-transparent Venus with cutaway view
function CutawayVenus() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group>
      {/* Outer transparent shell */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#FF9966"
          transparent
          opacity={0.3}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner layers visualization */}
      <mesh>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#CC6633"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          wireframe
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color="#993300"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial
          color="#662200"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          wireframe
          wireframeLinewidth={1}
        />
      </mesh>
      
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#FF3300"
          emissive="#FF3300"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

// Drilling paths visualization
function DrillingPaths() {
  const pathsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (pathsRef.current) {
      pathsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <group ref={pathsRef}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 6
        const startRadius = 1.1
        const endRadius = 0.3
        
        return (
          <mesh key={i}>
            <tubeGeometry args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(
                  startRadius * Math.cos(angle),
                  startRadius * Math.sin(angle),
                  0
                ),
                new THREE.Vector3(
                  endRadius * Math.cos(angle) * 0.5,
                  endRadius * Math.sin(angle) * 0.5,
                  endRadius * 0.5
                )
              ]),
              64,
              0.02,
              8,
              false
            ]} />
            <meshStandardMaterial
              color="#FFFFFF"
              transparent
              opacity={0.3}
              emissive="#FFFFFF"
              emissiveIntensity={0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Main Venus Model with interior view
function VenusInteriorModel({ zoom = 1, rotation = 0, showWaterDetection = true }: { 
  zoom?: number; 
  rotation?: number;
  showWaterDetection?: boolean;
}) {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ 
          position: [0, 0, 2.5 * zoom], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        {/* Lighting for interior view */}
        <ambientLight intensity={0.4} color="#FF9966" />
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[0, 0, -5]} intensity={0.5} color="#FF9966" />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#FF6633" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 20, 50]} />
        
        <Suspense fallback={null}>
          <group rotation={[0.3, rotation * Math.PI / 180, 0]}>
            {/* Cutaway Venus */}
            <CutawayVenus />
            
            {/* Drilling paths */}
            <DrillingPaths />
            
            {/* Water detection points INSIDE */}
            {showWaterDetection && <WaterDetectionPoints />}
            
            {/* Atmospheric glow */}
            <mesh>
              <sphereGeometry args={[1.1, 32, 32]} />
              <meshStandardMaterial
                color="#FF6633"
                transparent
                opacity={0.05}
                side={THREE.BackSide}
                emissive="#FF6633"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
          
          {/* Stars background */}
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.3}
          />
          
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.2}
          minDistance={1.5}
          maxDistance={6}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          zoomSpeed={0.6}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}

const translations = {
  kk: {
    title: "Венера Ішкі Құрылымы",
    subtitle: "Жер асты су қоймаларының 3D көрінісі",
    temperature: "Температура",
    humidity: "Ылғалдылық",
    depth: "Тереңдік",
    waterChannels: "Су каналдары",
    hotspots: "Су қоймалары",
    legend: "Легенда",
    highWater: "Жоғары су мөлшері",
    mediumWater: "Орташа су",
    lowWater: "Төмен су",
    noWater: "Су жоқ",
    zoom: "Масштаб",
    rotate: "Айналдыру",
    layers: "Қабаттар",
    surface: "Беткі қабат",
    mantle: "Мантия",
    core: "Ядро",
    region: "Аймақ",
    clickToExplore: "Зерттеу үшін басыңыз",
    rotateModel: "Модельді айналдыру",
    resetView: "Көріністі қалпына келтіру",
    waterDetection: "Су анықтау",
    activeZones: "Белсенді аймақтар",
    surfaceFeatures: "Ішкі құрылым",
    atmosphericPressure: "Қысым",
    realtimeData: "Нақты уақыттағы деректер",
    interiorView: "Ішкі көрініс",
    drillingDepth: "Бұрғылау тереңдігі",
    waterVolume: "Су көлемі",
  },
  ru: {
    title: "Внутренняя Структура Венеры",
    subtitle: "3D визуализация подземных водоносных горизонтов",
    temperature: "Температура",
    humidity: "Влажность",
    depth: "Глубина",
    waterChannels: "Водные каналы",
    hotspots: "Водоносные горизонты",
    legend: "Легенда",
    highWater: "Высокий уровень воды",
    mediumWater: "Средний уровень",
    lowWater: "Низкий уровень",
    noWater: "Нет воды",
    zoom: "Масштаб",
    rotate: "Вращение",
    layers: "Слои",
    surface: "Поверхность",
    mantle: "Мантия",
    core: "Ядро",
    region: "Регион",
    clickToExplore: "Нажмите для изучения",
    rotateModel: "Вращать модель",
    resetView: "Сбросить вид",
    waterDetection: "Обнаружение воды",
    activeZones: "Активные зоны",
    surfaceFeatures: "Внутренняя структура",
    atmosphericPressure: "Давление",
    realtimeData: "Данные в реальном времени",
    interiorView: "Внутренний вид",
    drillingDepth: "Глубина бурения",
    waterVolume: "Объем воды",
  },
  en: {
    title: "Venus Interior Structure",
    subtitle: "3D visualization of underground aquifers",
    temperature: "Temperature",
    humidity: "Humidity",
    depth: "Depth",
    waterChannels: "Water Channels",
    hotspots: "Aquifers",
    legend: "Legend",
    highWater: "High Water Content",
    mediumWater: "Medium Water",
    lowWater: "Low Water",
    noWater: "No Water",
    zoom: "Zoom",
    rotate: "Rotate",
    layers: "Layers",
    surface: "Surface",
    mantle: "Mantle",
    core: "Core",
    region: "Region",
    clickToExplore: "Click to explore",
    rotateModel: "Rotate Model",
    resetView: "Reset View",
    waterDetection: "Water Detection",
    activeZones: "Active Zones",
    surfaceFeatures: "Interior Structure",
    atmosphericPressure: "Pressure",
    realtimeData: "Realtime Data",
    interiorView: "Interior View",
    drillingDepth: "Drilling Depth",
    waterVolume: "Water Volume",
  },
}

// Interactive Hotspot Marker for UI (on the surface, but represents interior point)
function InteriorHotspotMarker({
  x,
  y,
  intensity,
  delay,
  onClick,
  depth,
}: { 
  x: number; 
  y: number; 
  intensity: "high" | "medium" | "low"; 
  delay: number; 
  onClick: () => void;
  depth: number;
}) {
  const colors = {
    high: ["#22d3ee", "#06b6d4", "#0891b2"],
    medium: ["#3b82f6", "#2563eb", "#1d4ed8"],
    low: ["#8b5cf6", "#7c3aed", "#6d28d9"],
  }

  return (
    <motion.button
      className="absolute rounded-full cursor-pointer z-10 flex flex-col items-center justify-center"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.5 }}
      onClick={onClick}
    >
      {/* Depth indicator line */}
      <motion.div 
        className="absolute w-0.5 bg-gradient-to-t from-cyan-400/50 to-transparent"
        style={{ 
          height: `${depth * 2}px`,
          bottom: "100%",
        }}
        animate={{
          height: [`${depth * 2}px`, `${depth * 2.5}px`, `${depth * 2}px`],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      
      {/* Outer marker */}
      <div className="relative">
        {/* Drilling animation */}
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -depth * 3, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Drill className="w-3 h-3 text-white" />
        </motion.div>
        
        {/* Marker glow */}
        <div className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: colors[intensity][0],
            animationDelay: `${delay}s`,
          }}
        />
        
        <div className="relative w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: colors[intensity][1],
            boxShadow: `0 0 20px 10px ${colors[intensity][0]}40`,
          }}
        >
          <Waves className="w-3 h-3 text-white" />
        </div>
      </div>
      
      {/* Depth label */}
      <div className="absolute -bottom-6 text-xs text-cyan-300 whitespace-nowrap">
        {depth}км
      </div>
    </motion.button>
  )
}

export function VenusInteriorGlobe() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [zoom, setZoom] = useState(1)
  const [manualRotation, setManualRotation] = useState(0)
  const [showWaterDetection, setShowWaterDetection] = useState(true)
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [activeLayer, setActiveLayer] = useState<"surface" | "mantle" | "core">("mantle")
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("interior")

  // Interior water deposits data
  const interiorDeposits = [
    { 
      surfaceX: 25, 
      surfaceY: 35,
      depth: 8.2,
      temp: 462, 
      humidity: 96.5, 
      pressure: 92,
      volume: 520,
      intensity: "high" as const,
      name: "Maxwell Aquifer",
      description: "Глубокий водоносный горизонт в мантии, содержит большие запасы воды в пористых породах",
      composition: ["Вода", "Минеральные соли", "Кремний", "Железо"],
      accessDifficulty: "Высокая"
    },
    { 
      surfaceX: 60, 
      surfaceY: 45,
      depth: 6.5,
      temp: 457, 
      humidity: 95.8, 
      pressure: 88,
      volume: 480,
      intensity: "high" as const,
      name: "Ishtar Reservoir",
      description: "Обширная сеть подземных водных каналов и резервуаров",
      composition: ["Вода", "Углекислый газ", "Сера", "Базальт"],
      accessDifficulty: "Средняя"
    },
    { 
      surfaceX: 45, 
      surfaceY: 60,
      depth: 12.8,
      temp: 465, 
      humidity: 84.3, 
      pressure: 91,
      volume: 320,
      intensity: "medium" as const,
      name: "Aphrodite Aquifer",
      description: "Глубокий водоносный слой в переходной зоне между корой и мантией",
      composition: ["Вода", "Минералы", "Метан", "Аммиак"],
      accessDifficulty: "Очень высокая"
    },
    { 
      surfaceX: 70, 
      surfaceY: 65,
      depth: 15.3,
      temp: 468, 
      humidity: 78.9, 
      pressure: 93,
      volume: 280,
      intensity: "medium" as const,
      name: "Lada Deep Well",
      description: "Система глубоких гидротермальных резервуаров",
      composition: ["Гидротермальная вода", "Сульфиды", "Металлы"],
      accessDifficulty: "Экстремальная"
    },
    { 
      surfaceX: 35, 
      surfaceY: 75,
      depth: 22.1,
      temp: 472, 
      humidity: 67.5, 
      pressure: 95,
      volume: 180,
      intensity: "low" as const,
      name: "Beta Geothermal",
      description: "Геотермальные водные источники вблизи ядра",
      composition: ["Перегретая вода", "Минеральные растворы"],
      accessDifficulty: "Технически сложная"
    },
    { 
      surfaceX: 65, 
      surfaceY: 30,
      depth: 18.6,
      temp: 459, 
      humidity: 71.2, 
      pressure: 89,
      volume: 220,
      intensity: "low" as const,
      name: "Alpha Deep Aquifer",
      description: "Древние водные резервуары в магматических породах",
      composition: ["Архаичная вода", "Тяжелые минералы"],
      accessDifficulty: "Высокая"
    },
  ]

  const handleRotateLeft = () => {
    setManualRotation(prev => prev - 45)
  }

  const handleRotateRight = () => {
    setManualRotation(prev => prev + 45)
  }

  const handleResetView = () => {
    setZoom(1)
    setManualRotation(0)
  }

  const toggleViewMode = () => {
    setViewMode(prev => prev === "exterior" ? "interior" : "exterior")
  }

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background with deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-950/20" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm mb-6">
            <Layers className="w-4 h-4 text-cyan-300" />
            <span className="text-xs sm:text-sm text-cyan-300 uppercase tracking-wide font-semibold">
              {t.interiorView} • {t.realtimeData}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">{t.subtitle}</p>
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
            <Card className="border-cyan-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5 text-cyan-300" />
                    <span className="text-white">{t.title}</span>
                    <span className="text-xs text-cyan-300/70 font-normal">({t.interiorView})</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30"
                      onClick={() => setZoom((prev) => Math.min(2, prev + 0.2))}
                      title={t.zoom}
                    >
                      <ZoomIn className="w-4 h-4 text-cyan-300" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30"
                      onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.2))}
                      title={t.zoom}
                    >
                      <ZoomOut className="w-4 h-4 text-cyan-300" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30"
                      onClick={handleRotateLeft}
                      title={t.rotate}
                    >
                      <RotateCw className="w-4 h-4 text-cyan-300 rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30"
                      onClick={handleRotateRight}
                      title={t.rotate}
                    >
                      <RotateCw className="w-4 h-4 text-cyan-300 -rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant={showWaterDetection ? "default" : "outline"}
                      className={`${showWaterDetection ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700' : 'border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30'} transition-all duration-300`}
                      onClick={() => setShowWaterDetection(!showWaterDetection)}
                      title={t.waterDetection}
                    >
                      <Target className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "interior" ? "default" : "outline"}
                      className={`${viewMode === "interior" ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'border-cyan-500/50 bg-black/30 hover:bg-purple-900/30'} transition-all duration-300`}
                      onClick={toggleViewMode}
                      title={t.interiorView}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30"
                      onClick={handleResetView}
                      title={t.resetView}
                    >
                      <Compass className="w-4 h-4 text-cyan-300" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Model Container */}
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
                  {/* 3D Venus Interior Model */}
                  <VenusInteriorModel 
                    zoom={zoom} 
                    rotation={manualRotation} 
                    showWaterDetection={showWaterDetection}
                  />
                  
                  {/* Surface Markers for Interior Points */}
                  {showWaterDetection && interiorDeposits.map((deposit, i) => (
                    <InteriorHotspotMarker
                      key={i}
                      x={deposit.surfaceX}
                      y={deposit.surfaceY}
                      intensity={deposit.intensity}
                      depth={deposit.depth}
                      delay={i * 0.3}
                      onClick={() => setSelectedHotspot(selectedHotspot === i ? null : i)}
                    />
                  ))}
                  
                  {/* Selected Hotspot Info */}
                  {selectedHotspot !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-lg p-4 border border-cyan-500/30 shadow-2xl max-w-xs z-20"
                      style={{
                        left: `${interiorDeposits[selectedHotspot].surfaceX > 50 ? interiorDeposits[selectedHotspot].surfaceX - 40 : interiorDeposits[selectedHotspot].surfaceX + 5}%`,
                        top: `${interiorDeposits[selectedHotspot].surfaceY > 60 ? interiorDeposits[selectedHotspot].surfaceY - 40 : interiorDeposits[selectedHotspot].surfaceY + 5}%`,
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-lg text-cyan-300">
                            {interiorDeposits[selectedHotspot].name}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            interiorDeposits[selectedHotspot].intensity === "high" ? "bg-cyan-900/50 text-cyan-300" :
                            interiorDeposits[selectedHotspot].intensity === "medium" ? "bg-blue-900/50 text-blue-300" :
                            "bg-purple-900/50 text-purple-300"
                          }`}>
                            {interiorDeposits[selectedHotspot].intensity.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          {interiorDeposits[selectedHotspot].description}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Thermometer className="w-3 h-3" />
                              {t.temperature}
                            </div>
                            <div className="text-sm font-semibold text-orange-300">
                              {interiorDeposits[selectedHotspot].temp}°C
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Droplets className="w-3 h-3" />
                              {t.humidity}
                            </div>
                            <div className="text-sm font-semibold text-blue-300">
                              {interiorDeposits[selectedHotspot].humidity}%
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Drill className="w-3 h-3" />
                              {t.drillingDepth}
                            </div>
                            <div className="text-sm font-semibold text-purple-300">
                              {interiorDeposits[selectedHotspot].depth}км
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Waves className="w-3 h-3" />
                              {t.waterVolume}
                            </div>
                            <div className="text-sm font-semibold text-cyan-300">
                              {interiorDeposits[selectedHotspot].volume}км³
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-700/50">
                          <div className="text-xs text-gray-400 mb-1">Состав:</div>
                          <div className="flex flex-wrap gap-1">
                            {interiorDeposits[selectedHotspot].composition.map((comp, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-gray-800/50 rounded">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-700/50">
                          <div className="text-xs text-gray-400">Сложность доступа:</div>
                          <div className="text-sm font-semibold text-amber-300">
                            {interiorDeposits[selectedHotspot].accessDifficulty}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Instructions */}
                  <div className="absolute bottom-4 left-4 text-xs text-cyan-300/70 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-cyan-500/20">
                    {t.clickToExplore}
                  </div>
                </div>

                {/* Layer Controls */}
                <div className="flex gap-2 mt-4">
                  {(["surface", "mantle", "core"] as const).map((layer) => (
                    <Button
                      key={layer}
                      size="sm"
                      variant={activeLayer === layer ? "default" : "outline"}
                      className={`${
                        activeLayer === layer 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700' 
                          : 'border-cyan-500/50 bg-black/30 hover:bg-cyan-900/30'
                      } transition-all duration-300`}
                      onClick={() => setActiveLayer(layer)}
                    >
                      {t[layer]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legend and Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Legend Card */}
            <Card className="border-cyan-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-300" />
                  {t.legend}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { intensity: "high", label: t.highWater, value: "400+ км³", color: "from-cyan-400 to-blue-500", depth: "5-10км" },
                  { intensity: "medium", label: t.mediumWater, value: "200-400 км³", color: "from-blue-400 to-indigo-500", depth: "10-15км" },
                  { intensity: "low", label: t.lowWater, value: "50-200 км³", color: "from-indigo-400 to-purple-500", depth: "15-25км" },
                ].map((item) => (
                  <div key={item.intensity} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.value} • {item.depth}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats Cards */}
            {[
              { 
                title: t.hotspots, 
                value: "6", 
                color: "text-cyan-400", 
                border: "border-cyan-500/30",
                gradient: "from-cyan-900/20 to-cyan-700/10",
                icon: <Target className="w-4 h-4" />
              },
              { 
                title: t.waterVolume, 
                value: "2,000", 
                suffix: "км³", 
                color: "text-blue-400", 
                border: "border-blue-500/30",
                gradient: "from-blue-900/20 to-blue-700/10",
                icon: <Waves className="w-4 h-4" />
              },
              { 
                title: t.drillingDepth, 
                value: "25", 
                suffix: "км", 
                color: "text-purple-400", 
                border: "border-purple-500/30",
                gradient: "from-purple-900/20 to-purple-700/10",
                icon: <Drill className="w-4 h-4" />
              },
              { 
                title: t.temperature, 
                value: "465", 
                suffix: "°C", 
                color: "text-orange-400", 
                border: "border-orange-500/30",
                gradient: "from-orange-900/20 to-orange-700/10",
                icon: <Thermometer className="w-4 h-4" />
              },
              { 
                title: t.atmosphericPressure, 
                value: "90", 
                suffix: "атм", 
                color: "text-amber-400", 
                border: "border-amber-500/30",
                gradient: "from-amber-900/20 to-amber-700/10",
                icon: <Globe className="w-4 h-4" />
              }
            ].map((stat, idx) => (
              <Card 
                key={idx} 
                className={`${stat.border} bg-gradient-to-br ${stat.gradient} backdrop-blur-xl`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}{stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">{stat.title}</div>
                    </div>
                    <div className={`${stat.color} opacity-70`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}