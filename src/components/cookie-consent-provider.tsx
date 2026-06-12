'use client'
import { useEffect } from 'react'
import { cookieConsentConfig } from './cookie-consent.config'

// Extend the Window type to include the globally injected gtag function
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    Snitcher?: {
      giveCookieConsent?: () => void
    }
  }
}

async function initCookieConsent() {
  const CookieConsent = await import('vanilla-cookieconsent')
  await import('vanilla-cookieconsent/dist/cookieconsent.css')

  await CookieConsent.run({
    ...cookieConsentConfig,

    /** Fires on every page load when valid consent already exists. */
    onConsent: () => {
      if (CookieConsent.acceptedCategory('analytics')) enableAnalyticsTools()
    },

    /** Fires when the user actively changes their preferences. */
    onChange: () => {
      if (CookieConsent.acceptedCategory('analytics')) {
        enableAnalyticsTools()
      } else {
        disableGoogleTag()
      }
    },
  })
}

/** Enables all analytics tools that require the analytics consent category. */
function enableAnalyticsTools() {
  enableGoogleTag()
  enableSnitcherConsent()
}

/** Injects gtag.js and updates Google Consent Mode to granted. */
function enableGoogleTag() {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID
  if (!gtagId) return

  window.gtag?.('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })

  // Inject the gtag.js loader only once — call config after script has loaded
  if (!document.getElementById('gtag-script')) {
    const script = document.createElement('script')
    script.id = 'gtag-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
    script.onload = () => window.gtag?.('config', gtagId)
    document.head.appendChild(script)
  }
}

/** Grants Snitcher cookie consent after the visitor accepts analytics cookies. */
function enableSnitcherConsent() {
  window.Snitcher?.giveCookieConsent?.()
}

/** Updates Consent Mode to denied and removes all Google cookies. */
function disableGoogleTag() {
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  ;['_ga', '_gid', '_gcl_au'].forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
  })
}

/**
 * Renders nothing visible itself — the consent banner is injected into the DOM
 * by vanilla-cookieconsent. The style tag overrides its CSS variables with
 * Apptiva brand colors.
 */
export default function CookieConsentProvider() {
  useEffect(() => {
    initCookieConsent()
  }, [])

  return (
    // Override vanilla-cookieconsent CSS variables with Apptiva brand colors
    <style>{`
      #cc-main {
        --cc-font-family: inherit;
        --cc-modal-border-radius: 0.5rem;

        /* Primary button (accept all) → Apptiva primary blue */
        --cc-btn-primary-bg: rgb(6 48 98);
        --cc-btn-primary-color: #fff;
        --cc-btn-primary-border-color: rgb(6 48 98);
        --cc-btn-primary-hover-bg: rgb(11 28 57);
        --cc-btn-primary-hover-color: #fff;
        --cc-btn-primary-hover-border-color: rgb(11 28 57);

        /* Secondary button (necessary only) → outlined style */
        --cc-btn-secondary-bg: transparent;
        --cc-btn-secondary-color: rgb(6 48 98);
        --cc-btn-secondary-border-color: rgb(6 48 98);
        --cc-btn-secondary-hover-bg: rgb(6 48 98 / 0.08);
        --cc-btn-secondary-hover-color: rgb(6 48 98);
        --cc-btn-secondary-hover-border-color: rgb(6 48 98);

        /* Toggle (on state) → Apptiva light blue */
        --cc-toggle-on-bg: rgb(17 126 255);
        --cc-toggle-off-bg: #aaa;
        --cc-toggle-readonly-bg: rgb(6 48 98 / 0.3);

        /* Links */
        --cc-link-color: rgb(17 126 255);

        /* Overlay */
        --cc-overlay-bg: rgb(6 48 98 / 0.5);
      }
    `}</style>
  )
}
