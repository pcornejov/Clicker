import { useState } from 'react'
import { getOptionVisual } from '@/constants/optionVisuals'
import { getRegionPhoto } from '@/constants/regionPhotos'
import { cn } from '@/lib/utils'

interface OptionAvatarProps {
  name: string
  className?: string
}

const SIZE_CLASSES = 'flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-14'

/**
 * Visual emblem for an option: a real photo when one is curated for the
 * name (see regionPhotos.ts), otherwise a gradient + icon derived from the
 * name. Falls back to the gradient automatically if the photo fails to load.
 */
export function OptionAvatar({ name, className }: OptionAvatarProps) {
  const photo = getRegionPhoto(name)
  const [photoFailed, setPhotoFailed] = useState(false)
  const { icon: Icon, gradient } = getOptionVisual(name)

  if (photo && !photoFailed) {
    return (
      <img
        src={photo.imageUrl}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setPhotoFailed(true)}
        className={cn(SIZE_CLASSES, 'bg-secondary object-cover shadow-inner', className)}
      />
    )
  }

  return (
    <span
      className={cn(SIZE_CLASSES, 'bg-gradient-to-br shadow-inner', gradient, className)}
      aria-hidden="true"
    >
      <Icon className="size-4 text-white/90 sm:size-5" />
    </span>
  )
}
