"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X, Droplet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const translations = {
  kk: {
    home: "Басты бет",
    overview: "Жүйе туралы",
    detection: "Анықтау",
    extraction: "Шығару",
    technology: "Технология",
    impact: "Әсері",
  },
  ru: {
    home: "Главная",
    overview: "О системе",
    detection: "Обнаружение",
    extraction: "Извлечение",
    technology: "Технология",
    impact: "Воздействие",
  },
  en: {
    home: "Home",
    overview: "About System",
    detection: "Detection",
    extraction: "Extraction",
    technology: "Technology",
    impact: "Impact",
  },
}

export function Header() {
  const { lang, setLang } = useLanguage()
  const t = translations[lang]
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:inline">
            AquaDetect
          </span>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="nav-link">
            {t.home}
          </a>
          <a href="#overview" className="nav-link">
            {t.overview}
          </a>
          <a href="#detection" className="nav-link">
            {t.detection}
          </a>
          <a href="#extraction" className="nav-link">
            {t.extraction}
          </a>
          <a href="#technology" className="nav-link">
            {t.technology}
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("kk")}>🇰🇿 Қазақша</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("ru")}>🇷🇺 Русский</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("en")}>🇬🇧 English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="md:hidden bg-transparent" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a href="#home" onClick={() => setOpen(false)}>
              {t.home}
            </a>
            <a href="#overview" onClick={() => setOpen(false)}>
              {t.overview}
            </a>
            <a href="#detection" onClick={() => setOpen(false)}>
              {t.detection}
            </a>
            <a href="#extraction" onClick={() => setOpen(false)}>
              {t.extraction}
            </a>
            <a href="#technology" onClick={() => setOpen(false)}>
              {t.technology}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
