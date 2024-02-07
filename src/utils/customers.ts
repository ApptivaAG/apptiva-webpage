import fs from 'fs'
import path from 'path'

const postsDirectory = './content/data/customers/'

export function getCustomerLogos() {
  const fileNames = fs.readdirSync(path.join(process.cwd(), postsDirectory))
  const allPostsData = fileNames
    .filter(
      (fileName) =>
        fs.statSync(path.join(postsDirectory, fileName)).isFile() &&
        fileName.endsWith('.png')
    )
    .map((fileName) => {
      const relativePath = path.join('/img/customers/', fileName)
      const id = fileName.replace(/\.png$/, '')

      return {
        id,
        path: relativePath,
      }
    })

  return allPostsData
}
