'use client'

import { useEffect, useRef } from 'react'

interface SakuraPetal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

export default function SakuraEffect({ count = 50 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const petals: SakuraPetal[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize petals
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.forEach(petal => {
        petal.x += petal.speedX
        petal.y += petal.speedY
        petal.rotation += petal.rotationSpeed

        if (petal.y > canvas.height + 20) {
          petal.y = -20
          petal.x = Math.random() * canvas.width
        }
        if (petal.x < -20) petal.x = canvas.width + 20
        if (petal.x > canvas.width + 20) petal.x = -20

        ctx.save()
        ctx.translate(petal.x, petal.y)
        ctx.rotate(petal.rotation)
        ctx.globalAlpha = petal.opacity
        ctx.fillStyle = '#f9a8d4'
        ctx.beginPath()
        ctx.ellipse(0, 0, petal.size / 2, petal.size / 4, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ pointerEvents: 'none' }}
    />
  )
}
