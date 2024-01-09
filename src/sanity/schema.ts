import { type SchemaTypeDefinition } from 'sanity'

import faq from './schemas/documents/faq'
import glossary from './schemas/documents/glossary'
import header from './schemas/objects/header'
import module from './schemas/objects/module'
import tag from './schemas/documents/tag'
import servicePage from './schemas/documents/service-page'
import blog from './schemas/documents/blog'
import author from './schemas/objects/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicePage, faq, glossary, header, module, tag, blog, author],
}
