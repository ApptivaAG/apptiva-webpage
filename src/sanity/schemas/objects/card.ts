import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'pill',
      title: 'Pille',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [{ title: 'Invertiert', value: 'inverted' }],
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
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
  ],
})
