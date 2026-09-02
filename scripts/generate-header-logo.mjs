import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'public', 'images', 'logo.jpg')
const target = path.join(root, 'public', 'images', 'logo-header.webp')

await sharp(source)
  .trim({ background: '#ffffff', threshold: 10 })
  .extend({ top: 20, right: 20, bottom: 20, left: 20, background: '#ffffff' })
  .webp({ quality: 92 })
  .toFile(target)
