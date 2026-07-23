import { render } from '@react-email/components'
import { describe, expect, it } from 'vitest'
import type { FormInputSchema } from '@/components/server-actions/send-mail'
import { ContactFromMailApptivaCopy } from '../apptiva-email/contact-from'

describe('ContactFromMailApptivaCopy', async () => {
  const baseProps: FormInputSchema = {
    kind: 'apptiva',
    name: 'Max Mustermann',
    email: 'max@example.com',
    message: 'Test message from customer',
    subject: 'Test Subject',
    circle: 'apptiva',
    company: 'ACME Corp',
    referrer: 'Google Search',
  }

  describe('Rendering', async () => {
    it('should render without errors', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)
      expect(html).toBeTruthy()
      expect(typeof html).toBe('string')
    })

    it('should contain HTML structure', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)
      expect(html).toContain('<!DOCTYPE html')
      expect(html).toContain('<html')
      expect(html).toContain('<head')
      expect(html).toContain('<body')
    })

    it('should display customer name', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)
      expect(html).toContain('Max Mustermann')
    })

    it('should display notification heading', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)
      expect(html).toContain('hat uns eine Nachricht hinterlassen')
    })

    it('should always display message', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)
      expect(html).toContain('Test message from customer')
    })
  })

  describe('Form Field Display', async () => {
    it('should display all form fields', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)

      expect(html).toContain('Name:')
      expect(html).toContain('Max Mustermann')
      expect(html).toContain('E-Mail Adresse:')
      expect(html).toContain('max@example.com')
      expect(html).toContain('Unternehmen:')
      expect(html).toContain('ACME Corp')
      expect(html).toContain('Referenz')
      expect(html).toContain('Google Search')
    })

    it('should show "keine Angabe" when company is not provided', async () => {
      const propsWithoutCompany = {
        ...baseProps,
        company: undefined,
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...propsWithoutCompany} />
      )

      expect(html).toContain('keine Angabe')
    })

    it('should show "keine Angabe" when referrer is not provided', async () => {
      const propsWithoutReferrer = {
        ...baseProps,
        referrer: undefined,
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...propsWithoutReferrer} />
      )

      expect(html).toContain('keine Angabe')
    })

    it('should show "keine Angabe" for empty string company', async () => {
      const propsEmptyCompany = {
        ...baseProps,
        company: '',
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...propsEmptyCompany} />
      )

      expect(html).toContain('keine Angabe')
    })
  })

  describe('Circle-Specific Fields', async () => {
    it('should NOT display phone field for "apptiva" circle', async () => {
      const apptivaProps = {
        ...baseProps,
        circle: 'apptiva' as const,
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...apptivaProps} />
      )

      expect(html).not.toContain('Telefonnummer:')
    })

    it('should display phone field for "bubble" circle when phone provided', async () => {
      const bubbleProps = {
        ...baseProps,
        kind: 'bubble' as const,
        circle: 'bubble' as const,
        phone: '+41 79 123 45 67',
        company: 'Test Corp',
      }
      const html = await render(<ContactFromMailApptivaCopy {...bubbleProps} />)

      expect(html).toContain('Telefonnummer:')
      expect(html).toContain('+41 79 123 45 67')
    })

    it('should display phone field for "bubble" circle with "keine Angabe" when phone not provided', async () => {
      const bubblePropsNoPhone = {
        ...baseProps,
        kind: 'bubble' as const,
        circle: 'bubble' as const,
        phone: undefined,
        company: 'Test Corp',
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...bubblePropsNoPhone} />
      )

      expect(html).toContain('Telefonnummer:')
      expect(html).toContain('keine Angabe')
    })
  })

  describe('Special Characters', async () => {
    it('should handle special characters in all fields', async () => {
      const specialProps = {
        ...baseProps,
        name: 'Müller & Söhne',
        email: 'test@müller.ch',
        company: 'Café "Zürich"',
        message: 'Hällo! We need "support"',
        referrer: 'Google "Suche"',
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...specialProps} />
      )

      expect(html).toContain('Müller')
      expect(html).toContain('Söhne')
      expect(html).toContain('Café')
      expect(html).toContain('Zürich')
      expect(html).toContain('Hällo')
    })

    it('should handle emojis in message', async () => {
      const emojiProps = {
        ...baseProps,
        message: 'Great product! 🚀👍 Looking forward to working together 🎉',
      }
      const html = await render(<ContactFromMailApptivaCopy {...emojiProps} />)

      expect(html).toContain('🚀')
      expect(html).toContain('👍')
      expect(html).toContain('🎉')
    })

    it('should handle long messages', async () => {
      const longMessage = 'Lorem ipsum dolor sit amet. '.repeat(50)
      const longProps = {
        ...baseProps,
        message: longMessage,
      }
      const html = await render(<ContactFromMailApptivaCopy {...longProps} />)

      expect(html).toContain('Lorem ipsum')
      expect(html.length).toBeGreaterThan(1000)
    })
  })

  describe('Edge Cases', async () => {
    it('should handle minimal required fields only', async () => {
      const minimalProps: FormInputSchema = {
        kind: 'apptiva',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello',
        subject: 'Contact',
        circle: 'apptiva',
      }
      const html = await render(
        <ContactFromMailApptivaCopy {...minimalProps} />
      )

      expect(html).toContain('John Doe')
      expect(html).toContain('john@example.com')
      expect(html).toContain('Hello')
    })

    it('should not contain [object Object] or undefined strings', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)

      expect(html).not.toContain('[object Object]')
      expect(html).not.toContain('undefined')
    })
  })

  describe('TestChatbot Kind', async () => {
    const testChatbotProps: FormInputSchema = {
      kind: 'testChatbot',
      email: 'test@example.com',
      subject: 'Chatbot Test Request',
      circle: 'bubble',
    }

    it('should render testChatbot email template', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toBeTruthy()
      expect(typeof html).toBe('string')
    })

    it('should contain testChatbot specific heading', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('Neue Anfrage für einen')
      expect(html).toContain('Chatbot-Test')
    })

    it('should display the email address', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('E-Mail Adresse:')
      expect(html).toContain('test@example.com')
    })

    it('should contain HTML structure', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('<!DOCTYPE html')
      expect(html).toContain('<html')
      expect(html).toContain('<head')
      expect(html).toContain('<body')
    })

    it('should include preview text for testChatbot', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('Anfrage für Chatbot-Test')
    })

    it('should handle different email addresses', async () => {
      const props = {
        ...testChatbotProps,
        email: 'another.user@company.com',
      }
      const html = await render(<ContactFromMailApptivaCopy {...props} />)

      expect(html).toContain('another.user@company.com')
    })

    it('should include background color', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('background-color')
      expect(html).toContain('#ffffff')
    })

    it('should have container max-width', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).toContain('max-width')
      expect(html).toContain('480px')
    })

    it('should not contain [object Object] or undefined strings', async () => {
      const html = await render(
        <ContactFromMailApptivaCopy {...testChatbotProps} />
      )

      expect(html).not.toContain('[object Object]')
      expect(html).not.toContain('undefined')
    })
  })

  describe('Preview Text', async () => {
    it('should include preview text', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)

      expect(html).toContain('Danke für deine Nachricht!')
    })
  })

  describe('Styling', async () => {
    it('should include background color', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)

      expect(html).toContain('background-color')
      expect(html).toContain('#ffffff')
    })

    it('should have container max-width', async () => {
      const html = await render(<ContactFromMailApptivaCopy {...baseProps} />)

      expect(html).toContain('max-width')
      expect(html).toContain('480px')
    })
  })
})
