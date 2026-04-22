// One-time WebP conversion script.
// Run: node scripts/convert-to-webp.js
// Requires: npm install sharp
// Converts all PNG/JPG in public/products to WebP, keeping originals.

import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PRODUCTS_DIR = join(__dirname, '..', 'public', 'products')

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('sharp is not installed. Run: npm install sharp')
  process.exit(1)
}

const CONVERT_EXTS = new Set(['.png', '.jpg', '.jpeg'])
let converted = 0
let skipped = 0

async function processDir(dir) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      await processDir(fullPath)
    } else {
      const ext = extname(entry).toLowerCase()
      if (!CONVERT_EXTS.has(ext)) continue

      const webpPath = join(dir, basename(entry, ext) + '.webp')

      try {
        await sharp(fullPath)
          .webp({ quality: 82 })
          .toFile(webpPath)
        converted++
        process.stdout.write(`\r  Converted: ${converted} files`)
      } catch (err) {
        console.warn(`\n  ⚠ Skipped ${fullPath}: ${err.message}`)
        skipped++
      }
    }
  }
}

console.log('Converting images to WebP...')
await processDir(PRODUCTS_DIR)
console.log(`\n✓ Done — ${converted} converted, ${skipped} skipped`)
console.log('You can now update products.json by running: node scripts/generate-products.js')
