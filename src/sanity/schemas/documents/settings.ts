import { defineType } from 'sanity'

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
  ],
})
