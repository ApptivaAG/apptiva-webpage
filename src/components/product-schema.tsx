import { Schema } from './schema'
import type { WithContext, Product } from 'schema-dts'
import { rootUrl } from '@/app/env'

interface ProductSchemaProps {
  name: string
  description?: string
  price?: number
  priceCurrency?: string
  priceValidUntil?: string
  availability?: string
  image?: string
  url: string
}

const ProductSchema = ({
  name,
  description,
  price,
  priceCurrency = 'CHF',
  priceValidUntil,
  availability = 'InStock',
  image,
  url,
}: ProductSchemaProps) => {
  const productSchema: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? `${rootUrl}${image}` : undefined,
    url: `${rootUrl}${url}`,
    brand: {
      '@type': 'Organization',
      name: 'Apptiva AG',
    },
    offers: {
      '@type': 'Offer',
      price: price?.toString(),
      priceCurrency,
      priceValidUntil,
      availability: availability as any,
      url: `${rootUrl}${url}`,
    },
  }

  return <Schema data={productSchema} />
}

export default ProductSchema
