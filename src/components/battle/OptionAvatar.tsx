import { useState } from 'react'
import { getOptionVisual } from '@/constants/optionVisuals'
import { getCuratedPhoto } from '@/constants/curatedPhotos'
import { cn } from '@/lib/utils'

interface OptionAvatarProps {
  name: string
  /** Admin-uploaded photo, if any — takes priority over the curated default. */
  imageUrl?: string
  className?: string
}

const SIZE_CLASSES = 'flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-14'

/**
 * Visual emblem for an option: the admin-uploaded photo when set, else a
 * curated photo for known names (see curatedPhotos.ts), else a gradient +
 * icon derived from the name. Falls back automatically if a photo fails to
 * load.
 */
export function OptionAvatar({ name, imageUrl, className }: OptionAvatarProps) {
  const photoUrl = imageUrl || getCuratedPhoto(name)?.imageUrl
  const [photoFailed, setPhotoFailed] = useState(false)
  const [prevPhotoUrl, setPrevPhotoUrl] = useState(photoUrl)
  const { icon: Icon, gradient } = getOptionVisual(name)

  // A newly uploaded photo deserves a fresh chance even if a previous one failed.
  if (prevPhotoUrl !== photoUrl) {
    setPrevPhotoUrl(photoUrl)
    setPhotoFailed(false)
  }

  if (photoUrl && !photoFailed) {
    return (
      <img
        src={photoUrl}
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
