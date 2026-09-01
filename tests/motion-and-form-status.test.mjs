import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const home = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
const form = await readFile(new URL('../components/contact/inquiry-form.tsx', import.meta.url), 'utf8')

test('home sections use a perceptible reveal component', () => {
  assert.match(home, /SectionReveal/)
})

test('an unavailable inquiry backend is not presented as success', () => {
  assert.match(form, /Online form unavailable/)
  assert.doesNotMatch(form, /state\.status === "invalid" \? "Check the form" : "Thanks for reaching out"/)
  assert.match(form, /attempted && state\.status !== "idle"/)
})
