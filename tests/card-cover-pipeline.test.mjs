import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../scripts/generate-card-covers.mjs', import.meta.url), 'utf8')
test('card covers preserve full source images on a common square canvas', () => {
  assert.match(source, /fit: 'contain'/)
  assert.match(source, /withoutEnlargement: true/)
  assert.doesNotMatch(source, /fit: ['"]cover['"]|extract\(/)
  assert.match(source, /no crop, generative fill, product alteration or source substitution/)
})
