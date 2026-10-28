import { describe, expect, it } from 'vitest'
import { calNamespaceFromLink, normalizeCalLink } from './cal-link'

describe('normalizeCalLink', () => {
  it('lässt einen einfachen Link unverändert', () => {
    expect(normalizeCalLink(' max-muster/30min ')).toBe('max-muster/30min')
  })

  it('entfernt Domain und Slashes', () => {
    expect(normalizeCalLink('https://cal.com/max-muster/30min/')).toBe(
      'max-muster/30min'
    )
  })

  it('liest die calLink-Zeile aus dem Embed-Code', () => {
    expect(
      normalizeCalLink('calLink: "nikita-gorbunov-unzze6/apptiva-klar-demo",')
    ).toBe('nikita-gorbunov-unzze6/apptiva-klar-demo')
  })

  it('entfernt Anführungszeichen', () => {
    expect(normalizeCalLink('"max-muster/30min"')).toBe('max-muster/30min')
    expect(normalizeCalLink(`'max-muster/30min',`)).toBe('max-muster/30min')
  })

  it('gibt bei leerem Input undefined zurück', () => {
    expect(normalizeCalLink('')).toBeUndefined()
    expect(normalizeCalLink(undefined)).toBeUndefined()
  })
})

describe('calNamespaceFromLink', () => {
  it('ersetzt Slashes', () => {
    expect(calNamespaceFromLink('max-muster/30min')).toBe('max-muster-30min')
  })
})
