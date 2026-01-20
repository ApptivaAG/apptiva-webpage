import { ItemList, WithContext } from 'schema-dts'

export type ItemListItem = {
  slug: string
  title: string
}

export const buildItemList = (
  items: ItemListItem[],
  urlPrefix: string,
  listName: string
): WithContext<ItemList> => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: listName,
  url: `https://apptiva.ch/${urlPrefix}`,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    name: item.title,
    position: index + 1,
    url: `https://apptiva.ch/${urlPrefix}/${item.slug}`,
  })),
})
