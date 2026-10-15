import { defineArrayMember, defineField } from 'sanity'

export const authorsField = defineField({
  name: 'authors',
  title: 'Autor:innen',
  description:
    'Diese Personen erscheinen am Seitenende in der gewählten Reihenfolge. Bild, Berufsbezeichnung und Kurzvorstellung werden bei der Person gepflegt.',
  type: 'array',
  of: [defineArrayMember({ type: 'reference', to: [{ type: 'person' }] })],
  validation: (rule) => rule.unique(),
})
