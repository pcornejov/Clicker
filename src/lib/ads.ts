const env = import.meta.env

/**
 * Google Ad Manager / AdSense integration point (not enforced yet).
 *
 * Everything ad-related in this app — the consent banner (see
 * components/ads/ConsentBanner.tsx) and the ad unit (see
 * components/ads/AdSlot.tsx) — is inert while ADS_ENABLED is false, which
 * is the default. To activate:
 *
 * 1. Get the site approved in Google Ad Manager for small business
 *    (https://admanager.google.com) or AdSense.
 * 2. Set VITE_ADS_ENABLED=true, VITE_GOOGLE_AD_CLIENT_ID and
 *    VITE_GOOGLE_AD_SLOT_ID (see .env.example).
 * 3. Add an ads.txt file at the site root with the line Google gives you.
 *
 * Placement note: this app is built around rapid, repeated tapping on the
 * voting grid. Keep every AdSlot far from that area (footer, between
 * sections) — an ad placed near the tap target invites accidental clicks,
 * which Google's invalid-traffic detection can penalize or suspend the
 * account for. See README "Monetización" for the full writeup.
 */
export const ADS_ENABLED = env.VITE_ADS_ENABLED === 'true'

export const AD_CLIENT_ID = env.VITE_GOOGLE_AD_CLIENT_ID ?? ''

export const AD_SLOT_ID = env.VITE_GOOGLE_AD_SLOT_ID ?? ''
