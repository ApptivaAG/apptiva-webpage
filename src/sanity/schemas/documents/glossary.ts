import portableTextToString from '@/domain/portable-text-to-string'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'glossary',
  title: 'Glossar',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Zusammenfassung',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'block',
        },
      ],
    }),

    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'imageWithAlt',
        },
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare(selection) {
      return {
        title: selection.title
          ? portableTextToString(selection.title)
          : 'No titel',
      }
    },
  },
})
