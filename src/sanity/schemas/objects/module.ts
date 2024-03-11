import { defineField, defineType } from 'sanity'

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
      of: [
        {
          type: 'block',
        },
      ],
      hidden: isNotType('projects'),
    }),

    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Karten', value: 'cards' },
          { title: 'Testimonials & Kunden', value: 'testimonials-customers' },
          { title: 'Projekte', value: 'projects' },
          { title: 'Preise', value: 'prices' },
          { title: 'FAQs', value: 'faqs' },
          { title: 'Kontakt / CTA', value: 'contact' },
          { title: 'Zitat', value: 'quote' },
          { title: 'Teaser Angebot', value: 'teaser-servicepage' },
          { title: 'Fullscreen Bild', value: 'fullscreen-image' },
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
          { title: 'einspaltig', value: '1-column' },
          { title: 'zweispaltig', value: '2-column' },
          { title: 'dreispaltig', value: '3-column' },
          { title: 'Karussell', value: 'card-carousel' },
        ],
      },
      hidden: isNotType('cards', 'text'),
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
      hidden: isNotType('cards'),
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
      hidden: isNotType('cards', 'prices', 'text'),
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
      of: [
        {
          type: 'block',
        },
      ],
      hidden: isNotType('cards', 'faqs', 'text', 'contact', 'prices'),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'card' }],
      hidden: isNotType('cards'),
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
      hidden: isNotType('projects'),
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
      hidden: isNotType('faqs'),
    }),
    defineField({
      name: 'quotetext',
      title: 'Zitat',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      hidden: isNotType('quote'),
    }),
    defineField({
      title: 'Angebote',
      name: 'servicePageTeaser',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'service-page' },
        },
      ],
      hidden: isNotType('teaser-servicepage'),
    }),
    defineField({
      name: 'fullscreenImage',
      title: 'Bild gross',
      type: 'imageWithAlt',
      hidden: isNotType('fullscreen-image'),
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
