"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { 
  Thermometer, 
  Gauge, 
  Wind, 
  Cloud, 
  Droplets,  
  Activity,
  Layers,
  Compass,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Map,
  ZoomIn,
  ZoomOut,
  RotateCw
} from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from 'three'

// Типы для TypeScript
type IndicatorType = "temperature" | "pressure" | "wind" | "cloud" | "pollution"
type StatusType = "normal" | "warning" | "critical"
type TrendType = "rising" | "falling" | "stable"
type TimeRangeType = "24h" | "7d" | "30d"

// Atmospheric visualization
function AtmosphericVisualization() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* Venus with atmosphere layers */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#FF9966"
          roughness={0.9}
          metalness={0.1}
          emissive="#FF9966"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Atmospheric layers */}
      {[1.05, 1.1, 1.15, 1.2].map((radius, i) => (
        <mesh key={i}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#FF6633" : i === 1 ? "#FF3300" : i === 2 ? "#CC3300" : "#993300"}
            transparent
            opacity={0.05 + (i * 0.02)}
            side={THREE.BackSide}
            roughness={1}
          />
        </mesh>
      ))}
      
      {/* Cloud layers with animation */}
      <mesh>
        <sphereGeometry args={[1.08, 96, 96]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.3}
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Super-rotation winds visualization */}
      <group>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12
          const radius = 1.12
          
          return (
            <mesh key={i} position={[
              radius * Math.cos(angle),
              0,
              radius * Math.sin(angle)
            ]}>
              <torusGeometry args={[0.05, 0.01, 8, 24, Math.PI]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#22d3ee"
                emissiveIntensity={0.5}
              />
            </mesh>
          )
        })}
      </group>
      
      {/* Temperature gradient rings */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, 0]}>
          <ringGeometry args={[1.3, 1.25, 64]} />
          <meshStandardMaterial
            color={i === 0 ? "#FF3300" : i === 1 ? "#FF6600" : "#FF9900"}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Environmental Model Component
function VenusEnvironmentalModel({ zoom = 1, rotation = 0 }: { 
  zoom?: number; 
  rotation?: number;
}) {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ 
          position: [0, 0, 3 * zoom], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        {/* Special lighting for atmospheric visualization */}
        <ambientLight intensity={0.4} color="#FF9966" />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#FFFFFF" />
        <pointLight position={[0, 0, -5]} intensity={0.3} color="#FF6633" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#FF3300" />
        
        <fog attach="fog" args={['#000000', 20, 50]} />
        
        <Suspense fallback={null}>
          <group rotation={[0.3, rotation * Math.PI / 180, 0]}>
            <AtmosphericVisualization />
          </group>
          
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={0.2}
          />
          
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.15}
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
    title: "Венера Экологиялық Талдау",
    subtitle: "Атмосфералық және климаттық көрсеткіштердің нақты уақыттағы мониторингі",
    temperature: "Температура",
    pressure: "Қысым",
    windSpeed: "Жел жылдамдығы",
    cloudCover: "Бұлттылық",
    humidity: "Ылғалдылық",
    acidity: "Тұздылық",
    co2: "CO₂ концентрациясы",
    so2: "SO₂ концентрациясы",
    solarRadiation: "Күн сәулесі",
    uvIndex: "Ультракүлгін индекс",
    legend: "Көрсеткіштер",
    normal: "Қалыпты",
    warning: "Ескерту",
    critical: "Сыни",
    layers: "Атмосфера қабаттары",
    troposphere: "Тропосфера",
    stratosphere: "Стратосфера",
    mesosphere: "Мезосфера",
    thermosphere: "Термосфера",
    region: "Аймақ",
    realtimeData: "Нақты уақыттағы деректер",
    environmentalMonitoring: "Экологиялық мониторинг",
    atmosphericComposition: "Атмосфера құрамы",
    climatePatterns: "Климат үлгілері",
    seasonalChanges: "Маусымдық өзгерістер",
    pollutionLevels: "Ластану деңгейі",
    weatherPatterns: "Ауа райы үлгілері",
    thermalMap: "Жылу картасы",
    pressureMap: "Қысым картасы",
    windPatterns: "Жел үлгілері",
  },
  ru: {
    title: "Экологический Анализ Венеры",
    subtitle: "Мониторинг атмосферных и климатических показателей в реальном времени",
    temperature: "Температура",
    pressure: "Давление",
    windSpeed: "Скорость ветра",
    cloudCover: "Облачность",
    humidity: "Влажность",
    acidity: "Кислотность",
    co2: "Концентрация CO₂",
    so2: "Концентрация SO₂",
    solarRadiation: "Солнечная радиация",
    uvIndex: "УФ индекс",
    legend: "Показатели",
    normal: "Нормальный",
    warning: "Предупреждение",
    critical: "Критический",
    layers: "Слои атмосферы",
    troposphere: "Тропосфера",
    stratosphere: "Стратосфера",
    mesosphere: "Мезосфера",
    thermosphere: "Термосфера",
    region: "Регион",
    realtimeData: "Данные в реальном времени",
    environmentalMonitoring: "Экологический мониторинг",
    atmosphericComposition: "Состав атмосферы",
    climatePatterns: "Климатические паттерны",
    seasonalChanges: "Сезонные изменения",
    pollutionLevels: "Уровни загрязнения",
    weatherPatterns: "Погодные паттерны",
    thermalMap: "Тепловая карта",
    pressureMap: "Карта давления",
    windPatterns: "Ветровые паттерны",
  },
  en: {
    title: "Venus Environmental Analysis",
    subtitle: "Real-time monitoring of atmospheric and climate indicators",
    temperature: "Temperature",
    pressure: "Pressure",
    windSpeed: "Wind Speed",
    cloudCover: "Cloud Cover",
    humidity: "Humidity",
    acidity: "Acidity",
    co2: "CO₂ Concentration",
    so2: "SO₂ Concentration",
    solarRadiation: "Solar Radiation",
    uvIndex: "UV Index",
    legend: "Indicators",
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
    layers: "Atmospheric Layers",
    troposphere: "Troposphere",
    stratosphere: "Stratosphere",
    mesosphere: "Mesosphere",
    thermosphere: "Thermosphere",
    region: "Region",
    realtimeData: "Realtime Data",
    environmentalMonitoring: "Environmental Monitoring",
    atmosphericComposition: "Atmospheric Composition",
    climatePatterns: "Climate Patterns",
    seasonalChanges: "Seasonal Changes",
    pollutionLevels: "Pollution Levels",
    weatherPatterns: "Weather Patterns",
    thermalMap: "Thermal Map",
    pressureMap: "Pressure Map",
    windPatterns: "Wind Patterns",
  },
}

// Функция для получения перевода по ключу с безопасным доступом
const getTranslation = (lang: "kk" | "ru" | "en", key: string): string => {
  return translations[lang][key as keyof typeof translations[typeof lang]] || key
}

// Environmental Indicator with status
function EnvironmentalIndicator({
  x,
  y,
  type,
  value,
  status,
  delay,
  onClick,
}: { 
  x: number; 
  y: number; 
  type: IndicatorType;
  value: number;
  status: StatusType;
  delay: number;
  onClick: () => void;
}) {
  const colors = {
    normal: ["#10b981", "#059669", "#047857"],
    warning: ["#f59e0b", "#d97706", "#b45309"],
    critical: ["#ef4444", "#dc2626", "#b91c1c"],
  }
  
  const icons = {
    temperature: <Thermometer className="w-3 h-3" />,
    pressure: <Gauge className="w-3 h-3" />,
    wind: <Wind className="w-3 h-3" />,
    cloud: <Cloud className="w-3 h-3" />,
    pollution: <AlertTriangle className="w-3 h-3" />,
  }
  
  const size = status === "critical" ? 28 : status === "warning" ? 24 : 20

  return (
    <motion.button
      className="absolute rounded-full cursor-pointer z-10 flex items-center justify-center"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.3 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-full animate-ping"
        style={{
          backgroundColor: colors[status][0],
          animationDelay: `${delay}s`,
        }}
      />
      
      <div className="relative rounded-full flex items-center justify-center"
        style={{
          backgroundColor: colors[status][1],
          width: size - 4,
          height: size - 4,
          boxShadow: `0 0 15px 5px ${colors[status][0]}40`,
        }}
      >
        <div className="text-white">
          {icons[type]}
        </div>
      </div>
    </motion.button>
  )
}

// Real-time data visualization
function RealTimeDataChart({ type, data }: { type: string; data: number[] }) {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  
  return (
    <div className="relative h-20 w-full bg-gray-900/30 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-end">
        {data.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 mx-0.5"
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div 
              className={`h-full rounded-t ${
                type === "temperature" ? "bg-gradient-to-t from-orange-500 to-red-500" :
                type === "pressure" ? "bg-gradient-to-t from-blue-500 to-purple-500" :
                type === "wind" ? "bg-gradient-to-t from-cyan-500 to-blue-500" :
                "bg-gradient-to-t from-gray-500 to-gray-700"
              }`}
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-1 left-2 text-xs text-gray-400">
        Min: {minValue.toFixed(1)}
      </div>
      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
        Max: {maxValue.toFixed(1)}
      </div>
    </div>
  )
}

export function VenusEnvironmentalAnalysis() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [selectedIndicator, setSelectedIndicator] = useState<number | null>(null)
  const [timeRange, setTimeRange] = useState<TimeRangeType>("24h")

  // Интерфейс для индикатора
  interface Indicator {
    x: number;
    y: number;
    type: IndicatorType;
    value: number;
    status: StatusType;
    name: string;
    description: string;
    trends: {
      current: number;
      change: number;
      trend: TrendType;
      historicalAvg: number;
    };
  }

  // Environmental indicators data
  const indicators: Indicator[] = [
    { 
      x: 30, 
      y: 40,
      type: "temperature",
      value: 462,
      status: "critical",
      name: "Экватор",
      description: "Максимальная температура поверхности, постоянный перегрев",
      trends: {
        current: 462,
        change: +2.3,
        trend: "rising",
        historicalAvg: 460
      }
    },
    { 
      x: 65, 
      y: 35,
      type: "pressure",
      value: 92,
      status: "critical",
      name: "Ishtar Terra",
      description: "Экстремальное атмосферное давление, в 92 раза выше земного",
      trends: {
        current: 92,
        change: +0.5,
        trend: "stable",
        historicalAvg: 91.5
      }
    },
    { 
      x: 45, 
      y: 60,
      type: "wind",
      value: 360,
      status: "warning",
      name: "Суперротация",
      description: "Сверхбыстрые ветры в верхних слоях атмосферы",
      trends: {
        current: 360,
        change: +15,
        trend: "rising",
        historicalAvg: 345
      }
    },
    { 
      x: 20, 
      y: 70,
      type: "cloud",
      value: 100,
      status: "normal",
      name: "Южный полюс",
      description: "Постоянная облачность из серной кислоты",
      trends: {
        current: 100,
        change: 0,
        trend: "stable",
        historicalAvg: 100
      }
    },
    { 
      x: 75, 
      y: 65,
      type: "pollution",
      value: 96.5,
      status: "critical",
      name: "Глобальная атмосфера",
      description: "Концентрация CO₂ достигает 96.5%, создавая сильный парниковый эффект",
      trends: {
        current: 96.5,
        change: +0.2,
        trend: "rising",
        historicalAvg: 96.3
      }
    },
  ]

  // Real-time data simulation
  const [temperatureData, setTemperatureData] = useState<number[]>([])
  const [pressureData, setPressureData] = useState<number[]>([])
  const [windData, setWindData] = useState<number[]>([])

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      const data = Array.from({ length: 24 }, () => 460 + Math.random() * 5)
      setTemperatureData(data)
      
      const pressureData = Array.from({ length: 24 }, () => 90 + Math.random() * 4)
      setPressureData(pressureData)
      
      const windData = Array.from({ length: 24 }, () => 350 + Math.random() * 20)
      setWindData(windData)
    }
    
    generateData()
    
    // Update data periodically
    const interval = setInterval(() => {
      setTemperatureData(prev => [...prev.slice(1), 460 + Math.random() * 5])
      setPressureData(prev => [...prev.slice(1), 90 + Math.random() * 4])
      setWindData(prev => [...prev.slice(1), 350 + Math.random() * 20])
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleRotateLeft = () => setRotation(prev => prev - 45)
  const handleRotateRight = () => setRotation(prev => prev + 45)
  const handleResetView = () => {
    setZoom(1)
    setRotation(0)
  }

  const getTrendIcon = (trend: TrendType) => {
    if (trend === "rising") return <TrendingUp className="w-4 h-4 text-red-400" />
    if (trend === "falling") return <TrendingDown className="w-4 h-4 text-green-400" />
    return <Activity className="w-4 h-4 text-yellow-400" />
  }

  // Функция для получения названия типа индикатора
  const getIndicatorLabel = (type: IndicatorType): string => {
    const labels = {
      temperature: t.temperature,
      pressure: t.pressure,
      wind: t.windSpeed,
      cloud: t.cloudCover,
      pollution: t.pollutionLevels
    }
    return labels[type]
  }

  // Функция для получения единицы измерения
  const getIndicatorUnit = (type: IndicatorType): string => {
    const units = {
      temperature: "°C",
      pressure: " атм",
      wind: " км/ч",
      cloud: "%",
      pollution: "%"
    }
    return units[type]
  }

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background with atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/10 via-gray-900 to-purple-950/10" />
      
      {/* Atmospheric particles effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm mb-6">
            <Activity className="w-4 h-4 text-orange-300" />
            <span className="text-xs sm:text-sm text-orange-300 uppercase tracking-wide font-semibold">
              {t.environmentalMonitoring} • {t.realtimeData}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-500 bg-clip-text text-transparent">
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
            <Card className="border-orange-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Thermometer className="w-5 h-5 text-orange-300" />
                    <span className="text-white">{t.atmosphericComposition}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/50 bg-black/30 hover:bg-orange-900/30"
                      onClick={() => setZoom((prev) => Math.min(2, prev + 0.2))}
                      title={t.thermalMap}
                    >
                      <ZoomIn className="w-4 h-4 text-orange-300" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/50 bg-black/30 hover:bg-orange-900/30"
                      onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.2))}
                      title={t.pressureMap}
                    >
                      <ZoomOut className="w-4 h-4 text-orange-300" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/50 bg-black/30 hover:bg-orange-900/30"
                      onClick={handleRotateLeft}
                      title={t.windPatterns}
                    >
                      <RotateCw className="w-4 h-4 text-orange-300 rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/50 bg-black/30 hover:bg-orange-900/30"
                      onClick={handleRotateRight}
                      title={t.climatePatterns}
                    >
                      <RotateCw className="w-4 h-4 text-orange-300 -rotate-90" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/50 bg-black/30 hover:bg-orange-900/30"
                      onClick={handleResetView}
                      title={t.seasonalChanges}
                    >
                      <Compass className="w-4 h-4 text-orange-300" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Environmental Model */}
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-orange-500/20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
                  <VenusEnvironmentalModel zoom={zoom} rotation={rotation} />
                  
                  {/* Environmental Indicators */}
                  {indicators.map((indicator, i) => (
                    <EnvironmentalIndicator
                      key={i}
                      x={indicator.x}
                      y={indicator.y}
                      type={indicator.type}
                      value={indicator.value}
                      status={indicator.status}
                      delay={i * 0.3}
                      onClick={() => setSelectedIndicator(selectedIndicator === i ? null : i)}
                    />
                  ))}
                  
                  {/* Selected Indicator Info */}
                  {selectedIndicator !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-lg p-4 border border-orange-500/30 shadow-2xl max-w-xs z-20"
                      style={{
                        left: `${indicators[selectedIndicator].x > 50 ? indicators[selectedIndicator].x - 40 : indicators[selectedIndicator].x + 5}%`,
                        top: `${indicators[selectedIndicator].y > 60 ? indicators[selectedIndicator].y - 40 : indicators[selectedIndicator].y + 5}%`,
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-lg text-orange-300">
                            {indicators[selectedIndicator].name}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            indicators[selectedIndicator].status === "normal" ? "bg-green-900/50 text-green-300" :
                            indicators[selectedIndicator].status === "warning" ? "bg-yellow-900/50 text-yellow-300" :
                            "bg-red-900/50 text-red-300"
                          }`}>
                            {t[indicators[selectedIndicator].status]}
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          {indicators[selectedIndicator].description}
                        </div>
                        
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                              {getIndicatorLabel(indicators[selectedIndicator].type)}:
                            </span>
                            <span className="text-lg font-bold text-white">
                              {indicators[selectedIndicator].value}
                              {getIndicatorUnit(indicators[selectedIndicator].type)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Тренд:</span>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(indicators[selectedIndicator].trends.trend)}
                              <span className={
                                indicators[selectedIndicator].trends.trend === "rising" ? "text-red-300" :
                                indicators[selectedIndicator].trends.trend === "falling" ? "text-green-300" :
                                "text-yellow-300"
                              }>
                                {indicators[selectedIndicator].trends.change > 0 ? "+" : ""}
                                {indicators[selectedIndicator].trends.change}
                                {getIndicatorUnit(indicators[selectedIndicator].type)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Историческое среднее:</span>
                            <span className="text-gray-300">
                              {indicators[selectedIndicator].trends.historicalAvg}
                              {getIndicatorUnit(indicators[selectedIndicator].type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Layer Info */}
                  <div className="absolute top-4 right-4 text-xs text-orange-300/70 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-orange-500/20">
                    {t.layers}: 5
                  </div>
                </div>

                {/* Time Range Controls */}
                <div className="flex gap-2 mt-4">
                  {(["24h", "7d", "30d"] as const).map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? "default" : "outline"}
                      className={`${
                        timeRange === range 
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700' 
                          : 'border-orange-500/50 bg-black/30 hover:bg-orange-900/30'
                      } transition-all duration-300`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Environmental Metrics Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Atmospheric Composition */}
            <Card className="border-orange-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-300" />
                  {t.atmosphericComposition}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { gas: "CO₂", percentage: 96.5, color: "from-orange-500 to-red-500", status: "critical" },
                  { gas: "N₂", percentage: 3.5, color: "from-blue-500 to-indigo-500", status: "normal" },
                  { gas: "SO₂", percentage: 0.015, color: "from-yellow-500 to-orange-500", status: "warning" },
                  { gas: "Ar", percentage: 0.007, color: "from-purple-500 to-pink-500", status: "normal" },
                  { gas: "H₂O", percentage: 0.002, color: "from-cyan-500 to-blue-500", status: "normal" },
                ].map((item) => (
                  <div key={item.gas} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.gas}</span>
                      <span className="text-white font-medium">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Real-time Charts */}
            <Card className="border-red-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-300" />
                  {t.temperature} ({timeRange})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeDataChart type="temperature" data={temperatureData} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Сейчас: {temperatureData[temperatureData.length - 1]?.toFixed(1)}°C</span>
                  <span>Среднее: {(temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length).toFixed(1)}°C</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-300" />
                  {t.pressure} ({timeRange})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeDataChart type="pressure" data={pressureData} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Сейчас: {pressureData[pressureData.length - 1]?.toFixed(1)} атм</span>
                  <span>Среднее: {(pressureData.reduce((a, b) => a + b, 0) / pressureData.length).toFixed(1)} атм</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-300" />
                  {t.windSpeed} ({timeRange})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RealTimeDataChart type="wind" data={windData} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Сейчас: {windData[windData.length - 1]?.toFixed(1)} км/ч</span>
                  <span>Среднее: {(windData.reduce((a, b) => a + b, 0) / windData.length).toFixed(1)} км/ч</span>
                </div>
              </CardContent>
            </Card>

            {/* Status Summary */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">3</div>
                    <div className="text-xs text-gray-300">{t.critical}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">1</div>
                    <div className="text-xs text-gray-300">{t.warning}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">1</div>
                    <div className="text-xs text-gray-300">{t.normal}</div>
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