import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Einstellungen',
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
    defineField({
      name: 'projectStartpage',
      title: 'Projekt Startseite',
      type: 'projectStartpage',
    }),
  ],
})
