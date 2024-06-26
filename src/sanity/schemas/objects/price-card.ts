import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'priceCard',
  title: 'Preis Karte',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string',
    }),
    defineField({
      name: 'pillText',
      title: 'Pill',
      type: 'string',
    }),
    defineField({
      name: 'isFavourite',
      title: 'Favorit',
      type: 'boolean',
      initialValue: false,
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
    defineField({
      name: 'linktext',
      title: 'Link Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
  ],
})
