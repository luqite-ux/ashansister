import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = JSON.parse(await readFile(new URL('../data/products.json', import.meta.url), 'utf8'))

test('publishes every unique workbook SKU without v0 inventions', () => {
  assert.equal(source.length, 34)
  assert.equal(new Set(source.map((product) => product.sku)).size, 34)
  assert.deepEqual(
    [...new Set(source.map((product) => product.category_cn))].sort(),
    ['佛手', '果丹', '柠檬', '油柑', '糖果', '芒果', '酸梅条', '陈皮'],
  )
  assert.equal(source.some((product) => /apple fruit chewy/i.test(`${product.name_cn} ${product.name_en}`)), false)
})

test('keeps prohibited warranty and guarantee claims out of product content', () => {
  const text = JSON.stringify(source)
  assert.doesNotMatch(text, /质保|保修|质量保证|warrant(?:y|ies)|guarantee(?:d)?/i)
})

test('marks the unverified MT002 image as non-publishable', () => {
  const product = source.find((item) => item.sku === 'MT002')
  assert.ok(product)
  assert.equal(product.image_status, 'blocked-unverified-generated-reference')
  assert.deepEqual(product.images, [])
})
