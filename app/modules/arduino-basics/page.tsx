"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "Arduino негіздері",
    subtitle: "Arduino платформасы мен микроконтроллерлермен танысу",
    level: "Бастаушылар",
    duration: "4 сағат",
    students: "234 оқушы",
    description:
      "Бұл модульде Arduino платформасының негіздерімен танысасыз. LED жарықдиодтарын басқаруды, түймелермен жұмыс жасауды және қарапайым датчиктерді қолдануды үйренесіз.",
    whatYouLearn: "Не үйренесіз:",
    topics: [
      "Arduino IDE орнату және баптау",
      "Микроконтроллер архитектурасы",
      "Digital және Analog пиндер",
      "LED жарықдиодтарын басқару",
      "Түймелермен жұмыс",
      "Serial Monitor қолдану",
      "Қарапайым жобалар құру",
    ],
    backToHome: "Басты бетке",
    comingSoon: "Курс әзірленуде...",
  },
  ru: {
    title: "Основы Arduino",
    subtitle: "Знакомство с платформой Arduino и микроконтроллерами",
    level: "Начинающие",
    duration: "4 часа",
    students: "234 студента",
    description:
      "В этом модуле вы познакомитесь с основами платформы Arduino. Научитесь управлять LED светодиодами, работать с кнопками и использовать простые датчики.",
    whatYouLearn: "Что вы изучите:",
    topics: [
      "Установка и настройка Arduino IDE",
      "Архитектура микроконтроллера",
      "Digital и Analog пины",
      "Управление LED светодиодами",
      "Работа с кнопками",
      "Использование Serial Monitor",
      "Создание простых проектов",
    ],
    backToHome: "На главную",
    comingSoon: "Курс в разработке...",
  },
  en: {
    title: "Arduino Basics",
    subtitle: "Introduction to Arduino platform and microcontrollers",
    level: "Beginner",
    duration: "4 hours",
    students: "234 students",
    description:
      "In this module, you will learn the basics of the Arduino platform. Learn to control LED lights, work with buttons, and use simple sensors.",
    whatYouLearn: "What you'll learn:",
    topics: [
      "Installing and configuring Arduino IDE",
      "Microcontroller architecture",
      "Digital and Analog pins",
      "Controlling LED lights",
      "Working with buttons",
      "Using Serial Monitor",
      "Building simple projects",
    ],
    backToHome: "Back to Home",
    comingSoon: "Course in development...",
  },
}

export default function ArduinoBasicsPage() {
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

        <Card className="border-green-500/20">
          <CardHeader>
            <Badge className="w-fit mb-4 bg-green-500/20 text-green-400">{t.level}</Badge>
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
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">{t.comingSoon}</p>
              <Button size="lg" disabled className="bg-green-600">
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
