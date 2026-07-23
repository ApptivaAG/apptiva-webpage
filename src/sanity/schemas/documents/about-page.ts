import { defineField, defineType } from 'sanity'
import portableTextToString from '@/utils/portable-text-to-string'

export default defineType({
  name: 'about-page',
  title: 'Über uns Seite',
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
        source: (document: any) => portableTextToString(document.header.title),
        maxLength: 96,
      },
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      // @ts-ignore
      of: [{ type: 'module' }],
    }),
  ],
})
