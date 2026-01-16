"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "ЖИ интеграциясы",
    subtitle: "TensorFlow.js арқылы роботты ЖИ технологияларымен басқару",
    level: "Күрделі",
    duration: "8 сағат",
    students: "92 оқушы",
    description:
      "Бұл модульде жасанды интеллект технологияларын роботтармен біріктіруді үйренесіз. TensorFlow.js кітапханасын қолданып, нейрондық желілерді құрып, роботты интеллектуалды етесіз.",
    whatYouLearn: "Не үйренесіз:",
    topics: [
      "TensorFlow.js негіздері",
      "Машиналық оқыту алгоритмдері",
      "Нейрондық желілерді құру",
      "Бейне ағымын өңдеу",
      "Нысанды тану",
      "Роботты автономды басқару",
      "Edge AI технологиялары",
    ],
    backToHome: "Басты бетке",
    comingSoon: "Курс әзірленуде...",
  },
  ru: {
    title: "Интеграция ИИ",
    subtitle: "Управление роботом через TensorFlow.js AI технологии",
    level: "Продвинутый",
    duration: "8 часов",
    students: "92 студента",
    description:
      "В этом модуле вы научитесь интегрировать технологии искусственного интеллекта с роботами. Используя библиотеку TensorFlow.js, создадите нейронные сети и сделаете робота интеллектуальным.",
    whatYouLearn: "Что вы изучите:",
    topics: [
      "Основы TensorFlow.js",
      "Алгоритмы машинного обучения",
      "Построение нейронных сетей",
      "Обработка видео потока",
      "Распознавание объектов",
      "Автономное управление роботом",
      "Edge AI технологии",
    ],
    backToHome: "На главную",
    comingSoon: "Курс в разработке...",
  },
  en: {
    title: "AI Integration",
    subtitle: "Controlling robots with TensorFlow.js AI technologies",
    level: "Advanced",
    duration: "8 hours",
    students: "92 students",
    description:
      "In this module, you will learn to integrate artificial intelligence technologies with robots. Using the TensorFlow.js library, you'll build neural networks and make the robot intelligent.",
    whatYouLearn: "What you'll learn:",
    topics: [
      "TensorFlow.js basics",
      "Machine learning algorithms",
      "Building neural networks",
      "Video stream processing",
      "Object recognition",
      "Autonomous robot control",
      "Edge AI technologies",
    ],
    backToHome: "Back to Home",
    comingSoon: "Course in development...",
  },
}

export default function AIIntegrationPage() {
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

        <Card className="border-pink-500/20">
          <CardHeader>
            <Badge className="w-fit mb-4 bg-pink-500/20 text-pink-400">{t.level}</Badge>
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
                    <CheckCircle2 className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">{t.comingSoon}</p>
              <Button size="lg" disabled className="bg-pink-600">
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
