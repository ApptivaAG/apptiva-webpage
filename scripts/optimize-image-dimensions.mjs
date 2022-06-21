import sharp from 'sharp'
import glob from 'glob'
import fs from 'fs-extra'

const matches = glob.sync(`**/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 2560

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match)
    const info = await stream.metadata()

    if (info.width <= MAX_WIDTH) {
      return
    }

    const optimizedName = match.replace(
      /(\..+)$/,
      (match, ext) => `-optimized${ext}`
    )

    // Improve file size additionally with ImageOptim after resizing by pulling the root folder in to the app (https://imageoptim.com/mac)
    await stream.resize(MAX_WIDTH).toFile(optimizedName)

    return fs.rename(optimizedName, match)
  })
)
