import portableTextToString from '@/utils/portable-text-to-string'
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
      name: 'title',
      title: 'Titel (nicht mehr verwenden -> Header Titel verwenden)',
      type: 'string',
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
      name: 'modules',
      title: 'Module (Nicht mehr verwenden -> Inhalt stattdessen',
      type: 'array',
      of: [{ type: 'module' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
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
      oldTitel: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title
          ? portableTextToString(selection.title)
          : selection.oldTitel,
      }
    },
  },
})
