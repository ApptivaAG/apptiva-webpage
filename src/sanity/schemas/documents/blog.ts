import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
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
    defineField({
      name: 'author',
      title: 'Autor:in',
      type: 'array',
      of: [{ type: 'person' }],
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
  orderings: [
    {
      title: 'Alphabet',
      name: 'alphabet',
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
