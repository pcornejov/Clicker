import { Share2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useShare } from '@/hooks/useShare'

interface ShareButtonProps {
  battleTitle: string
}

export function ShareButton({ battleTitle }: ShareButtonProps) {
  const share = useShare()

  return (
    <Button
      variant="outline"
      size="lg"
      className="rounded-full"
      onClick={() =>
        void share({
          title: battleTitle,
          text: `Vota conmigo: ${battleTitle}`,
        })
      }
    >
      <Share2Icon aria-hidden="true" />
      Compartir batalla
    </Button>
  )
}
