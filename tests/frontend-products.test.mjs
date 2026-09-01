import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../lib/data/products.ts', import.meta.url), 'utf8')

test('front-end product data is derived from the authoritative 34-SKU JSON', () => {
  assert.match(source, /data\/products\.json/)
  assert.doesNotMatch(source, /Apple Fruit Chewy Sticks|apple-fruit-chewy-sticks/i)
})

test('a product without a verified photo uses an explicit non-product placeholder', () => {
  assert.match(source, /product-image-pending\.svg/)
  assert.doesNotMatch(source, /image: images\[0\] \|\| "\/placeholder\.svg"/)
})
