import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'card',
  title: 'Card',
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
  ],
})
