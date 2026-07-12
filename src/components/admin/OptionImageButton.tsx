import { useRef } from 'react'
import { CameraIcon, ImageOffIcon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useRemoveOptionImage, useUploadOptionImage } from '@/hooks/useAdminBattles'
import { MAX_UPLOAD_IMAGE_BYTES } from '@/constants/appConfig'
import { resizeImageFile } from '@/utils/image'
import type { BattleOption } from '@/types'

interface OptionImageButtonProps {
  battleId: string
  option: BattleOption
}

/** Upload/remove control for an option's photo, shown in the admin options editor. */
export function OptionImageButton({ battleId, option }: OptionImageButtonProps) {
  const uploadImage = useUploadOptionImage()
  const removeImage = useRemoveOptionImage()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Selecciona un archivo de imagen')
      return
    }
    if (file.size > MAX_UPLOAD_IMAGE_BYTES) {
      toast.error('La imagen es muy pesada (máx. 8 MB)')
      return
    }
    const resized = await resizeImageFile(file)
    uploadImage.mutate({ battleId, optionId: option.id, file: resized })
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void handleFile(file)
          event.target.value = ''
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-foreground"
        disabled={uploadImage.isPending}
        onClick={() => inputRef.current?.click()}
      >
        {uploadImage.isPending ? (
          <Loader2Icon className="animate-spin" aria-hidden="true" />
        ) : (
          <CameraIcon aria-hidden="true" />
        )}
        <span className="sr-only">Subir foto de {option.name}</span>
      </Button>
      {option.imageUrl && (
        <Button
          variant="ghost"
          size="icon"
          className="size-7 text-muted-foreground hover:text-destructive"
          disabled={removeImage.isPending}
          onClick={() => removeImage.mutate({ battleId, optionId: option.id })}
        >
          <ImageOffIcon aria-hidden="true" />
          <span className="sr-only">Quitar foto de {option.name}</span>
        </Button>
      )}
    </>
  )
}
