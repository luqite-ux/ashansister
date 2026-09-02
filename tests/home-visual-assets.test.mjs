import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import sharp from 'sharp'

const dictionaryUrl = new URL('../lib/i18n/dictionaries/en.ts', import.meta.url)
const originalUrl = new URL('../public/images/products/CP001-1.jpeg', import.meta.url)
const publicCoverUrl = new URL('../public/images/products/CP001-card-v2.webp', import.meta.url)

test('homepage manufacturer introduction uses the authentic facility exterior', async () => {
  const dictionary = await readFile(dictionaryUrl, 'utf8')

  assert.match(dictionary, /home:[\s\S]*?intro:[\s\S]*?image: "\/images\/facility-exterior\.jpg"/)
  assert.match(dictionary, /imageAlt: "Exterior of the A SHAN SISTER production facility in Lihu Town, Puning"/)
  assert.match(dictionary, /modelImage: "\/images\/facility-office\.jpg"/)
})

test('CP001 card cover removes the promotional overlay while preserving the product outside its wall area', async () => {
  const original = await sharp(fileURLToPath(originalUrl)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const preserved = await sharp(fileURLToPath(publicCoverUrl)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  assert.deepEqual(preserved.info, original.info)

  const { width, height, channels } = original.info
  let outsideAbsoluteDifference = 0
  let outsideSamples = 0
  let originalOrangePixels = 0
  let preservedOrangePixels = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * channels
      const inEditableWall = x < 470 && y >= 35 && y < 210
      if (!inEditableWall) {
        for (let channel = 0; channel < channels; channel += 1) {
          outsideAbsoluteDifference += Math.abs(original.data[offset + channel] - preserved.data[offset + channel])
          outsideSamples += 1
        }
      }

      if (x < 400 && y >= 35 && y < 190) {
        const originalPixel = original.data.subarray(offset, offset + 3)
        const preservedPixel = preserved.data.subarray(offset, offset + 3)
        const isOrange = ([red, green, blue]) => red > 180 && green > 70 && green < 190 && blue < 70
        if (isOrange(originalPixel)) originalOrangePixels += 1
        if (isOrange(preservedPixel)) preservedOrangePixels += 1
      }
    }
  }

  assert.ok(outsideAbsoluteDifference / outsideSamples < 5)
  assert.ok(originalOrangePixels > 5_000)
  assert.ok(preservedOrangePixels < originalOrangePixels * 0.01)

  const publicCover = await sharp(fileURLToPath(publicCoverUrl)).metadata()
  assert.equal(publicCover.width, 800)
  assert.equal(publicCover.height, 800)
})
