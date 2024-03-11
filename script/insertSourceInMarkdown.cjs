const fs = require('fs')
const path = require('path')
const { getPlaiceholder } = require('plaiceholder')
const imageSize = require('image-size')

const source = 'apptiva'
const directory = 'content/blog'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

// Read the directory
fs.readdir(directory, { recursive: true }, (err, files) => {
  if (err) {
    console.log('Error reading directory:', err)
    return
  }

  // Iterate through each file in the directory
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(directory, file)

      // Read the content of the file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file ${filePath}:`, err)
          return
        }

        // Split the content by lines
        const lines = data.split('\n')

        lines.forEach(async (line, index) => {
          if (line.startsWith('image:')) {
            const imageSrc = line.split(': ')[1]

            const blogPostAssetsDirectory = path
              .dirname(filePath)
              .replace(blogPostsPath, assetsPath)

            const imagePath = path.join('/', blogPostAssetsDirectory, imageSrc)

            console.log('imagePath', imagePath)

            const imageInfo = imageSrc
              ? imageSize(path.join('./public', imagePath))
              : undefined
            const { base64 } = imageSrc
              ? await getPlaiceholder(imagePath, { size: 8 })
              : { base64: '' }

            lines.splice(index, 1, 'image:')
            lines.splice(index + 1, 0, `  src: ${imagePath}`)
            lines.splice(index + 2, 0, `  base64Placeholder: ${base64}`)
            lines.splice(index + 3, 0, `  height: ${imageInfo.height}`)
            lines.splice(index + 4, 0, `  width: ${imageInfo.width}`)
            // Join the lines back into a string
            const updatedContent = lines.join('\n')

            // Write the updated content back to the file
            fs.writeFile(filePath, updatedContent, (err) => {
              if (err) {
                console.log(`Error writing to file ${filePath}:`, err)
              }
            })
          }
        })
      })
    }
  })
})
