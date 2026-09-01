import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const action = await readFile(new URL('../app/actions/inquiry.ts', import.meta.url), 'utf8')
const form = await readFile(new URL('../components/contact/inquiry-form.tsx', import.meta.url), 'utf8')

test('server action verifies CAPTCHA before writing a tenant-scoped inquiry', () => {
  const verify = action.indexOf('verifyCaptchaSubmission')
  const insert = action.indexOf('/rest/v1/inquiries?select=id')
  assert.ok(verify >= 0)
  assert.ok(insert > verify)
  assert.match(action, /NEXT_PUBLIC_TENANT_ID/)
  assert.match(action, /SUPABASE_SERVICE_ROLE_KEY/)
})

test('the contact form mounts a stable scoped CAPTCHA field', () => {
  assert.match(form, /InquiryCaptchaField/)
  assert.match(form, /captchaToken/)
  assert.match(form, /captchaAnswer/)
  assert.match(form, /captchaScope/)
})
