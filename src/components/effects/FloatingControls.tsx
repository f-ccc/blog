'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, List } from 'lucide-react'

export default function FloatingControls() {
  const [showToc, setShowToc] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    // Collect headings
    const els = document.querySelectorAll('.prose h1, .prose h2, .prose h3')
    const hs = Array.from(els).map(el => {
      const id = el.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
      el.id = id
      return {
        id,
        text: el.textContent || '',
        level: el.tagName === 'H1' ? 1 : el.tagName === 'H2' ? 2 : 3,
      }
    })
    setHeadings(hs)

    // Active heading
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )
    els.forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  if (headings.length === 0 && !showScrollTop) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* TOC Button */}
      {headings.length > 0 && (
        <>
          <button
            onClick={() => setShowToc(!showToc)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-lg border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            title="目录"
          >
            <List size={18} />
          </button>

          {showToc && (
            <div className="absolute bottom-14 right-0 w-56 rounded-2xl border border-outline-variant bg-surface p-3 shadow-xl max-h-80 overflow-y-auto">
              <h4 className="mb-2 text-xs font-semibold text-on-surface-variant">目录</h4>
              {headings.map(h => (
                <button
                  key={h.id}
                  onClick={() => {
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                    setShowToc(false)
                  }}
                  className={`block w-full rounded-lg px-2 py-1 text-left text-xs transition-colors cursor-pointer ${
                    activeId === h.id
                      ? 'bg-primary-container text-on-primary-container font-medium'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                  style={{ paddingLeft: `${h.level * 8 + 8}px` }}
                >
                  {h.text}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg hover:opacity-90 transition-all cursor-pointer"
          title="回到顶部"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  )
}
