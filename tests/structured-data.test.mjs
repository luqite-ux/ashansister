import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8')
const productPage = await readFile(new URL('../app/products/[slug]/page.tsx', import.meta.url), 'utf8')

test('publishes organization structured data from the root layout', () => {
  assert.match(layout, /application\/ld\+json/)
  assert.match(layout, /buildOrganizationJsonLd/)
})

test('publishes product and breadcrumb structured data on product details', () => {
  assert.match(productPage, /buildProductJsonLd/)
  assert.match(productPage, /buildProductBreadcrumbJsonLd/)
  assert.match(productPage, /application\/ld\+json/g)
})
