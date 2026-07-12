import { getOptionVisual } from '@/constants/optionVisuals'
import { cn } from '@/lib/utils'

interface OptionAvatarProps {
  name: string
  className?: string
}

/** Small gradient emblem representing an option, derived from its name. */
export function OptionAvatar({ name, className }: OptionAvatarProps) {
  const { icon: Icon, gradient } = getOptionVisual(name)
  return (
    <span
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner sm:size-11',
        gradient,
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-4 text-white/90 sm:size-5" />
    </span>
  )
}
