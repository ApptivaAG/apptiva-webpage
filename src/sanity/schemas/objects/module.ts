import { TitledListValue, defineField, defineType } from 'sanity'

export default defineType({
  name: 'module',
  title: 'Modul',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Karten', value: 'cards' },
          { title: 'Testimonials & Kunden', value: 'testimonials-customers' },
          { title: 'Projekte', value: 'projects' },
          { title: 'Preise', value: 'prices' },
          { title: 'FAQs', value: 'faqs' },
        ],
      },
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Fluss', value: 'card-flow' },
          { title: 'Aufklappbare Liste', value: 'card-list-expandable' },
        ],
      },
      hidden: ({ parent }) => parent?.type !== 'cards',
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Dunkler Hintergrund', value: 'dark-bg' },
          { title: 'Heller Hintergrund', value: 'light-bg' },
        ],
      },
      hidden: ({ parent }) => parent?.type !== 'cards',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
      hidden: ({ parent }) => !['cards', 'prices'].includes(parent?.type),
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'cards',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'card' }],
      hidden: ({ parent }) => parent?.type !== 'cards',
    }),
    defineField({
      title: 'Projekte',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'project' },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'projects',
    }),
    defineField({
      name: 'priceCards',
      title: 'Preis Karten',
      type: 'array',
      of: [{ type: 'priceCard' }],
      hidden: ({ parent }) => parent?.type !== 'prices',
    }),
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'faq' },
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'faqs',
    }),
  ],
})
