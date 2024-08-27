import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      title: 'Link URL',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }),
    }),
  ],
})
