import { defineField, defineType } from 'sanity'

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
        source: 'header.title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      of: [{ type: 'module' }],
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'title',
      by: [
        {
          field: 'header.title',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare(selection) {
      return { title: selection.title }
    },
  },
})