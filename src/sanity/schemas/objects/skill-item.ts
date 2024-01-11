import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skillItem',
  title: 'SkillItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Value',
      name: 'value',
      type: 'number',
    }),
  ],
})

