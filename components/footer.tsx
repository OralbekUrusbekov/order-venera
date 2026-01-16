"use client"

import { useLanguage } from "@/lib/language-context"
import { Github, Mail, Heart } from "lucide-react"

const translations = {
  kk: {
    about: "Жоба туралы",
    aboutText:
      "Arduino негізіндегі білім беру роботы. Марс зерттеушісін басқаруды үйреніңіз.",
    contact: "Байланыс",
    email: "Email",
    github: "GitHub репозиторийі",
    rights: "Барлық құқықтар қорғалған",
    madeWith: "Жасалған",
    by: "арқылы",
  },
  ru: {
    about: "О проекте",
    aboutText:
      "Образовательный робот на базе Arduino. Изучите управление марсоходом.",
    contact: "Контакты",
    email: "Email",
    github: "GitHub репозиторий",
    rights: "Все права защищены",
    madeWith: "Сделано с",
    by: "от",
  },
  en: {
    about: "About Project",
    aboutText:
      "Arduino-based educational robot. Learn to control a Mars Rover.",
    contact: "Contact",
    email: "Email",
    github: "GitHub Repository",
    rights: "All rights reserved",
    madeWith: "Made with",
    by: "by",
  },
}

export function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang]

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">MR</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mars Rover
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              {t.aboutText}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t.contact}</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@marsrover.edu"
                className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@marsrover.edu
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                {t.github}
              </a>
            </div>
          </div>

         
        </div>

       
      </div>
    </footer>
  )
}
