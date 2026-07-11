import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

function compute(target: Date | null): Countdown {
  const diff = target ? target.getTime() - Date.now() : 0
  if (!target || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  }
}

/** Ticks once per second towards `target`. Null target = no deadline. */
export function useCountdown(target: Date | null): Countdown {
  const targetMs = target?.getTime() ?? null
  const [countdown, setCountdown] = useState<Countdown>(() => compute(target))
  const [prevTargetMs, setPrevTargetMs] = useState(targetMs)

  // Adjust state during render when the deadline changes (React-endorsed
  // alternative to a synchronous setState inside an effect).
  if (prevTargetMs !== targetMs) {
    setPrevTargetMs(targetMs)
    setCountdown(compute(targetMs === null ? null : new Date(targetMs)))
  }

  useEffect(() => {
    if (targetMs === null) return
    const targetDate = new Date(targetMs)
    const interval = setInterval(() => {
      const next = compute(targetDate)
      setCountdown(next)
      if (next.isExpired) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [targetMs])

  return countdown
}
