import { z } from 'zod'
import { zfd } from 'zod-form-data'

export type FormState =
  | {
      state: 'idle'
    }
  | {
      state: 'success'
      email: string
      name?: string
      company?: string
      message?: string
      phone?: string
      referrer?: string
    }
  | {
      state: 'error'
      error: string
    }
  | {
      state: 'spam'
    }

const klar = z.object({
  kind: zfd.text(z.literal('klar')),
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(z.string().optional()),
  company: zfd.text(),
  referrer: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  phone: zfd.text(z.string().optional()),
  circle: zfd.text(z.enum(['klar'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

const testChatbot = z.object({
  kind: zfd.text(z.literal('testChatbot')),
  email: zfd.text(),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  circle: zfd.text(z.enum(['klar'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

const apptiva = z.object({
  kind: zfd.text(z.literal('apptiva')),
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(),
  company: zfd.text(z.string().optional()),
  referrer: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  circle: zfd.text(z.enum(['apptiva'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

export const contactFormSchema = zfd.formData(
  z.union([klar, apptiva, testChatbot])
)

export type FormInputSchema = z.infer<typeof contactFormSchema>
