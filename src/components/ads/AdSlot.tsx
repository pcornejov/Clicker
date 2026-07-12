import { useEffect, useRef } from 'react'
import { useConsent } from '@/hooks/useConsent'
import { AD_CLIENT_ID, AD_SLOT_ID, ADS_ENABLED } from '@/lib/ads'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

let scriptRequested = false

function loadAdScript(clientId: string) {
  if (scriptRequested) return
  scriptRequested = true
  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
  document.head.appendChild(script)
}

/**
 * Google Ad Manager/AdSense unit. Renders nothing unless ads are enabled
 * and the visitor accepted the consent banner — see lib/ads.ts.
 *
 * Only mount this in low-tap zones (footer, between sections), never near
 * the voting grid — see lib/ads.ts for why.
 */
export function AdSlot() {
  const { consent } = useConsent()
  const pushed = useRef(false)
  const active =
    ADS_ENABLED && consent === 'accepted' && Boolean(AD_CLIENT_ID) && Boolean(AD_SLOT_ID)

  useEffect(() => {
    if (!active || pushed.current) return
    pushed.current = true
    loadAdScript(AD_CLIENT_ID)
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      // adsbygoogle initializes asynchronously — a failed push here is expected
      // if the script hasn't finished loading yet, and is safe to ignore.
    }
  }, [active])

  if (!active) return null

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: 'block' }}
      data-ad-client={AD_CLIENT_ID}
      data-ad-slot={AD_SLOT_ID}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
