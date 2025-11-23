'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.vx -= (dx / distance) * force * 0.02
          particle.vy -= (dy / distance) * force * 0.02
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 120) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Mouse cursor effect
      if (mousePos.x > 0 && mousePos.y > 0) {
        const gradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          200
        )
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.1)')
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePos])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      {/* Code snippets overlay - Developer themed */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] md:opacity-[0.05]">
        <div className="absolute top-20 left-10 font-mono text-xs text-blue-400 whitespace-pre animate-pulse-slow">
          {`const developer = {
  name: 'Luka Rakic',
  skills: ['React', 'Next.js', 'TypeScript'],
  passion: 'Creating amazing experiences'
}`}
        </div>
        <div className="absolute top-60 right-20 font-mono text-xs text-purple-400 whitespace-pre animate-pulse-slow" style={{ animationDelay: '1s' }}>
          {`function build() {
  return <Code />;
}`}
        </div>
        <div className="absolute bottom-40 left-1/4 font-mono text-xs text-pink-400 whitespace-pre animate-pulse-slow" style={{ animationDelay: '2s' }}>
          {`npm install creativity
npm run dev`}
        </div>
        <div className="absolute bottom-60 right-1/3 font-mono text-xs text-cyan-400 whitespace-pre animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
          {`export default function Portfolio() {
  return <Awesome />;
}`}
        </div>
        <div className="absolute top-1/3 left-1/2 font-mono text-xs text-green-400 whitespace-pre animate-pulse-slow" style={{ animationDelay: '1.5s' }}>
          {`git commit -m "✨ Add amazing features"`}
        </div>
        <div className="absolute top-2/3 right-1/4 font-mono text-xs text-yellow-400 whitespace-pre animate-pulse-slow" style={{ animationDelay: '2.5s' }}>
          {`const code = {
  clean: true,
  optimized: true,
  beautiful: true
}`}
        </div>
      </div>
    </>
  )
}

