import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const products = JSON.parse(await readFile(path.join(root, 'data', 'products.json'), 'utf8'))
const publicOutput = path.join(root, 'public', 'images', 'card-covers-v3')
const deliveryOutput = path.join(root, '.codex-delivery', 'card-covers-v3')
await mkdir(publicOutput, { recursive: true })
await mkdir(deliveryOutput, { recursive: true })

const preferredSources = {
  CP001: '/images/products/CP001-card-v2.webp',
  CP005: '/images/products/CP005-2.jpeg',
  CP007: '/images/products/CP007-2.jpeg',
  CP010: '/images/products/CP010-2.png',
}

const overlayRepairs = {
  CP008: { area: { left: 0, top: 35, width: 430, height: 175 }, patchSource: '/images/products/CP001-card-v2.webp', sample: { left: 0, top: 35, width: 430, height: 175 } },
  CP012: { area: { left: 0, top: 35, width: 430, height: 175 }, patchSource: '/images/products/CP001-card-v2.webp', sample: { left: 0, top: 35, width: 430, height: 175 } },
}

const sourceCrops = {
  FS001: { left: 0, top: 300, width: 1080, height: 1080 },
  FS003: { left: 75, top: 150, width: 650, height: 650 },
  YG001: { left: 0, top: 650, width: 981, height: 981 },
}

async function removePromotionalOverlay(source, repair) {
  const patchSource = repair.patchSource
    ? path.join(root, 'public', ...repair.patchSource.replace(/^\//, '').split('/'))
    : source
  const patch = await sharp(patchSource)
    .extract(repair.sample)
    .resize(repair.area.width, repair.area.height, { fit: 'fill' })
    .blur(1.2)
    .toBuffer()
  return sharp(source).composite([{ input: patch, left: repair.area.left, top: repair.area.top }]).toBuffer()
}

const manifest = []
for (const product of products) {
  if (!product.images?.[0]) {
    manifest.push({ sku: product.sku, status: 'blocked-unverified-source', source: null, output: null })
    continue
  }

  const sourcePath = preferredSources[product.sku] || product.images[0]
  const source = path.join(root, 'public', ...sourcePath.replace(/^\//, '').split('/'))
  const target = path.join(publicOutput, `${product.sku}.webp`)
  let input = overlayRepairs[product.sku]
    ? await removePromotionalOverlay(source, overlayRepairs[product.sku])
    : source
  if (sourceCrops[product.sku]) input = await sharp(input).extract(sourceCrops[product.sku]).toBuffer()

  await sharp(input)
    .rotate()
    .resize(1000, 1000, { fit: 'cover', position: 'centre' })
    .webp({ quality: 92 })
    .toFile(target)

  manifest.push({
    sku: product.sku,
    status: 'derived-card-cover-v3',
    source: sourcePath,
    output: `/images/card-covers-v3/${product.sku}.webp`,
    promotional_overlay: overlayRepairs[product.sku] ? 'removed' : 'not-present-in-selected-crop',
  })
}

const report = {
  generated_at: new Date().toISOString(),
  method: 'full-bleed square covers; promotional Chinese overlays excluded; real product labels and logos preserved',
  covers: manifest,
}
await writeFile(path.join(deliveryOutput, 'manifest.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ total: manifest.length, generated: manifest.filter((item) => item.output).length, blocked: manifest.filter((item) => !item.output).length }))
