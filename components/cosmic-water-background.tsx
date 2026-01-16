"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number
}

interface Comet {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  tailLength: number
}

interface AtmosphereParticle {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  angle: number
}

export function CosmicWaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const venusImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const venusImage = new Image()
    venusImage.crossOrigin = "anonymous"
    venusImage.src = "/venus-planet-realistic-photograph-orange-yellow-at.jpg"
    venusImageRef.current = venusImage

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stars: Star[] = []
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      })
    }

    const comets: Comet[] = []
    for (let i = 0; i < 5; i++) {
      comets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 3 + 2,
        angle: Math.PI / 4 + Math.random() * 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        tailLength: Math.random() * 150 + 100,
      })
    }

    const atmosphereParticles: AtmosphereParticle[] = []
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 180 + Math.random() * 80
      atmosphereParticles.push({
        x: canvas.width * 0.7 + Math.cos(angle) * distance,
        y: canvas.height * 0.4 + Math.sin(angle) * distance,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        angle: angle,
      })
    }

    let animationTime = 0
    let venusRotation = 0

    const animate = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.4,
        0,
        canvas.width * 0.7,
        canvas.height * 0.4,
        canvas.width,
      )
      gradient.addColorStop(0, "#1a0a2e") // Deep purple near Venus
      gradient.addColorStop(0.3, "#0d1b2a") // Dark blue
      gradient.addColorStop(0.6, "#051020") // Very dark blue
      gradient.addColorStop(1, "#000510") // Almost black
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationTime += 0.02
      venusRotation += 0.001

      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.7,
        0,
        canvas.width * 0.2,
        canvas.height * 0.7,
        300,
      )
      nebulaGradient.addColorStop(0, "rgba(139, 69, 19, 0.1)")
      nebulaGradient.addColorStop(0.5, "rgba(255, 140, 0, 0.05)")
      nebulaGradient.addColorStop(1, "transparent")
      ctx.fillStyle = nebulaGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with twinkling
      stars.forEach((star) => {
        const twinkle = Math.sin(animationTime * star.twinkleSpeed * 50) * 0.3
        const currentOpacity = Math.max(0.1, Math.min(1, star.opacity + twinkle))

        // Star core
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Star glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2)
        const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3)
        glowGradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity * 0.4})`)
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.fill()
      })

      comets.forEach((comet) => {
        // Update comet position
        comet.x += Math.cos(comet.angle) * comet.speed
        comet.y += Math.sin(comet.angle) * comet.speed

        // Reset comet when it goes off screen
        if (comet.x > canvas.width + 100 || comet.y > canvas.height + 100) {
          comet.x = -100 + Math.random() * canvas.width * 0.5
          comet.y = -100 + Math.random() * canvas.height * 0.3
          comet.opacity = Math.random() * 0.6 + 0.4
        }

        // Draw comet tail
        const tailGradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - Math.cos(comet.angle) * comet.tailLength,
          comet.y - Math.sin(comet.angle) * comet.tailLength,
        )
        tailGradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`)
        tailGradient.addColorStop(0.3, `rgba(100, 180, 255, ${comet.opacity * 0.5})`)
        tailGradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(
          comet.x - Math.cos(comet.angle) * comet.tailLength,
          comet.y - Math.sin(comet.angle) * comet.tailLength,
        )
        ctx.strokeStyle = tailGradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Comet glow trail
        ctx.beginPath()
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(
          comet.x - Math.cos(comet.angle) * comet.tailLength * 0.7,
          comet.y - Math.sin(comet.angle) * comet.tailLength * 0.7,
        )
        ctx.strokeStyle = `rgba(150, 200, 255, ${comet.opacity * 0.2})`
        ctx.lineWidth = 8
        ctx.stroke()

        // Comet head
        ctx.beginPath()
        ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`
        ctx.fill()

        // Comet head glow
        const headGlow = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 15)
        headGlow.addColorStop(0, `rgba(200, 230, 255, ${comet.opacity * 0.8})`)
        headGlow.addColorStop(1, "transparent")
        ctx.fillStyle = headGlow
        ctx.beginPath()
        ctx.arc(comet.x, comet.y, 15, 0, Math.PI * 2)
        ctx.fill()
      })

      const venusX = canvas.width * 0.7
      const venusY = canvas.height * 0.4
      const venusRadius = Math.min(canvas.width, canvas.height) * 0.18

      // Venus outer atmosphere glow
      const outerGlow = ctx.createRadialGradient(venusX, venusY, venusRadius * 0.9, venusX, venusY, venusRadius * 1.8)
      outerGlow.addColorStop(0, "rgba(255, 180, 100, 0.3)")
      outerGlow.addColorStop(0.4, "rgba(255, 140, 50, 0.15)")
      outerGlow.addColorStop(0.7, "rgba(200, 100, 50, 0.05)")
      outerGlow.addColorStop(1, "transparent")
      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(venusX, venusY, venusRadius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // Venus atmosphere rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = venusRadius * (1.2 + i * 0.15)
        const ringOpacity = 0.1 - i * 0.02
        ctx.beginPath()
        ctx.arc(venusX, venusY, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 200, 150, ${ringOpacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw Venus image or fallback gradient
      if (venusImageRef.current?.complete && venusImageRef.current.naturalWidth > 0) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2)
        ctx.clip()
        ctx.translate(venusX, venusY)
        ctx.rotate(venusRotation)
        ctx.drawImage(venusImageRef.current, -venusRadius, -venusRadius, venusRadius * 2, venusRadius * 2)
        ctx.restore()
      } else {
        // Fallback: Draw Venus with gradient
        const venusGradient = ctx.createRadialGradient(
          venusX - venusRadius * 0.3,
          venusY - venusRadius * 0.3,
          0,
          venusX,
          venusY,
          venusRadius,
        )
        venusGradient.addColorStop(0, "#f4d03f")
        venusGradient.addColorStop(0.3, "#e67e22")
        venusGradient.addColorStop(0.6, "#d35400")
        venusGradient.addColorStop(0.8, "#a04000")
        venusGradient.addColorStop(1, "#7d3200")

        ctx.beginPath()
        ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2)
        ctx.fillStyle = venusGradient
        ctx.fill()

        // Cloud bands
        ctx.save()
        ctx.beginPath()
        ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2)
        ctx.clip()

        for (let i = 0; i < 8; i++) {
          const bandY = venusY - venusRadius + ((venusRadius * 2) / 8) * i + Math.sin(animationTime + i) * 5
          const bandOpacity = 0.15 + Math.sin(animationTime * 0.5 + i) * 0.05
          ctx.fillStyle = `rgba(255, 220, 180, ${bandOpacity})`
          ctx.beginPath()
          ctx.ellipse(venusX, bandY, venusRadius * 1.1, 15 + Math.sin(i) * 5, 0, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      // Venus shine/highlight
      const shineGradient = ctx.createRadialGradient(
        venusX - venusRadius * 0.4,
        venusY - venusRadius * 0.4,
        0,
        venusX - venusRadius * 0.4,
        venusY - venusRadius * 0.4,
        venusRadius * 0.8,
      )
      shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
      shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)")
      shineGradient.addColorStop(1, "transparent")
      ctx.fillStyle = shineGradient
      ctx.beginPath()
      ctx.arc(venusX, venusY, venusRadius, 0, Math.PI * 2)
      ctx.fill()

      atmosphereParticles.forEach((particle) => {
        particle.angle += particle.speed
        const distance = 180 + Math.sin(animationTime + particle.angle * 5) * 30
        particle.x = venusX + Math.cos(particle.angle) * distance
        particle.y = venusY + Math.sin(particle.angle) * distance * 0.6

        const particleOpacity = particle.opacity * (0.7 + Math.sin(animationTime * 2 + particle.angle) * 0.3)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 150, ${particleOpacity})`
        ctx.fill()

        // Particle glow
        const particleGlow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 4,
        )
        particleGlow.addColorStop(0, `rgba(255, 180, 100, ${particleOpacity * 0.5})`)
        particleGlow.addColorStop(1, "transparent")
        ctx.fillStyle = particleGlow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < 5; i++) {
        const streamAngle = animationTime * 0.3 + ((Math.PI * 2) / 5) * i
        const startX = venusX + Math.cos(streamAngle) * venusRadius * 1.3
        const startY = venusY + Math.sin(streamAngle) * venusRadius * 1.3
        const endX = startX + Math.cos(streamAngle) * 100
        const endY = startY + Math.sin(streamAngle) * 100

        const streamGradient = ctx.createLinearGradient(startX, startY, endX, endY)
        streamGradient.addColorStop(0, "rgba(100, 200, 255, 0.5)")
        streamGradient.addColorStop(0.5, "rgba(50, 150, 255, 0.3)")
        streamGradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = streamGradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Data point at the end
        ctx.beginPath()
        ctx.arc(endX, endY, 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 200, 255, 0.8)"
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
