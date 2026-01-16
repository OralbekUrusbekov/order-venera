"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { TrendingUp, Calendar, Target, LineChart, Sparkles, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const translations = {
  kk: {
    title: "Болжамдық Аналитика",
    subtitle: "AI негізіндегі су ресурстарын басқару болжамдары",
    predictions: "Болжамдар",
    trends: "Тренділер",
    alerts: "Ескертулер",
    waterLevel: "Су деңгейі",
    extraction: "Өндіру",
    quality: "Сапа",
    year2030: "2030 болжамы",
    year2050: "2050 болжамы",
    current: "Ағымдағы",
    forecast: "Болжам",
    confidence: "Сенімділік",
    high: "Жоғары",
    medium: "Орташа",
    low: "Төмен",
    mlModel: "ML Моделі",
    accuracy: "Дәлдік",
    dataPoints: "Деректер нүктелері",
    lastUpdate: "Соңғы жаңарту",
    critical: "Маңызды",
    warning: "Ескерту",
    normal: "Қалыпты",
  },
  ru: {
    title: "Прогнозная Аналитика",
    subtitle: "Прогнозы управления водными ресурсами на базе ИИ",
    predictions: "Прогнозы",
    trends: "Тренды",
    alerts: "Оповещения",
    waterLevel: "Уровень воды",
    extraction: "Добыча",
    quality: "Качество",
    year2030: "Прогноз 2030",
    year2050: "Прогноз 2050",
    current: "Текущий",
    forecast: "Прогноз",
    confidence: "Уверенность",
    high: "Высокая",
    medium: "Средняя",
    low: "Низкая",
    mlModel: "ML Модель",
    accuracy: "Точность",
    dataPoints: "Точки данных",
    lastUpdate: "Последнее обновление",
    critical: "Критично",
    warning: "Предупреждение",
    normal: "Норма",
  },
  en: {
    title: "Predictive Analytics",
    subtitle: "AI-powered water resource management predictions",
    predictions: "Predictions",
    trends: "Trends",
    alerts: "Alerts",
    waterLevel: "Water Level",
    extraction: "Extraction",
    quality: "Quality",
    year2030: "2030 Forecast",
    year2050: "2050 Forecast",
    current: "Current",
    forecast: "Forecast",
    confidence: "Confidence",
    high: "High",
    medium: "Medium",
    low: "Low",
    mlModel: "ML Model",
    accuracy: "Accuracy",
    dataPoints: "Data Points",
    lastUpdate: "Last Update",
    critical: "Critical",
    warning: "Warning",
    normal: "Normal",
  },
}

// Animated chart bar
function ChartBar({
  value,
  maxValue,
  color,
  delay,
  label,
}: { value: number; maxValue: number; color: string; delay: number; label: string }) {
  const percentage = (value / maxValue) * 100
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-32 sm:h-40 w-8 sm:w-10 bg-muted/30 rounded-lg overflow-hidden flex items-end">
        <motion.div
          className={`w-full ${color} rounded-t-md`}
          initial={{ height: 0 }}
          whileInView={{ height: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-foreground/50">{label}</span>
    </div>
  )
}

// Trend line chart
function TrendLine({ data, color }: { data: number[]; color: string }) {
  const maxVal = Math.max(...data)
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (val / maxVal) * 80,
  }))

  const pathData = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const cpX = (prev.x + point.x) / 2
    return `${acc} Q ${cpX} ${prev.y}, ${point.x} ${point.y}`
  }, "")

  return (
    <svg className="w-full h-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i + 1 }}
        />
      ))}
    </svg>
  )
}

export function PredictiveAnalytics() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [activeTab, setActiveTab] = useState("predictions")
  const [accuracy, setAccuracy] = useState(94.7)

  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracy((prev) => Math.max(90, Math.min(99, prev + (Math.random() - 0.5) * 0.5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Sample data
  const waterLevelData = [45, 52, 48, 55, 62, 58, 65, 70, 68, 75]
  const extractionData = [30, 35, 32, 40, 45, 42, 48, 52, 50, 55]
  const qualityData = [85, 87, 86, 88, 90, 89, 91, 92, 91, 93]

  const alerts = [
    {
      type: "warning",
      message:
        lang === "kk"
          ? "Солтүстік аймақта су деңгейі төмендеді"
          : lang === "ru"
            ? "Уровень воды снизился в северном регионе"
            : "Water level decreased in northern region",
    },
    {
      type: "normal",
      message:
        lang === "kk"
          ? "Шығыс секторда өндіру тұрақты"
          : lang === "ru"
            ? "Добыча стабильна в восточном секторе"
            : "Extraction stable in eastern sector",
    },
    {
      type: "critical",
      message:
        lang === "kk"
          ? "Батыс аймақта сапа тексеруі қажет"
          : lang === "ru"
            ? "Требуется проверка качества в западном регионе"
            : "Quality check required in western region",
    },
  ]

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300 uppercase tracking-wide font-semibold">
              {t.mlModel}: {accuracy.toFixed(1)}% {t.accuracy}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-200 via-pink-300 to-orange-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Main content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="predictions" className="gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">{t.predictions}</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="gap-2">
              <LineChart className="w-4 h-4" />
              <span className="hidden sm:inline">{t.trends}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.alerts}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2030 Prediction */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-cyan-500/20 bg-card/30 backdrop-blur-xl h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        {t.year2030}
                      </CardTitle>
                      <Badge className="bg-cyan-500/20 text-cyan-400">{t.high}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-around">
                      <ChartBar value={75} maxValue={100} color="bg-cyan-400" delay={0.2} label={t.waterLevel} />
                      <ChartBar value={60} maxValue={100} color="bg-blue-400" delay={0.4} label={t.extraction} />
                      <ChartBar value={88} maxValue={100} color="bg-teal-400" delay={0.6} label={t.quality} />
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <div className="text-sm text-foreground/70">
                        {t.confidence}: <span className="text-cyan-400 font-semibold">94.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Current */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-purple-500/20 bg-card/30 backdrop-blur-xl h-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        {t.current}
                      </CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">{t.normal}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex justify-around">
                      <ChartBar value={55} maxValue={100} color="bg-purple-400" delay={0.3} label={t.waterLevel} />
                      <ChartBar value={42} maxValue={100} color="bg-pink-400" delay={0.5} label={t.extraction} />
                      <ChartBar value={78} maxValue={100} color="bg-violet-400" delay={0.7} label={t.quality} />
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="text-sm text-foreground/70 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {t.lastUpdate}: <span className="text-purple-400 font-semibold">2 min ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 2050 Prediction */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-orange-500/20 bg-card/30 backdrop-blur-xl h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-400" />
                        {t.year2050}
                      </CardTitle>
                      <Badge className="bg-orange-500/20 text-orange-400">{t.medium}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-around">
                      <ChartBar value={90} maxValue={100} color="bg-orange-400" delay={0.4} label={t.waterLevel} />
                      <ChartBar value={78} maxValue={100} color="bg-amber-400" delay={0.6} label={t.extraction} />
                      <ChartBar value={95} maxValue={100} color="bg-yellow-400" delay={0.8} label={t.quality} />
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="text-sm text-foreground/70">
                        {t.confidence}: <span className="text-orange-400 font-semibold">87.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Card className="border-cyan-500/20 bg-card/30 backdrop-blur-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{t.waterLevel}</CardTitle>
                    <CardDescription>+12.5% {t.forecast}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TrendLine data={waterLevelData} color="#22d3ee" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Card className="border-purple-500/20 bg-card/30 backdrop-blur-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{t.extraction}</CardTitle>
                    <CardDescription>+8.3% {t.forecast}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TrendLine data={extractionData} color="#a855f7" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Card className="border-green-500/20 bg-card/30 backdrop-blur-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{t.quality}</CardTitle>
                    <CardDescription>+5.2% {t.forecast}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TrendLine data={qualityData} color="#22c55e" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="border-yellow-500/20 bg-card/30 backdrop-blur-xl max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  {t.alerts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-lg border flex items-start gap-3 ${
                        alert.type === "critical"
                          ? "bg-red-500/10 border-red-500/30"
                          : alert.type === "warning"
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-green-500/10 border-green-500/30"
                      }`}
                    >
                      {alert.type === "critical" ? (
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      ) : alert.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <Badge
                          className={`mb-2 ${
                            alert.type === "critical"
                              ? "bg-red-500/20 text-red-400"
                              : alert.type === "warning"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {alert.type === "critical" ? t.critical : alert.type === "warning" ? t.warning : t.normal}
                        </Badge>
                        <p className="text-sm text-foreground/70">{alert.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          <Card className="text-center border-purple-500/20 bg-card/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-400">1.2M</div>
              <div className="text-xs text-foreground/50">{t.dataPoints}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-cyan-500/20 bg-card/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-cyan-400">{accuracy.toFixed(1)}%</div>
              <div className="text-xs text-foreground/50">{t.accuracy}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-green-500/20 bg-card/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-400">24/7</div>
              <div className="text-xs text-foreground/50">{t.mlModel}</div>
            </CardContent>
          </Card>
          <Card className="text-center border-orange-500/20 bg-card/30 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-400">50+</div>
              <div className="text-xs text-foreground/50">{t.predictions}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
