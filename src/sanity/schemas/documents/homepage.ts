import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Startseite',
  type: 'document',
  fields: [
    {
      name: 'claim',
      title: 'Claim',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      of: [{ type: 'module' }],
    }),
  ],
})