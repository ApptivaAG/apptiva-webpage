import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectStartpage',
  title: 'Projekte Startseite',
  type: 'object',
  fields: [
    defineField({
      name: 'introduction',
      title: 'Einleitung',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      title: 'Projekte',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'project' },
        },
      ],
    }),
  ],
})
