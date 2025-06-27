"use client"

import { useEffect, useState } from "react"

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  opacity: number
}

export function AnimatedBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Solo ejecutar en el cliente después de la hidratación
    setMounted(true)

    const newShapes: FloatingShape[] = []
    const colors = ["#1e5a5a", "#f97316", "#0891b2", "#475569", "#f59e0b"]

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        speed: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.1 + 0.05,
      })
    }
    setShapes(newShapes)
  }, [])

  // No renderizar nada hasta que esté montado en el cliente
  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/20" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradiente animado de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/20 animate-gradient-shift" />

      {/* Formas flotantes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full blur-sm animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            opacity: shape.opacity,
            animationDuration: `${shape.speed}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Ondas animadas */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
            fill="url(#wave-gradient)"
            className="animate-wave"
          />
          <path
            d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
            fill="url(#wave-gradient)"
            className="animate-wave-reverse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Partículas brillantes - Solo después de montar */}
      <div className="absolute inset-0">
        {mounted &&
          [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
      </div>
    </div>
  )
}

export function GeometricBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />

      {/* Formas geométricas animadas */}
      <div className="absolute inset-0">
        {/* Círculos grandes */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-teal-200/30 rounded-full animate-spin-slow" />
        <div className="absolute top-20 right-20 w-24 h-24 border border-orange-200/30 rounded-full animate-spin-reverse" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-teal-300/20 rounded-full animate-pulse-slow" />

        {/* Triángulos */}
        <div className="absolute top-1/3 right-1/3 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-orange-200/20 animate-bounce-slow" />

        {/* Cuadrados rotando */}
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-teal-300/30 animate-spin-slow transform rotate-45" />
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-orange-200/10 animate-float transform rotate-12" />

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-teal-200/20 to-transparent animate-pulse" />
        <div
          className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-200/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}

export function BubbleBackground() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number
      size: number
      left: number
      animationDuration: number
      delay: number
    }>
  >([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const newBubbles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setBubbles(newBubbles)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/20 to-orange-50/10" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/20 to-orange-50/10" />

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-teal-200/20 to-orange-200/20 animate-bubble-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "-100px",
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
