import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import test from 'node:test'

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const url = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory)
    if (entry.isDirectory()) files.push(...await sourceFiles(url))
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(url)
  }
  return files
}

const roots = ['../app/', '../components/', '../lib/'].map((name) => new URL(name, import.meta.url))
const files = (await Promise.all(roots.map(sourceFiles))).flat()
const source = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n')

test('does not publish an unconfirmed formal domain', () => {
  assert.doesNotMatch(source, /ashansister\.(?:com|cn)/i)
})

test('does not invent an English legal company name', () => {
  assert.doesNotMatch(source, /Guangdong A Shanjie Food Co\.,? Ltd\.?/i)
})

test('publishes no warranty or guarantee language, including disclaimers', () => {
  assert.doesNotMatch(source, /质保|保修|质量保证|warrant(?:y|ies)|guarantee(?:d)?/i)
})
