"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Radio, Camera } from "lucide-react"

const translations = {
  kk: {
    title: "Жоба туралы",
    description:
      "Бұл білім беру жобасы студенттер мен оқушыларға робототехника, электроника және бағдарламалау негіздерін үйретуге арналған.",
    components: "Негізгі компоненттер",
    arduino: "Arduino контроллері",
    motors: "DC моторлар",
    sensors: "Сенсорлар",
    led: "LED индикаторлар",
    features: "Мүмкіндіктер",
    autonomous: "Автономды қозғалыс",
    remote: "Қашықтан басқару",
    obstacle: "Кедергілерді анықтау",
    data: "Деректерді жинау",
  },
  ru: {
    title: "О проекте",
    description:
      "Этот образовательный проект предназначен для обучения студентов и школьников основам робототехники, электроники и программирования.",
    components: "Основные компоненты",
    arduino: "Контроллер Arduino",
    motors: "DC моторы",
    sensors: "Датчики",
    led: "LED индикаторы",
    features: "Возможности",
    autonomous: "Автономное движение",
    remote: "Дистанционное управление",
    obstacle: "Обнаружение препятствий",
    data: "Сбор данных",
  },
  en: {
    title: "About Project",
    description:
      "This educational project is designed to teach students the basics of robotics, electronics, and programming.",
    components: "Main Components",
    arduino: "Arduino Controller",
    motors: "DC Motors",
    sensors: "Sensors",
    led: "LED Indicators",
    features: "Features",
    autonomous: "Autonomous Movement",
    remote: "Remote Control",
    obstacle: "Obstacle Detection",
    data: "Data Collection",
  },
}

export function ProjectInfo() {
  const [lang] = useState<"kk" | "ru" | "en">("kk")
  const t = translations[lang]

  return (
    <section id="project" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t.components}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.arduino}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.motors}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.sensors}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.led}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t.features}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Radio className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">{t.autonomous}</p>
                  <p className="text-sm text-muted-foreground">AI-based navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">{t.obstacle}</p>
                  <p className="text-sm text-muted-foreground">Ultrasonic sensors</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-border/50">
          <img
            src="/images/whatsapp-20image-202026-01-11-20at-2020.jpeg"
            alt="Mars Rover Robot"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
