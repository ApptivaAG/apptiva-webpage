import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), './content/data/testimonials/')
export function getTestimonialsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(
      (fileName) =>
        fs.statSync(path.join(postsDirectory, fileName)).isFile() &&
        fileName.endsWith('.md')
    )
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const id = fileName.replace(/\.md$/, '')
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return {
        id,
        ...matterResult.data,
      }
    })

  return allPostsData
}
