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
      name: 'coverImage',
      title: 'Titelbild',
      description: 'Grosses Bild im oberen Bereich der Card',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'image',
      title: 'Icon / Nebenbild',
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
        {
          type: 'cta',
        },
      ],
    }),
  ],
})
