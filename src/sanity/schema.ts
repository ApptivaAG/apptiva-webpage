import { type SchemaTypeDefinition } from 'sanity'

import blog from './schemas/documents/blog'
import faq from './schemas/documents/faq'
import glossary from './schemas/documents/glossary'
import person from './schemas/documents/person'
import project from './schemas/documents/project'
import servicePage from './schemas/documents/service-page'
import tag from './schemas/documents/tag'
import contact from './schemas/objects/contact'
import header from './schemas/objects/header'
import imageWithAlt from './schemas/objects/image-with-alt'
import module from './schemas/objects/module'
import skill from './schemas/objects/skill'
import skillItem from './schemas/objects/skill-item'
import social from './schemas/objects/social'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    servicePage,
    faq,
    glossary,
    project,
    header,
    module,
    tag,
    blog,
    person,
    social,
    contact,
    skill,
    skillItem,
    imageWithAlt,
  ],
}
