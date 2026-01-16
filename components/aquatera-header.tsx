"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X, Waves } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

const translations = {
  kk: {
    home: "Басты бет",
    mission: "Миссия",
    detection: "Анықтау",
    drilling: "Бұрғылау",
    technology: "Технология",
  },
  ru: {
    home: "Главная",
    mission: "Миссия",
    detection: "Обнаружение",
    drilling: "Бурение",
    technology: "Технология",
  },
  en: {
    home: "Home",
    mission: "Mission",
    detection: "Detection",
    drilling: "Drilling",
    technology: "Technology",
  },
}

export function AquateraHeader() {
  const { lang, setLang } = useLanguage()
  const t = translations[lang]
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-900/30 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - AQUATERA */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent hidden sm:inline">
            AQUATERA
          </span>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors">
            {t.home}
          </a>
          <a href="#mission" className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors">
            {t.mission}
          </a>
          <a href="#detection" className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors">
            {t.detection}
          </a>
          <a href="#drilling" className="text-sm text-foreground/70 hover:text-cyan-400 transition-colors">
            {t.drilling}
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Откладываем рендеринг DropdownMenu до гидратации */}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-blue-700/50 hover:bg-blue-900/20 bg-transparent"
                  suppressHydrationWarning
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-blue-700/50">
                <DropdownMenuItem onClick={() => setLang("kk")}>🇰🇿 Қазақша</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("ru")}>🇷🇺 Русский</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("en")}>🇬🇧 English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Заглушка для SSR
            <Button 
              variant="outline" 
              size="icon" 
              className="border-blue-700/50 hover:bg-blue-900/20 bg-transparent"
              aria-label="Language selector"
            >
              <Globe className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-blue-700/50 bg-transparent"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-900/30 bg-background/95 backdrop-blur">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a href="#home" onClick={() => setOpen(false)} className="text-sm">
              {t.home}
            </a>
            <a href="#mission" onClick={() => setOpen(false)} className="text-sm">
              {t.mission}
            </a>
            <a href="#detection" onClick={() => setOpen(false)} className="text-sm">
              {t.detection}
            </a>
            <a href="#drilling" onClick={() => setOpen(false)} className="text-sm">
              {t.drilling}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}