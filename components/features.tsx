"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio, Zap, Waves } from "lucide-react"

const translations = {
  kk: {
    title: "Ғана технологиялар",
    description: "Су асты су анықтау жүйесінің негіздеу компоненттері",
    feature1: "Датчик анықтау",
    feature1desc:
      "Ультрадыбыстық датчиктер құм астындағы су каналдарын тарамдап анықтайды. 50м тереңдігіне дейін анықтама қабілеті.",
    feature2: "Арнайы өлшеу",
    feature2desc:
      "DHT-11 датчигі ылғалдылық және температура өлшейді. Су сапасы көрсеткішін нақты уақытта анықтап отырады.",
    feature3: "Су шығару",
    feature3desc:
      "L298N мотор драйверінің арқасында ағызу насосы басқарылады. Сағатына 100 литрге дейін су шығара алады.",
    stat1: "Тереңдік",
    stat2: "Сенсорлар",
    stat3: "Өнімділік",
  },
  ru: {
    title: "Ключевые технологии",
    description: "Основные компоненты системы обнаружения подземных вод",
    feature1: "Датчики обнаружения",
    feature1desc:
      "Ультразвуковые датчики сканируют подземные каналы под песком. Способность обнаружения до глубины 50м.",
    feature2: "Измерение качества",
    feature2desc: "Датчик DHT-11 измеряет влажность и температуру. Мониторинг качества воды в реальном времени.",
    feature3: "Извлечение воды",
    feature3desc: "Драйвер L298N управляет насосом для откачки. Производительность до 100 литров в час.",
    stat1: "Глубина",
    stat2: "Датчики",
    stat3: "Производительность",
  },
  en: {
    title: "Key Technologies",
    description: "Core components of the groundwater detection system",
    feature1: "Detection Sensors",
    feature1desc:
      "Ultrasonic sensors scan underground water channels beneath sand. Detection capability up to 50m depth.",
    feature2: "Water Quality",
    feature2desc: "DHT-11 sensor measures humidity and temperature. Real-time water quality monitoring.",
    feature3: "Water Extraction",
    feature3desc: "L298N driver controls the extraction pump. Output capacity up to 100 liters per hour.",
    stat1: "Depth",
    stat2: "Sensors",
    stat3: "Output",
  },
}

export function Features() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section id="overview" className="py-16 sm:py-20 px-4 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-12">
          <Card className="border-blue-500/20 bg-card/50 backdrop-blur">
            <CardHeader className="items-center text-center sm:items-start sm:text-left">
              <Radio className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-3" />
              <CardTitle className="text-lg sm:text-xl">{t.feature1}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t.feature1desc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-cyan-500/20 bg-card/50 backdrop-blur">
            <CardHeader className="items-center text-center sm:items-start sm:text-left">
              <Waves className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-3" />
              <CardTitle className="text-lg sm:text-xl">{t.feature2}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t.feature2desc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-teal-500/20 bg-card/50 backdrop-blur">
            <CardHeader className="items-center text-center sm:items-start sm:text-left">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400 mb-3" />
              <CardTitle className="text-lg sm:text-xl">{t.feature3}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{t.feature3desc}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">50m</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t.stat1}</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">5</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t.stat2}</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl sm:text-3xl font-bold text-teal-400 mb-1">100L/h</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t.stat3}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
