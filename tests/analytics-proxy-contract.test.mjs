import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('loads tenant analytics through the same-origin proxy', async () => {
  const [layout, route] = await Promise.all([
    readFile(path.join(root, 'app/layout.tsx'), 'utf8'),
    readFile(path.join(root, 'app/api/analytics.js/route.ts'), 'utf8'),
  ])

  assert.match(layout, /import Script from ['"]next\/script['"]/) 
  assert.match(layout, /<Script src=["']\/api\/analytics\.js["'] strategy=["']afterInteractive["'] \/>/)
  assert.doesNotMatch(layout, /NEXT_PUBLIC_GOOGLE_ANALYTICS_ID/)
  assert.match(route, /export const revalidate = 300/)
  assert.match(route, /api\/public\/analytics\.js\?tenantId=/)
  assert.match(route, /application\/javascript/)
  assert.match(route, /X-Content-Type-Options/)
  assert.match(route, /stale-while-revalidate=3600/)
  assert.match(route, /status: 204/)
})
