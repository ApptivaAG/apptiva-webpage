import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock Resend before importing sendMail
const mockBatchSend = vi.fn()

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      batch = {
        send: mockBatchSend,
      }
    },
  }
})

// Import after mock is set up
const { sendMail } = await import('../send-mail')

describe('sendMail Server Action', () => {
  beforeEach(() => {
    mockBatchSend.mockReset()
    
    // Setup console spies
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Form Validation', () => {
    it('should accept valid apptiva form data', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('subject', 'Test Subject')
      formData.append('circle', 'apptiva')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
      expect(result).toHaveProperty('email', 'max@example.com')
      expect(result).toHaveProperty('name', 'Max Mustermann')
    })

    it('should accept valid bubble form data', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('company', 'ACME Corp')
      formData.append('phone', '+41 79 123 45 67')
      formData.append('subject', 'Bubble Demo')
      formData.append('circle', 'bubble')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })

    it('should reject when required fields are missing', async () => {
      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      // Missing email, message, circle

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
    })

    it('should accept optional fields as empty', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')
      // company and referrer are optional and not provided

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })

    it('should use default subject if not provided', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('circle', 'apptiva')
      // No subject provided

      const result = await sendMail({ state: 'idle' }, formData)

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
      formData.append('name', 'Spammer')
      formData.append('email', 'spam@example.com')
      formData.append('message', 'Buy my product!')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Spam')
      formData.append('address', 'filled-by-bot') // Honeypot field

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('spam')
      expect(mockBatchSend).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalledWith('Spam detected')
    })

    it('should not detect spam when honeypot is undefined', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Real User')
      formData.append('email', 'real@example.com')
      formData.append('message', 'Real message')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Real')
      // address field not set (undefined)

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('success')
    })
  })

  describe('Resend API Integration', () => {
    it('should call resend.batch.send with correct parameters', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test message')
      formData.append('subject', 'Custom Subject')
      formData.append('circle', 'apptiva')

      await sendMail({ state: 'idle' }, formData)

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
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await sendMail({ state: 'idle' }, formData)

      const calls = mockBatchSend.mock.calls[0][0]
      expect(calls).toHaveLength(2)
    })

    it('should route to info@apptiva.ch for "apptiva" circle', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await sendMail({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            to: 'info@apptiva.ch',
          }),
        ])
      )
    })

    it('should route to bubble-chat@apptiva.ch for "bubble" circle', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('company', 'ACME')
      formData.append('circle', 'bubble')
      formData.append('subject', 'Test')

      await sendMail({ state: 'idle' }, formData)

      expect(mockBatchSend).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            to: 'bubble-chat@apptiva.ch',
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
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
      expect(console.error).toHaveBeenCalledWith('Error sending mail', expect.any(Object))
    })

    it('should handle exceptions during send', async () => {
      mockBatchSend.mockRejectedValue(new Error('Network error'))

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result.state).toBe('error')
      expect(result).toHaveProperty('error')
      expect(console.error).toHaveBeenCalled()
    })

    it('should return user-friendly error message', async () => {
      mockBatchSend.mockResolvedValue({ error: { message: 'API Error' } })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await sendMail({ state: 'idle' }, formData)

      if (result.state === 'error') {
        expect(result.error).toMatch(/Leider ist ein Fehler aufgetreten/)
      }
    })
  })

  describe('Logging', () => {
    it('should log when starting to send mail', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await sendMail({ state: 'idle' }, formData)

      expect(console.log).toHaveBeenCalledWith('sending mail')
    })

    it('should log when mail sent successfully', async () => {
      mockBatchSend.mockResolvedValue({ error: null })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      await sendMail({ state: 'idle' }, formData)

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
      formData.append('name', 'Max Mustermann')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result).toEqual({
        state: 'success',
        email: 'max@example.com',
        name: 'Max Mustermann',
      })
    })

    it('should return correct state structure on error', async () => {
      mockBatchSend.mockResolvedValue({ error: { message: 'Error' } })

      const formData = new FormData()
      formData.append('name', 'Max')
      formData.append('email', 'max@example.com')
      formData.append('message', 'Test')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Test')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result).toEqual({
        state: 'error',
        error: expect.any(String),
      })
    })

    it('should return correct state structure on spam', async () => {
      const formData = new FormData()
      formData.append('name', 'Spammer')
      formData.append('email', 'spam@example.com')
      formData.append('message', 'Spam')
      formData.append('circle', 'apptiva')
      formData.append('subject', 'Spam')
      formData.append('address', 'filled')

      const result = await sendMail({ state: 'idle' }, formData)

      expect(result).toEqual({ state: 'spam' })
    })
  })
})
