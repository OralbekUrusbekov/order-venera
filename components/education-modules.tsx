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
import { BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"

const translations = {
  kk: {
    title: "Оқу модульдері",
    description:
      "Робототехника оқу бағдарламасы бойынша құрылған материалдар",
    beginner: "Бастаушылар",
    intermediate: "Орта деңгей",
    advanced: "Күрделі",
    module1: "Arduino негіздері",
    module1Desc:
      "Arduino платформасы мен микроконтроллерлермен танысу. LED, түймелер және сенсорлармен жұмыс.",
    module2: "Моторларды басқару",
    module2Desc:
      "DC моторлар мен серво моторларды басқару. PWM сигналдары және жылдамдықты реттеу.",
    module3: "Сенсорлармен жұмыс",
    module3Desc:
      "Ультрадыбыстық, IR және басқа сенсорларды қолдану. Деректерді оқу және өңдеу.",
    module4: "ЖИ интеграциясы",
    module4Desc:
      "TensorFlow.js арқылы роботты ЖИ технологияларымен басқару. Нейрон желілері.",
    hours: "сағат",
    students: "оқушы",
    startLearning: "Оқуды бастау",
  },
  ru: {
    title: "Модули обучения",
    description: "Материалы по программе робототехники",
    beginner: "Начинающие",
    intermediate: "Средний уровень",
    advanced: "Продвинутый",
    module1: "Основы Arduino",
    module1Desc:
      "Знакомство с платформой Arduino и микроконтроллерами. Работа с LED, кнопками и датчиками.",
    module2: "Управление двигателями",
    module2Desc:
      "Управление DC моторами и сервоприводами. PWM сигналы и регулировка скорости.",
    module3: "Работа с датчиками",
    module3Desc:
      "Использование ультразвуковых, IR и других датчиков. Чтение и обработка данных.",
    module4: "Интеграция ИИ",
    module4Desc:
      "Управление роботом через TensorFlow.js AI технологии. Нейронные сети.",
    hours: "часов",
    students: "студентов",
    startLearning: "Начать обучение",
  },
  en: {
    title: "Learning Modules",
    description: "Materials based on robotics curriculum",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    module1: "Arduino Basics",
    module1Desc:
      "Introduction to Arduino platform and microcontrollers. Working with LEDs, buttons, and sensors.",
    module2: "Motor Control",
    module2Desc:
      "Controlling DC motors and servos. PWM signals and speed regulation.",
    module3: "Working with Sensors",
    module3Desc:
      "Using ultrasonic, IR, and other sensors. Reading and processing data.",
    module4: "AI Integration",
    module4Desc:
      "Controlling robots with TensorFlow.js AI technologies. Neural networks.",
    hours: "hours",
    students: "students",
    startLearning: "Start Learning",
  },
}

export function EducationModules() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section
      id="education"
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-background to-purple-950/20 scroll-mt-24"
    >
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1 */}
          <Link href="/modules/arduino-basics" className="h-full">
            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors h-full">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-green-500/20 text-green-400">
                  {t.beginner}
                </Badge>
                <CardTitle className="text-lg sm:text-xl">
                  {t.module1}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.module1Desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>4 {t.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>234 {t.students}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.startLearning}
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Module 2 */}
          <Link href="/modules/motor-control" className="h-full">
            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors h-full">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-blue-500/20 text-blue-400">
                  {t.intermediate}
                </Badge>
                <CardTitle className="text-lg sm:text-xl">
                  {t.module2}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.module2Desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>6 {t.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>189 {t.students}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.startLearning}
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Module 3 */}
          <Link href="/modules/sensors" className="h-full">
            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors h-full">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-purple-500/20 text-purple-400">
                  {t.intermediate}
                </Badge>
                <CardTitle className="text-lg sm:text-xl">
                  {t.module3}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.module3Desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>5 {t.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>156 {t.students}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.startLearning}
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Module 4 */}
          <Link href="/modules/ai-integration" className="h-full">
            <Card className="border-pink-500/20 hover:border-pink-500/40 transition-colors h-full">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-pink-500/20 text-pink-400">
                  {t.advanced}
                </Badge>
                <CardTitle className="text-lg sm:text-xl">
                  {t.module4}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t.module4Desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>8 {t.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>92 {t.students}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.startLearning}
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
