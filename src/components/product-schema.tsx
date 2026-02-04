import { Schema } from './schema'
import type { WithContext, Product } from 'schema-dts'
import { rootUrl } from '@/app/env'
import { sanitizeString } from '@/utils/sanitize-string'

interface ProductData {
  name: string
  description?: string
  price: number
  priceCurrency?: string
  priceValidUntil?: string
}

interface ProductSchemaProps {
  products: ProductData[]
  image?: string
  url: string
}

const ProductSchema = ({ products, image, url }: ProductSchemaProps) => {
  // Fallback to Apptiva logo if no image provided
  const productImage = image
    ? `${rootUrl}${image}`
    : `${rootUrl}/img/Logo-symbol.png`

  return (
    <>
      {products.map((product, index) => {
        const productSchema: WithContext<Product> = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: sanitizeString(product.name) || 'Product',
          description: sanitizeString(product.description),
          image: productImage,
          url: `${rootUrl}${url}`,
          brand: 'Apptiva AG',
          offers: {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: sanitizeString(product.priceCurrency) || 'CHF',
            priceValidUntil: product.priceValidUntil,
            url: `${rootUrl}${url}`,
          },
        }

        return <Schema key={index} data={productSchema} />
      })}
    </>
  )
}

export default ProductSchema
