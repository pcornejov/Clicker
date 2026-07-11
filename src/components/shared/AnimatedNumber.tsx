import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { formatVotes } from '@/utils/format'

interface AnimatedNumberProps {
  value: number
  className?: string
}

/** Number that springs smoothly to its new value instead of jumping. */
export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20 })
  const display = useTransform(spring, (latest) => formatVotes(Math.round(latest)))

  useEffect(() => {
    motionValue.set(value)
  }, [motionValue, value])

  return (
    <motion.span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </motion.span>
  )
}
