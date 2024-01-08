import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'glossary',
  title: 'Glossar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Zusammenfassung',
      type: 'text',
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      of: [{ type: 'module' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
