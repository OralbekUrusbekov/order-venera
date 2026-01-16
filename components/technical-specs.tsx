"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  Zap,
  Thermometer,
  Cog,
  Battery,
  Camera,
  CircuitBoard,
} from "lucide-react"

const translations = {
  kk: {
    title: "Техникалық Сипаттамалар",
    description: "Марс роботының барлық компоненттері",
    close: "Жабу",
    led: {
      title: "Жарық диоды (LED)",
      description:
        "Жарық шығаратын диод - құрылғының жұмыс істеу күйін көрсету үшін қолданылады.",
      specs: ["Кернеу: 3.3V", "Ток: 20mA", "Түс: Қызыл", "Мақсаты: Индикация"],
    },
    mosfet: {
      title: "MOSFET IRF 520",
      description:
        "Қуатты өріс-эффектілі транзистор. Моторларды және жоғары қуатты жүктемелерді басқару үшін қолданылады.",
      specs: [
        "Тип: N-channel MOSFET",
        "Кернеу: 100V",
        "Ток: 9.2A",
        "Қолданысы: Мотор басқару",
      ],
    },
    sensor: {
      title: "DHD-11 Датчик",
      description:
        "Температура мен ылғалдылықты өлшейтін сенсор. Қоршаған орта жағдайын бақылау үшін қолданылады.",
      specs: [
        "Температура: -40°C ~ 80°C",
        "Ылғалдылық: 0-100% RH",
        "Дәлдік: ±0.5°C",
        "Интерфейс: Цифрлық",
      ],
    },
    motor1: {
      title: "Бұрғылайтын Мотор",
      description:
        "Айналу қозғалысын жасайтын электр моторы. Бұрғылау немесе жетек жүйесі үшін қолданылады.",
      specs: [
        "Кернеу: 12V DC",
        "Жылдамдық: 3000 RPM",
        "Момент: 0.5 Nm",
        "Қолданысы: Механикалық жетек",
      ],
    },
    reducer: {
      title: "Мотор Редуктор",
      description:
        "Мотор жылдамдығын азайтып, айналу моментін арттыратын механизм.",
      specs: [
        "Қатынас: 1:10",
        "Шығыс жылдамдық: 300 RPM",
        "Момент: 5 Nm",
        "Тип: Планетарлық",
      ],
    },
    battery: {
      title: "18650 Литий Батарейка",
      description:
        "Қайта зарядталатын литий-ионды батарея. Құрылғыға қуат беру үшін қолданылады.",
      specs: [
        "Кернеу: 3.7V",
        "Сыйымдылық: 2500mAh",
        "Тип: Li-ion",
        "Зарядтау: 4.2V",
      ],
    },
    camera: {
      title: "Бақылаушы Камера",
      description:
        "Бейнені тіркеу және мониторинг жасау үшін қолданылатын камера модулі.",
      specs: [
        "Ажыратымдылық: 1080p",
        "Өріс бұрышы: 120°",
        "FPS: 30",
        "Интерфейс: USB/Wi-Fi",
      ],
    },
  },
  ru: {
    title: "Технические Характеристики",
    description: "Все компоненты марсохода",
    close: "Закрыть",
    led: {
      title: "Светодиод (LED)",
      description:
        "Светоизлучающий диод - используется для индикации рабочего состояния устройства.",
      specs: ["Напряжение: 3.3V", "Ток: 20mA", "Цвет: Красный", "Назначение: Индикация"],
    },
    mosfet: {
      title: "MOSFET IRF 520",
      description:
        "Мощный полевой транзистор. Используется для управления двигателями и высокомощными нагрузками.",
      specs: [
        "Тип: N-channel MOSFET",
        "Напряжение: 100V",
        "Ток: 9.2A",
        "Применение: Управление двигателями",
      ],
    },
    sensor: {
      title: "Датчик DHD-11",
      description:
        "Сенсор для измерения температуры и влажности. Используется для мониторинга окружающей среды.",
      specs: [
        "Температура: -40°C ~ 80°C",
        "Влажность: 0-100% RH",
        "Точность: ±0.5°C",
        "Интерфейс: Цифровой",
      ],
    },
    motor1: {
      title: "Буровой Мотор",
      description:
        "Электродвигатель вращательного движения. Используется для бурения или системы привода.",
      specs: [
        "Напряжение: 12V DC",
        "Скорость: 3000 RPM",
        "Момент: 0.5 Nm",
        "Применение: Механический привод",
      ],
    },
    reducer: {
      title: "Редуктор Мотора",
      description:
        "Механизм для снижения скорости мотора и увеличения крутящего момента.",
      specs: [
        "Передача: 1:10",
        "Выходная скорость: 300 RPM",
        "Момент: 5 Nm",
        "Тип: Планетарный",
      ],
    },
    battery: {
      title: "Литиевая Батарея 18650",
      description:
        "Перезаряжаемая литий-ионная батарея. Используется для питания устройства.",
      specs: [
        "Напряжение: 3.7V",
        "Емкость: 2500mAh",
        "Тип: Li-ion",
        "Зарядка: 4.2V",
      ],
    },
    camera: {
      title: "Камера Наблюдения",
      description:
        "Модуль камеры для видеофиксации и мониторинга.",
      specs: [
        "Разрешение: 1080p",
        "Угол обзора: 120°",
        "FPS: 30",
        "Интерфейс: USB/Wi-Fi",
      ],
    },
  },
  en: {
    title: "Technical Specifications",
    description: "All components of the Mars Rover",
    close: "Close",
    led: {
      title: "LED Indicator",
      description:
        "Light-emitting diode used to indicate device operating status.",
      specs: ["Voltage: 3.3V", "Current: 20mA", "Color: Red", "Purpose: Indication"],
    },
    mosfet: {
      title: "MOSFET IRF 520",
      description:
        "High-power field-effect transistor used to control motors and high-power loads.",
      specs: [
        "Type: N-channel MOSFET",
        "Voltage: 100V",
        "Current: 9.2A",
        "Application: Motor control",
      ],
    },
    sensor: {
      title: "DHD-11 Sensor",
      description:
        "Sensor for measuring temperature and humidity.",
      specs: [
        "Temperature: -40°C ~ 80°C",
        "Humidity: 0-100% RH",
        "Accuracy: ±0.5°C",
        "Interface: Digital",
      ],
    },
    motor1: {
      title: "Drilling Motor",
      description:
        "Electric motor for rotational motion.",
      specs: [
        "Voltage: 12V DC",
        "Speed: 3000 RPM",
        "Torque: 0.5 Nm",
        "Application: Mechanical drive",
      ],
    },
    reducer: {
      title: "Motor Reducer",
      description:
        "Mechanism to reduce motor speed and increase torque.",
      specs: [
        "Ratio: 1:10",
        "Output speed: 300 RPM",
        "Torque: 5 Nm",
        "Type: Planetary",
      ],
    },
    battery: {
      title: "18650 Lithium Battery",
      description:
        "Rechargeable lithium-ion battery.",
      specs: [
        "Voltage: 3.7V",
        "Capacity: 2500mAh",
        "Type: Li-ion",
        "Charging: 4.2V",
      ],
    },
    camera: {
      title: "Surveillance Camera",
      description:
        "Camera module for video monitoring.",
      specs: [
        "Resolution: 1080p",
        "Field of view: 120°",
        "FPS: 30",
        "Interface: USB/Wi-Fi",
      ],
    },
  },
}

type ComponentData = {
  title: string
  description: string
  specs: string[]
}


const components: {
  key: "led" | "mosfet" | "sensor" | "motor1" | "reducer" | "battery" | "camera"
  icon: any
  color: string
}[] = [

  { key: "led", icon: CircuitBoard, color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { key: "mosfet", icon: Zap, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { key: "sensor", icon: Thermometer, color: "bg-green-500/10 text-green-400 border-green-500/20" },
  { key: "motor1", icon: Cog, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { key: "reducer", icon: Cpu, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { key: "battery", icon: Battery, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { key: "camera", icon: Camera, color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
]

export function TechnicalSpecs() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  return (
    <section
      id="specs"
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-blue-950/20 to-background scroll-mt-24"
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map(({ key, icon: Icon, color }) => {
            const component = t[key] as ComponentData
            const isSelected = selectedComponent === key

            return (
              <Card
                key={key}
                className={`border-2 transition-all duration-300 cursor-pointer ${
                  isSelected ? color : "border-border/50"
                }`}
                onClick={() =>
                  setSelectedComponent(isSelected ? null : key)
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-3 rounded-lg ${color}`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    {isSelected && (
                      <Badge className="bg-primary/20 text-primary">
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base sm:text-lg mt-4">
                    {component.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {component.description}
                  </CardDescription>
                </CardHeader>

                {isSelected && (
                  <CardContent>
                    <div className="space-y-2 pt-4 border-t border-border/50">
                      {component.specs.map(
                        (spec: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">
                              {spec}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Close button (mobile friendly) */}
        {selectedComponent && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setSelectedComponent(null)}
            >
              {t.close}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
