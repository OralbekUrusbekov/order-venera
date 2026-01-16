"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio, Zap, Waves } from "lucide-react"

const translations = {
  kk: {
    title: "Негізгі технологиялар",
    description: "Венера атмосферасын зерттеу жүйесінің негізгі компоненттері",
    feature1: "Қысым датчигі",
    feature1desc:
      "Жоғары қысымды датчик атмосфералық қысымды нақты уақытта өлшейді. 0–100 бар диапазонында жұмыс істейді.",
    feature2: "Температура және ылғалдылық",
    feature2desc:
      "DHT-22 және термопар датчиктері температура мен ылғалдылықты өлшейді, атмосфералық деректерді жинайды.",
    feature3: "Аналитикалық модуль",
    feature3desc:
      "AI модулі атмосфералық деректерді өңдеп, автоматты талдау және болжамдар жасайды.",
    stat1: "Қысым",
    stat2: "Датчиктер",
    stat3: "Өңдеу жылдамдығы",
  },
  ru: {
    title: "Ключевые технологии",
    description: "Основные компоненты системы изучения атмосферы Венеры",
    feature1: "Датчик давления",
    feature1desc:
      "Высокоточный датчик измеряет атмосферное давление в реальном времени. Диапазон работы 0–100 бар.",
    feature2: "Температура и влажность",
    feature2desc:
      "Датчики DHT-22 и термопары измеряют температуру и влажность, собирая атмосферные данные.",
    feature3: "Аналитический модуль",
    feature3desc:
      "AI модуль обрабатывает данные атмосферы, выполняет автоматический анализ и делает прогнозы.",
    stat1: "Давление",
    stat2: "Датчики",
    stat3: "Скорость обработки",
  },
  en: {
    title: "Key Technologies",
    description: "Core components of the Venus atmosphere study system",
    feature1: "Pressure Sensor",
    feature1desc:
      "High-precision sensor measures atmospheric pressure in real-time. Operational range 0–100 bar.",
    feature2: "Temperature & Humidity",
    feature2desc:
      "DHT-22 and thermocouple sensors measure temperature and humidity, collecting atmospheric data.",
    feature3: "Analytical Module",
    feature3desc:
      "AI module processes atmospheric data, performs automated analysis, and generates predictions.",
    stat1: "Pressure",
    stat2: "Sensors",
    stat3: "Processing Speed",
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
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">92 bar</div>
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
              <div className="text-2xl sm:text-3xl font-bold text-teal-400 mb-1">100ms</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t.stat3}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
