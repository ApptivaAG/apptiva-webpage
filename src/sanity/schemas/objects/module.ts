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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Karten', value: 'card-flow' },
          { title: 'Aufklappbare Karten', value: 'card-list-expandable' },
          { title: 'Testimonials & Kunden', value: 'testimonials-customers' },
          { title: 'Projekte', value: 'projects' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
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
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'card' }],
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
    }),
  ],
})
