import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const home = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8')
const form = await readFile(new URL('../components/contact/inquiry-form.tsx', import.meta.url), 'utf8')
const hero = await readFile(new URL('../components/home/hero-carousel.tsx', import.meta.url), 'utf8')

test('home sections use a perceptible reveal component', () => {
  assert.match(home, /SectionReveal/)
})

test('an unavailable inquiry backend is not presented as success', () => {
  assert.match(form, /Online form unavailable/)
  assert.doesNotMatch(form, /state\.status === "invalid" \? "Check the form" : "Thanks for reaching out"/)
  assert.match(form, /attempted && state\.status !== "idle"/)
})

test('the showroom slide uses its right-side desktop copy safe area without changing mobile alignment', () => {
  assert.match(hero, /i === 2 && "lg:items-end lg:text-right"/)
  assert.match(hero, /i === 2 && "lg:justify-end"/)
  assert.doesNotMatch(hero, /i === 2 && "items-end text-right"/)
})
