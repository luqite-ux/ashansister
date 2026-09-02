import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const coverDirectory = new URL('../public/images/card-covers-v3/', import.meta.url)

test('every verified product has a full-bleed square card cover', async () => {
  const products = JSON.parse(await readFile(new URL('data/products.json', root), 'utf8'))
  const verifiedSkus = products.filter((product) => product.images?.[0]).map((product) => product.sku).sort()
  const files = (await readdir(coverDirectory)).filter((file) => file.endsWith('.webp')).sort()

  assert.deepEqual(files, verifiedSkus.map((sku) => `${sku}.webp`))
  for (const file of files) {
    const metadata = await sharp(fileURLToPath(new URL(file, coverDirectory))).metadata()
    assert.equal(metadata.width, 1000, file)
    assert.equal(metadata.height, 1000, file)
  }
})

test('full-bleed cover manifest records overlay-free source choices', async () => {
  const manifest = JSON.parse(await readFile(new URL('../.codex-delivery/card-covers-v3/manifest.json', import.meta.url), 'utf8'))

  assert.equal(manifest.method, 'full-bleed square covers; promotional Chinese overlays excluded; real product labels and logos preserved')
  assert.equal(manifest.covers.length, 34)
  assert.equal(manifest.covers.find((cover) => cover.sku === 'MT002').status, 'derived-card-cover-v3')
  assert.equal(manifest.covers.find((cover) => cover.sku === 'CP005').source, '/images/products/CP005-2.jpeg')
  assert.equal(manifest.covers.find((cover) => cover.sku === 'CP007').source, '/images/products/CP007-2.jpeg')
  assert.equal(manifest.covers.find((cover) => cover.sku === 'CP010').source, '/images/products/CP010-2.png')
})

test('catalog cards use full-bleed covers while product galleries retain every customer original', async () => {
  const fallbackSource = await readFile(new URL('lib/data/products.ts', root), 'utf8')
  const databaseSource = await readFile(new URL('lib/catalog-db.ts', root), 'utf8')

  assert.match(fallbackSource, /image: item\.image_status === "verified-customer-source" \? `\/images\/card-covers-v3\/\$\{item\.sku\}\.webp`/)
  assert.match(fallbackSource, /gallery: images\.map\(/)
  assert.match(databaseSource, /gallery: gallery\.map\(/)
})
