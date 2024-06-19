import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({
      title: 'Mail',
      name: 'mail',
      type: 'string',
    }),
    defineField({
      title: 'Phone',
      name: 'phone',
      type: 'string',
    }),
    defineField({
      title: 'Social Networks',
      name: 'socialNetworks',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'social' })],
    }),
  ],
})
