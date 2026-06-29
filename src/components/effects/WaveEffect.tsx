'use client'

import { useEffect, useRef } from 'react'

export default function WaveEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let step = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 60
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      step += 0.03
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple waves
      const colors = [
        { r: 77, g: 219, b: 219, a: 0.3 },
        { r: 77, g: 219, b: 219, a: 0.2 },
        { r: 77, g: 219, b: 219, a: 0.1 },
      ]

      colors.forEach((color, index) => {
        const offset = index * 8
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = Math.sin((x + step * 100) * 0.008 + index * 2) * 10 + 
                    Math.sin((x + step * 50) * 0.015 + index) * 5 + 
                    offset + 25
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none w-full"
      style={{ height: '60px', display: 'block' }}
    />
  )
}
