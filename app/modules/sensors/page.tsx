"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "Сенсорлармен жұмыс",
    subtitle: "Ультрадыбыстық, IR және басқа сенсорларды қолдану",
    level: "Орта деңгей",
    duration: "5 сағат",
    students: "156 оқушы",
    description:
      "Бұл модульде әртүрлі сенсорлармен жұмыс істеуді үйренесіз. Деректерді оқу, өңдеу және шешім қабылдау алгоритмдерін меңгересіз.",
    whatYouLearn: "Не үйренесіз:",
    topics: [
      "Ультрадыбыстық датчиктер",
      "IR қашықтан басқару",
      "Температура және ылғалдылық датчиктері",
      "Жарық датчиктері",
      "Деректерді сүзгілеу",
      "Калибрация әдістері",
      "Сенсорлық жүйелерді құру",
    ],
    backToHome: "Басты бетке",
    comingSoon: "Курс әзірленуде...",
  },
  ru: {
    title: "Работа с датчиками",
    subtitle: "Использование ультразвуковых, IR и других датчиков",
    level: "Средний уровень",
    duration: "5 часов",
    students: "156 студентов",
    description:
      "В этом модуле вы научитесь работать с различными датчиками. Освоите чтение данных, их обработку и алгоритмы принятия решений.",
    whatYouLearn: "Что вы изучите:",
    topics: [
      "Ультразвуковые датчики",
      "IR дистанционное управление",
      "Датчики температуры и влажности",
      "Датчики света",
      "Фильтрация данных",
      "Методы калибровки",
      "Построение сенсорных систем",
    ],
    backToHome: "На главную",
    comingSoon: "Курс в разработке...",
  },
  en: {
    title: "Working with Sensors",
    subtitle: "Using ultrasonic, IR, and other sensors",
    level: "Intermediate",
    duration: "5 hours",
    students: "156 students",
    description:
      "In this module, you will learn to work with various sensors. Master data reading, processing, and decision-making algorithms.",
    whatYouLearn: "What you'll learn:",
    topics: [
      "Ultrasonic sensors",
      "IR remote control",
      "Temperature and humidity sensors",
      "Light sensors",
      "Data filtering",
      "Calibration methods",
      "Building sensor systems",
    ],
    backToHome: "Back to Home",
    comingSoon: "Course in development...",
  },
}

export default function SensorsPage() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToHome}
          </Button>
        </Link>

        <Card className="border-purple-500/20">
          <CardHeader>
            <Badge className="w-fit mb-4 bg-purple-500/20 text-purple-400">{t.level}</Badge>
            <CardTitle className="text-4xl mb-2">{t.title}</CardTitle>
            <CardDescription className="text-lg">{t.subtitle}</CardDescription>
            <div className="flex gap-4 text-sm text-muted-foreground pt-4">
              <span>{t.duration}</span>
              <span>•</span>
              <span>{t.students}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">{t.description}</p>

            <div>
              <h3 className="text-xl font-semibold mb-4">{t.whatYouLearn}</h3>
              <ul className="space-y-3">
                {t.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">{t.comingSoon}</p>
              <Button size="lg" disabled className="bg-purple-600">
                <BookOpen className="mr-2 h-4 w-4" />
                {t.comingSoon}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
