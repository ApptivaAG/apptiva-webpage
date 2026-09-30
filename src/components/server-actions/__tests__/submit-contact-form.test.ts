import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Resend before importing submitContactForm
const mockBatchSend = vi.fn()
const mockEmailsSend = vi.fn()
const mockCheckSpam = vi.fn()

vi.mock('@/domain/spam-check', () => ({
  checkSpam: (...args: unknown[]) => mockCheckSpam(...args),
}))

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      batch = {
        send: mockBatchSend,
      }
      emails = {
        send: mockEmailsSend,
      }
    },
  }
})

vi.mock('next/headers', () => ({
  headers: async () =>
    new Headers({
      'user-agent': 'TestAgent/1.0',
      'x-forwarded-for': '203.0.113.7',
    }),
}))

const afterCallbacks: Array<() => unknown> = []
vi.mock('next/server', () => ({
  after: (cb: () => unknown) => {
    afterCallbacks.push(cb)
  },
}))

async function flushAfter() {
  const callbacks = afterCallbacks.splice(0)
  for (const cb of callbacks) await cb()
}

// Import after mock is set up
const { submitContactForm } = await import('../submit-contact-form')

describe('submitContactForm Server Action', () => {
  beforeEach(() => {
    mockBatchSend.mockReset()
    mockEmailsSend.mockReset()
    mockCheckSpam.mockReset()
    mockCheckSpam.mockResolvedValue({ spam: false })
    afterCallbacks.length = 0
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))

    // Setup console spies
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  describe('Plausible Tracking', () => {
    const buildFormData = (page?: string) => {
      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('circle', 'apptiva')
      if (page !== undefined) formData.append('page', page)
      return formData
    }

    it('sends Kontaktanfrage event with kind and page on success', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      await submitContactForm({ state: 'idle' }, buildFormData('/kontakt'))
      await flushAfter()

      expect(fetch).toHaveBeenCalledTimes(1)
      const [url, init] = vi.mocked(fetch).mock.calls[0]
      expect(url).toBe('https://plausible.io/api/event')
      expect(init?.headers).toMatchObject({
        'User-Agent': 'TestAgent/1.0',
        'X-Forwarded-For': '203.0.113.7',
      })
      expect(JSON.parse(String(init?.body))).toEqual({
        domain: 'apptiva.ch',
        name: 'Kontaktanfrage',
        url: 'https://apptiva.ch/kontakt',
        props: { kind: 'apptiva', page: '/kontakt' },
      })
    })

    it('falls back to "unbekannt" when page is missing', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      await submitContactForm({ state: 'idle' }, buildFormData())
      await flushAfter()

      const body = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body))
      expect(body.props).toEqual({ kind: 'apptiva', page: 'unbekannt' })
      expect(body.url).toBe('https://apptiva.ch/')
    })

    it('does not track when Resend returns an error', async () => {
      mockBatchSend.mockResolvedValue({ error: { message: 'fail' } })

      await submitContactForm({ state: 'idle' }, buildFormData('/kontakt'))
      await flushAfter()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('does not track honeypot spam', async () => {
      const formData = buildFormData('/kontakt')
      formData.append('address', 'bot')

      await submitContactForm({ state: 'idle' }, formData)
      await flushAfter()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('does not track spam detected by the spam check', async () => {
      mockCheckSpam.mockResolvedValue({ spam: true, scores: {} })
      mockEmailsSend.mockResolvedValue({ error: null })

      await submitContactForm({ state: 'idle' }, buildFormData('/kontakt'))
      await flushAfter()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('keeps success state when Plausible fails', async () => {
      mockBatchSend.mockResolvedValue({ error: null })
      vi.mocked(fetch).mockRejectedValue(new Error('network'))

      const result = await submitContactForm(
        { state: 'idle' },
        buildFormData('/kontakt')
      )
      await flushAfter()

      expect(result.state).toBe('success')
      expect(console.error).toHaveBeenCalledWith(
        'Error sending Plausible event',
        expect.any(Error)
      )
    })
  })

  describe('Form Validation', () => {
    it('should accept valid apptiva form data', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('subject', 'Test Subject')
      formData.append('circle', 'apptiva')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(result).toHaveProperty('email', 'max@example.com')
      expect(result).toHaveProperty('name', 'Max Mustermann')
    })

    it('should accept valid klar form data', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'klar')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('company', 'ACME Corp')
      formData.append('phone', '+41 79 123 45 67')
      formData.append('subject', 'Apptiva Klar Demo')
      formData.append('circle', 'klar')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })

    it('should accept valid testChatbot form data', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'test@example.com')
      formData.append('subject', 'Test Chatbot Request')
      formData.append('circle', 'klar')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(result).toHaveProperty('email', 'test@example.com')
    })

    it('should reject when required fields are missing', async () => {
      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      // Missing email, message, circle

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
    })

    it('should accept optional fields as empty', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')
      // company and referrer are optional and not provided

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })

    it('should use default subject if not provided', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('circle', 'apptiva')
      // No subject provided

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            subject: 'Kontaktformular apptiva.ch',
          }),
        ])
      )
    })

    it('should use default subject for testChatbot if not provided', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'test@example.com')
      formData.append('circle', 'klar')
      // No subject provided

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            subject: 'Kontaktformular apptiva.ch',
          }),
        ])
      )
    })
  })

  describe('Spam Detection', () => {
    it('should detect spam via honeypot field', async () => {
      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Spammer')
      formData.append('email', 'spam@example.com')
      formData.append('message', 'Buy my product!')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Spam')
      formData.append('address', 'filled-by-bot') // Honeypot field

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('spam')
      expect(mockBatchSend).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalledWith('Spam detected')
    })

    it('should not detect spam when honeypot is undefined', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Real User')
      formData.append('email', 'real@example.com')
      formData.append('message', 'Real message')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Real')
      // address field not set (undefined)

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })

    it('should detect spam via honeypot for testChatbot', async () => {
      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'spam@example.com')
      formData.append('circle', 'klar')
      formData.append('subject', 'Spam')
      formData.append('address', 'filled-by-bot') // Honeypot field

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('spam')
      expect(mockBatchSend).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalledWith('Spam detected')
    })

    it('should silently drop Jev spam and forward it to the spam inbox', async () => {
      mockCheckSpam.mockResolvedValue({
        spam: true,
        scores: { gibberish: 0.97, bot: 0.9 },
      })
      mockEmailsSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'klar')
      formData.append('name', 'EDWlxOunnWqzznaMtPmoU')
      formData.append('email', 'fu.m.u.goto.ye9.2.1@gmail.com')
      formData.append('company', 'Xextpru LLC')
      formData.append('referrer', 'blbEGGqlfxmcLxvtqNoeTe')
      formData.append('message', 'WPTvweaCKgsgBdHSBemRtCi')
      formData.append('circle', 'klar')
      formData.append('subject', 'Demo')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(mockBatchSend).not.toHaveBeenCalled()
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'spam@apptiva.ch',
          subject: '[SPAM?] Demo',
        })
      )
      expect(mockCheckSpam).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'EDWlxOunnWqzznaMtPmoU' })
      )
    })

    it('should still return success if forwarding spam fails', async () => {
      mockCheckSpam.mockResolvedValue({ spam: true })
      mockEmailsSend.mockRejectedValue(new Error('down'))

      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'bot@example.com')
      formData.append('circle', 'klar')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(mockBatchSend).not.toHaveBeenCalled()
    })

    it('should not call Jev when honeypot is filled', async () => {
      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'spam@example.com')
      formData.append('circle', 'klar')
      formData.append('address', 'filled-by-bot')

      await submitContactForm({ state: 'idle' }, formData)

      expect(mockCheckSpam).not.toHaveBeenCalled()
    })
  })

  describe('Resend API Integration', () => {
    it('should call resend.batch.send with correct parameters', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('subject', 'Custom Subject')
      formData.append('circle', 'apptiva')

      await submitContactForm({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledTimes(1)
      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
            to: 'max@example.com',
            subject: 'Custom Subject',
          }),
          expect.objectContaining({
            from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
            to: 'info@apptiva.ch',
            subject: 'Custom Subject',
          }),
        ])
      )
    })

    it('should send two emails in batch (sender copy + internal)', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await submitContactForm({ state: 'idle' }, formData)

      const calls = mockBatchSend.mock.calls[0][0]
      expect(calls).toHaveLength(2)
    })

    it('should route to info@apptiva.ch for "apptiva" circle', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await submitContactForm({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            to: 'info@apptiva.ch',
          }),
        ])
      )
    })

    it('should route to klar@apptiva.ch for "klar" circle', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'klar')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('company', 'ACME')
      formData.append('circle', 'klar')
      formData.append('subject', 'Test')

      await submitContactForm({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            to: 'klar@apptiva.ch',
          }),
        ])
      )
    })

    it('should route to klar@apptiva.ch for "testChatbot" (uses klar circle)', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'testChatbot')
      formData.append('email', 'test@example.com')
      formData.append('circle', 'klar')
      formData.append('subject', 'Test Chatbot')

      await submitContactForm({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            to: 'klar@apptiva.ch',
          }),
        ])
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle Resend API errors', async () => {
      mockBatchSend.mockResolvedValue({
        error: { message: 'API Error' },
      })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
      expect(console.error).toHaveBeenCalledWith(
        'Error sending mail',
        expect.any(Object)
      )
    })

    it('should handle exceptions during send', async () => {
      mockBatchSend.mockRejectedValue(new Error('Network error'))

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
      expect(console.error).toHaveBeenCalled()
    })

    it('should return user-friendly error message', async () => {
      mockBatchSend.mockResolvedValue({ error: { message: 'API Error' } })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await submitContactForm({ state: 'idle' }, formData)

      if (result.state === 'error') {
        expect(result.error).toMatch(/Leider ist ein Fehler aufgetreten/)
      }
    })
  })

  describe('Logging', () => {
    it('should log when starting to send mail', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await submitContactForm({ state: 'idle' }, formData)

      expect(console.log).toHaveBeenCalledWith('sending mail')
    })

    it('should log when mail sent successfully', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await submitContactForm({ state: 'idle' }, formData)

      expect(console.log).toHaveBeenCalledWith(
        'Mail sent',
        expect.stringContaining('Max')
      )
    })
  })

  describe('Form State Management', () => {
    it('should return correct state structure on success', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result).toEqual({
        state: 'success',
        email: 'max@example.com',
        name: 'Max Mustermann',
        message: 'Test',
        company: undefined,
        phone: undefined,
        referrer: undefined,
      })
    })

    it('should return correct state structure on error', async () => {
      mockBatchSend.mockResolvedValue({ error: { message: 'Error' } })

      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result).toEqual({
        state: 'error',
        error: expect.any(String),
      })
    })

    it('should return correct state structure on spam', async () => {
      const formData = new FormData()
      formData.append('kind', 'apptiva')
      formData.append('name', 'Spammer')
      formData.append('email', 'spam@example.com')
      formData.append('message', 'Spam')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Spam')
      formData.append('address', 'filled')

      const result = await submitContactForm({ state: 'idle' }, formData)

      expect(result).toEqual({ state: 'spam' })
    })
  })
})
