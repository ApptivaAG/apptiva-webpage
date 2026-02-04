import { Schema } from './schema'
import type { WithContext, Product, Service } from 'schema-dts'
import { rootUrl } from '@/app/env'
import { sanitizeString } from '@/utils/sanitize-string'

interface ProductData {
  name: string
  description?: string
  price?: number
  priceCurrency?: string
  priceValidUntil?: string
}

interface ProductSchemaProps {
  products: ProductData[]
  image?: string
  url: string
  productType?: 'Product' | 'Service'
}

const ProductSchema = ({
  products,
  image,
  url,
  productType = 'Product',
}: ProductSchemaProps) => {
  const productImage = image
    ? `${rootUrl}${image}`
    : `${rootUrl}/img/Logo-symbol.png`

  const fullUrl = `${rootUrl}${url.startsWith('/') ? url : `/${url}`}`

  return (
    <>
      {products.map((product, index) => {
        const baseData = {
          '@context': 'https://schema.org' as const,
          name: sanitizeString(product.name) || 'Product',
          description: sanitizeString(product.description),
          image: productImage,
          url: fullUrl,
        }

        const productSchema: WithContext<Product | Service> =
          productType === 'Product'
            ? {
                ...baseData,
                '@type': 'Product',
                brand: { '@type': 'Organization', name: 'Apptiva AG' },
                ...(product.price && {
                  offers: {
                    '@type': 'Offer',
                    price: product.price.toString(),
                    priceCurrency: product.priceCurrency || 'CHF',
                    ...(product.priceValidUntil && {
                      priceValidUntil: product.priceValidUntil,
                    }),
                    url: fullUrl,
                  },
                }),
              }
            : {
                ...baseData,
                '@type': 'Service',
                provider: { '@type': 'Organization', name: 'Apptiva AG' },
              }

        return <Schema key={index} data={productSchema} />
      })}
    </>
  )
}

export default ProductSchema
