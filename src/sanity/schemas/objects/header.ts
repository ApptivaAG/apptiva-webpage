import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'lead',
      title: 'Einleitung',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'meta',
      title: 'Metadata',
      type: 'meta',
    })
  ],
})
