"use client"

import { useLanguage } from "@/lib/language-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Zap } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "Басқару Панелі",
    description: "Роботтың жағдайын нақты уақытта бақылаңыз",
    status: "Жүйе жағдайы",
    active: "Белсенді",
    battery: "Батарея деңгейі",
    distance: "Өтілген қашықтық",
    speed: "Ағымдағы жылдамдық",
    sensors: "Сенсорлар жағдайы",
    temperature: "Температура",
    startControl: "Басқаруды бастау",
  },
  ru: {
    title: "Панель управления",
    description: "Отслеживайте состояние робота в реальном времени",
    status: "Состояние системы",
    active: "Активно",
    battery: "Уровень батареи",
    distance: "Пройденное расстояние",
    speed: "Текущая скорость",
    sensors: "Состояние датчиков",
    temperature: "Температура",
    startControl: "Начать управление",
  },
  en: {
    title: "Control Dashboard",
    description: "Monitor robot status in real-time",
    status: "System Status",
    active: "Active",
    battery: "Battery Level",
    distance: "Distance Traveled",
    speed: "Current Speed",
    sensors: "Sensor Status",
    temperature: "Temperature",
    startControl: "Start Control",
  },
}

export function RoverDashboard() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="dashboard"
      className="py-16 sm:py-20 px-4 scroll-mt-24"
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

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t.battery}</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl text-green-400">
                87%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[87%]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t.distance}</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl text-blue-400">
                142m
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                +12m {t.status}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t.speed}</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl text-purple-400">
                0.8m/s
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Max: 1.2m/s
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>{t.temperature}</CardDescription>
              <CardTitle className="text-3xl sm:text-4xl text-orange-400">
                24°C
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Normal range
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">
                  {t.status}
                </CardTitle>
                <Badge className="bg-green-500/20 text-green-400">
                  <Activity className="w-3 h-3 mr-1" />
                  {t.active}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Arduino UNO",
                  "Motor Controller",
                  "Camera Module",
                  "WiFi Connection",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm">{item}</span>
                    <Badge
                      variant="outline"
                      className="text-green-400"
                    >
                      Online
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                {t.sensors}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">
                    Ultrasonic Sensor
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-blue-400">
                    45cm
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">
                    IR Distance Sensor
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-purple-400">
                    12cm
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">
                    Accelerometer
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-pink-400">
                    0.2g
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">
                    Gyroscope
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-green-400">
                    2°/s
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/animation/main">
              <Zap className="w-4 h-4 mr-2" />
              {t.startControl}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
