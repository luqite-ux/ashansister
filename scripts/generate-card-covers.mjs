import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const products = JSON.parse(await readFile(path.join(root, 'data', 'products.json'), 'utf8'))
const output = path.join(root, '.codex-delivery', 'card-covers')
await mkdir(output, { recursive: true })
const manifest = []

for (const product of products) {
  const sourcePath = product.images?.[0]
  if (!sourcePath) {
    manifest.push({ sku: product.sku, status: 'blocked-unverified-source', source: null, output: null })
    continue
  }
  const source = path.join(root, 'public', ...sourcePath.replace(/^\//, '').split('/'))
  const target = path.join(output, `${product.sku}.webp`)
  const image = await sharp(source).rotate().resize({ width: 820, height: 720, fit: 'contain', background: '#fffdf9', withoutEnlargement: true }).webp({ quality: 90 }).toBuffer()
  await sharp({ create: { width: 1000, height: 1000, channels: 4, background: '#f4ede2' } })
    .composite([
      { input: Buffer.from('<svg width="860" height="780"><rect x="10" y="10" width="840" height="760" rx="28" fill="#fffdf9" stroke="#d8cbb9" stroke-width="4"/></svg>'), left: 70, top: 80 },
      { input: image, left: 90, top: 110 },
    ])
    .webp({ quality: 90 })
    .toFile(target)
  manifest.push({ sku: product.sku, status: 'derived-card-cover', source: sourcePath, output: path.relative(root, target).replaceAll('\\', '/') })
}

await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify({ generated_at: new Date().toISOString(), method: 'contain-only warm canvas normalization; no crop, generative fill, product alteration or source substitution', covers: manifest }, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ total: manifest.length, generated: manifest.filter((item) => item.output).length, blocked: manifest.filter((item) => !item.output).length }))
