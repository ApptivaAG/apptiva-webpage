import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'module' })],
    }),
  ],
})
