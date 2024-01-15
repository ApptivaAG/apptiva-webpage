import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'personName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'personName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'string',
    }),
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'string',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      title: 'Kontakt',
      name: 'contact',
      type: 'contact',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      title: 'Skills',
      name: 'skills',
      type: 'array',
      of: [{ type: 'skill' }],
    }),
  ],
})
