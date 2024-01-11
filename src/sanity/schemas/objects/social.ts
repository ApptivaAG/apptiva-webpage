import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
    }),
  ],
})
