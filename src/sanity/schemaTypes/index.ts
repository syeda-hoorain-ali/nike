import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { order } from './order'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, category],
}
