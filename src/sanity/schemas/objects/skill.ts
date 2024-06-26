import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'object',
  fields: [
    defineField({
      title: 'Titel',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'skillItem',
        }),
      ],
    }),
  ],
})
