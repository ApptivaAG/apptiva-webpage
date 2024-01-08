import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service-page',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
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
      title: 'Alphabet',
      name: 'alphabet',
      by: [
        {
          field: 'header',
          direction: 'asc',
        },
      ],
    },
  ],
})
