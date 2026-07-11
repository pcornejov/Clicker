import type { FirebaseApp } from 'firebase/app'

/**
 * Firebase App Check integration point (not enforced yet).
 *
 * When ready to activate:
 *
 * 1. Register the app in Firebase Console → App Check.
 * 2. Pick a provider:
 *    - reCAPTCHA v3: uncomment the block below and set
 *      VITE_FIREBASE_APP_CHECK_KEY in the environment.
 *    - Cloudflare Turnstile: implement a CustomProvider that exchanges a
 *      Turnstile token (rendered with VITE_TURNSTILE_SITE_KEY) for an App
 *      Check token. See:
 *      https://developers.cloudflare.com/turnstile/tutorials/protect-your-firebase-app/
 * 3. Start in "monitor" mode in the console before enforcing, so real
 *    traffic isn't dropped while tuning.
 *
 * import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
 *
 * initializeAppCheck(app, {
 *   provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_APP_CHECK_KEY),
 *   isTokenAutoRefreshEnabled: true,
 * })
 */
export function initAppCheck(_app: FirebaseApp): void {
  // No-op until App Check is activated (see comment above).
}
