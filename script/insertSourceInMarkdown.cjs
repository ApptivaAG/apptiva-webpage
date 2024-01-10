const fs = require('fs')
const path = require('path')

const source = 'apptiva'
const directory = '../content/blog'

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

        // Insert the text on line 3
        lines.splice(2, 0, `source: ${source}`)

        // Join the lines back into a string
        const updatedContent = lines.join('\n')

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, (err) => {
          if (err) {
            console.log(`Error writing to file ${filePath}:`, err)
          }
        })
      })
    }
  })
})
