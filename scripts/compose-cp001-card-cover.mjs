import sharp from 'sharp'

const left = 0
const top = 35
const width = 470
const height = 175
const generatedReference = '.codex-delivery/processed/CP001-overlay-removed-ai-reference.png'
const original = '.codex-delivery/assets/CP001-1.jpeg'
const preserved = '.codex-delivery/processed/CP001-overlay-removed-preserved.png'
const publicCover = 'public/images/products/CP001-card-v2.webp'

// Use image generation to establish the intended clean-wall edit, but preserve
// the real product pixel-for-pixel by cloning the final texture from another
// clean part of the customer original rather than replacing the whole photo.
const backgroundPatch = await sharp(original)
  .extract({ left: 420, top: 0, width: 380, height: 160 })
  .resize(width, height, { fit: 'fill' })
  .png()
  .toBuffer()

const featherMaskPixels = Buffer.alloc(width * height * 4)
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const offset = (y * width + x) * 4
    const rightFade = Math.min(1, (width - x) / 28)
    const bottomFade = Math.min(1, (height - y) / 24)
    featherMaskPixels[offset] = 255
    featherMaskPixels[offset + 1] = 255
    featherMaskPixels[offset + 2] = 255
    featherMaskPixels[offset + 3] = Math.round(255 * Math.min(rightFade, bottomFade))
  }
}
const featherMask = await sharp(featherMaskPixels, { raw: { width, height, channels: 4 } }).png().toBuffer()

const patch = await sharp(backgroundPatch)
  .ensureAlpha()
  .composite([{ input: featherMask, blend: 'dest-in' }])
  .png()
  .toBuffer()

await sharp(original)
  .composite([{ input: patch, left, top }])
  .png({ compressionLevel: 9 })
  .toFile(preserved)

await sharp(preserved)
  .webp({ quality: 92 })
  .toFile(publicCover)

console.log(JSON.stringify({ original, generatedReference, preserved, publicCover }))
