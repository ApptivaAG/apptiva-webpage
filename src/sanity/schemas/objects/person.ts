import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'object',
  
  fields: [    
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'string',
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
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      title: 'Contact',
      name: 'contact',
      type: 'array',
      of: [{type: 'contact'}]      
    }),
  ],
})
