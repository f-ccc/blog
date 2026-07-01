'use client'

import { useEffect, useState } from 'react'
import { PartyPopper, MapPin } from 'lucide-react'

interface EventItem {
  name: string
  poster: string
  targetDate: string
  location: string
  ticketUrl: string
  price: string
}

function getTimeRemaining(target: string) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  }
}

export default function EventCountdown({ events }: { events: EventItem[] }) {
  const [current, setCurrent] = useState(0)
  const [time, setTime] = useState(getTimeRemaining(events[0]?.targetDate || ''))

  useEffect(() => {
    if (!events.length) return
    const timer = setInterval(() => {
      setTime(getTimeRemaining(events[current]?.targetDate || ''))
    }, 1000)
    return () => clearInterval(timer)
  }, [events, current])

  if (!events.length) return null

  const event = events[current]

  return (
    <div className="glass-card-static p-5">
      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant"><PartyPopper size={14} /> 活动</h3>
      
      {/* Poster */}
      {event.poster && (
        <div className="mb-3 overflow-hidden rounded-2xl">
          <img src={event.poster} alt={event.name} className="h-32 w-full object-cover" />
        </div>
      )}

      <h4 className="mb-1 text-[13px] font-semibold text-on-surface">{event.name}</h4>
      {event.location && (
        <p className="mb-2 flex items-center gap-1 text-[11px] text-on-surface-variant">
          <MapPin size={12} /> {event.location}
        </p>
      )}

      {/* Countdown */}
      <div className="mb-2 flex gap-1.5">
        {time.passed ? (
          <span className="text-[13px] font-medium text-tertiary">已开始/已结束</span>
        ) : (
          <>
            <TimeBlock value={time.days} label="天" />
            <TimeBlock value={time.hours} label="时" />
            <TimeBlock value={time.minutes} label="分" />
            <TimeBlock value={time.seconds} label="秒" />
          </>
        )}
      </div>

      {event.ticketUrl && (
        <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary border border-primary/10 hover:bg-primary/15 transition-colors duration-300 no-underline">
          购票 {event.price && `(${event.price})`}
        </a>
      )}

      {events.length > 1 && (
        <div className="mt-3 flex gap-1">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setTime(getTimeRemaining(events[i].targetDate)) }}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 cursor-pointer ${i === current ? 'bg-primary' : 'bg-surface-container-high'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-xl bg-surface-container-high p-2">
      <span className="text-base font-bold text-on-surface">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] text-on-surface-variant">{label}</span>
    </div>
  )
}
