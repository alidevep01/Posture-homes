import rawData from './products.json'

export type ProductItem = {
  slug: string
  name: string
  price: number | null
  images: string[]
  colors: string[]
  description: string
}

export type ProductCategory = {
  slug: string
  label: string
  coverImage: string | null
  items: ProductItem[]
}

export type ProductSection = 'home' | 'office'

const data = rawData as { home: ProductCategory[]; office: ProductCategory[] }

export function getCategories(section: ProductSection): ProductCategory[] {
  return data[section]
}

export function getCategory(section: ProductSection, slug: string): ProductCategory | undefined {
  return getCategories(section).find((c) => c.slug === slug)
}

export function getItem(
  section: ProductSection,
  categorySlug: string,
  itemSlug: string,
): ProductItem | undefined {
  return getCategory(section, categorySlug)?.items.find((i) => i.slug === itemSlug)
}

export function sectionFromCategorySlug(categorySlug: string): ProductSection | null {
  if (categorySlug === 'home-furniture') return 'home'
  if (categorySlug === 'office-furniture') return 'office'
  return null
}
