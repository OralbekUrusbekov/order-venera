"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "Моторларды басқару",
    subtitle: "DC моторлар мен серво моторларды басқару",
    level: "Орта деңгей",
    duration: "6 сағат",
    students: "189 оқушы",
    description:
      "Бұл модульде әртүрлі моторларды басқаруды үйренесіз. DC моторлар, серво моторлар және PWM сигналдарын қолдануды меңгересіз.",
    whatYouLearn: "Не үйренесіз:",
    topics: [
      "DC моторлардың жұмыс принципі",
      "H-көпір драйверлері",
      "PWM сигналдары",
      "Серво моторлармен жұмыс",
      "Жылдамдықты реттеу",
      "Бағытты басқару",
      "Энкодерлермен жұмыс",
    ],
    backToHome: "Басты бетке",
    comingSoon: "Курс әзірленуде...",
  },
  ru: {
    title: "Управление двигателями",
    subtitle: "Управление DC моторами и сервоприводами",
    level: "Средний уровень",
    duration: "6 часов",
    students: "189 студентов",
    description:
      "В этом модуле вы научитесь управлять различными двигателями. Освоите DC моторы, сервоприводы и использование PWM сигналов.",
    whatYouLearn: "Что вы изучите:",
    topics: [
      "Принцип работы DC моторов",
      "H-мост драйверы",
      "PWM сигналы",
      "Работа с сервоприводами",
      "Регулировка скорости",
      "Управление направлением",
      "Работа с энкодерами",
    ],
    backToHome: "На главную",
    comingSoon: "Курс в разработке...",
  },
  en: {
    title: "Motor Control",
    subtitle: "Controlling DC motors and servos",
    level: "Intermediate",
    duration: "6 hours",
    students: "189 students",
    description:
      "In this module, you will learn to control various motors. Master DC motors, servos, and using PWM signals.",
    whatYouLearn: "What you'll learn:",
    topics: [
      "DC motor working principles",
      "H-bridge drivers",
      "PWM signals",
      "Working with servos",
      "Speed control",
      "Direction control",
      "Working with encoders",
    ],
    backToHome: "Back to Home",
    comingSoon: "Course in development...",
  },
}

export default function MotorControlPage() {
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

        <Card className="border-blue-500/20">
          <CardHeader>
            <Badge className="w-fit mb-4 bg-blue-500/20 text-blue-400">{t.level}</Badge>
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
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">{t.comingSoon}</p>
              <Button size="lg" disabled className="bg-blue-600">
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
