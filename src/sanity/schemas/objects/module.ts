import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'introduction',
      title: 'Einleitung',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      hidden: isNotType('projects', 'team'),
    }),

    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Karten', value: 'cards' },
          { title: 'Kunden', value: 'customers' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Projekte', value: 'projects' },
          { title: 'Preise', value: 'prices' },
          { title: 'FAQs', value: 'faqs' },
          { title: 'Kontakt / CTA', value: 'contact' },
          { title: 'Zitat', value: 'quote' },
          { title: 'Teaser Angebot', value: 'teaser-servicepage' },
          { title: 'Bild', value: 'image' },
          { title: 'Team', value: 'team' },
        ],
      },
    }),
    defineField({
      name: 'level',
      title: 'Modul Ebene',
      type: 'number',
      options: {
        list: [
          { title: 'Modul', value: 1 },
          { title: 'Submodul', value: 2 },
        ],
      },
      hidden: isNotType('cards', 'faqs', 'text'),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text: einspaltig', value: '1-column' },
          { title: 'Text: zweispaltig', value: '2-column' },
          { title: 'Text: dreispaltig', value: '3-column' },
          { title: 'Text: Karussell', value: 'card-carousel' },
          { title: 'Bild: Vollbild', value: 'full' },
          { title: 'Bild: Breite Text', value: 'popout' },
        ],
      },
      hidden: isNotType('cards', 'text', 'image'),
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Blauer Hintergrund', value: 'dark-bg' },
          { title: 'Weisser Hintergrund', value: 'light-bg' },
          { title: 'Grauer Hintergrund', value: 'light-gray-bg' },
        ],
      },
      hidden: isNotType('cards', 'text'),
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
      hidden: isNotType('cards', 'prices', 'text', 'image'),
    }),
    defineField({
      name: 'orientation',
      title: 'Ausrichtung',
      type: 'string',
      options: {
        list: [
          { title: 'Bild Links', value: 'left' },
          { title: 'Bild Rechts', value: 'right' },
        ],
      },
      hidden: isNotType('text'),
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      hidden: isNotType('cards', 'faqs', 'text', 'contact', 'prices', 'image'),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'card' })],
      hidden: isNotType('cards'),
    }),
    defineField({
      title: 'Projekte',
      name: 'projects',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'project' },
        }),
      ],
      hidden: isNotType('projects'),
    }),
    defineField({
      title: 'Team',
      name: 'team',

      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'person' },
        }),
      ],
      hidden: isNotType('team'),
    }),

    defineField({
      name: 'priceCards',
      title: 'Preis Karten',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'priceCard' })],
      hidden: ({ parent }) => parent?.type !== 'prices',
    }),
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'faq' },
        }),
      ],
      hidden: isNotType('faqs'),
    }),
    defineField({
      name: 'quotetext',
      title: 'Zitat',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      hidden: isNotType('quote'),
    }),
    defineField({
      title: 'Angebote',
      name: 'servicePageTeaser',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'service-page' },
        }),
      ],
      hidden: isNotType('teaser-servicepage'),
    }),
  ],
})

function isType(...args: string[]) {
  return (props: { parent: { type?: string } }) =>
    [...args].includes(props.parent?.type ?? '')
}
function isNotType(...args: string[]) {
  return (props: { parent: { type?: string } }) =>
    ![...args].includes(props.parent?.type ?? '')
}
