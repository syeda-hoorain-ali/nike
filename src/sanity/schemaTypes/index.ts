import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { order } from './order'
import { category } from './category'
import { orderProduct } from './orderProduct'
import { user } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, category, orderProduct, user],
}
