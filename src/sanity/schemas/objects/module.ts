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
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'text', // TODO: markdown
    }),
  ],
})
