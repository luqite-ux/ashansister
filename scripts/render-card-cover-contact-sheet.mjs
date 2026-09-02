import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'public', 'images', 'card-covers-v3')
const outputDirectory = path.join(root, 'output', 'card-covers-v3')
await mkdir(outputDirectory, { recursive: true })
const files = (await readdir(source)).filter((file) => file.endsWith('.webp')).sort()
const columns = 6
const tile = 240
const label = 34
const rows = Math.ceil(files.length / columns)
const composites = []

for (let index = 0; index < files.length; index += 1) {
  const file = files[index]
  const image = await sharp(path.join(source, file)).resize(tile, tile).png().toBuffer()
  const svg = Buffer.from(`<svg width="${tile}" height="${label}"><rect width="100%" height="100%" fill="white"/><text x="10" y="23" font-family="Arial" font-size="18" fill="black">${path.parse(file).name}</text></svg>`)
  const left = (index % columns) * tile
  const top = Math.floor(index / columns) * (tile + label)
  composites.push({ input: image, left, top }, { input: svg, left, top: top + tile })
}

await sharp({ create: { width: columns * tile, height: rows * (tile + label), channels: 3, background: 'white' } })
  .composite(composites)
  .jpeg({ quality: 92 })
  .toFile(path.join(outputDirectory, 'all-products.jpg'))
