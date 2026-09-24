import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { checkSpam } from '../spam-check'

const jevResponse = (gibberish: number, bot: number) =>
  new Response(
    JSON.stringify({
      answers: {
        gibberish: { type: 'noul', noul: gibberish },
        bot: { type: 'noul', noul: bot },
      },
    }),
    { status: 200 }
  )

describe('checkSpam', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('JEV_API_KEY', 'test-key')
    fetchMock.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('flags submissions above the threshold', async () => {
    fetchMock.mockResolvedValue(jevResponse(0.95, 0.4))

    const result = await checkSpam({
      name: 'EDWlxOunnWqzznaMtPmoU',
      email: 'fu.m.u.goto.ye9.2.1@gmail.com',
      company: 'Xextpru LLC',
      referrer: 'blbEGGqlfxmcLxvtqNoeTe',
    })

    expect(result.spam).toBe(true)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://jevtypesafeai.com/api/v1/decide')
    expect(init.headers.Authorization).toBe('Bearer test-key')
    const body = JSON.parse(init.body)
    expect(body.state).toContain('Name: EDWlxOunnWqzznaMtPmoU')
    expect(body.state).not.toContain('Telefon')
    expect(Object.keys(body.questions)).toEqual(['gibberish', 'bot'])
  })

  it('lets real submissions through', async () => {
    fetchMock.mockResolvedValue(jevResponse(0.05, 0.1))

    const result = await checkSpam({
      name: 'Anna Muster',
      message: 'Wir möchten einen Chatbot für unseren Kundensupport.',
    })

    expect(result.spam).toBe(false)
  })

  it('fails open on network errors', async () => {
    fetchMock.mockRejectedValue(new Error('timeout'))
    expect((await checkSpam({ name: 'x' })).spam).toBe(false)
  })

  it('fails open on non-200 responses', async () => {
    fetchMock.mockResolvedValue(new Response('nope', { status: 500 }))
    expect((await checkSpam({ name: 'x' })).spam).toBe(false)
  })

  it('skips the check without API key', async () => {
    vi.stubEnv('JEV_API_KEY', '')
    expect((await checkSpam({ name: 'x' })).spam).toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
