import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const route = await readFile(new URL('../app/api/auth/login/route.ts', import.meta.url), 'utf8')
const page = await readFile(new URL('../app/admin/login/page.tsx', import.meta.url), 'utf8')
const config = await readFile(new URL('../next.config.mjs', import.meta.url), 'utf8')

test('admin login uses a Route Handler 303 and tenant cookies', () => {
  assert.match(page, /action="\/api\/auth\/login"/)
  assert.match(route, /NextResponse\.redirect\(new URL\('\/admin'/)
  assert.match(route, /303/)
  assert.match(route, /hq_tenant_id/)
  assert.doesNotMatch(page, /useActionState|redirect\(/)
})

test('admin routes proxy to the shared backend after local login routes', () => {
  assert.match(config, /afterFiles/)
  assert.match(config, /NEXT_PUBLIC_ADMIN_URL/)
  assert.match(config, /source: "\/admin\/:path\*"/)
})
