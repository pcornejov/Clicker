import { useCallback } from 'react'
import { toast } from 'sonner'

export interface SharePayload {
  title: string
  text: string
}

/**
 * Web Share API with a clipboard fallback: if the browser can't share
 * natively, the URL is copied and a toast confirms it.
 */
export function useShare() {
  return useCallback(async ({ title, text }: SharePayload) => {
    const url = window.location.href
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (error) {
        // User dismissed the share sheet — not an error.
        if (error instanceof DOMException && error.name === 'AbortError') return
        // Otherwise fall through to the clipboard fallback.
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Enlace copiado', {
        description: 'Comparte el link para sumar más votos.',
      })
    } catch {
      toast.error('No se pudo copiar el enlace')
    }
  }, [])
}
