import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'projectName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Bild Vorschau',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageHeader',
      title: 'Bild Header',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link zum Projekt',
      type: 'string',
    }),
    defineField({
      name: 'customer',
      title: 'Kunde',
      type: 'string',
    }),
    defineField({
      name: 'tasks',
      title: 'Aufgaben',
      type: 'string',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologien',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Zeitraum',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'contactPerson',
      title: 'Kontaktperson',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call To Action',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Project Name',
      name: 'projectName',
      by: [
        {
          field: 'projectName',
          direction: 'asc',
        },
      ],
    },
  ],
})
