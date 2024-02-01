import fs from "fs";
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), './content/data/testimonials/')
export function getTestimonialsData() {
  console.log("directory", postsDirectory);

  const fileNames = fs.readdirSync(postsDirectory)
  console.log("filenames", fileNames);
  const allPostsData = fileNames
  .filter((fileName) => fs.statSync(path.join(postsDirectory, fileName)).isFile() && fileName.endsWith('.md'))
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
