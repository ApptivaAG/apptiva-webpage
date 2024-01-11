import { type SchemaTypeDefinition } from 'sanity'

import blog from './schemas/documents/blog'
import faq from './schemas/documents/faq'
import glossary from './schemas/documents/glossary'
import servicePage from './schemas/documents/service-page'
import tag from './schemas/documents/tag'
import header from './schemas/objects/header'
import module from './schemas/objects/module'
import person from './schemas/objects/person'
import social from './schemas/objects/social'
import contact from './schemas/objects/contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicePage, faq, glossary, header, module, tag, blog, person, social, contact],
}
