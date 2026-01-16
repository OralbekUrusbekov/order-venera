"use client"

import { useLanguage } from "@/lib/language-context"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function RoverModel() {
  const { scene } = useGLTF("/models/device.glb")
  return <primitive object={scene} scale={2.2} />
}

const translations = {
  kk: {
    title: "3D Робот Симуляторы",
    description: "Роботты интерактивті түрде зерттеңіз",
    card1Title: "Arduino UNO",
    card1Desc: "Негізгі басқару блогы. Сенсорлар мен моторларды басқарады.",
    card2Title: "Моторлар",
    card2Desc: "DC моторлар роботты қозғалысқа келтіреді, жылдамдықты реттеуге болады.",
    card3Title: "Сенсорлар",
    card3Desc: "Ультрадыбыстық және қашықтық сенсорлары қоршаған ортаны зерттейді.",
    info: "Интерактивті 3D модель",
    specs: "Өлшемі: 25см x 20см x 15см",
    weight: "Салмағы: 1.2кг",
  },
  ru: {
    title: "3D Симулятор робота",
    description: "Исследуйте робота в интерактивном режиме",
    card1Title: "Arduino UNO",
    card1Desc: "Основной блок управления. Контролирует датчики и двигатели.",
    card2Title: "Двигатели",
    card2Desc: "DC моторы приводят робота в движение, регулируется скорость.",
    card3Title: "Датчики",
    card3Desc: "Ультразвуковые и дистанционные датчики исследуют окружающую среду.",
    info: "Интерактивная 3D модель",
    specs: "Размеры: 25см x 20см x 15см",
    weight: "Вес: 1.2кг",
  },
  en: {
    title: "3D Robot Simulator",
    description: "Explore the robot interactively",
    card1Title: "Arduino UNO",
    card1Desc: "Main control unit. Controls sensors and motors.",
    card2Title: "Motors",
    card2Desc: "DC motors drive the robot, speed is adjustable.",
    card3Title: "Sensors",
    card3Desc: "Ultrasonic and distance sensors explore the environment.",
    info: "Interactive 3D Model",
    specs: "Size: 25cm x 20cm x 15cm",
    weight: "Weight: 1.2kg",
  },
}

export function SatelliteSimulator() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="simulator"
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-background to-blue-950/20 scroll-mt-24"
    >
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t.description}
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* 3D Canvas */}
          <div className="h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-border bg-black/20">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [4, 3, 4], fov: 50 }}
            >
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[4, 3, 4]} />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight
                  position={[-10, -10, -10]}
                  intensity={0.4}
                  color="#4488ff"
                />
                <RoverModel />
                <OrbitControls
                  enablePan={false}
                  minDistance={3}
                  maxDistance={7}
                  enableDamping
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            <Card className="border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">
                    {t.card1Title}
                  </CardTitle>
                  <Badge variant="secondary">Core</Badge>
                </div>
                <CardDescription className="text-sm">
                  {t.card1Desc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">
                    {t.card2Title}
                  </CardTitle>
                  <Badge variant="secondary">x4</Badge>
                </div>
                <CardDescription className="text-sm">
                  {t.card2Desc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">
                    {t.card3Title}
                  </CardTitle>
                  <Badge variant="secondary">x8</Badge>
                </div>
                <CardDescription className="text-sm">
                  {t.card3Desc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                  <span className="text-muted-foreground">
                    {t.info}
                  </span>
                  <Badge className="bg-green-500/20 text-green-400">
                    Active
                  </Badge>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <p>{t.specs}</p>
                  <p>{t.weight}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
