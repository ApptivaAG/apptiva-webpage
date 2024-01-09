import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'string',
    }),
    defineField({
      name: 'mail',
      title: 'Mail',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
  ],
})
