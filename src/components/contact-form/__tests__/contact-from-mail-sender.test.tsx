import { describe, it, expect } from 'vitest'
import { render } from '@react-email/components'
import { ContactFromMailSenderCopy } from '../contact-from-mail-sender'
import type { FormInputSchema } from '@/components/server-actions/send-mail'

describe('ContactFromMailSenderCopy', () => {
  const baseProps: FormInputSchema = {
    name: 'Max Mustermann',
    email: 'max@example.com',
    message: 'Test message',
    subject: 'Test Subject',
    circle: 'apptiva',
  }

  describe('Rendering', () => {
    it('should render without errors', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toBeTruthy()
      expect(typeof html).toBe('string')
    })

    it('should contain recipient name', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toContain('Max Mustermann')
    })

    it('should display thank you message', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toContain('danke für deine Nachricht')
    })

    it('should display confirmation text', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toContain('Wir melden uns schon bald bei dir')
    })

    it('should include Apptiva logo', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toContain('cdn.sanity.io')
      expect(html).toContain('Apptiva Logo')
    })

    it('should contain HTML structure', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      expect(html).toContain('<!DOCTYPE html')
      expect(html).toContain('<html')
      expect(html).toContain('<head')
      expect(html).toContain('<body')
    })
  })

  describe('Message Display', () => {
    it('should display message when provided', async () => {
      const propsWithMessage = {
        ...baseProps,
        message: 'This is my custom message',
      }
      const html = await render(<ContactFromMailSenderCopy {...propsWithMessage} />)
      
      expect(html).toContain('Deine Nachricht:')
      expect(html).toContain('This is my custom message')
    })

    it('should NOT display message section when message is empty string', async () => {
      const propsWithoutMessage = {
        ...baseProps,
        message: '',
      }
      const html = await render(<ContactFromMailSenderCopy {...propsWithoutMessage} />)
      
      expect(html).not.toContain('Deine Nachricht:')
    })

    it('should NOT display message section when message is undefined', async () => {
      const propsWithoutMessage: FormInputSchema = {
        ...baseProps,
        circle: 'bubble',
        company: 'Test Company',
        message: undefined,
      }
      const html = await render(<ContactFromMailSenderCopy {...propsWithoutMessage} />)
      
      expect(html).not.toContain('Deine Nachricht:')
    })

    it('should handle long messages', async () => {
      const longMessage = 'A'.repeat(500)
      const propsWithLongMessage = {
        ...baseProps,
        message: longMessage,
      }
      const html = await render(<ContactFromMailSenderCopy {...propsWithLongMessage} />)
      
      expect(html).toContain(longMessage)
    })
  })

  describe('Special Characters', () => {
    it('should handle special characters in name', async () => {
      const specialProps = {
        ...baseProps,
        name: 'Müller & Söhne',
      }
      const html = await render(<ContactFromMailSenderCopy {...specialProps} />)
      
      expect(html).toContain('Müller')
      expect(html).toContain('Söhne')
    })

    it('should handle special characters in message', async () => {
      const specialProps = {
        ...baseProps,
        message: 'Test with äöü and "quotes"',
      }
      const html = await render(<ContactFromMailSenderCopy {...specialProps} />)
      
      expect(html).toContain('äöü')
      expect(html).toContain('quotes')
    })

    it('should handle emojis', async () => {
      const emojiProps = {
        ...baseProps,
        name: 'Max 🎉',
        message: 'Great service! 🚀👍',
      }
      const html = await render(<ContactFromMailSenderCopy {...emojiProps} />)
      
      expect(html).toContain('🎉')
      expect(html).toContain('🚀')
    })
  })

  describe('Different Circle Types', () => {
    it('should render correctly for "apptiva" circle', async () => {
      const apptivaProps = {
        ...baseProps,
        circle: 'apptiva' as const,
      }
      const html = await render(<ContactFromMailSenderCopy {...apptivaProps} />)
      
      expect(html).toContain('Max Mustermann')
    })

    it('should render correctly for "bubble" circle', async () => {
      const bubbleProps = {
        ...baseProps,
        circle: 'bubble' as const,
        phone: '+41 79 123 45 67',
        company: 'Test Corp',
      }
      const html = await render(<ContactFromMailSenderCopy {...bubbleProps} />)
      
      expect(html).toContain('Max Mustermann')
    })
  })

  describe('Preview Text', () => {
    it('should include preview text', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      
      expect(html).toContain('Danke für deine Nachricht!')
    })
  })

  describe('Styling', () => {
    it('should include background color', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      
      expect(html).toContain('background-color')
      expect(html).toContain('#ffffff')
    })

    it('should have container max-width', async () => {
      const html = await render(<ContactFromMailSenderCopy {...baseProps} />)
      
      expect(html).toContain('max-width')
      expect(html).toContain('480px')
    })
  })
})
