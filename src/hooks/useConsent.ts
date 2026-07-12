import { useState } from 'react'

export type ConsentChoice = 'accepted' | 'rejected'

const STORAGE_KEY = 'chile-vota:ad-consent'

function readStoredConsent(): ConsentChoice | null {
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'rejected' ? value : null
}

/**
 * Tracks the visitor's choice for personalized-ad cookies, persisted in
 * localStorage. Only consulted when ads are enabled (see lib/ads.ts) — the
 * value is otherwise never read.
 */
export function useConsent() {
  const [consent, setConsentState] = useState<ConsentChoice | null>(readStoredConsent)

  const setConsent = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setConsentState(choice)
  }

  return { consent, setConsent }
}
