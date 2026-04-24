// Run with: node scripts/generate-products.js
// Scans public/products/{home,office} and writes src/data/products.json

import { readdirSync, statSync, writeFileSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')
const PRODUCTS_DIR = join(ROOT, 'public', 'products')
const OUTPUT = join(ROOT, 'src', 'data', 'products.json')

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const PUBLIC_CATEGORY_PATH_ALIASES = {
  office: {
    'Premium Office Tables': 'premium office tables',
    Puffy: 'puffy',
  },
}

// Clean category label mapping
const HOME_LABELS = {
  'arm-chairs': 'Arm Chairs',
  'bed side tables': 'Bed Side Tables',
  beds: 'Beds',
  'center-table': 'Center Tables',
  console: 'Console',
  'dinning-chairs': 'Dining Chairs',
  'dinning-table': 'Dining Tables',
  'mix-media-art': 'Mix Media Art',
  'outdoor-furniture': 'Outdoor Furniture',
  recliner: 'Recliners',
  rugs: 'Rugs',
  sofas: 'Sofas',
}

const OFFICE_LABELS = {
  'High Back Cushion Chairs': 'High Back Cushion Chairs',
  'High Back Mesh Chairs': 'High Back Mesh Chairs',
  Highcounter: 'High Counter Chairs',
  'Office Lounge Chairs': 'Office Lounge Chairs',
  'Office Sofas': 'Office Sofas',
  'PU Office Chairs': 'PU Office Chairs',
  'Premium Leather Office Chairs': 'Premium Leather Office Chairs',
  'Premium Office Tables': 'Premium Office Tables',
  Puffy: 'Puffy Chairs',
  'Recliner Office Chairs': 'Recliner Office Chairs',
  'Training Chairs': 'Training Chairs',
  'cafe series': 'Café Series',
  'conference meeting tables': 'Conference & Meeting Tables',
  'workstations chairs': 'Workstation Chairs',
  workstations: 'Workstations',
  // managers-desk intentionally omitted — folder contains only screenshots
}

// Categories to skip entirely (no usable product images)
const SKIP_OFFICE_CATS = new Set(['managers-desk'])

function isImageFile(name) {
  return IMAGE_EXTS.has(extname(name).toLowerCase())
}

function isDirectory(fullPath) {
  try {
    return statSync(fullPath).isDirectory()
  } catch {
    return false
  }
}

function byName(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}

// Extract price from filename or folder name
// Patterns: -p12000, -p12,000, "12000-" at end of folder name
function extractPrice(text) {
  // -p12000 or -p12,000 pattern
  const pMatch = text.match(/-p([\d,]+)/i)
  if (pMatch) return parseInt(pMatch[1].replace(/,/g, ''), 10)

  // "12000-" at the end (used in some folder names like "DECA HB  12000-")
  const trailMatch = text.match(/([\d,]+)-\s*$/)
  if (trailMatch) return parseInt(trailMatch[1].replace(/,/g, ''), 10)

  // "MRP – 84,000" style
  const mrpMatch = text.match(/MRP\s*[-–]\s*([\d,]+)/i)
  if (mrpMatch) return parseInt(mrpMatch[1].replace(/,/g, ''), 10)

  return null
}

// Convert folder/file name to a URL-safe slug
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Convert name to a readable title
function toTitle(name) {
  // Remove price suffixes like "-p12000", "12000-", trailing dashes
  return name
    .replace(/-p[\d,]+$/i, '')
    .replace(/[\d,]+-\s*$/, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Build public URL path for an image
function publicPath(...parts) {
  return '/' + parts.map((p) => p.replace(/\\/g, '/')).join('/')
}

function publicCategoryFolder(section, catFolder) {
  return PUBLIC_CATEGORY_PATH_ALIASES[section]?.[catFolder] ?? catFolder
}

// Sort images so "front" images come first
function sortImages(images) {
  return [...images].sort((a, b) => {
    const aFront = a.toLowerCase().includes('front') ? 0 : 1
    const bFront = b.toLowerCase().includes('front') ? 0 : 1
    return aFront - bFront || byName(a, b)
  })
}

function makeUniqueItemSlugs(items) {
  const slugCounts = new Map()

  for (const item of items) {
    const count = slugCounts.get(item.slug) ?? 0
    slugCounts.set(item.slug, count + 1)
  }

  const usedSlugs = new Set()

  return items.map((item) => {
    if ((slugCounts.get(item.slug) ?? 0) === 1) {
      usedSlugs.add(item.slug)
      return item
    }

    const priceSuffix = item.price === null ? null : String(item.price)
    let nextSlug = priceSuffix ? `${item.slug}-${priceSuffix}` : item.slug
    let suffix = 2

    while (usedSlugs.has(nextSlug)) {
      nextSlug = `${item.slug}-${suffix}`
      suffix += 1
    }

    usedSlugs.add(nextSlug)

    return {
      ...item,
      slug: nextSlug,
    }
  })
}

// Process a NESTED category: subfolders = products, images inside = gallery
function processNestedCategory(catDir, section, catSlug) {
  const entries = readdirSync(catDir).sort(byName)
  const items = []
  const publicCategory = publicCategoryFolder(section, catSlug)

  for (const entry of entries) {
    const entryPath = join(catDir, entry)
    if (!isDirectory(entryPath)) continue

    const images = sortImages(
      readdirSync(entryPath).filter(isImageFile)
    )

    if (images.length === 0) continue

    // Try to extract price from image filenames or folder name
    let price = extractPrice(entry)
    if (price === null) {
      for (const img of images) {
        price = extractPrice(img)
        if (price !== null) break
      }
    }

    const name = toTitle(entry)
    const slug = toSlug(entry)

    items.push({
      slug,
      name,
      price,
      images: images.map((img) =>
        publicPath('products', section, publicCategory, entry, img)
      ),
      colors: [],
      description: '',
    })
  }

  return makeUniqueItemSlugs(items)
}

// Process a FLAT category: each image = one product (group numbered variants)
function processFlatCategory(catDir, section, catSlug) {
  const files = readdirSync(catDir)
    .filter(isImageFile)
    .filter((f) => !f.startsWith('Screenshot'))
    .sort(byName)
  const publicCategory = publicCategoryFolder(section, catSlug)

  // Group images that belong to same product.
  // Detect numbered variants: strip trailing -01, -02, etc. before price or extension
  const groups = new Map()

  for (const file of files) {
    const ext = extname(file)
    const base = basename(file, ext)

    // Strip trailing -01, -02 ... -09 (but only if it looks like a sequence number)
    // e.g. "dd8594-revolving-chair-01-p19750" → "dd8594-revolving-chair-p19750"
    const normalised = base
      .replace(/-0\d(?=-p[\d,]+$|-$)/, '')
      .replace(/-\d{2}(?=-p[\d,]+$|-$)/, '')

    if (!groups.has(normalised)) {
      groups.set(normalised, { key: normalised, files: [] })
    }
    groups.get(normalised).files.push(file)
  }

  const items = []

  for (const { key, files: groupFiles } of groups.values()) {
    const price = extractPrice(key) ?? extractPrice(groupFiles[0])

    // Name: strip price, convert to title
    const nameBase = key.replace(/-p[\d,]+$/i, '').replace(/[\d,]+-$/, '')
    const name = toTitle(nameBase)
    const slug = toSlug(nameBase)

    items.push({
      slug,
      name,
      price,
      images: sortImages(groupFiles).map((img) =>
        publicPath('products', section, publicCategory, img)
      ),
      colors: [],
      description: '',
    })
  }

  return makeUniqueItemSlugs(items)
}

// Determine if a category uses nested or flat structure
function isNestedCategory(catDir) {
  const entries = readdirSync(catDir)
  return entries.some((e) => isDirectory(join(catDir, e)))
}

function processSection(section, labelMap) {
  const sectionDir = join(PRODUCTS_DIR, section)
  const catFolders = readdirSync(sectionDir).sort(byName)

  const categories = []

  for (const catFolder of catFolders) {
    const catDir = join(sectionDir, catFolder)
    if (!isDirectory(catDir)) continue
    if (section === 'office' && SKIP_OFFICE_CATS.has(catFolder)) continue

    const label = labelMap[catFolder] ?? toTitle(catFolder)
    const slug = toSlug(catFolder)

    let items
    if (isNestedCategory(catDir)) {
      items = processNestedCategory(catDir, section, catFolder)
    } else {
      items = processFlatCategory(catDir, section, catFolder)
    }

    if (items.length === 0) continue

    const coverImage = items[0]?.images[0] ?? null

    categories.push({ slug, label, coverImage, items })
  }

  // Sort alphabetically by label
  categories.sort((a, b) => a.label.localeCompare(b.label))

  return categories
}

const data = {
  home: processSection('home', HOME_LABELS),
  office: processSection('office', OFFICE_LABELS),
}

writeFileSync(OUTPUT, JSON.stringify(data, null, 2))

const homeItems = data.home.reduce((n, c) => n + c.items.length, 0)
const officeItems = data.office.reduce((n, c) => n + c.items.length, 0)
console.log(`✓ Wrote ${OUTPUT}`)
console.log(`  Home:   ${data.home.length} categories, ${homeItems} items`)
console.log(`  Office: ${data.office.length} categories, ${officeItems} items`)
