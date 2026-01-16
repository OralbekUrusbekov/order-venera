"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"


const translations = {
  kk: {
    title: "Су тапшылығының географиясы",
    subtitle: "15 жылда орталық азия су ресурстарының өзгеруі",
    kazakhstanMap: "Қазақстан су ресурстары",
    worldMap: "Әлемдік су тапшылығы",
    moyynkum: "Мойынқұм шөлі",
    description:
      "2010-2025 жылдар аралығында Қазақстан мен әлемнің басқа аймақтарында су ресурстарының қолданылуы 47% ге артты. Мойынқұм шөлінің астында табылған су ресурстары өндіріс пен ауыл шаруашылығына уақыттық шешім бере алады.",
    critical: "Критикалық аймақ",
    moderate: "Орта деңгей",
    stable: "Тұрақты",
  },
  ru: {
    title: "География дефицита воды",
    subtitle: "Изменение водных ресурсов Центральной Азии за 15 лет",
    kazakhstanMap: "Водные ресурсы Казахстана",
    worldMap: "Мировой дефицит воды",
    moyynkum: "Пустыня Мойынкум",
    description:
      "За период 2010-2025 годов использование водных ресурсов в Казахстане и других регионах мира увеличилось на 47%. Подземные водные ресурсы, обнаруженные под пустыней Мойынкум, могут обеспечить временное решение для промышленности и сельского хозяйства.",
    critical: "Критическая зона",
    moderate: "Умеренный уровень",
    stable: "Стабильный",
  },
  en: {
    title: "Water Scarcity Geography",
    subtitle: "Changes in Central Asia's water resources over 15 years",
    kazakhstanMap: "Kazakhstan Water Resources",
    worldMap: "Global Water Scarcity",
    moyynkum: "Moyynkum Desert",
    description:
      "Between 2010-2025, water resource consumption in Kazakhstan and other regions increased by 47%. Underground water resources discovered beneath the Moyynkum Desert can provide temporary relief for industry and agriculture.",
    critical: "Critical Zone",
    moderate: "Moderate Level",
    stable: "Stable",
  },
}

export function WaterScarcityMaps() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <section id="maps" className="py-20 px-4 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-cyan-300 font-semibold text-sm tracking-wider uppercase bg-cyan-900/30 px-4 py-2 rounded-full border border-cyan-700/50">
              {lang === "kk" ? "География" : lang === "ru" ? "География" : "Geography"}
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300/80 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Карта Казахстана */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-xl border border-slate-700/50 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {t.kazakhstanMap}
                </h3>
              </div>

              {/* Карта */}
              <div className="relative mb-8 bg-slate-900/50 rounded-lg border border-slate-600/30 p-4">
                <div className="absolute -top-3 left-6 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">
                  <span className="text-sm text-cyan-300 font-medium">2025</span>
                </div>
                <div className="h-64 rounded-md overflow-hidden relative">
                    <Image
                        src="/kaz.png"
                        alt="Kazakhstan water resources map"
                        fill
                        className="object-cover"
                        priority
                    />
                    </div>

              </div>

              {/* Легенда */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-red-900/30">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                  <div>
                    <span className="text-white font-medium">{t.critical}</span>
                    <p className="text-sm text-slate-400">-40% су ресурстары</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-yellow-900/30">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                  <div>
                    <span className="text-white font-medium">{t.moderate}</span>
                    <p className="text-sm text-slate-400">-15% су ресурстары</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-emerald-900/30">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <div>
                    <span className="text-white font-medium">{t.stable}</span>
                    <p className="text-sm text-slate-400">+5% су ресурстары</p>
                  </div>
                </div>
              </div>

              {/* Мойынқұм блок */}
              <div className="p-5 rounded-lg bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-300 text-lg">🌵</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{t.moyynkum}</h4>
                </div>
                <p className="text-slate-300/80 text-sm">
                  {lang === "kk" 
                    ? "Астындағы жерасты су қорларының мөлшері 3.5 млрд. м³" 
                    : lang === "ru"
                    ? "Объем подземных водных ресурсов составляет 3.5 млрд. м³"
                    : "Underground water resources volume is 3.5 billion m³"}
                </p>
              </div>
            </div>
          </div>

          {/* Мировая карта */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-xl border border-slate-700/50 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {t.worldMap}
                </h3>
              </div>

              {/* Карта */}
              <div className="relative mb-8 bg-slate-900/50 rounded-lg border border-slate-600/30 p-4">
                <div className="absolute -top-3 left-6 bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">
                  <span className="text-sm text-blue-300 font-medium">Global</span>
                </div>
                <div className="h-64 rounded-md overflow-hidden relative">
                <Image
                    src="/world.png"
                    alt="Global water scarcity map"
                    fill
                    className="object-cover"
                />
                </div>

              </div>

              {/* Легенда */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-red-900/30">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-pink-600"></div>
                  <div>
                    <span className="text-white font-medium">{t.critical}</span>
                    <p className="text-sm text-slate-400">
                      {lang === "kk" 
                        ? "Африка, Оңтүстік Азия, Орталық Азия" 
                        : lang === "ru"
                        ? "Африка, Южная Азия, Центральная Азия"
                        : "Africa, South Asia, Central Asia"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-yellow-900/30">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600"></div>
                  <div>
                    <span className="text-white font-medium">{t.moderate}</span>
                    <p className="text-sm text-slate-400">
                      {lang === "kk" 
                        ? "Оңтүстік Америка, Оңтүстік-шығыс Азия" 
                        : lang === "ru"
                        ? "Южная Америка, Юго-Восточная Азия"
                        : "South America, Southeast Asia"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                  <div className="text-2xl font-bold text-cyan-300 mb-1">47%</div>
                  <div className="text-sm text-slate-400">
                    {lang === "kk" 
                      ? "Су қолданылуының өсуі" 
                      : lang === "ru"
                      ? "Рост потребления воды"
                      : "Water consumption growth"}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                  <div className="text-2xl font-bold text-blue-300 mb-1">2.2Б</div>
                  <div className="text-sm text-slate-400">
                    {lang === "kk" 
                      ? "Су тапшылығы бар адамдар" 
                      : lang === "ru"
                      ? "Люди с дефицитом воды"
                      : "People with water scarcity"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-indigo-900/20 border border-cyan-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
            <h4 className="text-xl font-bold text-white">
              {lang === "kk" 
                ? "Талдау және болжамдар" 
                : lang === "ru"
                ? "Анализ и прогнозы"
                : "Analysis and Forecasts"}
            </h4>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed text-center">
            {t.description}
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-sm text-slate-400">
                {lang === "kk" 
                  ? "Нақты уақыттағы деректер" 
                  : lang === "ru"
                  ? "Данные в реальном времени"
                  : "Real-time data"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm text-slate-400">
                {lang === "kk" 
                  ? "Жыл сайын жаңартылады" 
                  : lang === "ru"
                  ? "Обновляется ежегодно"
                  : "Updated annually"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
